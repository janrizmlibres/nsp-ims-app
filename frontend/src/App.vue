<script setup>
import { RouterView } from 'vue-router'

import TheSidebar from './components/TheSidebar.vue'
// import Navbar from './components/Navbar.vue'
</script>

<template>
  <TheSidebar />
  <div class="ml-80 p-4 h-screen u-txt-active">
    <!-- <Navbar /> -->
    <RouterView />
  </div>
</template>

<style></style>
