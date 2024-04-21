<script setup>
import TheSidebar from '../layout/TheSidebar.vue'
</script>

<template>
  <TheSidebar />
  <main class="w-full ml-4 py-4 pr-4">
    <slot></slot>
  </main>
</template>
