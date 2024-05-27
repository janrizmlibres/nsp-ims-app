<script setup>
import TopHeader from './TopHeader.vue'

defineProps(['breadcrumb'])
</script>

<template>
  <div class="flex flex-col flex-grow h-full w-full">
    <TopHeader :breadcrumb="breadcrumb" />
    <div class="flex flex-col h-full overflow-hidden p-2">
      <slot></slot>
    </div>
  </div>
</template>
