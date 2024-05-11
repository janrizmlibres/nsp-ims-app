<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import AutoComplete from 'primevue/autocomplete'
import { ref } from 'vue'
import { useEnrollmentStore } from '@/stores/enrollment.js'

const enrollmentStore = useEnrollmentStore()

const learnersData = computed(() =>
  enrollmentStore.learners.filter(learner => learner.lrn !== null)
)

const schoolLevels = ref(['Grade School', 'Junior High School'])
const regularity = ref(['Regular', 'Hybrid'])

const selectedLRN = ref();
const selectedLastName = ref();
const selectedFirstName = ref();
const selectedMiddleName = ref();
const selectedSchoolLevel = ref();
const selectedRegularity = ref();
const selectedRemarks = ref();

// Computed property to filter learners based on the selected LRN, Last Name, First Name, and Middle Name
const filteredLearnersData = computed(() => {
  let filteredLearners = learnersData.value;

  if (selectedLRN.value) {
    filteredLearners = filteredLearners.filter(learner => learner.lrn === selectedLRN.value.lrn);
  }

  if (selectedLastName.value) {
    filteredLearners = filteredLearners.filter(learner => learner.lastName === selectedLastName.value.lastName);
  }

  if (selectedFirstName.value) {
    filteredLearners = filteredLearners.filter(learner => learner.firstName === selectedFirstName.value.firstName);
  }

  if (selectedMiddleName.value) {
    filteredLearners = filteredLearners.filter(learner => learner.middleName === selectedMiddleName.value.middleName);
  }

  return filteredLearners;
});

// Computed property to filter middle names based on the filtered learners
const filteredMiddleNamesData = computed(() => {
  const filteredLearners = filteredLearnersData.value;
  return filteredLearners.filter(learner => learner.middleName !== null);
});
</script>

<template>
  <div class="flex flex-row justify-center gap-40">
    <div class="flex flex-col">
      <div class="flex flex-row gap-8">
        <div class="flex flex-col item-center gap-8 mt-2">
          <span class="text-right">LRN</span>
          <span class="text-right">Last Name</span>
          <span class="text-right">First Name</span>
          <span class="text-right">Middle Name</span>
        </div>
        <div class="flex flex-col gap-3">
          <InputText v-model="selectedLRN" disabled class="w-full"/>
          <AutoComplete v-model="selectedFullName" placeholder="Type a Learner" forceSelection dropdown optionLabel="firstName" :suggestions="filteredLearners" @complete="search" @item-select="onSelectedLearner" class="w-full h-11"/>
          <Dropdown v-model="selectedSchoolLevel" showClear :options="schoolLevels" placeholder="Select a School Level" class="w-full md:w-14rem h-11" />
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-row gap-8">
        <div class="flex flex-col item-center gap-8 mt-2">
          <span class="text-right">School Level</span>
          <span class="text-right">Modularity</span>
          <span class="text-right">Remarks</span>
        </div>
        <div class="flex flex-col gap-3">
          <Dropdown v-model="selectedSchoolLevel" :options="schoolLevels" placeholder="Select a School Level" class="w-full md:w-14rem" />
          <Dropdown v-model="selectedRegularity" :options="regularity" placeholder="Select a School Level" class="w-full md:w-14rem" />
          <InputText v-model="selectedRemarks" class="h-11"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>