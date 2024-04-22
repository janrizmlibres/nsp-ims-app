<script setup>
import Button from 'primevue/button'

import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import AddForm from '@/components/staff_view/AddForm.vue'
</script>

<template>
  <ContentPane header="Staff Management / Add Record">
    <div class="flex flex-col gap-4 h-full mr-1">
      <BaseCard class="grow">
        <AddForm />
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
