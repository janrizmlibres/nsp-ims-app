import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useStrandStore = defineStore('strand', () => {
    const strand = ref()
    const modules = ref()
    const grades = ref()
    const visibleDialog = ref(false)

    async function getStrand(classLearningStrandId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/strand/${classLearningStrandId}`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        strand.value = result.data.data
    }

    async function addModule(classLearningStrandId, form) {
        const authStore = useAuthStore()

        await axios.post(`http://localhost:8080/strand/${classLearningStrandId}/module/add`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function getAllModules(classLearningStrandId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/strand/${classLearningStrandId}/modules`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        modules.value = result.data.data
    }

    async function getAllGrades(classLearningStrandId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/strand/${classLearningStrandId}/grades`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        grades.value = result.data.data
    }

    async function updateTeacher(classLearningStrandId, form) {
        const authStore = useAuthStore()

        await axios.patch(`http://localhost:8080/strand/${classLearningStrandId}/teacher/update`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function updateSchedule(scheduleId, form) {
        const authStore = useAuthStore()

        await axios.patch(`http://localhost:8080/strand/schedule/${scheduleId}/update`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function updateGrades(updatedData) {
        const authStore = useAuthStore()

        await axios.put('http://localhost:8080/strand/grades/update', updatedData, {
            headers: { Authorization: 'Bearer ' + authStore.token }
        })

        const idList = []

        updatedData.updatedData.forEach((learner) => {
            idList.push(learner.id)
        })
    }

    function showHideDialog() {
        this.visibleDialog = !this.visibleDialog
    }

    return { strand, modules, grades, visibleDialog, getStrand, showHideDialog, addModule, getAllModules, getAllGrades, updateTeacher, updateSchedule, updateGrades }
})


