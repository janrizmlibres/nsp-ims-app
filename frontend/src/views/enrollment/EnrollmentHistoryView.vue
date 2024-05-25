<script setup>
import Dropdown from 'primevue/dropdown';
import EnrollmentTable from '@/components/enrollment_view/EnrollmentTable.vue'
import ContentPane from '@/components/UI/ContentPane.vue'
import { ref } from 'vue'
import { useTermStore } from '@/stores/term.js'
import { useEnrollmentStore } from '@/stores/enrollment.js'

const selectedTerm = ref(null)
const termsOptions = ref([])
const currentTerm = ref("")

const termStore = useTermStore()
const enrollmentStore = useEnrollmentStore()

async function getAllTerms()  {
  try {
    await termStore.getTerms()
    termsOptions.value = termStore.terms
    
    if (enrollmentStore.editedTerm) {
      selectedTerm.value = termStore.terms.find(term => term.academic_year === enrollmentStore.editedTerm)
      enrollmentStore.setEditedTerm(null)
    } else  {
      selectedTerm.value = termStore.terms[0]
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

async function getAllStudentsFromTerm() {
  try {
    await enrollmentStore.getAllEnrolledFromTerm(selectedTerm.value.id)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

async function getCurrentEnrolled()  {
  try {
    await termStore.getActiveTerm()
    currentTerm.value = termStore.activeTerm

    await enrollmentStore.getAllEnrolledFromTerm(currentTerm.value.id)
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
getCurrentEnrolled()
</script>

<template>
  <ContentPane header="Enrollment History">
    <div class="h-fit flex place-items-center bg-white rounded-md shadow-xl p-2 px-4 mb-2 gap-5">
      <p>A.Y.</p>
      <Dropdown v-model="selectedTerm" :options="termsOptions" optionLabel="academic_year" placeholder="Select an Academic Year" class="w-auto" @change="getAllStudentsFromTerm"/>
    </div>
    <EnrollmentTable />
  </ContentPane>
</template>