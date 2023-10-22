<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div style="height: 76vh; width: auto">
        <l-map
          ref="map"
          v-model="zoom"
          v-model:zoom="zoom"
          :options="{ zoomControl: false, attributionControl: false }"
          :center="[-34.92401716877919, -57.96681992792768]"
          :use-global-leaflet="false"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
          <l-marker :lat-lng="[-34.92401716877919, -57.96681992792768]">
            <l-icon :icon-url="iconUrl" :icon-size="[40, 40]" />
          </l-marker>

          <l-control position="bottomright">
            <ion-button>
              <ion-icon :icon="locateSharp"></ion-icon>
            </ion-button>
          </l-control>
        </l-map>
      </div>
      <ion-modal
        ref="modal"
        :is-open="true"
        trigger="open-modal"
        :initial-breakpoint="0.25"
        :can-dismiss="false"
        :breakpoints="[0, 0.25, 0.5, 0.75]"
      >
        <ion-content class="ion-padding">
          <ion-searchbar
            @click="$refs.modal.$el.setCurrentBreakpoint(0.75)"
            placeholder="Search"
          ></ion-searchbar>
          <ion-list>
            <ion-item>
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=b"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>Connor Smith</h2>
                <p>Sales Rep</p>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=a"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>Daniel Smith</h2>
                <p>Product Designer</p>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=d"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>Greg Smith</h2>
                <p>Director of Operations</p>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=e"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>Zoey Smith</h2>
                <p>CEO</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LControl,
  LIcon,
  LMarker,
} from "@vue-leaflet/vue-leaflet";
import {
  IonIcon,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonSearchbar,
} from "@ionic/vue";

import { locateSharp } from "ionicons/icons";

const zoom = ref<number>(15);
const iconUrl = computed(() => {
  return "/images/location.svg";
});
</script>
<style scoped>
ion-button {
  --border-radius: 100%;
}
</style>
