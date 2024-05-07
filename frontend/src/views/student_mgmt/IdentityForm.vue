<script setup>
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'

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
  <BaseCard isNotPadded="true" class="p-2">
    <div class="flex gap-2 items-center">
      <Avatar label="P" size="xlarge" />
      <div class="grid grid-cols-7 w-full gap-2">
        <InputText class="h-9 col-span-2" type="text" v-model="value" placeholder="Last Name" />
        <InputText class="h-9 col-span-2" type="text" v-model="value" placeholder="First Name" />
        <InputText class="h-9 col-span-2" type="text" v-model="value" placeholder="Middle Name" />
        <Dropdown class="h-9" v-model="selectedSuffix" :options="suffixes" placeholder="Suffix" />
        <InputText class="h-9 col-span-2" type="text" v-model="value" placeholder="LRN" />
        <Dropdown
          class="h-9 col-span-2"
          v-model="selectedCat"
          :options="categories"
          placeholder="Category"
        />
      </div>
    </div>
  </BaseCard>
</template>
