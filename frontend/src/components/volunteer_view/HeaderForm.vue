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
        <InputText
          class="grow h-10 flex-grow"
          type="text"
          v-model="formData.category"
        />
      </div>
    </div>
  </template>
  
  <script>
  import InputText from 'primevue/inputtext'
  import { ref } from 'vue'
  
  export default {
    components: {
      InputText
    },
    setup() {
      // Initialize formData with id and category properties
      let formData = ref({
        id: '',
        category: ''
      })
  
      return {
        formData
      }
    }
  }
  </script>