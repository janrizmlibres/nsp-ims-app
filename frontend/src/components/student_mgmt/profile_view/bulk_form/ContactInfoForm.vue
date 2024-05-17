<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { inject, onMounted, ref } from 'vue'

import FormParts from '@/util/student_form_parts'
import { objectMap } from '@/util/helpers'

const emit = defineEmits(['dataChanged'])

const contactData = inject('contactData')
const emergencyData = inject('emergencyData')
const isViewMode = inject('isViewMode')

const leftFields = ref({
  email: { label: 'Email Address', data: contactData.value.email },
  contactNum: { label: 'Contact Number', data: contactData.value.contactNum },
  facebook: { label: 'Facebook', data: contactData.value.facebook }
})

const rightFields = ref({
  lastName: { label: 'Last Name', data: emergencyData.value.lastName },
  firstName: { label: 'First Name', data: emergencyData.value.firstName },
  middleName: { label: 'Middle Name', data: emergencyData.value.middleName },
  suffixName: { label: 'Suffix', data: emergencyData.value.suffixName },
  contactNum: { label: 'Contact Number', data: emergencyData.value.contactNum }
})

const selectedRelationship = ref(emergencyData.value.relationship)

const suffixes = ref(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV'])

function updateContactInfo() {
  const data = objectMap(leftFields.value, (field) => field.data)
  emit('dataChanged', FormParts.Contact, data)
}

function updateEmergencyContact() {
  const data = objectMap(rightFields.value, (field) => field.data)
  data.relationship = selectedRelationship.value
  emit('dataChanged', FormParts.Emergency, data)
}

onMounted(() => console.log(emergencyData.value))
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
              :disabled="isViewMode"
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
              :disabled="isViewMode"
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
              :disabled="isViewMode"
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
            :disabled="isViewMode"
          />
        </div>
      </div>
    </div>
  </div>
</template>
