import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useEnrollmentStore = defineStore('enrollment', () => {
  const learners = ref([])
  
  async function getAllEnrolledFromTerm(termID) {
    const authStore = useAuthStore()

    const result = await axios.get(`http://localhost:8080/enrollment/retrieve-from-term/${termID}`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    learners.value = result.data.learners
    console.log(learners.value)
  }
  
  return {learners, getAllEnrolledFromTerm}
})