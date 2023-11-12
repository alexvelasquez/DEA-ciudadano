import { reactive } from "vue";

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = "ws://localhost:8000/ws/15";

export const socket = new WebSocket(URL);