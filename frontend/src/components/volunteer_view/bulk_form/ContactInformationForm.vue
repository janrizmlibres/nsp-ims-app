<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { inject, ref } from 'vue'

import FormParts from '@/util/volunteer_form_parts'
import { objectMap } from '@/util/helpers'

const { formData, updateFormData } = inject('formData')

const contactInformation = formData. contactInformation
const emergency = formData.emergency

const leftFields = ref({
  contactNumber: { label: 'Contact Number', data: contactInformation.contactNumber },
  email: { label: 'Email Address', data: contactInformation.email },
  facebook: { label: 'Facebook', data: contactInformation.facebook }
})

const rightFields = ref({
  lastName: { label: 'Last Name', data: emergency.lastName },
  firstName: { label: 'First Name', data: emergency.firstName },
  middleName: { label: 'Middle Name', data: emergency.middleName },
  suffixName: { label: 'Suffix', data: emergency.suffixName },
  contactNumber: { label: 'Contact Number', data: emergency.contactNumber }
})

const relationship = ref(emergency.relationship)

const suffixes = ref(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV'])

function updateContactInfo() {
  const data = objectMap(leftFields.value, (field) => field.data)
  updateFormData(FormParts.VolunteerContactInformation, data)
}

function updateEmergencyContact() {
  const data = objectMap(rightFields.value, (field) => field.data)
  data.relationship = relationship.value
  updateFormData(FormParts.VolunteerEmergency, data)
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
              class="col-span-3"
              type="text"
              v-model="field.data"
              @update:modelValue="updateContactInfo"
              :pt="{ root: ({ context }) => ({ class: [{ '!opacity-100': context.disabled }] }) }"
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
              class="col-span-3"
              type="text"
              v-model="field.data"
              @update:modelValue="updateEmergencyContact"
              :pt="{ root: ({ context }) => ({ class: [{ '!opacity-100': context.disabled }] }) }"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
            />
            <Dropdown
              v-else
              class="col-span-3"
              v-model="field.data"
              :options="suffixes"
              @update:modelValue="updateEmergencyContact"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
            />
          </template>

          <div class="flex items-center justify-end pr-6 col-span-2">
            <span>Relationship</span>
          </div>
          <InputText
            class="col-span-3"
            type="text"
            v-model="relationship"
            @update:modelValue="updateEmergencyContact"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
        </div>
      </div>
    </div>
  </div>
</template>
