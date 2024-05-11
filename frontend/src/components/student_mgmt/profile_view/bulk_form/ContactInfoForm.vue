<script setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import FormParts from '@/views/student_mgmt/forms_parts'

const emit = defineEmits(['dataChanged'])

const leftFields = ref([
  { label: 'Contact Number', data: '' },
  { label: 'Email Address', data: '' },
  { label: 'Facebook', data: '' }
])

const rightFields = ref([
  { label: 'Last Name', data: '' },
  { label: 'First Name', data: '' },
  { label: 'Middle Name', data: '' },
  { label: 'Suffix', data: '' },
  { label: 'Contact Number', data: '' }
])

const selectedRelationship = ref()

function updateContactInfo() {
  const data = {
    contactNum: leftFields.value[0].data,
    email: leftFields.value[1].data,
    facebook: leftFields.value[2].data
  }

  emit('dataChanged', FormParts.Contact, data)
}

function updateEmergencyContact() {
  const data = {
    lastName: rightFields.value[0].data,
    firstName: rightFields.value[1].data,
    middleName: rightFields.value[2].data,
    suffixName: rightFields.value[3].data,
    contactNum: rightFields.value[4].data,
    relationship: selectedRelationship
  }

  emit('dataChanged', FormParts.Emergency, data)
}
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="px-8">
      <div>
        <h2 class="font-bold text-center">Personal Contact Information</h2>

        <div class="grid grid-cols-5 gap-3 mt-4">
          <template v-for="field of leftFields" :key="field.label">
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
          <template v-for="field of rightFields" :key="field.label">
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
