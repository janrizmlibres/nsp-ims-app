<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps(['globalFilter'])
const filter = ref(props.globalFilter)

async function goToAddStudents() {
  await router.push({ name: 'add-student' })
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
        icon="fa-solid fa-user-plus"
        aria-label="Add Student"
        class="ml-2 h-10"
        @click="goToAddStudents"
      />
      <Button label="Export Data" icon="fa-solid fa-file-export" class="ml-2 h-10" />
    </div>
  </div>
</template>
