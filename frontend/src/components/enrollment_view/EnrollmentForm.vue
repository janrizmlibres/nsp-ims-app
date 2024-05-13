<script setup>
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import AutoComplete from 'primevue/autocomplete'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { ref, computed } from 'vue'
import { useEnrollmentStore } from '@/stores/enrollment.js'
import { useStudentsStore } from '@/stores/students.js'
import { useTermStore } from '@/stores/term.js'
import { useToast } from 'primevue/usetoast'

const enrollmentStore = useEnrollmentStore()
const studentsStore = useStudentsStore()
const termStore = useTermStore()

const toast = useToast()

const filteredLearners = ref([])

const schoolLevels = ref([])

schoolLevels.value = termStore.activeTerm.class_levels

const isValid = computed(() => {
  return selectedLRN.value && selectedFullName.value && selectedSchoolLevel.value && selectedRegularity.value
})

const regularity = ref([
  { name: 'Regular', code: 'Regular' },
  { name: 'Hybrid', code: 'Hybrid' },
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

const search = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length && event.query === "Type a Learner") {
      filteredLearners.value = studentsStore.students.filter(student => student.lrn !== null)
    } else {
      filteredLearners.value = studentsStore.students.filter((student) => {
        return student.lrn !== null && student.fullname.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
}

function onSelectedLearner() {
  const selectedLearner = studentsStore.students.find(student => student.fullname === selectedFullName.value.fullname)
  selectedLRN.value = selectedLearner.lrn
}

function clearSelectedFullName() {
  selectedLRN.value = "";
}

async function submitEvent() {
  try {
    await enrollmentStore.enrollLearner(
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
      detail: 'Learner has been enrolled',
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
</script>

<template>
  <div class="flex flex-row justify-center grow gap-20">
    
    <div class="flex flex-col item-center basis-1/2 gap-8 pt-3 pl-16">
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>LRN<span class="text-red-500">*</span></span>
        </div>
        <InputText v-model="selectedLRN" disabled class="w-full"/>
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Full Name<span class="text-red-500">*</span></span>
        </div>
        <AutoComplete
          v-model="selectedFullName"
          placeholder="Type a Learner"
          forceSelection
          dropdown
          optionLabel="fullname"
          :suggestions="filteredLearners"
          @complete="search" @item-select="onSelectedLearner"
          inputStyle="width: 80"
          class="basis-full h-11"
          @clear="clearSelectedFullName"
        />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Class Level<span class="text-red-500">*</span></span>
        </div>
        <Dropdown
          v-model="selectedSchoolLevel"
          showClear
          :options="schoolLevels"
          optionLabel="school_level"
          placeholder="Select a Class Level"
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
          optionLabel="name"
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
      <Button @click="submitEvent" label="Enroll Learner" class="mt-4 place-self-end" :disabled="!isValid"/>
    </div>
    
  </div>
</template>

<style scoped>

</style>