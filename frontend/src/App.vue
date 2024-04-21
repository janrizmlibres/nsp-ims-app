<script setup>
import { RouterView } from 'vue-router'

import Sidebar from './components/TheSidebar.vue'
import Topbar from './components/TheTopbar.vue'

</script>

<template>
  <Sidebar />
  <main class="transition-all duration-200 ease-in-out w-full u-max-h-calc relative ml-8 my-4">
    <Topbar />
    <RouterView class="pt-4"/>
  </main>
</template>

<style></style>
