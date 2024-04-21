<script setup>
import { RouterView } from 'vue-router'
import { useSideBarStateStore } from '@/stores/sidebar_state'

import TheSidebar from './components/TheSidebar.vue'
// import Topbar from './components/Topbar.vue'

const sideBarStateStore = useSideBarStateStore()
</script>

<template>
  <TheSidebar />
  <!-- class="ml-80 p-4 h-screen u-txt-active" -->
  <main
    class="transition-all duration-200 ease-in-out w-full max-h-full h-full fixed"
    :class="sideBarStateStore.isExpanded ? 'ml-96' : 'ml-32'"
  >
    <!-- <Topbar /> -->
    <RouterView class="w-full h-full pt-4" />
  </main>
</template>

<style></style>
