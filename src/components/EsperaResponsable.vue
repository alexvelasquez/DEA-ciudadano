<template>
  <ion-content>
    <div
      style="
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: 25px;
        align-items: center;
      "
    >
      <span class="ion-margin-start"
        >ESPERANDO CONFIRMACIÓN DEL RESPONSABLE</span
      >
      <ion-thumbnail class="ion-margin-end">
        <img
          src="/images/espera.png"
          alt="The Wisconsin State Capitol building in Madison, WI at night"
        />
      </ion-thumbnail>
    </div>
    <div class="ion-margin">
      <IonProgressBar type="indeterminate" />
    </div>
  </ion-content>
  <ion-footer>
    <ion-button fill="clear" expand="block" @click="$emit('cancelar')"
      >CANCELAR</ion-button
    >
  </ion-footer>
</template>
<script lang="ts" setup>
import {
  IonContent,
  IonProgressBar,
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
