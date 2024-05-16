import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'

export const useUtilitiesStore = defineStore('utilities', () => {
    const terms = ref([])

    async function getTerms() {
        const authStore = useAuthStore()

        const result = await axios.get('http://localhost:8080/utilities/terms', {
        headers: { Authorization: 'Bearer ' + authStore.token }
        })

        terms.value = result.data.data
    }
    
    async function getLearningStrands() {
        const authStore = useAuthStore()

        const result = await axios.get('http://localhost:8080/utilities/strands', {
        headers: { Authorization: 'Bearer ' + authStore.token }
        })

        return result.data.data
    }

    return { terms, getLearningStrands, getTerms }
})
