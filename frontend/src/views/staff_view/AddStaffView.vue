<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import Button from 'primevue/button'
</script>

<template>
  <ContentPane header="Staff Records">
    <div class="flex flex-col gap-2 h-full">
      <BaseCard class="grow">
        <h1>Hello sa!</h1>
      </BaseCard>

      <div class="flex-none text-right">
        <div class="inline-block">
          <Button label="Submit" icon="fa-solid fa-circle-check" />
          <Button class="ml-2" label="Cancel" icon="fa-solid fa-circle-xmark" />
        </div>
      </div>
    </div>
  </ContentPane>
</template>
