<script setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

import FormParts from '@/views/student_mgmt/forms_parts'

const emit = defineEmits(['dataChanged'])

const parentData = ref([
  {
    header: "Father's Information",
    data: { LastNameF: '', MiddleNameF: '', FirstNameF: '', SuffixNameF: '', OccupationF: '' }
  },
  {
    header: "Mother's Information",
    data: { LastNameM: '', MiddleNameM: '', FirstNameM: '', SuffixNameM: '', OccupationM: '' }
  }
])

const fields = ['Last name', 'First Name', 'Middle Name', 'Suffix', 'Occupation']

function handleUpdate() {
  const data = {}

  for (const parent of parentData.value) {
    Object.assign(data, parent.data)
  }

  emit('dataChanged', FormParts.Parental, data)
}
</script>

<template>
  <div class="grid grid-cols-2">
    <div v-for="parent of parentData" :key="parent.header" class="px-8">
      <div>
        <h2 class="font-bold text-center">{{ parent.header }}</h2>

        <div class="grid grid-cols-5 gap-3 mt-4">
          <template v-for="n in fields.length" :key="field[n]">
            <div class="flex items-center justify-end pr-6 col-span-2">
              <span>{{ fields[n] }}</span>
            </div>
            <InputText
              class="h-10 col-span-3"
              type="text"
              v-model="parent.data[n]"
              @update:model-value="handleUpdate"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
