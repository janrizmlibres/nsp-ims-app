<script setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import FormParts from '@/util/volunteer_form_parts'
import { objectMap } from '@/util/helpers'

const emit = defineEmits(['dataChanged'])

const leftFields = ref({
  contactNumber: { label: 'Contact Number', data: null },
  email: { label: 'Email Address', data: null },
  facebook: { label: 'Facebook', data: null }
})

const rightFields = ref({
  lastName: { label: 'Last Name', data: null },
  firstName: { label: 'First Name', data: null },
  middleName: { label: 'Middle Name', data: null },
  suffixName: { label: 'Suffix', data: null },
  contactNumber: { label: 'Contact Number', data: null }
})

const relationship = ref(null)

function updateContactInfo() {
  const data = objectMap(leftFields.value, (field) => field.data)
  emit('dataChanged', FormParts.VolunteerContactInformation, data)
}

function updateEmergencyContact() {
  const data = objectMap(rightFields.value, (field) => field.data)
  data.relationship = relationship.value
  emit('dataChanged', FormParts.VolunteerEmergency, data)
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
            v-model="relationship"
            @update:modelValue="updateEmergencyContact"
          />
        </div>
      </div>
    </div>
  </div>
</template>
