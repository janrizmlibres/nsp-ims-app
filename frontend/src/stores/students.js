import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'
import axios from 'axios'

export const useStudentsStore = defineStore('students', () => {
  const students = ref([])

  async function getStudents() {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/profile/students', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    students.value = result.data.students
  }

  return { students, getStudents }
})
