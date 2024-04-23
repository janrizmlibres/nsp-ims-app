<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

defineProps(['staffs'])
</script>

<template>
  <DataTable
    :value="staffs"
    scrollable
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
    <Column field="id" header="User ID" sortable></Column>
    <Column header="Full Name" sortable>
      <template #body="slotProps">
        {{ slotProps.data.first_name }} {{ slotProps.data.last_name }}
      </template>
    </Column>
    <Column field="position" header="Position" sortable></Column>
  </DataTable>
</template>
