<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


</script>

<template>
  <DataTable>
    <Column field="code" header="Strand Code" sortable ></Column>
    <Column field="name" header="Learning Strand" sortable ></Column>
    <Column field="category" header="Time | Date" sortable ></Column>
  </DataTable>
</template>