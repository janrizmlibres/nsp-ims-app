import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'

export const useVolunteerStore = defineStore('volunteer', () => {
    const volunteers = ref()

    async function getAllVolunteers() {
        const authStore = useAuthStore()

        const result = await axios.get('http://localhost:8080/volunteer/volunteers', {
        headers: { Authorization: 'Bearer ' + authStore.token }
        })

        volunteers.value = result.data.data
    }

    return { volunteers, getAllVolunteers }
})
