<script setup>
import TheSidebar from '../layout/TheSidebar.vue'
import TopHeader from './TopHeader.vue'

defineProps(['header'])
</script>

<template>
  <TheSidebar name="User" role="Admin" />
  <main class="u-main-max-width w-screen u-sidemain-max-height h-screen m-4">
    <TopHeader header="Page Name" />
    <div class="u-max-height h-screen">
      <slot></slot>
    </div>
  </main>
</template>

<style scoped>
.u-main-max-width {
  max-width: calc(100vw - 6rem)
}

.u-max-height {
  max-height: calc(100vh - 11rem)
}
</style>
