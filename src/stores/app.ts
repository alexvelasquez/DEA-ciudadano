import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            estado: 'seleccion',
            modal: false,
            ubicacionEspacioSolicitado: null,
            llegada: null,
        }
    },
    actions: {
        handleModal(value: boolean) {
            this.modal = value;
        },
        setEstado(estado: string) {
            this.estado = estado;
        }
    },
    persist: {
        storage: localStorage,
        paths: ['estado','llegada','ubicacionEspacioSolicitado'],
    },
})