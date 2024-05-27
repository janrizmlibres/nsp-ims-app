<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'
import { useTermStore } from '@/stores/term.js'
import { useEnrollmentStore } from '@/stores/enrollment.js'
import { useToast } from 'primevue/usetoast';

const props = defineProps({ globalFilter: Object, dt: Object })

const filter = ref(props.globalFilter)

function exportCSV() {
    props.dt.exportCSV()
}

const selectedTerm = ref(null)
const termsOptions = ref([])
const currentTerm = ref("")
const toast = useToast()

const termStore = useTermStore()
const enrollmentStore = useEnrollmentStore()

async function getAllTerms()  {
  try {
    await termStore.getTerms()
    termsOptions.value = termStore.terms

    if (enrollmentStore.editedTerm) {
      selectedTerm.value = await termStore.terms.find(term => term.academic_year === enrollmentStore.editedTerm)
      termStore.setChosenTerm(selectedTerm.value.id)
      await enrollmentStore.getAllEnrolledFromTerm(termStore.chosenTerm)
      enrollmentStore.setEditedTerm(null)
    } else  {
      selectedTerm.value = termStore.terms[0]
      await termStore.getActiveTerm()
      termStore.setChosenTerm(termStore.activeTerm.id)

      await enrollmentStore.getAllEnrolledFromTerm(termStore.chosenTerm)
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
    termStore.setChosenTerm(selectedTerm.value.id)
    await enrollmentStore.getAllEnrolledFromTerm(termStore.chosenTerm)
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

<template>
    <div class="flex justify-end gap-2 mb-2 bg-white shadow-md rounded-2xl p-2">
        <div class="flex flex-row gap-4 items-center">
            <label>S.Y:</label>
            <Dropdown v-model="selectedTerm" :options="termsOptions" optionLabel="academic_year" placeholder="Select an Academic Year" class="w-auto" @change="getAllStudentsFromTerm"/>
        </div>
        <span class="relative">
            <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
            <InputText v-model="filter['global'].value" placeholder="Search Students" 
            class="pl-10 font-normal w-96 shadow-sm"
        />
        </span>
        <Button
            label="Export Data"
            icon="fa-solid fa-file-export"
            class="u-bg-pcolor hover:u-bg-pcolor"
            @click="exportCSV"
            :pt="{
            root: {class: ['focus:u-ring-pcolor']}
            }" :ptOptions="{mergeProps:true}"
        />
    </div>
</template>
