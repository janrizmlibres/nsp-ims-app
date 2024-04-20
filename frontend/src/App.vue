<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
</script>

<template>
  <Sidebar />
  <div class="w-full h-full fixed left-80 p-4">
    <Navbar />
    <RouterView class="h-full pt-4"/>
  </div>
</template>

<style>

</style>
