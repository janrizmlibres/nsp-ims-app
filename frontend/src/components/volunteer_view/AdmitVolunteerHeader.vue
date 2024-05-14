<template>
    <div class="flex gap-10 items-center">
      <div class="flex gap-10 items-center flex-grow">
        <div class="basis-32 text-right">
          <span>ID</span>
        </div>
        <InputText
          class="grow h-10 flex-grow"
          type="text"
          v-model="formData.id"
        />
      </div>
  
      <div class="flex gap-10 mb-2 items-center flex-grow">
        <div class="basis-32 text-right">
          <span>Category</span>
        </div>
        <Dropdown 
        v-model="selectedCategory" 
        :options="category" 
        optionLabel="name" 
        class="grow h-10 flex-grow" />
      </div>
    </div>
  </template>
  
  <script>
  import InputText from 'primevue/inputtext'
  import { ref } from 'vue'
  import Dropdown from 'primevue/dropdown';
  
  export default {
    components: {
      InputText,
      Dropdown
    },
    setup() {
      // Initialize formData with id and category properties
      let formData = ref({
        id: '',
      })
  
      const selectedCategory = ref();
      const category = ref([
        { name: 'Student', code: 'stdnt' },
        { name: 'Professional', code: 'pro' }
      ]);
  
      return {
        formData,
        selectedCategory,
        category
      }
    }
  }
  </script>