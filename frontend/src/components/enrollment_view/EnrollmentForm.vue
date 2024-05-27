<script setup>
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import AutoComplete from 'primevue/autocomplete'
import DataView from 'primevue/dataview'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import { computed, ref } from 'vue'
import { useEnrollmentStore } from '@/stores/enrollment.js'
import { useStudentsStore } from '@/stores/students.js'
import { useTermStore } from '@/stores/term.js'
import { useUsersStore} from '@/stores/users.js'
import { useToast } from 'primevue/usetoast'
import { debounce } from 'lodash'

const enrollmentStore = useEnrollmentStore()
const studentsStore = useStudentsStore()
const termStore = useTermStore()
const usersStore = useUsersStore()

const toast = useToast()

const filteredLearners = ref([])

const schoolLevels = ref([])
const selectedFullName = ref()
const selectedLearnersList = ref([])
const editingStudent = ref(false)
const currentEditStudentIndex = ref()
const validSubmit = ref(false)
const confirmedFile = ref(false)

schoolLevels.value = termStore.activeTerm.class_levels

const notValid = computed(() => {
  return !form.value.selectedRegularity || !form.value.selectedSchoolLevelId || !confirmedFile.value;
});

const notEnrollmentValid = computed(() => {
  return !validSubmit.value || selectedLearnersList.value.length === 0 || selectedLearnersList.value.some(learner => learner.enrollmentForm === null || !learner.enrollmentForm)
});

const chosenFile = computed(() => {
  let currentLearner = selectedLearnersList.value[currentEditStudentIndex.value];
  return currentLearner && currentLearner.enrollmentFormName ? currentLearner.enrollmentFormName : "Please Upload an Enrollment Form";
})

const regularity = ref([
  { name: 'Regular', code: 'Regular' },
  { name: 'Hybrid', code: 'Hybrid' },
])

const form = ref()

form.value = {
  selectedSchoolLevelId: null,
  hasEnrollmentForm: null,
  digitalLiteracyScore: null,
  fltPretestScore: null,
  callable: null,
  bridger: null,
  selectedRegularity: null,
  selectedRemarks: null,
}

const search = debounce((event) => {
  if (!event.query.trim().length && event.query === "Type a Learner") {
    filteredLearners.value = studentsStore.students
  } else {
    filteredLearners.value = studentsStore.students.filter((student) => {
      return student.fullname.toLowerCase().startsWith(event.query.toLowerCase());
    });
  }
}, 300) // 300ms delay

function onSelectedLearner() {
  const selectedStudent = studentsStore.students.find(student => student.fullname === selectedFullName.value.fullname)
  // add an object that contains the student id, lrn, and fullname
  if (!selectedLearnersList.value.some(learner => learner.studentId === selectedStudent.id)) {
    selectedLearnersList.value.push({
      studentId: selectedStudent.id,
      lrn: selectedStudent.lrn,
      fullname: selectedStudent.fullname,
      currentTerm: termStore.activeTerm.id,
      selectedSchoolLevelId: null,
      fltPretestScore: null,
      selectedRegularity: null,
      selectedRemarks: null,
    })
  }
  
  editEnrolled(selectedLearnersList.value.length - 1)
  validSubmit.value = false
  confirmedFile.value = false
  
  // Clear the input field
  selectedFullName.value = null
}

function editEnrolled(index) {
  currentEditStudentIndex.value = index
  
  form.value.selectedSchoolLevelId = selectedLearnersList.value[index].selectedSchoolLevelId
  form.value.fltPretestScore = selectedLearnersList.value[index].fltPretestScore
  form.value.selectedRegularity = selectedLearnersList.value[index].selectedRegularity
  form.value.selectedRemarks = selectedLearnersList.value[index].selectedRemarks
  
  confirmedFile.value = !!selectedLearnersList.value[index].enrollmentForm;
  validSubmit.value = false
  
  editingStudent.value = true
}

function removeLearner(index) {
  if (currentEditStudentIndex.value === index) {
    editingStudent.value = false
  }
  selectedLearnersList.value.splice(index, 1)
}

function saveLearner() {
  let currentLearner = selectedLearnersList.value[currentEditStudentIndex.value];
  selectedLearnersList.value[currentEditStudentIndex.value] = {
    ...currentLearner,
    selectedSchoolLevelId: form.value.selectedSchoolLevelId,
    fltPretestScore: form.value.fltPretestScore,
    selectedRegularity: form.value.selectedRegularity,
    selectedRemarks: typeof form.value.selectedRemarks === 'string' ? form.value.selectedRemarks.trim() : form.value.selectedRemarks
  }
  
  validSubmit.value = true

  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Learner temporarily saved. Click Submit to enroll all.',
    life: 3000
  })
}

