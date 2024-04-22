<script setup>
import Card from 'primevue/card'
import TopHeader from './TopHeader.vue'
</script>

<template>
  <div class="flex flex-col h-full">
    <TopHeader header="Staff Management / Add Record" />
    <Card :pt="{ content: '' }" class="flex-1 rounded-[5px]"> </Card>
  </div>
</template>
