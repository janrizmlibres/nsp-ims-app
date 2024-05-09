import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useStrandStore = defineStore('strand', () => {
    const sessions = ref()
    const visibleAddModuleDialog = ref(false)
    const visibleAddSessionDialog = ref(false)

    async function getStrand(classLearningStrandId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/strand/${classLearningStrandId}`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        return result.data.data
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
        
        return result.data.data
    }

    async function addSession(classLearningStrandId, form) {
        const authStore = useAuthStore()

        await axios.post(`http://localhost:8080/strand/${classLearningStrandId}/session/add`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function getAllSessions(classLearningStrandId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/strand/${classLearningStrandId}/sessions`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        sessions.value = result.data.data
    }

    async function addSchedule(classLearningStrandId, form) {
        const authStore = useAuthStore()

        await axios.post(`http://localhost:8080/strand/${classLearningStrandId}/schedule/add`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function updateSchedule(scheduleId, form) {
        const authStore = useAuthStore()

        await axios.patch(`http://localhost:8080/strand/schedule/${scheduleId}/update`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function updateTeacher(classLearningStrandId, form) {
        const authStore = useAuthStore()

        await axios.patch(`http://localhost:8080/strand/${classLearningStrandId}/teacher/update`, form, {
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

    function showHideAddModuleDialog() {
        this.visibleAddModuleDialog = !this.visibleAddModuleDialog
    }

    function showHideAddSessionDialog() {
        this.visibleAddSessionDialog = !this.visibleAddSessionDialog
    }

    return { sessions, visibleAddModuleDialog, visibleAddSessionDialog, getStrand, addModule, getAllModules, addSession, getAllSessions, addSchedule, updateSchedule, updateTeacher, updateGrades, showHideAddModuleDialog, showHideAddSessionDialog}
})


