import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useStaffsStore = defineStore('staffs', () => {
  const staffs = ref([])

  async function getAllStaff(config) {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/admin/staffs', {
      params: config,
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

    const result = await axios.get(`http://localhost:8080/admin/staff/${userId}`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  async function updateStaff(userId, formData) {
    const authStore = useAuthStore()

    delete formData.password
    const result = await axios.put(`http://localhost:8080/admin/staff/${userId}`, formData, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  async function updatePermissions(updatedData) {
    const authStore = useAuthStore()

    const result = await axios.put(
      'http://localhost:8080/admin/staffs/update-permissions',
      updatedData,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result
  }

  async function updatePw(userId, newPw) {
    const authStore = useAuthStore()

    const result = await axios.patch(
      `http://localhost:8080/admin/staff/${userId}`,
      { newPw },
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result
  }

  return { staffs, getAllStaff, addStaff, getStaff, updateStaff, updatePermissions, updatePw }
})
