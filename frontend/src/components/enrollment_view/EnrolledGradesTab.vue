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
</script>