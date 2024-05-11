<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import AutoComplete from 'primevue/autocomplete'
import { ref } from 'vue'
import { useEnrollmentStore } from '@/stores/enrollment.js'

const enrollmentStore = useEnrollmentStore()

const filteredLearners = ref([])

const schoolLevels = ref(['Grade School', 'Junior High School'])
const regularity = ref(['Regular', 'Hybrid'])

const selectedLRN = ref();
const selectedFullName = ref();
const selectedSchoolLevel = ref();
const selectedRegularity = ref();
const selectedRemarks = ref();

const search = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length && event.query === "Type a Learner") {
      filteredLearners.value = enrollmentStore.learners.filter(learner => learner.lrn !== null)
    } else {
      filteredLearners.value = enrollmentStore.learners.filter((learner) => {
        return learner.lrn !== null && learner.firstName.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
}

function onSelectedLearner() {
  const selectedLearner = enrollmentStore.learners.find(learner => learner.firstName === selectedFullName.value.firstName)
  selectedLRN.value = selectedLearner.lrn
}

function clearSelectedFullName() {
  selectedLRN.value = "";
}
</script>

<template>
  <div class="flex flex-row justify-center gap-40">
    <div class="flex flex-col">
      <div class="flex flex-row gap-8">
        
        <div class="flex flex-col item-center gap-8 mt-3">
          <span class="text-right">LRN</span>
          <span class="text-right">Full Name</span>
          <span class="text-right">School Level</span>
        </div>
        
        <div class="flex flex-col gap-3">
          <InputText v-model="selectedLRN" disabled class="w-full"/>
          <AutoComplete 
            v-model="selectedFullName" 
            placeholder="Type a Learner" 
            forceSelection 
            dropdown 
            optionLabel="firstName" 
            :suggestions="filteredLearners" 
            @complete="search" @item-select="onSelectedLearner" 
            class="w-full h-11" 
            @clear="clearSelectedFullName"
          />
          <Dropdown 
            v-model="selectedSchoolLevel"
            showClear 
            :options="schoolLevels" 
            placeholder="Select a School Level" 
            class="w-full md:w-14rem h-11" 
          />
        </div>
      </div>
    </div>
    
    <div class="flex flex-col">
      <div class="flex flex-row gap-8">
        <div class="flex flex-col item-center gap-8 mt-2">
          <span class="text-right">Regularity</span>
          <span class="text-right">Remarks</span>
        </div>
        
        <div class="flex flex-col gap-3">
          <Dropdown v-model="selectedRegularity" 
                    :options="regularity" 
                    placeholder="Select a Regularity" 
                    class="w-full md:w-14rem" />
          <InputText v-model="selectedRemarks" class="h-11"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>