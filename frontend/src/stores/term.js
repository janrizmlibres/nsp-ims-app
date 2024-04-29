import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useTermStore = defineStore('term', () => {
  const terms = ref([])
  const activeTerm = ref(JSON.parse(sessionStorage.getItem('activeTerm')))
  const activeClasses = ref(JSON.parse(sessionStorage.getItem('activeClasses')))

  async function getAllTerms() {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/term/terms', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    terms.value = result.data.staffs
  }

  async function addClass(formData) {
    const authStore = useAuthStore()

    const result = await axios.post('http://localhost:8080/term/add_class', formData, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  async function getActiveTerm() {
    const authStore = useAuthStore()

    const result = await axios.get(`http://localhost:8080/term/active`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
    sessionStorage.setItem('activeTerm', JSON.stringify(result.data.activeTerm))
    sessionStorage.setItem('activeClasses', JSON.stringify(result.data.activeTerm.class_levels))
    activeTerm.value = JSON.parse(sessionStorage.getItem('activeTerm'))
    activeClasses.value = JSON.parse(sessionStorage.getItem('activeClasses'))
  }

  return { terms, activeTerm, activeClasses, getAllTerms, addClass, getActiveTerm }
})
