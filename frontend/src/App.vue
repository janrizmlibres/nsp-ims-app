<script setup>
import { RouterView } from 'vue-router'

import Sidebar from './components/TheSidebar.vue'
import Topbar from './components/TheTopbar.vue'

</script>

<template>
  <Sidebar />
  <main class="u-max-d transition-all duration-200 ease-in-out w-screen relative ml-8 my-4 mr-4">
    <Topbar />
    <RouterView/>
  </main>
</template>

<style>
  /* max-height */
  .u-max-d {
      max-height: calc(100vh - 2rem);
      max-width: calc(100vw - 8.5rem)
  }
</style>
