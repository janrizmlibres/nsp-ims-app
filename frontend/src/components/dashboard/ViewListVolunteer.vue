<template>
    <Button label="View List" severity="info" class="total-button" @click="visible = !visible" />
    <div class="card flex justify-content-center">
      <Dialog v-model:visible="visible" modal header="Volunteers" :style="{ width: 'auto' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <DataTable :value="volunteerStore.volunteers" tableStyle="min-width: 50rem">
          <Column field="fullname" header="Full Name"></Column>
          <Column field="affiliation" header="Affilitation"></Column>
      </DataTable>
      </Dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import Dialog from 'primevue/dialog'; // Assuming you're using PrimeVue for the Dialog component
  import Button from 'primevue/button';
  import { useVolunteerStore } from '@/stores/volunteer';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';

  const volunteerStore = useVolunteerStore();
  const visible = ref(false);

  </script>
  
  <style scoped>
  .total-button {
    margin-top: 1.875rem;
    margin-left: 5.625rem;
    background-color: #265492;
    padding: 0.5rem;
    color: white;
    border-radius: 0.625rem;
    font-size: 0.75rem;
  }
  </style>