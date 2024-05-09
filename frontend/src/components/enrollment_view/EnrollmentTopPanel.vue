<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { computed, ref } from 'vue'
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
          <Dropdown v-model="selectedLRN" :options="filteredLearnersData" filter optionLabel="lrn" placeholder="Select a LRN" class="w-full md:w-14rem">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>{{ slotProps.value.lrn }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.lrn }}</div>
              </div>
            </template>
          </Dropdown>
          <Dropdown v-model="selectedLastName" :options="filteredLearnersData" showClear filter optionLabel="lastName" placeholder="Select a Last Name" class="w-full md:w-14rem">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>{{ slotProps.value.lastName }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.lastName }}</div>
              </div>
            </template>
          </Dropdown>
          <Dropdown v-model="selectedFirstName" :options="filteredLearnersData" showClear filter optionLabel="firstName" placeholder="Select a First Name" class="w-full md:w-14rem">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>{{ slotProps.value.firstName }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.firstName }}</div>
              </div>
            </template>
          </Dropdown>
          <Dropdown v-model="selectedMiddleName" :options="filteredMiddleNamesData" showClear filter optionLabel="middleName" placeholder="Select a Middle Name" class="w-full md:w-14rem">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>{{ slotProps.value.middleName }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.middleName }}</div>
              </div>
            </template>
          </Dropdown>
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