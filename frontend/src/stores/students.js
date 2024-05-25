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

  async function getStudent(studentId) {
    const authStore = useAuthStore()

    const result = await axios.get(`http://localhost:8080/profile/student/${studentId}`, {
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

    const result = await axios.post('http://localhost:8080/profile/add-student', form, {
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

    const result = await axios.put(`http://localhost:8080/profile/student/${studentId}`, form, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  async function getGenderCount() {
    const authStore = useAuthStore();
    
    const result = await axios.get('http://localhost:8080/profile/gender-count', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    });
    
    return result;
  }

  return { students, studentsNormalized, getStudents, getStudent, addStudent, updateStudent, getGenderCount }
})
