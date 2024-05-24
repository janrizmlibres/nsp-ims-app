<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Card from 'primevue/card'

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
  { field: 'contactNum', header: 'Contact Number' },
  { field: 'category', header: 'Category' }
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

    <Card :pt="{ content: 'h-full', body: 'h-full px-4 pt-1' }" class="rounded-md inline-block">
      <template #content>
        <DataTable
          :value="studentsStore.studentsNormalized"
          v-model:filters="filters"
          :users="['lrn', 'firstName', 'lastName', 'facebook']"
          scrollable
          removableSort
        >
          <template #empty> No students found. </template>
          <template #loading> Loading students data. Please wait. </template>

          <Column header="" class="max-w-20">
            <template #body="slotProps">
              <RouterLink :to="{ name: 'view-student', params: { studentId: slotProps.data.id } }">
                <Button
                  label="View"
                  icon="fa-solid fa-eye"
                  rounded
                  raised
                  aria-label="View"
                  size="small"
                />
                <!-- <Button icon="fa-solid fa-eye" text rounded aria-label="View" /> -->
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

          <template #footer>
            <span class="font-medium">
              Record(s) count:
              <span class="u-txt-red">
                {{ studentsStore.students.length }}
              </span>
            </span>
          </template>
        </DataTable>
      </template>
    </Card>
  </ContentPane>
</template>
