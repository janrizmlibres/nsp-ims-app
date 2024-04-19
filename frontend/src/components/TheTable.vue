<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import { ref } from 'vue'

const students = ref([
  {
    userId: '52513',
    fullName: 'Janriz Libres',
    position: 'Social Media Manager'
  },
  {
    userId: '52514',
    fullName: 'Nazib Dimal',
    position: 'Lead Engineer'
  }
])

// const selectedStudent = ref()
</script>

<template>
  <DataTable
    :value="students"
    tableStyle="min-width: 50rem"
    :pt="{ column: { headercell: 'bg-white' } }"
    :pt-options="{ mergeProps: true }"
  >
    <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
    <Column header="">
      <template #body>
        <h1>Foo</h1>
      </template>
    </Column>
    <Column field="userId" header="User ID" sortable></Column>
    <Column field="fullName" header="Full Name" sortable></Column>
    <Column field="position" header="Position" sortable></Column>
  </DataTable>
</template>
