<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div>
        <div
          :style="`height: ${estados[store.estado].height.map}; width: auto`"
        >
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

            <!-- <l-control position="topleft">
              <ion-fab-button size="small" @click="dismiss">
                <ion-icon :icon="arrowBackOutline"></ion-icon>
              </ion-fab-button>
              <ion-tab-button tab="home" href="/home">
                <ion-icon :icon="arrowBackOutline" />
                <ion-label>Emergencias</ion-label>
              </ion-tab-button>
            </l-control> -->
            <l-control position="bottomright">
              <div @click="irUbicacionMapa(posicionActual)">
                <ion-fab-button size="small">
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
          :style="`--height: ${estados[store.estado].height.modal};`"
          handle-behavior="cycle"
          :is-open="store.modal"
          :animated="true"
          :can-dismiss="true"
          :backdrop-dismiss="true"
          :initial-breakpoint="1"
          :breakpoints="[0, 1]"
          :backdrop-breakpoint="1"
          :show-backdrop="true"
        >
          <component
            :is="estados[store.estado].component"
            :espacios="espacios"
            @ubicar-espacio="irUbicacionMapa($event)"
            @solicitar="solicitarEspacio($event)"
            @cancelar="store.setEstado('seleccion')"
          />
        </IonModal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

import { useAppStore } from "@/stores/app";
const store = useAppStore();

import {
  ref,
  reactive,
  onMounted,
  onActivated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  watch,
} from "vue";

import Home from "../views/Home.vue";
import EspaciosDisponibles from "../components/EspaciosDisponibles.vue";
import EsperaResponsable from "../components/EsperaResponsable.vue";
import DetalleConfirmacion from "../components/DetalleConfirmacion.vue";
import L, { LatLng } from "leaflet";
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
  IonBackButton,
  IonToolbar,
  IonButtons,
  IonHeader,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";

import { Geolocation } from "@capacitor/geolocation";
import { locateSharp, arrowBackOutline } from "ionicons/icons";

import http from "../plugins/axios";
import moment from "moment";
const router = useRouter();

/**
 * refs relacionadas al mapa
 */
const map = ref(null);
const modal = ref(null);
const zoom = ref<number>(15);
const posicionActual = ref(null);

/**
 * refs relacionadas al espacio obligado
 */
let solicitud = reactive(null);
const espacios = ref<Array<any>>([]);
const estados: { [key: string]: any } = {
  seleccion: {
    height: {
      map: "65vh",
      modal: "30%",
    },
    component: EspaciosDisponibles,
  },
  pendiente: {
    height: {
      map: "75vh",
      modal: "20%",
    },
    component: EsperaResponsable,
  },
  confirmado: {
    height: {
      map: "55vh",
      modal: "40%",
    },
    component: DetalleConfirmacion,
  },
};

onBeforeRouteLeave((to, from, next) => {
  store.handleModal(false);
  next();
});

onMounted(async () => {
  store.handleModal(true);
  await fetchEspacios();
});

const fetchEspacios = async () => {
  const {
    coords: { latitude, longitude },
  } = await Geolocation.getCurrentPosition();
  posicionActual.value = L.latLng(latitude, longitude);

  const {
    data: { data },
  } = await http.get("/publico/espacios/1/", {
    params: {
      lat: latitude,
      lon: longitude,
    },
  });
  espacios.value = data;
};
const handleRefresh = async (event: any) => {
  if (store.estado == "seleccion") {
    await fetchEspacios();
  }
  if (store.estado == "confirmado") {
    calcularRuta(store.ubicacionEspacioSolicitado);
  }
  event.target.complete();
};

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
  store.setEstado("pendiente");
  const { latitud, longitud, id } = espacio;
  const {
    data: { solictud: solicitud_dea },
  } = await http.post(`/publico/solicitar-dea/${id}`, {
    latitud: latitud,
    longitud: longitud,
  });
  solicitud = solicitud_dea;
  const socket = new WebSocket(`ws://localhost:8000/ws/${solicitud.id}`);
  socket.onmessage = async (event) => {
    store.setEstado("confirmado");
    store.ubicacionEspacioSolicitado = new L.LatLng(latitud, longitud);
    calcularRuta(store.ubicacionEspacioSolicitado);
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
    var control = L.Routing.control({
      waypoints: [posicionActual.value, to],
      routeWhileDragging: true,
    }).addTo(map.value.leafletObject);

    control.on("routesfound", function (e) {
      var routes = e.routes;
      var time = routes[0].summary.totalTime; // Tiempo estimado en segundos
      if (!store.llegada) {
        store.llegada = moment(new Date()).add(time, "seconds");
      } else if (moment(store.llegada).isSameOrBefore(moment(new Date()))) {
        store.llegada = null;
        store.setEstado("seleccion");
      }
    });
  }
};

/** Cancela la solicitud .
 * @name calcularRuta
 * @function
 * @returns {void}
 */
const cancelarSolicitud = async (): Promise<void> => {
  const { data } = await http.post(`/close-room/${solicitud.id}`);
  store.setEstado("seleccion");
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
.modal-sheet {
  bottom: 8% !important;
}
</style>
