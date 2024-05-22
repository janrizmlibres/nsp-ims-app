<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag'
import Dropdown from 'primevue/dropdown'
import { useToast } from 'primevue/usetoast'
import { computed, defineProps, onMounted, ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useEnrollmentStore } from '@/stores/enrollment.js'
import { useClassStore} from '@/stores/class.js'

const enrollmentStore = useEnrollmentStore()
const classStore = useClassStore()

const modules = computed(() => enrollmentStore.attendance)

const toast = useToast()

const statuses = ref(['Present', 'Absent']);
const learningStrands = ref()
const learningStrandInput = ref(null)

async function getLearningStrands() {
  try {
    learningStrands.value = await classStore.getAllLearningStrands(props.schoolLevelId)

    console.log("Learning Strands: ", learningStrands.value)
  } catch (error) {
    console.log(error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Unexpected error encountered. Please refresh this page.',
      life: 3000
    })
  }
}

async function getEnrolledAttendance() {
  try {
    await enrollmentStore.getEnrolledAttendance(props.enrollmentId, learningStrandInput.value.id)
  
  } catch (error) {
    console.log(error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Unexpected error encountered. Please refresh this page.',
      life: 3000
    })
  }
}

const getSeverity = (data) => {
  switch (data) {
    case 'Present':
      return 'success';

    case 'Absent':
      return 'danger';

    default:
      return null;
  }
};

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS }
});

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

  enrollmentStore.setAttendance([])
})
</script>

<template>
  <Dropdown
    v-model="learningStrandInput"
    :options="learningStrands"
    optionLabel="learning_strand.name"
    @change="getEnrolledAttendance"
    placeholder="Select a Strand"
    class="w-full mb-4" />
  <DataTable v-model:filters="filters"
             :value="modules" paginator
             :rows="10" dataKey="id"
             filterDisplay="menu"
             :globalFilterFields="['sessionDate', 'status']"
             removableSort>
    <column field="sessionDate" header="Session Date" sortable>
      <template #body="{ data }">
        {{ data.sessionDate ? new Date(data.sessionDate).toISOString().split('T')[0] : '' }}
      </template>
    </column>

    <Column header="Status" filterField="status" :showFilterMatchModes="false" :filterMenuStyle="{ width: '7rem' }" style="min-width: 7rem">
      <template #body="{ data }">
        <div class="flex align-items-center gap-2">
          <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </div>
      </template>
      <template #filter="{ filterModel }">
        <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Select One" class="p-column-filter">
          <template #option="slotProps">
            <div class="flex align-items-center gap-2">
              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>

    <column frozen field="remarks" header="Remarks" />
  </DataTable>
</template>