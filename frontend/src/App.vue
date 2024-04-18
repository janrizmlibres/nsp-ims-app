<script setup>
import '@/assets/css/base.css'
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

</script>

<template>
  <Sidebar />
  <div class="">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
