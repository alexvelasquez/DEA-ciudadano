<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row style="height: 80vh" class="ion-align-items-center">
          <ion-col size="12">
            <ion-card button href="tel:107">
              <ion-card-header>
                <ion-card-title>
                  <ion-icon aria-hidden="true" :icon="pulseOutline" />
                  EMERGENCIAS</ion-card-title
                >
                <ion-card-subtitle
                  >Atención permanente las 24 hs.
                </ion-card-subtitle>
              </ion-card-header>

              <ion-card-content button>
                Servicio gratuito de ambulancias y atención médica de urgencia
                que cubre toda la Ciudad.
              </ion-card-content>
            </ion-card>
            <ion-card button>
              <ion-card-header>
                <ion-card-title>
                  <ion-icon aria-hidden="true" :icon="volumeHighOutline" /> RCP:
                  AUDIO AYUDA</ion-card-title
                >
                <ion-card-subtitle
                  >Audio de basico de ayuda para aplicar RCP
                </ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                Procedimiento de emergencia para salvar vidas que se realiza
                cuando alguien ha dejado de respirar o el corazón ha cesado de
                palpitar.
              </ion-card-content>
            </ion-card>
            <ion-card button @click="router.push('/tabs/tab2')">
              <ion-card-header>
                <ion-card-title>
                  <ion-icon aria-hidden="true" :icon="locationOutline" />
                  SOLICITAR DEA</ion-card-title
                >
                <ion-card-subtitle
                  >Espacios cardioasistidos con DEAS disponibles.
                </ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                Los espacios cardioasisitdos son lugares que tienen los
                elementos necesarios para asistir a una persona en los primeros
                minutos tras un paro cardíaco..
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
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

const router = useRouter()
</script>
