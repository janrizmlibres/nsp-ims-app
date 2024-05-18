import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useClassLearningStrandStore = defineStore('classLearningStrand', () => {
    async function getStrand(classLearningStrandId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/classLearningStrand/${classLearningStrandId}`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        return result.data.data
    }

    async function addModule(classLearningStrandId, form) {
        const authStore = useAuthStore()

        await axios.post(`http://localhost:8080/classLearningStrand/${classLearningStrandId}/module/add`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function getAllModules(classLearningStrandId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/classLearningStrand/${classLearningStrandId}/modules`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        return result.data.data
    }

    async function getModule(moduleId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/classLearningStrand/module/${moduleId}`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        return result.data.data
    }

    async function updateModule(moduleId, form) {
        const authStore = useAuthStore()
    
        await axios.patch(
            `http://localhost:8080/classLearningStrand/module/${moduleId}/update`,
            form,
            {
            headers: { Authorization: 'Bearer ' + authStore.token }
            }
        )
    }

    async function deleteModules(form) {
        const authStore = useAuthStore()
    
        await axios.delete(
            `http://localhost:8080/classLearningStrand/modules/delete`,
            {
                data: form,
                headers: { Authorization: 'Bearer ' + authStore.token }
            }
        )
    }

    async function updateModuleSubmissions(updatedData) {
        const authStore = useAuthStore()
    
        await axios.put(
            `http://localhost:8080/classLearningStrand/module/moduleSubmissions/update`,
            updatedData,
            {
            headers: { Authorization: 'Bearer ' + authStore.token }
            }
        )
    }

    async function addSession(classLearningStrandId, form) {
        const authStore = useAuthStore()

        await axios.post(`http://localhost:8080/classLearningStrand/${classLearningStrandId}/session/add`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function getAllSessions(classLearningStrandId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/classLearningStrand/${classLearningStrandId}/sessions`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        return result.data.data
    }

    async function getSession(sessionId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/classLearningStrand/session/${sessionId}`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        return result.data.data
    }

    async function updateSession(sessionId, form) {
        const authStore = useAuthStore()
    
        await axios.patch(
            `http://localhost:8080/classLearningStrand/session/${sessionId}/update`,
            form,
            {
            headers: { Authorization: 'Bearer ' + authStore.token }
            }
        )
    }

    async function updateAttendances(updatedData) {
        const authStore = useAuthStore()
    
        await axios.put(
            `http://localhost:8080/classLearningStrand/session/attendances/update`,
            updatedData,
            {
            headers: { Authorization: 'Bearer ' + authStore.token }
            }
        )
    }

    async function addSchedule(classLearningStrandId, form) {
        const authStore = useAuthStore()

        await axios.post(`http://localhost:8080/classLearningStrand/${classLearningStrandId}/schedule/add`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function updateSchedule(scheduleId, form) {
        const authStore = useAuthStore()

        await axios.patch(`http://localhost:8080/classLearningStrand/schedule/${scheduleId}/update`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function getAllGrades(classLearningStrandId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/classLearningStrand/${classLearningStrandId}/grades`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        return result.data.data
    }

    async function updateGrades(updatedData) {
        const authStore = useAuthStore()

        await axios.put('http://localhost:8080/classLearningStrand/grades/update', updatedData, {
            headers: { Authorization: 'Bearer ' + authStore.token }
        })

        const idList = []

        updatedData.updatedData.forEach((learner) => {
            idList.push(learner.id)
        })
    }

    return {
        getStrand, 
        addModule, getAllModules, getModule, updateModule, deleteModules, updateModuleSubmissions, 
        addSession, getAllSessions, getSession, updateSession, updateAttendances,
        addSchedule, updateSchedule, 
        getAllGrades, updateGrades
    }
})


