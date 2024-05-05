import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useClassStore = defineStore('class', () => {
    const classLevel = ref()
    const strands = ref()
    const modules = ref()
    const students = ref()
    const grades = ref()

    async function getClass(classId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/class/${classId}`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        classLevel.value = result.data.data
    }
    

    async function addLearningStrand(classId, form) {
        const authStore = useAuthStore()

        await axios.post(`http://localhost:8080/class/${classId}/learningStrand/add`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function addSchedule(classId, form) {
        const authStore = useAuthStore()

        await axios.post(`http://localhost:8080/class/${classId}/learningStrand/schedule/add`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function getAllStrands(classId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/class/${classId}/strands`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        strands.value = result.data.data
    }

    async function getAllModules(classId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/class/${classId}/modules`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        modules.value = result.data.data
    }

    async function getAllStudents(classId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/class/${classId}/students`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        students.value = result.data.data
    }

    async function updateStudentStatus(classId, learnerId, newStatus) {
        const authStore = useAuthStore()
    
        await axios.patch(
            `http://localhost:8080/class/${classId}/student/${learnerId}/changeStatus`,
            { newStatus },
            {
            headers: { Authorization: 'Bearer ' + authStore.token }
            }
        )
    }

    async function getAllGrades(classId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/class/${classId}/grades`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        grades.value = result.data.data
    }

    return { classLevel, strands, modules, students, grades, getClass, addLearningStrand, addSchedule, getAllStrands, getAllModules, getAllStudents, updateStudentStatus, getAllGrades }
})


