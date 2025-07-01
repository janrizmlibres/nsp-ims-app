import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useClassLearningStrandStore = defineStore('classLearningStrand', () => {
  async function getClassLearningStrand(classLearningStrandId) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/api/v1/classLearningStrand/${classLearningStrandId}`,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.data
  }

  async function addModule(classLearningStrandId, form) {
    const authStore = useAuthStore()

    const result = await axios.post(
      `http://localhost:8080/api/v1/classLearningStrand/${classLearningStrandId}/module/add`,
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
      `http://localhost:8080/api/v1/classLearningStrand/${classLearningStrandId}/modules`,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.data
  }

  async function getModule(moduleId) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/api/v1/classLearningStrand/module/${moduleId}`,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.data
  }

  async function updateModule(moduleId, form) {
    const authStore = useAuthStore()

    const result = await axios.patch(
      `http://localhost:8080/api/v1/classLearningStrand/module/${moduleId}/update`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function updateModuleStatus(form) {
    const authStore = useAuthStore()

    const result = await axios.patch(
      `http://localhost:8080/api/v1/classLearningStrand/modules/update`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function deleteModules(form) {
    const authStore = useAuthStore()

    const result = await axios.delete(
      `http://localhost:8080/api/v1/classLearningStrand/modules/delete`,
      {
        data: form,
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function updateModuleSubmissions(updatedData) {
    const authStore = useAuthStore()

    const result = await axios.put(
      `http://localhost:8080/api/v1/classLearningStrand/module/moduleSubmissions/update`,
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
      `http://localhost:8080/api/v1/classLearningStrand/${classLearningStrandId}/session/add`,
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
      `http://localhost:8080/api/v1/classLearningStrand/${classLearningStrandId}/sessions`,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.data
  }

  async function getSession(sessionId) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/api/v1/classLearningStrand/session/${sessionId}`,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.data
  }

  async function updateSession(sessionId, form) {
    const authStore = useAuthStore()

    const result = await axios.patch(
      `http://localhost:8080/api/v1/classLearningStrand/session/${sessionId}/update`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function deleteSessions(form) {
    const authStore = useAuthStore()

    const result = await axios.delete(
      `http://localhost:8080/api/v1/classLearningStrand/sessions/delete`,
      {
        data: form,
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function updateAttendances(updatedData) {
    const authStore = useAuthStore()

    const result = await axios.put(
      `http://localhost:8080/api/v1/classLearningStrand/session/attendances/update`,
      updatedData,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    console.log(result);

    return result.data.message
  }

  async function addSchedule(classLearningStrandId, form) {
    const authStore = useAuthStore()

    const result = await axios.post(
      `http://localhost:8080/api/v1/classLearningStrand/${classLearningStrandId}/schedule/add`,
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
      `http://localhost:8080/api/v1/classLearningStrand/schedule/${scheduleId}/update`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function deleteSchedules(form) {
    const authStore = useAuthStore()

    const result = await axios.delete(
      `http://localhost:8080/api/v1/classLearningStrand/schedules/delete`,
      {
        data: form,
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function getAllGrades(classLearningStrandId) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/api/v1/classLearningStrand/${classLearningStrandId}/grades`,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.data
  }

  async function updateGrades(updatedData) {
    const authStore = useAuthStore()

    const result = await axios.put(
      'http://localhost:8080/api/v1/classLearningStrand/grades/update',
      updatedData,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  return {
    getClassLearningStrand,
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
