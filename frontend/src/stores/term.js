import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'

const apiUrl = import.meta.env.VITE_API_ENDPOINT

export const useTermStore = defineStore('term', () => {
  const visibleAddTermDialog = ref(false)
  const activeTerm = ref()
  const chosenTerm = ref()
  const terms = ref([])

  async function getTerms() {
    const authStore = useAuthStore()

    const result = await axios.get(apiUrl + 'utilities/terms', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    terms.value = result.data.data
  }

  async function addTerm(dates) {
    const authStore = useAuthStore()

    await axios.post(apiUrl + 'utilities/term/create', dates, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
  }

  async function getTerm(termId) {
    const authStore = useAuthStore()

    const result = await axios.get(apiUrl + `term/${termId}`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.data
  }

  async function getActiveTerm() {
    const authStore = useAuthStore()

    const result = await axios.get(apiUrl + `term/active`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    activeTerm.value = result.data.data
  }

  function setChosenTerm(termId) {
    chosenTerm.value = termId
  }

  async function getAllTerms() {
    const authStore = useAuthStore()

    const result = await axios.get(apiUrl + `term/terms`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.data
  }

  function showHideAddTermDialog() {
    visibleAddTermDialog.value = !visibleAddTermDialog.value
  }

  return {
    terms,
    visibleAddTermDialog,
    activeTerm,
    chosenTerm,
    getTerms,
    addTerm,
    getActiveTerm,
    getTerm,
    getAllTerms,
    showHideAddTermDialog,
    setChosenTerm
  }
})
