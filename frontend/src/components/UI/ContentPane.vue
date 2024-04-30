<script setup>
import TheSidebar from '../layout/TheSidebar.vue'
import TopHeader from './TopHeader.vue'

const props = defineProps(['header'])
</script>

<template>
  <TheSidebar name="User" role="Admin" />
  <main
    class="flex flex-col u-sidemain-max-height flex-grow overflow-x-hidden w-[88.5%] m-4"
  >
    <TopHeader :header="props.header" />
    <div class="flex flex-col flex-grow overflow-auto px-4">
      <slot></slot>
    </div>
   
  </main>
</template>
