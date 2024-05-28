import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

const apiUrl = import.meta.env.VITE_API_ENDPOINT

export const useClassLearningStrandStore = defineStore('classLearningStrand', () => {
  async function getStrand(classLearningStrandId) {
    const authStore = useAuthStore()

    const result = await axios.get(apiUrl + `classLearningStrand/${classLearningStrandId}`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.data
  }

  async function addModule(classLearningStrandId, form) {
    const authStore = useAuthStore()

    const result = await axios.post(
      apiUrl + `classLearningStrand/${classLearningStrandId}/module/add`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function getAllModules(classLearningStrandId) {
    const authStore = useAuthStore()

    const result = await axios.get(
      apiUrl + `classLearningStrand/${classLearningStrandId}/modules`,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.data
  }

  async function getModule(moduleId) {
    const authStore = useAuthStore()

    const result = await axios.get(apiUrl + `classLearningStrand/module/${moduleId}`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.data
  }

  async function updateModule(moduleId, form) {
    const authStore = useAuthStore()

    const result = await axios.patch(
      apiUrl + `classLearningStrand/module/${moduleId}/update`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function updateModuleStatus(form) {
    const authStore = useAuthStore()

    const result = await axios.patch(apiUrl + `classLearningStrand/modules/update`, form, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.message
  }

  async function deleteModules(form) {
    const authStore = useAuthStore()

    const result = await axios.delete(apiUrl + `classLearningStrand/modules/delete`, {
      data: form,
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.message
  }

  async function updateModuleSubmissions(updatedData) {
    const authStore = useAuthStore()

    const result = await axios.put(
      apiUrl + `classLearningStrand/module/moduleSubmissions/update`,
      updatedData,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function addSession(classLearningStrandId, form) {
    const authStore = useAuthStore()

    const result = await axios.post(
      apiUrl + `classLearningStrand/${classLearningStrandId}/session/add`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function getAllSessions(classLearningStrandId) {
    const authStore = useAuthStore()

    const result = await axios.get(
      apiUrl + `classLearningStrand/${classLearningStrandId}/sessions`,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.data
  }

  async function getSession(sessionId) {
    const authStore = useAuthStore()

    const result = await axios.get(apiUrl + `classLearningStrand/session/${sessionId}`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.data
  }

  async function updateSession(sessionId, form) {
    const authStore = useAuthStore()

    const result = await axios.patch(
      apiUrl + `classLearningStrand/session/${sessionId}/update`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function deleteSessions(form) {
    const authStore = useAuthStore()

    const result = await axios.delete(apiUrl + `classLearningStrand/sessions/delete`, {
      data: form,
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.message
  }

  async function updateAttendances(updatedData) {
    const authStore = useAuthStore()

    const result = await axios.put(
      apiUrl + `classLearningStrand/session/attendances/update`,
      updatedData,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function addSchedule(classLearningStrandId, form) {
    const authStore = useAuthStore()

    const result = await axios.post(
      apiUrl + `classLearningStrand/${classLearningStrandId}/schedule/add`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function updateSchedule(scheduleId, form) {
    const authStore = useAuthStore()

    const result = await axios.patch(
      apiUrl + `classLearningStrand/schedule/${scheduleId}/update`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function deleteSchedules(form) {
    const authStore = useAuthStore()

    const result = await axios.delete(apiUrl + `classLearningStrand/schedules/delete`, {
      data: form,
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.message
  }

  async function getAllGrades(classLearningStrandId) {
    const authStore = useAuthStore()

    const result = await axios.get(apiUrl + `classLearningStrand/${classLearningStrandId}/grades`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.data
  }

  async function updateGrades(updatedData) {
    const authStore = useAuthStore()

    const result = await axios.put(apiUrl + 'classLearningStrand/grades/update', updatedData, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.message
  }

  return {
    getStrand,
    addModule,
    getAllModules,
    getModule,
    updateModule,
    updateModuleStatus,
    deleteModules,
    updateModuleSubmissions,
    addSession,
    getAllSessions,
    getSession,
    updateSession,
    deleteSessions,
    updateAttendances,
    addSchedule,
    updateSchedule,
    deleteSchedules,
    getAllGrades,
    updateGrades
  }
})
