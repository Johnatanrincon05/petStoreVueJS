<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template class="align-items-center">
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-sm custom-navbar">
    <RouterLink class="navbar-brand mx-0 mx-md-4" to="/ventas/historial">Home</RouterLink>
    <RouterLink class="navbar-brand mx-0 mx-md-4" to="/ventas/nueva">Nueva venta</RouterLink>
    <div class="container-fluid">
    </div>
  </nav>
  <div class="pt-navbar"></div>
  <div class="container-fluid pt-navbar mx-auto">
    <div class="row">
      <div class="col-md-12">
        <h2 class="ml-0">Polimarket</h2>
    </div>
    </div>
  </div>
    <RouterView />
</template>


<style>
.custom-navbar {
  height: 64px;
  min-height: 64px;
  max-height: 64px;
  z-index: 1050;
}

.pt-navbar {
  padding-top: 64px; /* Igual al alto de la navbar */
}
</style>