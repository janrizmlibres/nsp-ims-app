<script setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import FormParts from '@/views/student_mgmt/forms_parts'

const emit = defineEmits(['dataChanged'])

const parentData = ref([
  { header: "Father's Information", data: ['', '', '', '', ''] },
  { header: "Mother's Information", data: ['', '', '', '', ''] }
])

const field = ['Last name', 'First Name', 'Middle Name', 'Suffix', 'Occupation']

function handleUpdate() {
  const data = {
    fatherLastName: parentData.value[0].data[0],
    fatherMiddleName: parentData.value[0].data[1],
    fatherFirstName: parentData.value[0].data[2],
    fatherSuffixName: parentData.value[0].data[3],
    fatherOccupation: parentData.value[0].data[4],
    motherLastName: parentData.value[1].data[0],
    motherMiddleName: parentData.value[1].data[1],
    motherFirstName: parentData.value[1].data[2],
    motherSuffixName: parentData.value[1].data[3],
    motherOccupation: parentData.value[1].data[4]
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
          <template v-for="n in field.length" :key="field[n]">
            <div class="flex items-center justify-end pr-6 col-span-2">
              <span>{{ field[n] }}</span>
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
