<script setup>
import TheSidebar from '@/components/TheSidebar.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const updateKey = ref(0)

const dynamicComponent = (route) => {
  if (route.query.id && route.query.strand) {
    if (route.query.module) return route.matched[2].components[2]
    else if(route.query.session) return route.matched[2].components[3]
    else return route.matched[2].components[1]
  } else if(route.query.id) {
    return route.matched[2].components[0]
  }
}
</script>

<template>
  <TheSidebar />
  <main class="flex flex-col flex-grow u-main-bg rounded-3xl shadow-inner overflow-hidden w-[88.5%] m-4 p-2">
    <RouterView @routeChange="updateKey += 1" v-slot="{ route, Component }">
      <Transition name="fade" mode="out-in" appear>
        <component :is="route.name === 'class' ? dynamicComponent(route) : Component" :key="updateKey"></component>
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
