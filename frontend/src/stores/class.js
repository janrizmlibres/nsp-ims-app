import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'

export const useClassStore = defineStore('class', () => {
    const leave = ref(true)

    async function getClassSchedules(classId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/class/${classId}/schedules`, {
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

    async function getStudent(classId, enrollmentId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/class/${classId}/${enrollmentId}/student`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        return result.data.data
    }

    return { leave, getClassSchedules, getAllStudents, getStudent }
})


