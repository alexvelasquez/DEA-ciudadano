<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="pulseOutline" />
          <ion-label>Emergencias</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="radio" href="/solicitar-dea">
          <ion-icon :icon="navigateOutline" />
          <ion-label>Solicitar DEA</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/vue";

import { pulseOutline, navigateOutline } from "ionicons/icons";

export default {
  components: {
    IonPage,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
  },
  data() {
    return {
      pulseOutline,
      navigateOutline,
    };
  },
};
</script>
