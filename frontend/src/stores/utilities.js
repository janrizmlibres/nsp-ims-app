import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useUtilitiesStore = defineStore('utilities', () => {
    async function getLearningStrands() {
        const authStore = useAuthStore()

        const result = await axios.get('http://localhost:8080/utilities/strands', {
        headers: { Authorization: 'Bearer ' + authStore.token }
        })

        return result.data.data
    }

    return { getLearningStrands }
})
