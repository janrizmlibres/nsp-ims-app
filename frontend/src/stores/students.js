import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './auth'
import axios from 'axios'

export const useStudentsStore = defineStore('students', () => {
  const students = ref([])

  const studentsNormalized = computed(() => {
    return students.value.map((student) => {
      const { personal_info, contact_info, ...identity } = student

      delete Object.assign(personal_info, { ['personalInfoId']: personal_info['id'] })['id']
      delete Object.assign(contact_info, { ['contactInfoId']: personal_info['id'] })['id']

      return { ...identity, ...personal_info, ...contact_info }
    })
  })

  async function getStudents() {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/profile/students', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    students.value = result.data.students
  }

  async function addStudent(formData) {
    const authStore = useAuthStore()

    const result = await axios.post('http://localhost:8080/profile/add-student', formData, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  return { students, studentsNormalized, getStudents, addStudent }
})
