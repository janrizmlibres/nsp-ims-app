<script setup>
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useEnrollmentStore } from '@/stores/enrollment.js'
import { useTermStore } from '@/stores/term.js'
import { useToast } from 'primevue/usetoast'
import { defineProps } from 'vue'

const enrollmentStore = useEnrollmentStore()
const termStore = useTermStore()

const toast = useToast()

const filteredLearners = ref([])

const schoolLevels = ref([])

async function getStudent()  {
  try {
    await enrollmentStore.getEnrolled(props.lrn, props.academicYear, props.classLevel)
    await termStore.getTerms()

    const chosenYear = termStore.terms.find(term => term.academic_year === props.academicYear)
    schoolLevels.value = chosenYear.class_levels
    
    selectedLRN.value = enrollmentStore.learner[0].lrn
    selectedFullName.value = enrollmentStore.learner[0].firstName
    selectedSchoolLevel.value = chosenYear.class_levels.find(level => level.school_level === props.classLevel)
    selectedRegularity.value = { regularity: enrollmentStore.learner[0].regularity, code: enrollmentStore.learner[0].regularity }
    selectedRemarks.value = enrollmentStore.learner[0].remarks
    digitalLiteracyScore.value = enrollmentStore.learner[0].digitalLiteracy
    fltPretestScore.value = enrollmentStore.learner[0].ftlPretest
    hasEnrollmentForm.value = enrollmentStore.learner[0].hasEnrollmentForm
    callable.value = enrollmentStore.learner[0].callable
    bridger.value = enrollmentStore.learner[0].bridger
    
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
const selectedSchoolLevel = ref();
const selectedRegularity = ref();
const selectedRemarks = ref();
const digitalLiteracyScore = ref();
const fltPretestScore = ref();
const hasEnrollmentForm = ref();
const callable = ref();
const bridger = ref();
async function submitEvent() {
  try {
    await enrollmentStore.updateLearner(
      selectedLRN.value,
      selectedSchoolLevel.value.id,
      hasEnrollmentForm.value,
      digitalLiteracyScore.value,
      fltPretestScore.value,
      callable.value,
      bridger.value,
      selectedRegularity.value.code,
      selectedRemarks.value
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
          v-model="selectedSchoolLevel"
          showClear
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
          v-model="selectedRegularity"
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
        <InputText v-model="selectedRemarks" class="w-full md:w-14rem"/>
      </div>
    </div>


    <div class="flex flex-col item-center basis-1/2 gap-8 pt-3 pr-16">
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Digital Literacy Score</span>
        </div>
        <InputNumber id="digitalLiteracy" v-model="digitalLiteracyScore" class="grow"/>
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-28 text-right ml-4">
          <span>FLT Pre-Test Score</span>
        </div>
        <InputNumber v-model="fltPretestScore" class="grow"/>
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Has Enrollment Form</span>
        </div>
        <Checkbox v-model="hasEnrollmentForm" :binary="true" />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Callable</span>
        </div>
        <Checkbox v-model="callable" :binary="true" />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Bridger</span>
        </div>
        <Checkbox v-model="bridger" :binary="true" />
      </div>
      <Button @click="submitEvent" label="Update Learner" class="mt-4 place-self-end"/>
    </div>

  </div>
</template>

<style scoped>

</style>