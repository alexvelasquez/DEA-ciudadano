import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/Home.vue'
import SolicitarDEA from '../views/SolicitarDEA.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: '/solicitar-dea',
    component: SolicitarDEA,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
