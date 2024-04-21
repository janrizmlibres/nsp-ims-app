<script setup>
import { RouterView } from 'vue-router'
import { useSideBarStateStore } from '@/stores/sidebar_state';

import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

const sideBarStateStore = useSideBarStateStore()
</script>

<template>
  <Sidebar />
  <main class="transition-all duration-200 ease-in-out w-full max-h-full h-full fixed" :class="`${sideBarStateStore.isExpanded ? 'ml-96' : 'ml-32'}`">
    <Navbar />
    <RouterView class="w-full h-full pt-4"/>
  </main>
</template>

<style></style>
