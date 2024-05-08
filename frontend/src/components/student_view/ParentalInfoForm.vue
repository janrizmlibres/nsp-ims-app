<script setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const headers = ["Father's Information", "Mother's Information"]

const formData = ref([
  { label: 'Last name', fData: '', mData: '' },
  { label: 'First Name', fData: '', mData: '' },
  { label: 'Middle Name', fData: '', mData: '' },
  { label: 'Suffix', fData: '', mData: '' },
  { label: 'Occupation', fData: '', mData: '' }
])
</script>

<template>
  <div class="grid grid-cols-2">
    <div v-for="header of headers" :key="header" class="px-8">
      <div>
        <h2 class="font-bold text-center">{{ header }}</h2>

        <div class="grid grid-cols-5 gap-3 mt-4">
          <template v-for="field of formData" :key="field.label">
            <div class="flex items-center justify-end pr-6 col-span-2">
              <span>{{ field.label }}</span>
            </div>
            <InputText class="h-10 col-span-3" type="text" v-model="field.fData" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
