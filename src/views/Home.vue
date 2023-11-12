<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row style="height: 80vh" class="ion-align-items-center">
          <ion-col size="12">
            <ion-card color="primary" button href="tel:107">
              <ion-card-header>
                <ion-card-title>
                  <ion-icon aria-hidden="true" :icon="pulseOutline" />
                  LLAMAR 107</ion-card-title
                >
                <ion-card-subtitle
                  >Servicio gratuito de ambulancias
                </ion-card-subtitle>
              </ion-card-header>
            </ion-card>
            <ion-card
              button
              color="primary"
              @click="audioAccion[estadoAudio].accion()"
            >
              <ion-card-header>
                <ion-card-title
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <div>
                    <ion-icon
                      aria-hidden="true"
                      style=""
                      :icon="volumeHighOutline"
                    />
                    <ion-label> RCP: AUDIO AYUDA</ion-label>
                  </div>
                  <ion-badge color="warning">
                    {{ audioAccion[estadoAudio].label }}
                  </ion-badge>
                </ion-card-title>
                <!-- <ion-card-subtitle
                  >Audio basico de ayuda para aplicar RCP
                </ion-card-subtitle> -->
                <ion-card-subtitle>
                  <span> Audio de ayuda para aplicar RCP </span>
                </ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>

    <audio v-show="false" ref="audio" id="audio" controls>
      <source type="audio/wav" src="/audios/rcp.mp3" />
    </audio>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onBeforeUpdate, onBeforeMount } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";

import { useAppStore } from "@/stores/app";
const store = useAppStore();

import {
  IonPage,
  IonBadge,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
  IonCard,
  IonCol,
  IonGrid,
  IonRow,
  IonNavLink,
} from "@ionic/vue";
import {
  callOutline,
  bodyOutline,
  volumeHighOutline,
  locationOutline,
  pulseOutline,
  playOutline,
  stopOutline,
  pauseOutline,
} from "ionicons/icons";
const router = useRouter();
const audio = ref(null);
onBeforeRouteLeave((to, from, next) => {
  store.handleModal(true);
  next();
});

const estadoAudio = ref<string>("stop");
const audioAccion: { [key: string]: any } = {
  stop: {
    label: "reproducir",
    icon: playOutline,
    accion: () => {
      estadoAudio.value = "reproducir";
      audio.value.play();
    },
  },
  reproducir: {
    label: "reproduciendo",
    icon: pauseOutline,
    accion: () => {
      estadoAudio.value = "stop";
      audio.value.pause();
      audio.value.currentTime = 0;
    },
  },
};

onBeforeMount(() => {
  store.handleModal(false);
});
</script>
