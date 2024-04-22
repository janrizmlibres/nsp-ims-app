<script setup>
import Card from 'primevue/card'
</script>

<template>
  <Card :pt="{ content: 'h-full', body: 'p-5 h-full' }" class="rounded-[0.3125rem]">
    <template #content>
      <slot></slot>
    </template>
  </Card>
</template>
