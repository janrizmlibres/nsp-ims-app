<script setup>
import TheSidebar from '../layout/TheSidebar.vue'
import TopHeader from './TopHeader.vue'
import { useSideBarStateStore } from '@/stores/sidebar_state'

const props = defineProps(['header'])
const sideBarStateStore = useSideBarStateStore()
</script>

<template>
  <TheSidebar name="User" role="Admin" />
  <main
    class="u-sidemain-max-height h-screen w-screen m-4"
    :class="
      sideBarStateStore.isExpanded
        ? 'u-router-view-max-d-expanded'
        : 'u-router-view-max-d-collapsed'
    "
  >
    <TopHeader :header="props.header" />
    <slot></slot>
  </main>
</template>
