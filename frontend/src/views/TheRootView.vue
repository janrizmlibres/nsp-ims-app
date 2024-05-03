<script setup>
import TheSidebar from '@/components/layout/TheSidebar.vue'
import { useTermStore } from '@/stores/term';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'

 const termStore = useTermStore()

onMounted(async () => {
  await termStore.getActiveTerm()
})
</script>

<template>
  <TheSidebar />
  <RouterView />
</template>
