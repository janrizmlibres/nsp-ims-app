import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useVolunteerStore = defineStore('volunteer', () => {
    async function getAllVolunteers() {
        const authStore = useAuthStore()

        const result = await axios.get('http://localhost:8080/volunteer/volunteers', {
        headers: { Authorization: 'Bearer ' + authStore.token }
        })

        return result.data.data
    }

    return { getAllVolunteers }
})
