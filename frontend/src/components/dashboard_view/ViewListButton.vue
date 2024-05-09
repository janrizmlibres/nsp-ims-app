<template>
    <Button label="View List" severity="info" class="total-button" @click="visible = !visible" />
    <div class="card flex justify-content-center">
      <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import Dialog from 'primevue/dialog'; // Assuming you're using PrimeVue for the Dialog component
  import Button from 'primevue/button';
  
  export default {
    name: 'ViewListButton',
    components: {
      Dialog,
      Button,
    },
    setup() {
      const visible = ref(false);
      return { visible };
    }
  }
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