<script setup>
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEnrollmentStore } from '@/stores/enrollment.js'
import { useTermStore } from '@/stores/term.js'
import { useToast } from 'primevue/usetoast'
import { defineProps } from 'vue'

const enrollmentStore = useEnrollmentStore()
const termStore = useTermStore()

const toast = useToast()
const router = useRouter()

const schoolLevels = ref([])

const form = ref({
  selectedSchoolLevel: null,
  hasEnrollmentForm: null,
  digitalLiteracyScore: null,
  fltPretestScore: null,
  callable: null,
  bridger: null,
  selectedRegularity: null,
  selectedRemarks: null,
})

async function getStudent()  {
  try {
    await enrollmentStore.getEnrolled(props.studentId, props.enrollmentId)
    await termStore.getTerms()

    const chosenYear = termStore.terms.find(term => { return term.academic_year === props.academicYear })
    schoolLevels.value = chosenYear.class_levels
    
    selectedLRN.value = enrollmentStore.learner.lrn
    selectedFullName.value = enrollmentStore.learner.fullName

    form.value.selectedSchoolLevel = schoolLevels.value.find(level => { 
      return level.school_level === enrollmentStore.learner.schoolLevel.school_level 
    })

    form.value.selectedRegularity = { 
      regularity: enrollmentStore.learner.regularity, code: enrollmentStore.learner.regularity 
    }
    
    form.value.selectedRemarks = enrollmentStore.learner.remarks
    form.value.digitalLiteracyScore = enrollmentStore.learner.digitalLiteracy
    form.value.fltPretestScore = enrollmentStore.learner.ftlPretest
    form.value.hasEnrollmentForm = enrollmentStore.learner.hasEnrollmentForm
    form.value.callable = enrollmentStore.learner.callable
    form.value.bridger = enrollmentStore.learner.Bridger
    
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

const regularity = ref([
  { regularity: 'Regular', code: 'Regular' },
  { regularity: 'Hybrid', code: 'Hybrid' },
])

const selectedLRN = ref();
const selectedFullName = ref();

async function updateEnrolled() {
  try {
    await enrollmentStore.updateLearner(
      props.enrollmentId,
      form.value
    )
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Learner has been Updated',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
  
  enrollmentStore.setEditedTerm(props.academicYear)
  router.go(-1)
}

function cancelEdit() {
  enrollmentStore.setEditedTerm(props.academicYear)
  router.go(-1)
}

const props = defineProps({
  lrn: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  classLevel: {
    type: String,
    required: true
  }
})

getStudent()
</script>

<template>
  <div class="flex flex-row justify-center grow gap-20">

    <div class="flex flex-col item-center basis-1/2 gap-8 pt-3 pl-16">
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>LRN</span>
        </div>
        <InputText v-model="selectedLRN" disabled class="w-full"/>
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Full Name</span>
        </div>
        <InputText v-model="selectedFullName" disabled class="w-full"/>
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>School Level</span>
        </div>
        <Dropdown
          v-model="form.selectedSchoolLevel"
          :options="schoolLevels"
          optionLabel="school_level"
          placeholder="Select a School Level"
          class="w-full md:w-14rem h-11"
        />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="text-right basis-32">
          <span>Regularity</span>
        </div>
        <Dropdown
          v-model="form.selectedRegularity"
          :options="regularity"
          optionLabel="regularity"
          placeholder="Select a Regularity"
          class="w-full md:w-14rem"
        />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Remarks</span>
        </div>
        <InputText v-model="form.selectedRemarks" class="w-full md:w-14rem"/>
      </div>
    </div>


    <div class="flex flex-col item-center basis-1/2 gap-8 pt-3 pr-16">
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Digital Literacy Score</span>
        </div>
        <InputNumber id="digitalLiteracy" v-model="form.digitalLiteracyScore" class="grow"/>
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-28 text-right ml-4">
          <span>FLT Pre-Test Score</span>
        </div>
        <InputNumber v-model="form.fltPretestScore" class="grow"/>
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Has Enrollment Form</span>
        </div>
        <Checkbox v-model="form.hasEnrollmentForm" :binary="true" />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Callable</span>
        </div>
        <Checkbox v-model="form.callable" :binary="true" />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Bridger</span>
        </div>
        <Checkbox v-model="form.bridger" :binary="true" />
      </div>
      <div class="flex gap-4 mb-2 items-center place-self-end">
        <Button @click="updateEnrolled" label="Update Learner" class="mt-4" :disabled="!isValid"/>
        <Button @click="cancelEdit" label="Cancel" class="mt-4"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>