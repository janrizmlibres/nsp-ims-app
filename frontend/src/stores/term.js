import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'

export const useTermStore = defineStore('term', () => {
  const activeTerm = ref()

  async function getAllTerms() {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/term/terms', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.data
  }

  async function addClass(formData) {
    const authStore = useAuthStore()

    const result = await axios.post('http://localhost:8080/term/add_class', formData, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.data
  }

  async function getActiveTerm() {
    const authStore = useAuthStore()

    const result = await axios.get(`http://localhost:8080/term/active`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
    
    activeTerm.value = result.data.data
  }

  return { activeTerm, getAllTerms, addClass, getActiveTerm }
})
