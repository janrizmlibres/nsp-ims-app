import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useGradeStore = defineStore('grade', () => {
    const grade = ref()

    async function updateGrade(gradeId, form) {
        const authStore = useAuthStore()
    
        await axios.patch(
            `http://localhost:8080/grade/${gradeId}/updateGrade`,
            form,
            {
            headers: { Authorization: 'Bearer ' + authStore.token }
            }
        )
    }

    return { grade, updateGrade }
})


