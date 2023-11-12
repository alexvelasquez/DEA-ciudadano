<template>
  <IonContent>
    <IonList lines="none" class="ion-padding-vertical">
      <ion-item
        @click="seleccionarEspacio(espacio)"
        button
        :class="{ active: activo == i }"
        v-for="(espacio, i) in espacios"
        :key="i"
      >
        <ion-avatar slot="start">
          <ion-img src="/images/store.svg"></ion-img>
        </ion-avatar>
        <ion-label>
          <h2>{{ espacio.nombre }}</h2>
          <p>a {{ parseInt(parseFloat(espacio.distancia)) }} km</p>
        </ion-label>
      </ion-item>
    </IonList>
  </IonContent>
  <ion-footer>
    <ion-button
      fill="clear"
      expand="block"
      @click="$emit('solicitar', espacios[activo])"
      >SOLICITAR</ion-button
    >
  </ion-footer>
</template>
<script lang="ts" setup>
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonAvatar,
  IonFooter,
  IonImg,
} from "@ionic/vue";

import { ref, defineEmits } from "vue";
const props = defineProps(["espacios"]);
const emit = defineEmits(["ubicar-espacio"]);
const activo = ref<number>(0);

/** Activa el espacio y lo posiciona en el mapa
 * @function
 * @param {any} espacio
 * @returns {void}
 */
const seleccionarEspacio = (espacio: any): void => {
  activo.value = props.espacios.indexOf(espacio);
  const { latitud, longitud } = espacio;
  emit("ubicar-espacio", [latitud, longitud]);
};
</script>
<style scoped>
ion-avatar {
  --border-radius: 4px;
}
.active::part(native) {
  background: #b0d6e2 !important;

  /** and lots more **/
}
</style>
