<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
</script>

<template>
  <RouterView class="h-full pt-4"/>
</template>

<style>

</style>