async function submitEvent() {
  try {
    await enrollmentStore.enrollLearners(selectedLearnersList.value)
    
    for (const learner of selectedLearnersList.value) {
      await usersStore.addAudit(`Enrolled student ${learner.fullname}`)
    }
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

function confirmUpload(event) {
  let currentLearner = selectedLearnersList.value[currentEditStudentIndex.value];
  
  selectedLearnersList.value[currentEditStudentIndex.value] = {
    ...currentLearner,
    enrollmentForm: event.files[0],
    enrollmentFormName: event.files[0].name
  }
  
  confirmedFile.value = true;
}

function cancelFile() {
  console.log("Current Edit Student Index: ", currentEditStudentIndex.value)
  let currentLearner = selectedLearnersList.value[currentEditStudentIndex.value];
  selectedLearnersList.value[currentEditStudentIndex.value] = {
    ...currentLearner,
    enrollmentForm: null,
    enrollmentFormName: null
  }
  
  confirmedFile.value = false;
}
</script>

<template>
  <div class="flex flex-row justify-center grow gap-20">

    <div class="flex flex-col item-center basis-1/2 gap-8 pt-3 pl-16">
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Full Name</span>
        </div>
        <AutoComplete
          v-model="selectedFullName"
          placeholder="Type a Learner"
          forceSelection
          dropdown
          optionLabel="fullname"
          :suggestions="filteredLearners"
          @complete="search" @item-select="onSelectedLearner"
          inputClass="w-[80]"
          class="basis-full h-11"
        />
      </div>
      <DataView :value="selectedLearnersList" 
        paginator :rows="5" :rowsPerPageOptions="[5, 10, 15]"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" class="w-fit">
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div class="flex flex-col item-center basis-1/2 gap-8 pt-3 pr-16">
                <div class="flex justify-between gap-16">
                  <div class="basis-32">
                    <span><span class="font-bold">Student:<br/></span>{{ item.fullname }}</span>
                  </div>
                  <div class="basis-32">
                    <span><span class="font-bold">LRN:<br/></span>{{ item.lrn }}</span>
                  </div>
                  <div class="flex gap-2">
                    <Button icon="fa fa-pencil" label="Edit" @click="editEnrolled(index)" class="u-bg-pcolor hover:u-bg-pcolor h-11 !p-6"/>
                    <Button icon="fa fa-xmark" @click="removeLearner(index)" label="Remove" severity="danger" class="h-11 !p-6"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
    
    <div v-if="editingStudent" class="flex flex-col item-center basis-1/2 gap-8 pt-3 pr-16">
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-28 text-right ml-4">
          <span>Enrollment Form<span class="text-red-500">*</span></span>
        </div>
        <FileUpload class="u-bg-pcolor !rounded-2xl hover:u-bg-pcolor hover:transform hover:scale-[1.10] transition-all duration-300 ease-in-out grow" mode="basic" customUpload @uploader="confirmUpload" :multiple="true" accept="application/pdf" :maxFileSize="10485760" />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-28 text-right ml-4">
          <span>Current Saved File:</span>
        </div>
        <div class="flex gap-4 items-center">
          <span class="overflow-auto">{{ chosenFile }}</span>
          <Button label="X" text @click="cancelFile" class="h-8 w-4 !rounded-full" severity="danger" v-if="confirmedFile"/>
        </div>
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-28 text-right ml-4">
          <span>FLT Pre-Test Score</span>
        </div>
        <InputNumber v-model="form.fltPretestScore" class="grow" :min="0" :max="100"/>
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Class Level<span class="text-red-500">*</span></span>
        </div>
        <Dropdown
          v-model="form.selectedSchoolLevelId"
          :options="schoolLevels"
          optionValue="id"
          optionLabel="school_level"
          placeholder="Select a Class Level"
          class="grow h-11"
        />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="text-right basis-32">
          <span>Regularity<span class="text-red-500">*</span></span>
        </div>
        <Dropdown
          v-model="form.selectedRegularity"
          :options="regularity"
          optionValue="code"
          optionLabel="name"
          placeholder="Select a Regularity"
          class="grow md:w-14rem"
        />
      </div>
      <div class="flex gap-10 mb-2 items-center">
        <div class="basis-32 text-right">
          <span>Remarks</span>
        </div>
        <Textarea v-model="form.selectedRemarks" rows="5" cols="30" class="grow md:w-14rem"/>
      </div>
      <div class="flex gap-4 mb-2 items-center place-self-end">
        <Button @click="saveLearner" label="Save Learner" class="mt-4 mb-10" :disabled="notValid"/>
        <Button v-if="validSubmit" @click="submitEvent" label="Enroll Learners" class="u-bg-pcolor hover:u-bg-pcolor mt-4 mb-10" :disabled="notEnrollmentValid"/>
      </div>
    </div>
    
  </div>
</template>

<style scoped>

</style>