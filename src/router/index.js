import { createRouter, createWebHistory } from 'vue-router'
import NuevaVenta from '../views/NuevaVenta.vue'
import HistorialVentas from '@/views/HistorialVentas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/ventas/nueva' },
    { path: '/ventas/nueva', component: NuevaVenta },
      { path: '/ventas/historial', component: HistorialVentas }
  ],
})

export default router
