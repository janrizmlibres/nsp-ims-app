<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import { ref } from 'vue'
import { useTermStore } from '@/stores/term.js'
import { useToast } from 'primevue/usetoast'
import { useStudentsStore } from '@/stores/students.js'
import EnrollmentForm from '@/components/enrollment_view/EnrollmentForm.vue'

const termStore = useTermStore()
const studentsStore = useStudentsStore()

const currentTerm = ref("")
const toast = useToast()


async function getActiveStudents()  {
  try {
    await termStore.getActiveTerm()
    currentTerm.value = termStore.activeTerm

    await studentsStore.getStudents()
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
  <ContentPane :breadcrumb="[{label: 'Enrollment'}, {label: `S.Y ${currentTerm.academic_year}`}, {label: 'Enroll'}]">
    <div class="h-full overflow-auto flex justify-center bg-white rounded-md shadow-xl p-2 px-4">
      <EnrollmentForm class="h-fit mt-10"/>
    </div>
  </ContentPane>
</template>

<style scoped>

</style>