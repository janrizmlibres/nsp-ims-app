<script setup>
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast';

import Sidebar from './components/TheSidebar.vue'
import Topbar from './components/TheTopbar.vue'

</script>

<template>
  <Toast />
  <RouterView class="h-full pt-4"/>
</template>

<style>
</style>
