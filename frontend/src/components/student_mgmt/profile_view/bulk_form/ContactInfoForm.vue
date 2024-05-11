<script setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

import FormParts from '@/views/student_mgmt/forms_parts'
import { objectMap } from '@/util/helpers'

const emit = defineEmits(['dataChanged'])

const leftFields = ref({
  contactNum: { label: 'Contact Number', data: '' },
  email: { label: 'Email Address', data: '' },
  facebook: { label: 'Facebook', data: '' }
})

const rightFields = ref({
  lastName: { label: 'Last Name', data: '' },
  firstName: { label: 'First Name', data: '' },
  middleName: { label: 'Middle Name', data: '' },
  suffixName: { label: 'Suffix', data: '' },
  contactNum: { label: 'Contact Number', data: '' }
})

const selectedRelationship = ref()

function updateContactInfo() {
  const data = objectMap(leftFields, (field) => field.data)
  emit('dataChanged', FormParts.Contact, data)
}

function updateEmergencyContact() {
  const data = objectMap(rightFields, (field) => field.data)
  data.relationship = selectedRelationship
  emit('dataChanged', FormParts.Emergency, data)
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
            />
          </template>
        </div>
      </div>
    </div>

    <div class="px-8">
      <div>
        <h2 class="font-bold text-center">Emergency Contact Person</h2>

        <div class="grid grid-cols-5 gap-3 mt-4">
          <template v-for="field of Object.values(rightFields)" :key="field.label">
            <div class="flex items-center justify-end pr-6 col-span-2">
              <span>{{ field.label }}</span>
            </div>
            <InputText
              class="h-10 col-span-3"
              type="text"
              v-model="field.data"
              @update:modelValue="updateEmergencyContact"
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
          />
        </div>
      </div>
    </div>
  </div>
</template>
