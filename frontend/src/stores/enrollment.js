import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useEnrollmentStore = defineStore('enrollment', () => {
  const learners = ref([])
  const learner = ref(null)
  
  async function getAllEnrolledFromTerm(termID) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/enrollment/retrieve-from-term/${termID}`, 
      {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    learners.value = result.data.learners
    console.log(learners.value)
  }
  
  async function getEnrolled(lrn, termID, classLevel) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/enrollment/retrieve-enrolled/${lrn}/${termID}/${classLevel}`, 
      {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    learner.value = result.data.enrolled
  }
  
  async function enrollLearner(
    lrn, 
    classLevelID, 
    hasEnrollmentForm, 
    digital_literacy, 
    ftl_pretest, 
    callable, 
    bridger, 
    regularity, 
    remarks) {
    
    const authStore = useAuthStore()

    await axios.post('http://localhost:8080/enrollment/enroll-learner', {
      learnerID,
      classLevelID,
      modularity,
      remarks
    }, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
  }
  
  return {learners, getAllEnrolledFromTerm}
})