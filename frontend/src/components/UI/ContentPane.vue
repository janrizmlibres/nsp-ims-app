<script setup>
import TheSidebar from '../layout/TheSidebar.vue'
import TopHeader from './TopHeader.vue'

defineProps(['header'])
</script>

<template>
  <TheSidebar name="User" role="Admin" />
  <main class="w-full ml-4 py-4 pr-4 items-stretch flex flex-col">
    <TopHeader :header="header" />
    <slot></slot>
  </main>
</template>
