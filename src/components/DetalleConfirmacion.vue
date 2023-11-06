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
    <div
      style="
        display: flex;
        width: 100%;
        justify-content: center;
        font-size: 40px;
        font-weight: bold;
        margin-top: 30px;
      "
    >
      5 min
    </div>
  </ion-content>
  <ion-footer>
    <ion-button fill="clear" expand="block" @click="$emit('hablar-responsable')"
      >HABLAR CON EL RESPONSABLE</ion-button
    >
  </ion-footer>
</template>
<script lang="ts" setup>
import {
  IonContent,
  IonThumbnail,
  IonFooter,
  IonButton,
} from "@ionic/vue";
</script>
<style scoped>
ion-thumbnail {
  --size: 40px;
  --border-radius: 14px;
}
</style>
