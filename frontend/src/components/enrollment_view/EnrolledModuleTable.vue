<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { computed, defineProps, onMounted, ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { useEnrollmentStore } from '@/stores/enrollment.js'
import { useClassStore} from '@/stores/class.js'

const enrollmentStore = useEnrollmentStore()
const classStore = useClassStore()

const modules = computed(() => enrollmentStore.modules)

const toast = useToast()

const statuses = ref(['Complete', 'Lacking', 'No Submission']);
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

async function getEnrolledModules() {
  try {
    await enrollmentStore.getEnrolledModules(props.enrollmentId, learningStrandInput.value.id)

    console.log("Module Status " , enrollmentStore.modules)
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
    case 'Complete':
      return 'success';

    case 'Lacking':
      return 'warning';

    case 'No Submission':
      return 'danger';

    default:
      return null;
  }
};

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  lastName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  firstName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  middleName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  schoolLevel: { value: null, matchMode: FilterMatchMode.EQUALS },
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

  enrollmentStore.setModules([])
})
</script>

<template>
  <Dropdown
    v-model="learningStrandInput"
    :options="learningStrands"
    optionLabel="learning_strand.name"
    @change="getEnrolledModules"
    placeholder="Select a Strand"
    class="w-full mb-4" />
  <DataTable v-model:filters="filters"
             :value="modules" paginator
             :rows="10" dataKey="id"
             filterDisplay="menu"
             :globalFilterFields="['title', 'status', 'dateSubmitted', 'distributionDate']"
             removableSort>
    <column field="title" header="Title" sortable>
      <template #body="{ data }">
        {{ data.title }}
      </template>
      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by title" />
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
    <column field="dateSubmitted" header="Date Submitted" sortable>
      <template #body="{ data }">
        {{ data.dateSubmitted ? new Date(data.dateSubmitted).toISOString().split('T')[0] : '' }}
      </template>
    </column>
    <column field="distributionDate" header="Distribution Date" sortable>
      <template #body="{ data }">
        {{ data.distributionDate ? new Date(data.distributionDate).toISOString().split('T')[0] : '' }}
      </template>
    </column>
  </DataTable>
</template>