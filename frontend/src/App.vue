<script setup>
import { RouterView } from 'vue-router'

import Sidebar from './components/TheSidebar.vue'
import Topbar from './components/TheTopbar.vue'
</script>

<template>
  <Sidebar />
  <!-- class="ml-80 p-4 h-screen u-txt-active" -->
  <main class="transition-all duration-200 ease-in-out w-screen relative ml-8 my-4 mr-4">
    <Topbar />
    <RouterView />
  </main>
</template>

<style></style>
