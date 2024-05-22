<script setup>
import TheSidebar from '@/components/TheSidebar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <TheSidebar />
  <RouterView v-slot="{ Component }">
    <keep-alive exclude="dashboard">
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>
