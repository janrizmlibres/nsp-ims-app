<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { inject, ref } from 'vue'

import { FormParts } from '@/util/student_utils'
import { objectMap } from '@/util/helpers'

import ValidateField from '../../ValidateField.vue'

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
          <template v-for="(field, key) in leftFields" :key="field.label">
            <div v-if="key !== 'contactNum'" class="flex items-center justify-end pr-6 col-span-2">
              <span>{{ field.label }}</span>
            </div>
            <div v-else class="flex gap-1 items-center justify-end pr-6 col-span-2">
              <div>{{ field.label }}</div>
              <div class="text-red-500 text-xl">*</div>
            </div>

            <ValidateField v-if="key === 'contactNum'" v-slot="slotProps">
              <InputText
                class="col-span-3"
                type="text"
                v-model="field.data"
                @update:modelValue="
                  () => {
                    updateContactInfo()
                    slotProps.inputEntered(field.data)
                  }
                "
                :pt="{
                  root: ({ context }) => {
                    return { class: [{ '!opacity-100': context.disabled }] }
                  }
                }"
                :ptOptions="{ mergeProps: true }"
                :disabled="$route.meta.isViewMode"
                :invalid="slotProps.isInvalid"
              />
            </ValidateField>

            <InputText
              v-else
              class="col-span-3"
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
            <div
              v-if="['middleName', 'suffixName'].includes(key)"
              class="flex items-center justify-end pr-6 col-span-2"
            >
              <span>{{ field.label }}</span>
            </div>

            <div v-else class="flex gap-1 items-center justify-end pr-6 col-span-2">
              <div>{{ field.label }}</div>
              <div class="text-red-500 text-xl">*</div>
            </div>

            <template v-if="key !== 'suffixName'">
              <ValidateField v-if="key !== 'middleName'" v-slot="slotProps">
                <InputText
                  class="col-span-3"
                  type="text"
                  v-model="field.data"
                  @update:modelValue="
                    () => {
                      updateEmergencyContact()
                      slotProps.inputEntered(field.data)
                    }
                  "
                  :pt="{
                    root: ({ context }) => {
                      return { class: [{ '!opacity-100': context.disabled }] }
                    }
                  }"
                  :ptOptions="{ mergeProps: true }"
                  :disabled="$route.meta.isViewMode"
                  :invalid="slotProps.isInvalid"
                />
              </ValidateField>

              <InputText
                v-else
                class="col-span-3"
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
            </template>

            <Dropdown
              v-else
              class="col-span-3"
              v-model="field.data"
              showClear
              :options="suffixes"
              @update:modelValue="updateEmergencyContact"
              :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
            />
          </template>

          <div class="flex gap-1 items-center justify-end pr-6 col-span-2">
            <div>Relationship</div>
            <div class="text-red-500 text-xl">*</div>
          </div>

          <ValidateField v-slot="slotProps">
            <InputText
              class="col-span-3"
              type="text"
              v-model="selectedRelationship"
              @update:modelValue="
                () => {
                  updateEmergencyContact()
                  slotProps.inputEntered(selectedRelationship)
                }
              "
              :pt="{
                root: ({ context }) => {
                  return { class: [{ '!opacity-100': context.disabled }] }
                }
              }"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
              :invalid="slotProps.isInvalid"
            />
          </ValidateField>
        </div>
      </div>
    </div>
  </div>
</template>
