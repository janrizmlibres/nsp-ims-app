import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'

export const useUtilitiesStore = defineStore('utilities', () => {
    const learningStrands = ref()

    async function getLearningStrands() {
        const authStore = useAuthStore()

        const result = await axios.get('http://localhost:8080/utilities/strands', {
        headers: { Authorization: 'Bearer ' + authStore.token }
        })

        learningStrands.value = result.data.data
    }

    async function createTerm(form) {
        const authStore = useAuthStore()

        await axios.post(`http://localhost:8080/utilities/terms/create`, form, {
        headers: { Authorization: 'Bearer ' + authStore.token }
        })
    }

    return { learningStrands, getLearningStrands, createTerm }
})
