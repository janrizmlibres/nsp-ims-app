<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

defineProps(['staffs'])
</script>

<template>
  <DataTable
    :value="staffs"
    scrollable
    tableStyle="min-width: 50rem"
    :pt="{ column: { headercell: 'bg-white' } }"
    :pt-options="{ mergeProps: true }"
  >
    <Column header="">
      <template #body>
        <a href="#">
          <h1>Edit</h1>
        </a>
      </template>
    </Column>
    <Column field="userId" header="User ID" sortable></Column>
    <Column field="fullName" header="Full Name" sortable></Column>
    <Column field="position" header="Position" sortable></Column>
  </DataTable>
</template>
