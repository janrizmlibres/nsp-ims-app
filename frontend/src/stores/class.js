import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useClassStore = defineStore('class', () => {
    async function getClass(classId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/class/${classId}`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        return result.data.data
    }

    async function getAllStrands(classId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/class/${classId}/strands`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        return result.data.data
    }

    async function getAllStudents(classId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/class/${classId}/students`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        return result.data.data
    }

    async function getAllGrades(classId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/class/${classId}/grades`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        return result.data.data
    }

    return { getClass, getAllStrands, getAllStudents, getAllGrades }
})


