<script setup>
import TheSidebar from '../layout/TheSidebar.vue'
import TopHeader from './TopHeader.vue';
</script>

<template>
  <TheSidebar name="User" role="Admin" />
  <main class="u-max-width w-screen u-sidemain-max-height h-screen m-4 flex flex-col">
    <TopHeader class="grow mb-12" header="Page Name" />
    <slot></slot>
  </main>
</template>

<style scoped>
.u-max-width {
  max-width: calc(100vw - 6rem)
}
</style>
