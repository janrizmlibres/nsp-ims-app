import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useModuleStore = defineStore('module', () => {

    async function getModule(moduleId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/module/${moduleId}`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        return result.data.data
    }

    async function updateModule(moduleId, form) {
        const authStore = useAuthStore()
    
        await axios.patch(
            `http://localhost:8080/module/${moduleId}/update`,
            form,
            {
            headers: { Authorization: 'Bearer ' + authStore.token }
            }
        )
    }

    async function updateModuleSubmission(moduleId, form) {
        const authStore = useAuthStore()
    
        await axios.patch(
            `http://localhost:8080/module/${moduleId}/updateSubmission`,
            form,
            {
            headers: { Authorization: 'Bearer ' + authStore.token }
            }
        )
    }

    return { getModule, updateModule, updateModuleSubmission }
})


