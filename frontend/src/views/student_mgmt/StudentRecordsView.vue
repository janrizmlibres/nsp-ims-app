<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import ContentPane from '@/components/UI/ContentPane.vue'
import StudentHeader from '@/components/student_view/StudentHeader.vue'
import { useStudentsStore } from '@/stores/students'

import { onMounted, ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'

const studentsStore = useStudentsStore()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

function updateGlobalFilter(newValue) {
  filters.value.global.value = newValue
}

onMounted(async () => {
  try {
    await studentsStore.getStudents()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <ContentPane header="Student Records">
    <StudentHeader :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />

    <DataTable
      :value="studentsStore.students"
      v-model:filters="filters"
      :globalFilterFields="['firstName', 'lastName']"
      scrollable
      removableSort
    >
      <Column field="lrn" header="LRN" sortable></Column>
      <Column field="firstName" header="First Name" sortable></Column>
      <Column field="lastName" header="Last Name" sortable></Column>
      <Column field="category" header="Category" sortable></Column>
    </DataTable>

    <div class="pl-8 pt-2 font-medium">
      <p>
        Record(s) count: <span class="u-txt-red"> {{ studentsStore.students.length }} </span>
      </p>
    </div>
  </ContentPane>
</template>
