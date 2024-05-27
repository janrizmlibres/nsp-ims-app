<script setup>
import TheSidebar from '@/components/TheSidebar.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const updateKey = ref(0)
</script>

<template>
  <TheSidebar />
  <main class="flex flex-col flex-grow u-main-bg rounded-3xl shadow-inner overflow-hidden w-[88.5%] m-4 p-2">
    <RouterView @routeChange="updateKey += 1" v-slot="{ Component }">
      <Transition name="fade" mode="out-in" appear>
        <component :is="Component" :key="updateKey"></component>
      </Transition>
    </RouterView>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
