import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './auth'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_ENDPOINT

export const useStudentsStore = defineStore('students', () => {
  const students = ref([])
  const studentsWithClassLevel = ref([])

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

    const result = await axios.get(apiUrl + 'profile/students', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    students.value = result.data.students
  }

  async function getStudent(studentId) {
    const authStore = useAuthStore()

    const result = await axios.get(apiUrl + `profile/student/${studentId}`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  async function addStudent(formData) {
    const authStore = useAuthStore()

    const form = new FormData()
    form.append('image', formData.identity.photoUrl)

    delete formData.identity.photoUrl

    for (const key in formData) {
      form.append(key, JSON.stringify(formData[key]))
    }

    const result = await axios.post(apiUrl + 'profile/add-student', form, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  async function updateStudent(studentId, formData) {
    const authStore = useAuthStore()

    console.log(formData.identity)

    const form = new FormData()
    form.append('image', formData.identity.photoUrl)

    for (const key in formData) {
      form.append(key, JSON.stringify(formData[key]))
    }

    const result = await axios.put(apiUrl + `profile/student/${studentId}`, form, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  async function updateStudentRequirements(studentId, requirementInfos) {
    const authStore = useAuthStore()

    const result = await axios.patch(
      `http://localhost:8080/profile/student/${studentId}/requirements`,
      { requirement_infos: requirementInfos },
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result
  }

  async function getStudentsWithClassLevel() {
    const authStore = useAuthStore()

    const result = await axios.get(apiUrl + 'profile/students-with-class-level', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    studentsWithClassLevel.value = result.data.students
  }

  return {
    students,
    studentsNormalized,
    studentsWithClassLevel,
    getStudents,
    getStudent,
    addStudent,
    updateStudent,
    updateStudentRequirements,
    getStudentsWithClassLevel
  }
})
