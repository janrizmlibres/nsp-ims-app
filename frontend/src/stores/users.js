import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])

  async function getAllUser(config) {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/admin/users', {
      params: config,
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    users.value = result.data.users
  }

  async function addUser(formData) {
    const authStore = useAuthStore()

    const result = await axios.post('http://localhost:8080/auth/signup', formData, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    await addAudit(`Created user with ID: ${result.data.user.id}`)
    return result
  }

  async function getUser(userId) {
    const authStore = useAuthStore()

    const result = await axios.get(`http://localhost:8080/admin/user/${userId}`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  async function updateUser(userId, formData) {
    const authStore = useAuthStore()

    delete formData.password
    const result = await axios.put(`http://localhost:8080/admin/user/${userId}`, formData, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    await addAudit(`Updated user with ID: ${userId}`)
    return result
  }

  async function updatePermissions(updatedData) {
    const authStore = useAuthStore()

    const result = await axios.put(
      'http://localhost:8080/admin/users/update-permissions',
      updatedData,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    const idList = []

    updatedData.updatedData.forEach((user) => {
      idList.push(user.id)
    })

    await addAudit(`Updated permissions for users with ID/s: ${idList.join(', ')}`)
    return result
  }

  async function updatePw(userId, newPw) {
    const authStore = useAuthStore()

    const result = await axios.patch(
      `http://localhost:8080/admin/user/${userId}`,
      { newPw },
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    await addAudit(`Updated password for user with ID: ${userId}`)
    return result
  }

  async function addAudit(description) {
    const authStore = useAuthStore()

    const result = await axios.post(
      `http://localhost:8080/admin/user/add-audit`,
      { userId: authStore.user.id, description, date: new Date() },
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    return result
  }

  return {
    users,
    getAllUser,
    addUser,
    getUser,
    updateUser,
    updatePermissions,
    updatePw,
    addAudit
  }
})
