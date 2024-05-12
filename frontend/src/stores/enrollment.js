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
  
  async function enrollLearner(learnerID, classLevelID, modularity, remarks) {
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