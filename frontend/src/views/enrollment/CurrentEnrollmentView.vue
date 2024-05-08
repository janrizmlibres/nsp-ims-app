<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import { ref } from 'vue'
import { useTermStore } from '@/stores/term.js'
import { useToast } from 'primevue/usetoast'
import EnrollmentTable from '@/components/enrollment_view/EnrollmentTable.vue'
import { useEnrollmentStore } from '@/stores/enrollment.js'

const termStore = useTermStore()
const currentTerm = ref("")
const toast = useToast()

async function getCurrentActiveTerm()  {
  try {
    await termStore.getActiveTerm()
    currentTerm.value = termStore.activeTerm.academic_year
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

getCurrentActiveTerm()
</script>

<template>
  <ContentPane header="Enrollment" :subheader="'Academic Year ' + currentTerm.academic_year">
    <EnrollmentTable />
  </ContentPane>
</template>

<style scoped>

</style>