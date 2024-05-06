<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import { ref } from 'vue'
import { useTermStore } from '@/stores/term.js'
import { useToast } from 'primevue/usetoast'
import ActiveEnrollmentTable from '@/components/enrollment_view/ActiveEnrollmentTable.vue'

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
  <ContentPane header="Enrollment" :subheader="'Academic Year ' + currentTerm">
    <ActiveEnrollmentTable />
  </ContentPane>
</template>

<style scoped>

</style>