<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
</script>

<template>
  <Sidebar />
  <div class="flex flex-col w-full h-full fixed pl-96 p-4">
    <Navbar />
    <RouterView class="w-fullh-full pt-4"/>
  </div>
</template>

<style>

</style>
