<template>
  <div class="flex justify-start gap-2 mb-2">
    <div class="flex flex-row gap-4 items-center">
      <Dropdown v-model="selectedTerm" :options="termsOptions" optionLabel="academic_year" placeholder="Select an Academic Year" class="w-auto"/>
    </div>
  </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown'
import { useTermStore } from '@/stores/term.js'
import { ref, watch, defineEmits } from 'vue'
import { useToast } from 'primevue/usetoast';
import { useEnrollmentStore } from '@/stores/enrollment';

const termStore = useTermStore()
const enrollmentStore = useEnrollmentStore()
const toast = useToast()

const termsOptions = ref([])
const selectedTerm = ref(null)
const totalEnrolledStudents = ref(0)

// define the emits
const emit = defineEmits(['termId-changed']);

// watch selectedTerm and emit the event when it changes
watch(selectedTerm, (newTerm) => {
  if (newTerm) {
    emit('termId-changed', newTerm.id);
    //console.log(newTerm.id);
  }
});

async function getAllTerms()  {
  try {
    await termStore.getTerms()
    termsOptions.value = termStore.terms
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

getAllTerms()
</script>