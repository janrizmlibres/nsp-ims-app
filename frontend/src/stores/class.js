import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'

export const useClassStore = defineStore('class', () => {
  const leave = ref(true)

  async function getClass(classId) {
      const authStore = useAuthStore()

      const result = await axios.get(`http://localhost:8080/api/v1/class/${classId}`, {
          headers: {Authorization: 'Bearer ' + authStore.token},
      })

      return result.data.data
  }

  async function getClassSchedules(classId) {
    const authStore = useAuthStore()

    const result = await axios.get(`http://localhost:8080/api/v1/class/${classId}/schedules`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.data
  }

  async function addLearningStrands(form) {
    const authStore = useAuthStore()

    const result = await axios.post(
      `http://localhost:8080/api/v1/class/strands/add`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function getAllLearningStrands(classId) {
      const authStore = useAuthStore()

      const result = await axios.get(`http://localhost:8080/api/v1/class/${classId}/strands`, {
          headers: {Authorization: 'Bearer ' + authStore.token},
      })
      
      return result.data.data
  }

  async function removeStrands(form) {
    const authStore = useAuthStore()

    const result = await axios.delete(
      `http://localhost:8080/api/v1/class/strands/remove`,
      {
        data: form,
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.message
  }

  async function getAllModules(classId) {
      const authStore = useAuthStore()

      const result = await axios.get(`http://localhost:8080/api/v1/class/${classId}/modules`, {
          headers: {Authorization: 'Bearer ' + authStore.token},
      })
      
      return result.data.data
  }

  async function getAllStudents(classId) {
    const authStore = useAuthStore()

    const result = await axios.get(`http://localhost:8080/api/v1/class/${classId}/students`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result.data.data
  }

  async function getStudent(classId, enrollmentId) {
    const authStore = useAuthStore()

    const result = await axios.get(
      `http://localhost:8080/api/v1/class/${classId}/${enrollmentId}/student`,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result.data.data
  }

  return { leave, getClass, getClassSchedules, addLearningStrands, getAllLearningStrands, removeStrands, getAllModules, getAllStudents, getStudent }
})
