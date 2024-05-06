<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

</script>

<template>
  <DataTable>
    <column field="LRN" header="LRN" sortable></column>
    <column field="fullName" header="Full Name" sortable></column>
    <column field="schoolLevel" header="School Level" sortable></column>
    <column field="classCode" header="Class Code" sortable></column>
    <column field="dateEnrolled" header="Date Enrolled" sortable></column>
  </DataTable>
</template>

<style scoped>

</style>