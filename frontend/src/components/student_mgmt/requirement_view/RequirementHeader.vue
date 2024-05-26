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

//Code for Edit Mode

const isEditMode = ref(false)

function enterEditMode(){
  isEditMode.value = true
  this.$emit('enterEditMode')
}

function exitEditMode(){
  isEditMode.value = false
  this.$emit('exitEditMode')
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
      <Button v-if="!isEditMode"
        icon="fa-solid fa-pencil"
        aria-label="Edit"
        label=" Edit"
        class="ml-2 h-10 bg-yellow-500 border-yellow-500"
        @click="enterEditMode"
      />
      <Button v-if="isEditMode"
        icon="fa-solid fa-check"
        aria-label="Confirm"
        label=" Confirm"
        class="ml-2 h-10"
        @click="exitEditMode"
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
