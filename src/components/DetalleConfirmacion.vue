<template>
  <ion-content>
    <div
      style="
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 31px;
        margin-left: 10px;
        align-items: center;
      "
    >
      <ion-thumbnail class="ion-margin-end">
        <img
          src="/images/kit.svg"
          alt="The Wisconsin State Capitol building in Madison, WI at night"
        />
      </ion-thumbnail>
    </div>
    <div
      style="
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 10px;
      "
    >
      DEA EN CAMINO
    </div>
    <div style="margin-top: 30px" v-if="store.llegada">
      <div
        style="
          display: flex;
          width: 100%;
          justify-content: center;
          font-size: 40px;
          font-weight: bold;
        "
      >
        {{ moment(store.llegada).format("HH:mm") }}
      </div>
      <div
        style="
          display: flex;
          width: 100%;
          justify-content: center;
          font-size: 10px;
        "
      >
        HORA DE LLEGADA
      </div>
    </div>
  </ion-content>
  <ion-footer>
    <ion-button fill="clear" expand="block" @click="$emit('hablar-responsable')"
      >HABLAR CON EL RESPONSABLE</ion-button
    >
  </ion-footer>
</template>
<script lang="ts" setup>
import { IonContent, IonThumbnail, IonFooter, IonButton } from "@ionic/vue";
import moment from "moment";
import { useAppStore } from "@/stores/app";
const store = useAppStore();
</script>
<style scoped>
ion-thumbnail {
  --size: 40px;
  --border-radius: 14px;
}
</style>
