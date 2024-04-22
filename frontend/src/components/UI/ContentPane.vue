<script setup>
import TheSidebar from '../layout/TheSidebar.vue'
import TopHeader from './TopHeader.vue';
</script>

<template>
  <TheSidebar name="User" role="Admin" />
  <main class="w-full ml-4 py-4 pr-4">
    <TopHeader class="grow mb-12" header="Page Name" />
    <slot></slot>
  </main>
</template>
