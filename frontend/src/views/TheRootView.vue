<script setup>
import TheSidebar from '@/components/TheSidebar.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const updateKey = ref(0)
</script>

<template>
  <TheSidebar />
  <RouterView v-slot="{ Component }" @routeChange="updateKey += 1" :key="updateKey" >
    <keep-alive :include="['class-management']">
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>
