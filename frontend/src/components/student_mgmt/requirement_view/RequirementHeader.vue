<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ globalFilter: Object, dt: Object })

const router = useRouter()

const filter = ref(props.globalFilter)

async function goToAddRequirement() {
  await router.push({ name: 'student-requirement-configuration' })
}

function exportCSV() {
  props.dt.exportCSV()
}

function enterEditMode(){
  console.log('enterEditMode')
  this.$emit('enterEditMode')
}
</script>

<template>
  <div class="mb-2 text-right mt-10">
    <div class="inline-block ml-auto mr-0">
      <span class="relative">
        <font-awesome-icon
          icon="fa-solid fa-magnifying-glass"
          class="absolute top-2/4 -mt-2 left-3"
        />
        <InputText
          v-model="filter"
          placeholder="Search Students"
          size="small"
          class="pl-10"
          @update:modelValue="$emit('filterChanged', filter)"
        />
      </span>
      <Button
        icon="fa-solid fa-pencil"
        aria-label="Edit"
        label=" Edit"
        class="ml-2 h-10"
        @click="enterEditMode"
      />
      <Button
        icon="fa-solid fa-plus"
        aria-label="Add Requirement"
        label=" Add Requirement"
        class="ml-2 h-10"
        @click="goToAddRequirement"
      />
      <Button
        label="Export Data"
        icon="fa-solid fa-file-export"
        class="ml-2 h-10"
        @click="exportCSV"
      />
    </div>
  </div>
</template>
