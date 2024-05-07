<script setup>
import Button from 'primevue/button'

import ContentPane from '@/components/UI/ContentPane.vue'
import IdentityForm from './IdentityForm.vue'
import BulkForm from './BulkForm.vue'
</script>

<template>
  <ContentPane :header="`Students / Add Record`" subheader="Academic Year 2022 - 2023">
    <div class="flex flex-col gap-3 h-full mr-1">
      <IdentityForm />
      <BulkForm />

      <div class="flex-none text-right">
        <div class="inline-block">
          <Button class="h-10 u-bg-green">
            <!-- <ProgressSpinner
              style="width: 50px; height: 50px"
              strokeWidth="8"
              class="fill-surface-0 dark:fill-surface-800"
              animationDuration=".5s"
              aria-label="Custom ProgressSpinner"
            /> -->

            <div>
              <font-awesome-icon
                icon="fa-solid fa-circle-check"
                class="absolute top-2/4 -mt-2 left-3"
              />
              <h2 class="pl-5 font-bold">Proceed</h2>
            </div>
          </Button>
          <Button class="h-10 ml-2 u-bg-red" label="Cancel" icon="fa-solid fa-circle-xmark" />
        </div>
      </div>
    </div>
  </ContentPane>
</template>
