<template>
    <div class="flex gap-10 items-center">
      <div class="flex gap-10 items-center flex-grow">
        <div class="basis-32 text-right">
          <span>ID</span>
        </div>
        <InputText
          class="grow h-10 flex-grow"
          type="text"
          v-model="id"
        />
      </div>
  
      <div class="flex gap-10 mb-2 items-center flex-grow">
        <div class="basis-32 text-right">
          <span>Affiliation</span>
        </div>
        <Dropdown 
        v-model="selectedAffiliation" 
        :options="affiliation" 
        optionLabel="name" 
        class="grow h-10 flex-grow" />
      </div>
    </div>
  </template>
  
<script setup>
import InputText from 'primevue/inputtext'
import { ref, watch, defineEmits } from 'vue'
import Dropdown from 'primevue/dropdown';

const emit = defineEmits(['update', 'dataChanged'])

const selectedAffiliation = ref();
const id = ref();
const affiliation = ref([
  { name: 'Student', code: 'Student' },
  { name: 'Professional', code: 'Professional' }
]);

const handleDataChange = (newData) => {
  emit('dataChanged', newData);
};

watch([selectedAffiliation, id], () => {
  const newData = { selectedAffiliation: selectedAffiliation.value ? selectedAffiliation.value.code : '', id: id.value };
  emit('update', newData);
  handleDataChange(newData);
});
</script>