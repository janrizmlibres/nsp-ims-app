<script setup>
import TheSidebar from '@/components/TheSidebar.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const updateKey = ref(0)
</script>

<template>
  <TheSidebar />
  <RouterView @routeChange="updateKey += 1" :key="updateKey" v-slot="{ Component }">
    <keep-alive :exclude="['dashboard', 'edit-user', 'user-records']">
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>
