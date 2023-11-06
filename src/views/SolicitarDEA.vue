<template>
  <ion-page>
    <ion-content>
      <div>
        <div :style="`height: ${estados[estado].height.map}; width: auto`">
          <l-map
            v-if="espacios.length"
            ref="map"
            v-model="zoom"
            v-model:zoom="zoom"
            :options="{ zoomControl: false, attributionControl: false }"
            :center="posicionActual"
            :use-global-leaflet="true"
          >
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></l-tile-layer>
            <l-marker :lat-lng="posicionActual">
              <LIcon icon-url="/images/pin.svg" :icon-size="[30, 30]" />
            </l-marker>
            <l-marker
              v-for="(espacio, i) in espacios"
              :key="i"
              :lat-lng="[espacio.latitud, espacio.longitud]"
            >
              <l-icon icon-url="/images/location.svg" :icon-size="[40, 40]" />
            </l-marker>

            <l-control position="bottomright">
              <div @click="irUbicacionMapa(posicionActual)">
                <ion-fab-button>
                  <ion-icon :icon="locateSharp"></ion-icon>
                </ion-fab-button>
              </div>
              <!-- <ion-button
                style="border-radius: 100%"
                @click="irUbicacionMapa(posicionActual)"
              >
                <ion-icon :icon="locateSharp"></ion-icon>
              </ion-button> -->
            </l-control>
          </l-map>
        </div>
        <IonModal
          ref="modal"
          :style="`--height: ${estados[estado].height.modal}`"
          handle-behavior="cycle"
          :is-open="true"
          :animated="false"
          :can-dismiss="false"
          :backdrop-dismiss="false"
          :initial-breakpoint="1"
          :breakpoints="[0, 1]"
          :keep-contents-mounted="true"
          :backdrop-breakpoint="1"
          :show-backdrop="false"
        >
          <component
            :is="estados[estado].component"
            :espacios="espacios"
            @ubicar-espacio="irUbicacionMapa($event)"
            @solicitar="solicitarEspacio($event)"
            @cancelar="estado = 'seleccion'"
          />
        </IonModal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import EspaciosDisponibles from "../components/EspaciosDisponibles.vue";
import EsperaResponsable from "../components/EsperaResponsable.vue";
import DetalleConfirmacion from "../components/DetalleConfirmacion.vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import {
  LMap,
  LTileLayer,
  LMarker,
  LControl,
  LIcon,
} from "@vue-leaflet/vue-leaflet";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonModal,
  IonFabButton,
} from "@ionic/vue";

import { Geolocation } from "@capacitor/geolocation";
import { locateSharp } from "ionicons/icons";

import http from "../plugins/axios";

/**
 * refs relacionadas al mapa
 */
const map = ref(null);
const zoom = ref<number>(15);
const posicionActual = ref<L.LatLng>(null);

/**
 * refs relacionadas al espacio obligado
 */
const espacios = ref<Array<Object>>([]);
const estado = ref<string>("seleccion");
const estados = {
  seleccion: {
    height: {
      map: "60vh",
      modal: "40%",
    },
    component: EspaciosDisponibles
  },
  pendiente: {
    height: {
      map: "80vh",
      modal: "20%",
    },
    component: EsperaResponsable
  },
  confirmado: {
    height: {
      map: "60vh",
      modal: "40%",
    },
    component: DetalleConfirmacion
  },
};

onMounted(async () => {
  const {
    coords: { latitude, longitude },
  } = await Geolocation.getCurrentPosition();
  posicionActual.value = L.latLng(-34.90298173281178, -57.97249948009739);

  const {
    data: { data },
  } = await http.get("/publico/espacios/1/", {
    params: {
      lat: latitude,
      lon: longitude,
    },
  });
  espacios.value = data.slice(0, 3);
});

/** Redireccion en el mapa dada una posicion.
 * @name irUbicacionMapa
 * @function
 * @param {Array<number>} position
 * @returns {void}
 */
const irUbicacionMapa = (position: Array<number>): void => {
  map.value.leafletObject.panTo(position, 40);
};

/** Solicita un espacio y queda a la espera de ser atentido.
 * @name solicitarEspacio
 * @function
 * @param {any} espacio
 * @returns {Promise<void>}
 */
const solicitarEspacio = async (espacio: any): Promise<void> => {
  const { latitud, longitud } = espacio;
  const {
    data: { data: solicitud },
  } = await http.post(`/publico/solicitar-dea/${espacio.id}`, {
    latitud: latitud,
    longitud: longitud,
  });

  const socket = new WebSocket(`ws://localhost:8000/ws/${solicitud.id}`);
  estado.value = "pendiente";
  socket.onmessage = async (event) => {
    estado.value = "confirmado";
    calcularRuta(new L.LatLng(latitud, longitud));
    const { data } = await http.post(`/close-room/${solicitud.id}`);
  };
};

/** Calcula la ruta .
 * @name calcularRuta
 * @function
 * @param {L.LatLng} to
 * @returns {void}
 */
const calcularRuta = (to: L.LatLng): void => {
  if (map.value.leafletObject) {
    L.Routing.control({
      waypoints: [posicionActual.value, to],
      routeWhileDragging: true,
    }).addTo(map.value.leafletObject);

  }
};

</script>

<style scoped>
.card-content-md {
  -webkit-padding-start: 0px;
  padding-inline-start: 0px;
  -webkit-padding-end: 0px;
  padding-inline-end: 0px;
}

ion-backdrop {
  background: var(--ion-color-dark);
  opacity: 0.3;
}
</style>
<style>
ion-button {
  --background: #4d8ba0;
  --color: #f3f3f3;
}
.leaflet-routing-container.leaflet-bar.leaflet-routing-collapsible.leaflet-control {
  display: none;
}
</style>
