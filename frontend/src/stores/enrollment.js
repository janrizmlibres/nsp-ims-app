import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useEnrollmentStore = defineStore('enrollment', () => {
  const learners = ref([])
  const learner = ref(null)
  const editedTerm = ref(null)
  
  async function getAllEnrolledFromTerm(termID) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/enrollment/retrieve-from-term/${termID}`, 
      {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    learners.value = result.data.learners
  }
  
  async function getEnrolled(studentId, enrollmentId) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/enrollment/retrieve-enrolled/${lrn}/${termID}/${classLevel}`, 
      {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    learner.value = result.data.enrolled
  }
  
  function setEditedTerm(term) {
    editedTerm.value = term
  }
  
  async function enrollLearner(data) {
    
    const authStore = useAuthStore()
    
    await axios.post('http://localhost:8080/enrollment/enroll-learner', data, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
  }

  async function updateLearner(enrollmentId, data) {

    const authStore = useAuthStore()

    await axios.post('http://localhost:8080/enrollment/update-learner', {
      lrn,
      classLevelID,
      hasEnrollmentForm,
      digital_literacy,
      ftl_pretest,
      callable,
      bridger,
      regularity,
      remarks
    }, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
  }
  
  async function changeEnrolledStatus(enrollmentId, statusToChange) {
    const authStore = useAuthStore()

    await axios.post('http://localhost:8080/enrollment/change-enrollment-status', {
      lrn,
      academicYear,
      classLevel,
      statusToChange
    }, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
  }
  
  return {learners, learner, editedTerm, changeEnrolledStatus, setEditedTerm, getAllEnrolledFromTerm, enrollLearner, getEnrolled, updateLearner}
})