import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useStaffsStore = defineStore('staffs', () => {
  const staffs = ref([])

  async function getAllStaff() {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/admin/staffs', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    staffs.value = result.data.staffs
  }

  async function addStaff(formData) {
    const authStore = useAuthStore()

    const result = await axios.post('http://localhost:8080/auth/signup', formData, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    staffs.value.push(result.data.user)
    return result
  }

  async function getStaff(userId) {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/admin/staff', {
      params: { userId: userId },
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  async function updateStaff(userId, formData) {
    const authStore = useAuthStore()

    delete formData.password
    const result = await axios.put('http://localhost:8080/admin/staff', formData, {
      params: { userId: userId },
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  return { staffs, getAllStaff, addStaff, getStaff, updateStaff }
})
