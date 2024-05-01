<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import router from '@/router'
import { ref } from 'vue'

const props = defineProps(['globalFilter'])
const filter = ref(props.globalFilter)

async function goToAddStaffview() {
  await router.push({ name: 'add-staff' })
}
</script>

<template>
  <div class="mb-2 text-right mt-2">
    <div class="inline-block ml-auto mr-0">
      <span class="relative">
        <font-awesome-icon
          icon="fa-solid fa-magnifying-glass"
          class="absolute top-2/4 -mt-2 left-3"
        />
        <InputText
          v-model="filter"
          placeholder="Search Staff"
          size="small"
          class="pl-10"
          @update:modelValue="$emit('filterChanged', filter)"
        />
      </span>
      <Button
        icon="fa-solid fa-user-plus"
        aria-label="Submit"
        class="ml-2 h-10"
        @click="goToAddStaffview"
      />
      <Button label="Export Data" icon="fa-solid fa-file-export" class="ml-2 h-10" />
    </div>
  </div>
</template>
