<script setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

import FormParts from '@/util/student_form_parts'

const emit = defineEmits(['dataChanged'])

const formData = ref({
  fatherData: {
    LastNameF: null,
    FirstNameF: null,
    MiddleNameF: null,
    SuffixNameF: null,
    OccupationF: null
  },
  motherData: {
    LastNameM: null,
    FirstNameM: null,
    MiddleNameM: null,
    SuffixNameM: null,
    OccupationM: null
  }
})

const headers = ["Father's Information", "Mother's Information"]
const fields = ['Last name', 'First Name', 'Middle Name', 'Suffix', 'Occupation']

const parentKeys = Object.keys(formData.value)
const dataKeys = [Object.keys(formData.value.fatherData), Object.keys(formData.value.motherData)]

function handleUpdate() {
  const data = { ...formData.value.fatherData, ...formData.value.motherData }
  emit('dataChanged', FormParts.Parental, data)
}
</script>

<template>
  <div class="grid grid-cols-2">
    <div v-for="(header, idx) of headers" :key="header" class="px-8">
      <div>
        <h2 class="font-bold text-center">{{ header }}</h2>

        <div class="grid grid-cols-5 gap-3 mt-4">
          <template v-for="n of Array(fields.length).keys()" :key="n">
            <div class="flex items-center justify-end pr-6 col-span-2">
              <span>{{ fields[n] }}</span>
            </div>
            <InputText
              class="h-10 col-span-3"
              type="text"
              v-model="formData[parentKeys[idx]][dataKeys[idx][n]]"
              @update:model-value="handleUpdate"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
