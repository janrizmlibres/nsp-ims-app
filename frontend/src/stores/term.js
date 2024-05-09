import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'

export const useTermStore = defineStore('term', () => {
  const visibleAddTermDialog = ref(false)
  const activeTerm = ref()
  const terms = ref([])

  async function getTerms() {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/utilities/terms', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    terms.value = result.data.data
  }

  async function addTerm(dates) {
    const authStore = useAuthStore()
    
    await axios.post('http://localhost:8080/utilities/term/create', dates, {
      headers: {Authorization: 'Bearer ' + authStore.token}
    })
  }

  async function getActiveTerm() {
    const authStore = useAuthStore()

    const result = await axios.get(`http://localhost:8080/term/active`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
    
    activeTerm.value = result.data.data
  }

  function showHideAddTermDialog() {
    visibleAddTermDialog.value = !visibleAddTermDialog.value
  }

  return { terms, visibleAddTermDialog, activeTerm, getTerms, addTerm, getActiveTerm, showHideAddTermDialog }
})