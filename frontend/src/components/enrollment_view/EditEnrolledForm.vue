<script setup>
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEnrollmentStore } from '@/stores/enrollment.js'
import { useTermStore } from '@/stores/term.js'
import { useUsersStore } from '@/stores/users.js'
import { useToast } from 'primevue/usetoast'
import { defineProps } from 'vue'
import Textarea from 'primevue/textarea'

const enrollmentStore = useEnrollmentStore()
const termStore = useTermStore()
const usersStore = useUsersStore()

const toast = useToast()
const router = useRouter()

const schoolLevels = ref([])

const regularity = ref([
  { regularity: 'Regular', code: 'Regular' },
  { regularity: 'Hybrid', code: 'Hybrid' },
])

const selectedLRN = ref();
const selectedFullName = ref();
const selectedSchoolLevel = ref();
const enrollmentFormName = ref();
const confirmedFile = ref(false)
const isLoaded = ref(false)

const form = ref({
  fltPretestScore: null,
  selectedRegularity: null,
  selectedRemarks: null,
  enrollmentForm: null,
})

const oldForm = ref({
  fltPretestScore: null,
  selectedRegularity: null,
  selectedRemarks: null,
  enrollmentForm: null,
})

const chosenFile = computed(() => {
  return enrollmentFormName.value ? enrollmentFormName.value : "Please Upload an Enrollment Form";
})

const isEqual = (newValue, oldValue) =>
  newValue === oldValue || (newValue === "" && oldValue === null);

const checkChanges = computed(() => {
  if (!isLoaded.value) return true;
  return (
    isEqual(form.value.fltPretestScore, oldForm.value.fltPretestScore) &&
    isEqual(form.value.selectedRegularity.code, oldForm.value.selectedRegularity.code) &&
    isEqual(form.value.selectedRemarks, oldForm.value.selectedRemarks) &&
    isEqual(form.value.enrollmentForm, oldForm.value.enrollmentForm)
  );
});

async function getStudent()  {
  try {
    await enrollmentStore.getEnrolled(props.studentId, props.enrollmentId)
    await termStore.getTerms()

    const chosenYear = termStore.terms.find(term => { return term.academic_year === props.academicYear })
    schoolLevels.value = chosenYear.class_levels
    
    selectedLRN.value = enrollmentStore.learner.lrn
    selectedFullName.value = enrollmentStore.learner.fullName

    selectedSchoolLevel.value = enrollmentStore.learner.schoolLevel.school_level

    form.value.selectedRegularity = { 
      regularity: enrollmentStore.learner.regularity, code: enrollmentStore.learner.regularity 
    }
    
    form.value.selectedRemarks = enrollmentStore.learner.remarks
    form.value.fltPretestScore = enrollmentStore.learner.ftlPretest
    
    console.log("New Form: ", form.value)
    copyExistingData()

  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

async function updateEnrolled() {
  try {
    await enrollmentStore.updateLearner(
      props.enrollmentId,
      form.value
    )
    await usersStore.addAudit(`Edited student ${enrollmentStore.learner.lastName}`)
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

function confirmUpload(event) {
  form.value.enrollmentForm = event.files[0]
  enrollmentFormName.value = event.files[0].name

  confirmedFile.value = true;
}

function cancelFile() {
  form.value.enrollmentForm = null
  enrollmentFormName.value = null
  
  confirmedFile.value = false;
}

function copyExistingData() {
  for (let key in form.value) {
    oldForm.value[key] = form.value[key];
  }
  isLoaded.value = true;
}

const props = defineProps({
  studentId: {
    type: String,
    required: true
  },
  enrollmentId: {
    type: String,
    required: true
  },
  academicYear: {
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
        <InputText
          v-model="selectedSchoolLevel" disabled class="w-full md:w-14rem h-11" />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Enrollment Form</span>
        </div>
        <FileUpload class="u-bg-pcolor !rounded-2xl hover:u-bg-pcolor hover:transform hover:scale-[1.10] transition-all duration-300 ease-in-out grow" mode="basic" customUpload @uploader="confirmUpload" :multiple="true" accept="application/pdf" :maxFileSize="10485760" />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Current Saved File:</span>
        </div>
        <div class="flex gap-4 items-center">
          <span class="overflow-auto">{{ chosenFile }}</span>
          <Button label="X" text @click="cancelFile" severity="danger" class="h-8 w-4 !rounded-full" v-if="confirmedFile"/>  
        </div> 
      </div>
    </div>


    <div class="flex flex-col item-center basis-1/2 gap-8 pt-3 pr-16">
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-28 text-right ml-4">
          <span>FLT Pre-Test Score</span>
        </div>
        <InputNumber v-model="form.fltPretestScore" class="grow"/>
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
          class="grow md:w-14rem"
        />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Remarks</span>
        </div>
        <Textarea v-model="form.selectedRemarks" rows="5" cols="30" class="grow md:w-14rem" />
      </div>
      <div class="flex gap-4 mb-2 items-center place-self-end">
        <Button @click="updateEnrolled" outlined label="Update Learner" class="text-white u-bg-pcolor border-none hover:u-bg-pcolor mt-4" :disabled="checkChanges"/>
        <Button @click="cancelEdit" severity="danger" label="Cancel" class="mt-4"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>