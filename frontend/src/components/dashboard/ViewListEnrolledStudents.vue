<template>
    <Button label="View List" severity="info" class="total-button" @click="visible = !visible" />
    <div class="card flex justify-content-center">
      <Dialog v-model:visible="visible" modal header="Students" :style="{ width: 'auto' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <ul :style="{ textAlign: 'center' }">
          <li v-for="(student, index) in enrollmentStore.allEnrolled" :key="index">
            {{ studentsStore.students[index].fullname }} - {{ student.status }}
          </li>
        </ul>
      </Dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import Dialog from 'primevue/dialog'; // Assuming you're using PrimeVue for the Dialog component
  import Button from 'primevue/button';
  import DataTable from 'primevue/datatable';
  import {useEnrollmentStore} from '@/stores/enrollment';
  import { useStudentsStore } from '@/stores/students';

  const studentsStore = useStudentsStore();
  const enrollmentStore = useEnrollmentStore();
  const visible = ref(false);
  //console.log(await enrollmentStore.allEnrolled)

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