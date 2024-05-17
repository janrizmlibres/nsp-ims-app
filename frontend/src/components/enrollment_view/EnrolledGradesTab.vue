<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown'
import { useToast } from 'primevue/usetoast'
import { computed, defineProps, onMounted, ref } from 'vue'
import { useEnrollmentStore } from '@/stores/enrollment.js'
import { useClassStore} from '@/stores/class.js'

const enrollmentStore = useEnrollmentStore()
const classStore = useClassStore()

const grades = computed(() => enrollmentStore.grades)

const toast = useToast()

const learningStrands = ref()
const learningStrandInput = ref(null)

async function getLearningStrands() {
  try {
    learningStrands.value = await classStore.getAllLearningStrands(props.schoolLevelId)

    console.log("Learning Strands: ", learningStrands.value)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Unexpected error encountered. Please refresh this page.',
      life: 3000
    })
  }
}

async function getEnrolledGrades() {
  try {
    await enrollmentStore.getEnrolledGrades(props.enrollmentId, learningStrandInput.value.id)

    console.log("Grades: ", enrollmentStore.grades)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Unexpected error encountered. Please refresh this page.',
      life: 3000
    })
  }
}

const props = defineProps({
  schoolLevelId: {
    type: String,
    required: true
  },
  enrollmentId: {
    type: String,
    required: true
  },
})



onMounted(() => {
  getLearningStrands()

  enrollmentStore.setGrades([])
})

</script>
<template>
  <Dropdown
    v-model="learningStrandInput"
    :options="learningStrands"
    optionLabel="learning_strand.name"
    @change="getEnrolledGrades"
    placeholder="Select a Strand"
    class="w-full mb-4" />
  <DataTable
    :value="grades"
    :rows="10" dataKey="id" >
    <column field="firstQuarter" header="Q1">
      <template #body="{ data }">
        <div v-if="data.firstQuarter"><span class="text-lime-600 font-bold">&#10003;</span></div> <!-- This is a check mark -->
        <div v-else>X</div>
      </template>
    </column>
    <column field="secondQuarter" header="Q2">
      <template #body="{ data }">
        <div v-if="data.secondQuarter"><span class="text-lime-600 font-bold">&#10003;</span></div> <!-- This is a check mark -->
        <div v-else>X</div>
      </template>
    </column>
    <column field="thirdQuarter" header="Q3">
      <template #body="{ data }">
        <div v-if="data.thirdQuarter"><span class="text-lime-600 font-bold">&#10003;</span></div><!-- This is a check mark -->
        <div v-else>X</div>
      </template>
    </column>
    <column field="fourthQuarter" header="Q4">
      <template #body="{ data }">
        <div v-if="data.fourthQuarter"><span class="text-lime-600 font-bold">&#10003;</span></div> <!-- This is a check mark -->
        <div v-else>X</div>
      </template>
    </column>
    <column field="remarks" header="Remarks" />
  </DataTable>
</template>