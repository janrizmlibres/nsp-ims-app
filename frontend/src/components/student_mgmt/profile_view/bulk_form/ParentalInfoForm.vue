<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { inject, ref } from 'vue'

import { FormParts } from '@/util/student_utils'

const { formData, updateFormData } = inject('formData')

const parentalInfo = formData.parentalInfo

const parentalData = ref({
  fatherData: {
    lastNameF: parentalInfo && parentalInfo.lastNameF,
    firstNameF: parentalInfo && parentalInfo.firstNameF,
    middleNameF: parentalInfo && parentalInfo.middleNameF,
    suffixNameF: parentalInfo && parentalInfo.suffixNameF,
    occupationF: parentalInfo && parentalInfo.occupationF
  },
  motherData: {
    lastNameM: parentalInfo && parentalInfo.lastNameM,
    firstNameM: parentalInfo && parentalInfo.lastNameM,
    middleNameM: parentalInfo && parentalInfo.middleNameM,
    suffixNameM: parentalInfo && parentalInfo.suffixNameM,
    occupationM: parentalInfo && parentalInfo.occupationM
  }
})

const headers = ["Father's Information", "Mother's Information"]
const fields = ['Last name', 'First Name', 'Middle Name', 'Suffix', 'Occupation']
const suffixes = ref(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV'])

const parentKeys = Object.keys(parentalData.value)
const dataKeys = [
  Object.keys(parentalData.value.fatherData),
  Object.keys(parentalData.value.motherData)
]

function handleUpdate() {
  const data = { ...parentalData.value.fatherData, ...parentalData.value.motherData }
  updateFormData(FormParts.Parental, data)
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
              v-if="!['suffixNameF', 'suffixNameM'].includes(dataKeys[idx][n])"
              class="col-span-3"
              type="text"
              v-model="parentalData[parentKeys[idx]][dataKeys[idx][n]]"
              @update:model-value="handleUpdate"
              :pt="{
                root: ({ context }) => {
                  return { class: [{ '!opacity-100': context.disabled }] }
                }
              }"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
            />
            <Dropdown
              v-else
              class="col-span-3"
              v-model="parentalData[parentKeys[idx]][dataKeys[idx][n]]"
              showClear
              :options="suffixes"
              @update:modelValue="handleUpdate"
              :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
