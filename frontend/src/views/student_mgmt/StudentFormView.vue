<script setup>
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'

import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import { ref } from 'vue'

const selectedSuffix = ref()
const selectedCat = ref()

const suffixes = ref(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV'])
const categories = ref([
  'Out-of-School Youth',
  'Teenage Pregnancy',
  'Orphan',
  'Drug-Related',
  'Disabled'
])
</script>

<template>
  <ContentPane :header="`Students / Add Record`">
    <div class="flex flex-col gap-3 h-full mr-1">
      <BaseCard isNotPadded="true" class="p-2">
        <div class="flex gap-2 items-center">
          <Avatar label="P" size="xlarge" />
          <div class="grid grid-cols-7 w-full gap-2">
            <InputText
              class="h-10 col-span-2"
              type="text"
              v-model="value"
              placeholder="Last Name"
            />
            <InputText
              class="h-10 col-span-2"
              type="text"
              v-model="value"
              placeholder="First Name"
            />
            <InputText
              class="h-10 col-span-2"
              type="text"
              v-model="value"
              placeholder="Middle Name"
            />
            <Dropdown v-model="selectedSuffix" :options="suffixes" placeholder="Suffix" />
            <InputText class="h-10 col-span-2" type="text" v-model="value" placeholder="LRN" />
            <Dropdown
              class="col-span-2"
              v-model="selectedCat"
              :options="categories"
              placeholder="Category"
            />
          </div>
        </div>
      </BaseCard>
      <BaseCard class="grow"> </BaseCard>

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
