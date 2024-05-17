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


