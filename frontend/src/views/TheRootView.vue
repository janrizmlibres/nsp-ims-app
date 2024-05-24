<script setup>
import TheSidebar from '@/components/TheSidebar.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const updateKey = ref(0)
</script>

<template>
  <TheSidebar />
  <RouterView v-slot="{ Component }">
    <keep-alive :exclude="['dashboard', 'edit-user', 'user-records', 'user-permissions']">
      <component @routeChange="updateKey += 1" :key="updateKey" :is="Component" />
    </keep-alive>
  </RouterView>
</template>
