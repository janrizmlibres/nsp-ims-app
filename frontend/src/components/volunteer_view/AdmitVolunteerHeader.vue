<script setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown';
import FormParts from '@/util/volunteer_form_parts'

const emit = defineEmits(['dataChanged'])

const name = ref({
  lastName: null,
  firstName: null,
  middleName: null
})
const selectedSuffix = ref(null)
const selectedAffiliation = ref(null);
const volunteerId = ref(null);
const affiliations = ref([
  'Student',
  'Professional'
])
const suffixes = ref(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV'])

function handleUpdate() {
  const data = {
    ...name.value,
    volunteerId: volunteerId.value,
    affiliation: selectedAffiliation.value,
    suffix:selectedSuffix.value,
  }

  emit('dataChanged', FormParts.Volunteer, data)
}
</script>


<template>
  <div>
    <!-- First row for ID and Affiliation -->
    <div class="flex gap-10 items-center mb-2">
      <div class="basis-32 text-right">
        <span>ID</span>
      </div>
      <InputText
        class="grow h-10 flex-grow"
        type="text"
        v-model="volunteerId"
        @update:modelValue="handleUpdate"
      />

      <div class="basis-32 text-right">
        <span>Affiliation</span>
      </div>
      <Dropdown 
        v-model="selectedAffiliation" 
        :options="affiliations"
        class="grow h-10 flex-grow" 
        @change="handleUpdate"
      />
    </div>

    <!-- Second row for names -->
    <div class="flex gap-10 items-center">
      <div class="basis-32 text-right">
        <span>First Name</span>
      </div>
      <InputText
        class="grow h-10"
        type="text"
        v-model="name.firstName"
        @update:modelValue="handleUpdate"
      />

      <div class="basis-32 text-right">
        <span>Middle Name</span>
      </div>
      <InputText
        class="grow h-10"
        type="text"
        v-model="name.middleName"
        @update:modelValue="handleUpdate"
      />

      <div class="basis-32 text-right">
        <span>Last Name</span>
      </div>
      <InputText
        class="grow h-10"
        type="text"
        v-model="name.lastName"
        @update:modelValue="handleUpdate"
      />

      <div class="basis-32 text-right">
        <span>Suffix</span>
      </div>
      <Dropdown
          class="h-10"
          v-model="selectedSuffix"
          :options="suffixes"
          @update:modelValue="handleUpdate"
        />
    </div>
  </div>
</template>
