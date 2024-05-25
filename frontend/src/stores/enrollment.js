import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useEnrollmentStore = defineStore('enrollment', () => {
  const learners = ref([])
  const learner = ref(null)
  const editedTerm = ref(null)
  const modules = ref([])
  const grades = ref([])
  const attendance = ref([])
  
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
  
  async function getEnrolledModules(enrollmentId, classLearningStrandId) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/enrollment/retrieve-modules/${enrollmentId}/${classLearningStrandId}`, 
      {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    modules.value = result.data.modules
    console.log("modules", modules.value)
  }
  
  function setModules(modules) {
    modules.value = modules
  }
  
  async function getEnrolledGrades(enrollmentId, classLearningStrandId) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/enrollment/retrieve-grades/${enrollmentId}/${classLearningStrandId}`, 
      {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    grades.value = result.data.grades
  }
  
  function setGrades(grades) {
    grades.value = grades
  }
  
  async function getEnrolledAttendance(enrollmentId, classLearningStrandId) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/enrollment/retrieve-attendance/${enrollmentId}/${classLearningStrandId}`, 
      {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    attendance.value = result.data.attendance
    console.log("attendance", attendance.value)
  }
  
  function setAttendance(attendance) {
    attendance.value = attendance
  }

  async function getAllEnrollments() {
    const authStore = useAuthStore()
  
    const result = await axios.get('http://localhost:8080/enrollment/enrollments', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
  
    return result.data
  }

  async function getStatusCount() {
  const authStore = useAuthStore()

  const result = await axios.get('http://localhost:8080/enrollment/status-count', {
    headers: { Authorization: 'Bearer ' + authStore.token }
  })

  return result.data
}
  
  
  return {
    learners, 
    learner, 
    editedTerm, 
    modules,
    grades,
    attendance,
    changeEnrolledStatus, 
    setEditedTerm, 
    getAllEnrolledFromTerm, 
    enrollLearner, 
    getEnrolled, 
    updateLearner,
    setModules,
    getEnrolledModules,
    getEnrolledGrades,
    setGrades,
    getEnrolledAttendance,
    setAttendance,
    getAllEnrollments,
    getStatusCount
  }
})