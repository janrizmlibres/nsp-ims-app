<template>
  <div class="mb-2 text-right mt-2">
    <div class="inline-block ml-auto mr-0">
      <span class="relative">
          <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
          <InputText v-model="filter" placeholder="Search Students" 
          class="pl-10 font-normal w-96 shadow-sm"
          @input="onFilterChange" />
      </span>
      <Button
        icon="fa-solid fa-user-plus"
        aria-label="Submit"
        class="ml-2 u-bg-scolor hover:u-bg-scolor hover:transform hover:scale-[1.05]"
        @click="goToAdmitVolunteerView"
        :pt="{
          root: {class: ['focus:u-ring-scolor']}
        }" :ptOptions="{mergeProps:true}"
      />
      <Button
        label="Export Data"
        icon="fa-solid fa-file-export"
        class="ml-2 u-bg-pcolor hover:u-bg-pcolor"
        @click="exportCSV"
        :pt="{
          root: {class: ['focus:u-ring-pcolor']}
        }" :ptOptions="{mergeProps:true}"
      />
    </div>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import router from '@/router'
import { ref } from 'vue'

const props = defineProps(['globalFilter', 'dt'])
const filter = ref(props.globalFilter)

const emit = defineEmits(['filterChanged'])

async function goToAdmitVolunteerView() {
  await router.push({ name: 'admit-volunteers' })
}

const onFilterChange = () => {
  emit('filterChanged', filter.value)
}

function exportCSV() {
  props.dt.exportCSV()
}
</script>