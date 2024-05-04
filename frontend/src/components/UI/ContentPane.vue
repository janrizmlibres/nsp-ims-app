<script setup>
import TopHeader from './TopHeader.vue'

defineProps(['header', 'subheader'])
</script>

<template>
  <main class="flex flex-col u-sidemain-max-height flex-grow overflow-x-hidden w-[88.5%] m-4">
    <TopHeader :header="header" :subheader="subheader" />
    <div class="flex flex-col flex-grow overflow-auto px-4">
      <slot></slot>
    </div>
  </main>
</template>
