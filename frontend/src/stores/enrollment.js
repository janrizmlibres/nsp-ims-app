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
      `http://localhost:8080/enrollment/${studentId}/${enrollmentId}/retrieve`, 
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

    await axios.patch(`http://localhost:8080/enrollment/${enrollmentId}/update`, data, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
  }
  
  async function changeEnrolledStatus(enrollmentId, statusToChange) {
    const authStore = useAuthStore()

    await axios.patch(`http://localhost:8080/enrollment/${enrollmentId}/status/update`, {
      statusToChange
    }, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
  }
  
  return {
    learners, 
    learner, 
    editedTerm,
    changeEnrolledStatus, 
    setEditedTerm, 
    getAllEnrolledFromTerm, 
    enrollLearners, 
    getEnrolled, 
    updateLearner,
    setModules,
    getEnrolledModules,
    getEnrolledGrades,
    setGrades,
    getEnrolledAttendance,
    setAttendance
  }
})