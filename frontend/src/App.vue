<script setup>
import { RouterView } from 'vue-router'
import { useSideBarStateStore } from '@/stores/sidebar_state';

import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'

const sideBarStateStore = useSideBarStateStore()
</script>

<template>
  <RouterView class="h-full pt-4"/>
</template>

<style></style>
