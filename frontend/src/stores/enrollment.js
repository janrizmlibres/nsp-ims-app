import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useEnrollmentStore = defineStore('enrollment', () => {
  const learners = ref([])
  const learner = ref(null)
  const editedTerm = ref(null)
  const allEnrolled = ref([])

  async function getAllEnrolledFromTerm(termID) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/api/v1/enrollment/retrieve-from-term/${termID}`,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    learners.value = result.data.learners
  }

  async function getEnrolled(studentId, enrollmentId) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/api/v1/enrollment/${studentId}/${enrollmentId}/retrieve`,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    learner.value = result.data.enrolled
  }

  function setEditedTerm(term) {
    editedTerm.value = term
  }

  async function enrollLearners(data) {
    const authStore = useAuthStore()

    const form = new FormData()

    data.forEach((learner, index) => {
      // Append learner data as a JSON string
      form.append(`learners[${index}]`, JSON.stringify(learner))

      // Append each enrollmentForm file with the same field name
      if (Array.isArray(learner.enrollmentForm)) {
        learner.enrollmentForm.forEach((file) => {
          form.append('enrollmentForm', file)
        })
      } else {
        form.append('enrollmentForm', learner.enrollmentForm)
      }
    })

    await axios.post('http://localhost:8080/api/v1/enrollment/enroll-learner', form, {
      headers: {
        Authorization: 'Bearer ' + authStore.token,
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async function updateLearner(enrollmentId, data) {
    const authStore = useAuthStore()

    const form = new FormData()

    form.append('enrollmentForm', data.enrollmentForm)

    for (const key in data) {
      form.append(key, JSON.stringify(data[key]))
    }

    await axios.patch(`http://localhost:8080/api/v1/enrollment/${enrollmentId}/update`, form, {
      headers: {
        Authorization: 'Bearer ' + authStore.token,
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async function changeEnrolledStatus(enrollmentId, status) {
    const authStore = useAuthStore()

    await axios.patch(
      `http://localhost:8080/api/v1/enrollment/${enrollmentId}/status/update`,
      {
        status
      },
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )
  }

  async function getAllEnrollments() {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/api/v1/enrollment/enrollments', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    allEnrolled.value = result.data
  }

  return {
    learners,
    learner,
    editedTerm,
    allEnrolled,
    changeEnrolledStatus,
    setEditedTerm,
    getAllEnrolledFromTerm,
    enrollLearners,
    getEnrolled,
    updateLearner,
    getAllEnrollments
  }
})
