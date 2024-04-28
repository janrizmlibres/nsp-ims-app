<script setup>
import Card from 'primevue/card'

defineProps(['isNotPadded'])
</script>

<template>
  <Card
    :pt="{ content: 'h-full', body: isNotPadded ? 'h-full' : 'p-5 h-full' }"
    class="rounded-[0.3125rem] inline-block"
  >
    <template #content>
      <slot></slot>
    </template>
  </Card>
</template>
