<template>
  <div class="container-fluid pt-navbar mx-auto">
    <div class="card shadow">
      <div class="card-body">
        <h3 class="card-title mb-4">🛒 Nueva Venta</h3>

        <form @submit.prevent="finalizarCompra">
          <div
            class="row align-items-end mb-3"
            v-for="(item, index) in productosSeleccionados"
            :key="index"
          >
            <div class="col-md-5">
              <label class="form-label">Producto</label>
              <select
                v-model="item.productoId"
                class="form-select"
                @change="calcularTotal"
                required
              >
                <option disabled value="">Seleccione un producto</option>
                <option
                  v-for="p in productos"
                  :key="p.id"
                  :value="p.id"
                >
                  {{ p.nombre }} - {{ parseInt(p.precioUnitario).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }}
                </option>
              </select>
            </div>

            <div class="col-md-3">
              <label class="form-label">Cantidad</label>
              <input
                type="number"
                min="1"
                class="form-control"
                v-model.number="item.cantidad"
                @input="calcularTotal"
                required
              />
            </div>

            <div class="col-md-2 d-grid">
              <button
                type="button"
                class="btn btn-outline-danger mt-4"
                @click="eliminar(index)"
              >
                Eliminar
              </button>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-secondary mb-3"
            @click="agregarProducto"
          >
            ➕ Agregar Producto
          </button>

          <div class="mb-3">
            <h5>
              Total: <span class="text-primary">{{ total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }}</span>
            </h5>
          </div>

          <button type="submit" class="btn btn-success w-100">💾 Finalizar Compra</button>
        </form>
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
    const productos = ref([])
    const productosSeleccionados = ref([{ productoId: '', cantidad: 1 }])
    const total = ref(0)

    onMounted(() => {
      axios.get(`${baseUrl}/products/`).then(res => {
        productos.value = res.data
      })
    })

    function agregarProducto() {
      productosSeleccionados.value.push({ productoId: '', cantidad: 1 })
    }

    function eliminar(index) {
      productosSeleccionados.value.splice(index, 1)
      calcularTotal()
    }

    function calcularTotal() {
      total.value = productosSeleccionados.value.reduce((acc, item) => {
        const producto = productos.value.find(p => p.id === +item.productoId)
        return acc + (producto ? parseFloat(producto.precioUnitario) * item.cantidad : 0)
      }, 0)
    }

    function finalizarCompra() {
      const venta = {
        idCliente: getClienteId(),
        fecha: new Date().toISOString(),
        detalleVenta: productosSeleccionados.value.map(item => {
          const producto = productos.value.find(p => p.id === +item.productoId)
          return {
            productoId: item.productoId,
            cantidad: item.cantidad,
            precioUnitario: parseFloat(producto.precioUnitario)
          }
        })
      }

      axios
        .post(`${baseUrl}/ventas`, venta)
        .then(() => {
          alert('✅ Venta registrada con éxito')
          productosSeleccionados.value = [{ productoId: '', cantidad: 1 }]
          total.value = 0
          window.location.href = '/ventas/historial'
        })
        .catch(err => {
          alert('❌ Error al registrar la venta: ' + (err.response?.data?.message || err.message))
        })
    }

    return {
      productos,
      productosSeleccionados,
      total,
      agregarProducto,
      eliminar,
      calcularTotal,
      finalizarCompra
    }
  }
}
</script>
