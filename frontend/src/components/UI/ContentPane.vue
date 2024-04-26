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
    class="flex flex-col u-sidemain-max-height flex-1 m-4"
    :class="
      sideBarStateStore.isExpanded
        ? 'u-router-view-max-w-expanded'
        : 'u-router-view-max-w-collapsed'
    "
  >
    <TopHeader :header="props.header" />
    <div class="flex flex-col u-router-view-max-h h-full w-full overflow-auto px-4">
      <slot></slot>
    </div>
   
  </main>
</template>

<style scoped>
.u-router-view-max-h {
  max-height: calc(100vh - 11rem);
}

.u-router-view-max-w-expanded {
  max-width: calc(100vw - 19rem)
}

.u-router-view-max-w-collapsed {
  max-width: calc(100vw - 7.5rem)
}
</style>
