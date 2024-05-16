<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

import ContentPane from '@/components/UI/ContentPane.vue'
import StudentHeader from '@/components/student_mgmt/StudentHeader.vue'
import { useStudentsStore } from '@/stores/students'

import { onMounted, ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'

const studentsStore = useStudentsStore()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const columns = [
  { field: 'lrn', header: 'LRN' },
  { field: 'firstName', header: 'First Name' },
  { field: 'lastName', header: 'Last Name' },
  { field: 'sex', header: 'Sex' },
  { field: 'contactNum', header: 'Contact Number' }
]

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
      :value="studentsStore.studentsNormalized"
      v-model:filters="filters"
      :globalFilterFields="['lrn', 'firstName', 'lastName', 'facebook']"
      scrollable
      removableSort
    >
      <Column header="">
        <template #body="slotProps">
          <RouterLink :to="{ name: 'view-student', params: { studentId: slotProps.data.id } }">
            <Button class="h-8" label="View" icon="fa-solid fa-eye" outlined />
          </RouterLink>
        </template>
      </Column>

      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        sortable
      ></Column>
    </DataTable>

    <div class="pl-8 pt-2 font-medium">
      <p>
        Record(s) count: <span class="u-txt-red"> {{ studentsStore.students.length }} </span>
      </p>
    </div>
  </ContentPane>
</template>
