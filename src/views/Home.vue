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
            <ion-card button color="primary">
              <ion-card-header>
                <ion-card-title>
                  <ion-icon aria-hidden="true" :icon="volumeHighOutline" /> RCP:
                  AUDIO AYUDA</ion-card-title
                >
                <ion-card-subtitle
                  >Audio basico de ayuda para aplicar RCP
                </ion-card-subtitle>
              </ion-card-header>
            </ion-card>
            <ion-card
              color="warning"
              button
              @click="router.push('/solicitar-dea')"
            >
              <ion-card-header>
                <ion-card-title>
                  <ion-icon aria-hidden="true" :icon="locationOutline" />
                  SOLICITAR DEA</ion-card-title
                >
                <ion-card-subtitle
                  >Espacios cardioasistidos con DEAS disponibles.
                </ion-card-subtitle>
              </ion-card-header>
            </ion-card>

            <!-- <div id="temporizador">
              {{ horas }}:{{ minutos < 10 ? `0${minutos}` : minutos }}:{{
                segundos < 10 ? "0" : ""
              }}{{ segundos }}
            </div> -->
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { socket } from "@/socket";
import {
  IonPage,
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
} from "ionicons/icons";
import { onMounted } from "vue";

const router = useRouter();
const minutos = ref(1);
const segundos = ref(0);
const horas = ref(0);
let temporizadorInterval;
onMounted(() => {
  // iniciarTemporizador();
});

const iniciarTemporizador = () => {
  if (segundos || minutos || horas) {
    temporizadorInterval = setInterval(() => {
      if (segundos.value > 0) {
        segundos.value--;
      } else if (minutos.value > 0) {
        minutos.value--;
        segundos.value = 59;
      }
    }, 1000);
  }
};


</script>
