<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import { ref } from 'vue'
import { useTermStore } from '@/stores/term.js'
import { useToast } from 'primevue/usetoast'
import EnrollmentTable from '@/components/enrollment_view/EnrollmentTable.vue'
import { useEnrollmentStore } from '@/stores/enrollment.js'

const termStore = useTermStore()
const enrollmentStore = useEnrollmentStore()

const currentTerm = ref("")
const toast = useToast()


async function getActiveStudents()  {
  try {
    await termStore.getActiveTerm()
    currentTerm.value = termStore.activeTerm
    
    await enrollmentStore.getAllEnrolledFromTerm(currentTerm.value.id)
    enrollmentStore.setEditedTerm(null)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

getActiveStudents()
</script>

<template>
  <ContentPane header="Enrollment" :subheader="'Academic Year ' + currentTerm.academic_year">
    <EnrollmentTable />
  </ContentPane>
</template>

<style scoped>

</style>