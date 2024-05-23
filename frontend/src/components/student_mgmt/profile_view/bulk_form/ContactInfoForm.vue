<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { inject, ref } from 'vue'

import { FormParts } from '@/util/student_utils'
import { objectMap } from '@/util/helpers'

const { formData, updateFormData } = inject('formData')

const contactInfo = formData.contactInfo
const emergencyInfo = formData.emergencyPerson

const leftFields = ref({
  email: { label: 'Email Address', data: contactInfo.email },
  contactNum: { label: 'Contact Number', data: contactInfo.contactNum },
  facebook: { label: 'Facebook', data: contactInfo.facebook }
})

const rightFields = ref({
  lastName: { label: 'Last Name', data: emergencyInfo.lastName },
  firstName: { label: 'First Name', data: emergencyInfo.firstName },
  middleName: { label: 'Middle Name', data: emergencyInfo.middleName },
  suffixName: { label: 'Suffix', data: emergencyInfo.suffixName },
  contactNum: { label: 'Contact Number', data: emergencyInfo.contactNum }
})

const selectedRelationship = ref(emergencyInfo.relationship)

const suffixes = ref(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV'])

function updateContactInfo() {
  const data = objectMap(leftFields.value, (field) => field.data)
  updateFormData(FormParts.Contact, data)
}

function updateEmergencyContact() {
  const data = objectMap(rightFields.value, (field) => field.data)
  data.relationship = selectedRelationship.value
  updateFormData(FormParts.Emergency, data)
}
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="px-8">
      <div>
        <h2 class="font-bold text-center">Personal Contact Information</h2>

        <div class="grid grid-cols-5 gap-3 mt-4">
          <template v-for="field of Object.values(leftFields)" :key="field.label">
            <div class="flex items-center justify-end pr-6 col-span-2">
              <span>{{ field.label }}</span>
            </div>
            <InputText
              class="h-10 col-span-3"
              type="text"
              v-model="field.data"
              @update:modelValue="updateContactInfo"
              :pt="{
                root: ({ context }) => {
                  return { class: [{ '!opacity-100': context.disabled }] }
                }
              }"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
            />
          </template>
        </div>
      </div>
    </div>

    <div class="px-8">
      <div>
        <h2 class="font-bold text-center">Emergency Contact Person</h2>

        <div class="grid grid-cols-5 gap-3 mt-4">
          <template v-for="(field, key) in rightFields" :key="field.label">
            <div class="flex items-center justify-end pr-6 col-span-2">
              <span>{{ field.label }}</span>
            </div>
            <InputText
              v-if="key !== 'suffixName'"
              class="h-10 col-span-3"
              type="text"
              v-model="field.data"
              @update:modelValue="updateEmergencyContact"
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
              class="h-10 col-span-3"
              v-model="field.data"
              showClear
              :options="suffixes"
              @update:modelValue="updateEmergencyContact"
              :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
            />
          </template>

          <div class="flex items-center justify-end pr-6 col-span-2">
            <span>Relationship</span>
          </div>
          <InputText
            class="h-10 col-span-3"
            type="text"
            v-model="selectedRelationship"
            @update:modelValue="updateEmergencyContact"
            :pt="{
              root: ({ context }) => {
                return { class: [{ '!opacity-100': context.disabled }] }
              }
            }"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
        </div>
      </div>
    </div>
  </div>
</template>
