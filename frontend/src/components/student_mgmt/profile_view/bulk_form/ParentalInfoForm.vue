<script setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const parents = [
  { header: "Father's Information", data: ['', '', '', '', ''] },
  { header: "Mother's Information", data: ['', '', '', '', ''] }
]

const formData = ref(['Last name', 'First Name', 'Middle Name', 'Suffix', 'Occupation'])
</script>

<template>
  <div class="grid grid-cols-2">
    <div v-for="parent of parents" :key="parent.header" class="px-8">
      <div>
        <h2 class="font-bold text-center">{{ parent.header }}</h2>

        <div class="grid grid-cols-5 gap-3 mt-4">
          <template v-for="n in formData.length" :key="formData[n]">
            <div class="flex items-center justify-end pr-6 col-span-2">
              <span>{{ formData[n] }}</span>
            </div>
            <InputText class="h-10 col-span-3" type="text" v-model="parent.data[n]" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
