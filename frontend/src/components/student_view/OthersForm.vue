<script setup>
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'

import { ref } from 'vue'

const boxData = ref([
  { label: 'Has Gadget', data: false },
  { label: 'Bridger', data: false },
  { label: 'Can Be Called', data: false },
  { label: 'Eligible for Night Classes', data: false }
])
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="px-8">
      <div class="grid grid-cols-2 gap-8">
        <template v-for="box of boxData" :key="box.label">
          <div class="flex items-center justify-end">
            <span>{{ box.label }}</span>
          </div>
          <div class="flex items-center">
            <Checkbox v-model="box.data" :binary="true" />
          </div>
        </template>
      </div>
    </div>

    <div class="px-8">
      <div class="grid grid-cols-5 gap-3">
        <div class="flex items-center justify-end text-right pr-6 col-span-2">
          <span>FLT Pretest</span>
        </div>
        <InputText class="h-10 col-span-3" type="text" v-model="value" />

        <div class="flex items-center justify-end text-right pr-6 col-span-2">
          <span>Signature Specimen Photo Link</span>
        </div>
        <InputText class="h-10 col-span-3" type="text" v-model="value" />
      </div>
    </div>
  </div>
</template>
