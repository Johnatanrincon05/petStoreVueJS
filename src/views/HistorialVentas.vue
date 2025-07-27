<template>
  <div class="container py-5">
    <div class="card shadow">
      <div class="card-body">
        <h3 class="card-title mb-4">📜 Historial de Compras</h3>

        <div v-if="ventas.length === 0" class="alert alert-info">
          No tienes compras registradas aún.
        </div>

        <div v-else>
          <div v-for="venta in ventas" :key="venta.id" class="mb-4 border-bottom pb-3">
            <h5>
              🧾 Venta #{{ venta.id }} – 
              <small class="text-muted">{{ formatFecha(venta.fecha) }}</small>
            </h5>
            <ul class="list-group mt-2">
              <li
                v-for="item in venta.detalleVenta"
                :key="item.id"
                class="list-group-item d-flex justify-content-between"
              >
                <div>
                  {{ item.producto.nombre }}
                  <small class="text-muted">({{ item.producto.descripcion }})</small>
                </div>
                <div>
                  {{ item.cantidad }} × {{ formatPrecio(item.precioUnitario) }} = 
                  <strong>{{ formatPrecio(item.cantidad * item.precioUnitario) }}</strong>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getClienteId } from '../utils/auth.js'
const baseUrl = import.meta.env.VITE_API_BASE_URL

export default {
  setup() {
    const ventas = ref([])

    onMounted(() => {
      const clienteId = getClienteId()
      axios.get(`${baseUrl}/ventas/cliente/${clienteId}`).then(res => {
        ventas.value = res.data
      })
    })

    const formatFecha = fecha => new Date(fecha).toLocaleString('es-CO')
    const formatPrecio = valor => parseFloat(valor).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })

    return {
      ventas,
      formatFecha,
      formatPrecio
    }
  }
}
</script>
