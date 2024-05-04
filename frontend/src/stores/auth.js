import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('token') || null)
  const refreshToken = ref(sessionStorage.getItem('refreshToken') || null)
  const staff = ref(JSON.parse(sessionStorage.getItem('staff')) || null)
  const isAuthenticated = computed(() => token.value !== null)
  
  async function login(userId, password) {
    const result = await axios.post('http://localhost:8080/auth/login', { userId, password })

    const tokenData = result.data.token
    const refreshTokenData = result.data.refreshToken
    const staffData = result.data.staff

    /*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
    const { id, staffId, createdAt, updatedAt, ...cleanedPerms } = staffData.permissions
    staffData.permissions = cleanedPerms

    sessionStorage.setItem('token', tokenData)
    sessionStorage.setItem('refreshToken', refreshTokenData)
    sessionStorage.setItem('staff', JSON.stringify(staffData))

    token.value = tokenData
    refreshToken.value = refreshTokenData
    staff.value = staffData
  }

  /**
   * Extend the session of the current user.
   * This is done by sending a refresh token to the server.
   * If the server accepts the refresh token, a new token is issued.
   * If the server rejects the refresh token, the user is logged out.
   */
  async function extendSession() {
    try {
      const result = await axios.post('http://localhost:8080/auth/refresh-token', { refreshToken: refreshToken.value })

      const newTokenData = result.data.token
      const newRefreshTokenData = result.data.refreshToken

      sessionStorage.setItem('token', newTokenData)
      sessionStorage.setItem('refreshToken', newRefreshTokenData)

      token.value = newTokenData
      refreshToken.value = newRefreshTokenData
    } catch (error) {
      console.error('Failed to refresh token', error)
      logout()
    }
  }

  function logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('staff')
    token.value = null
    staff.value = null
  }
  
  return { token, refreshToken, staff, isAuthenticated, login, logout, extendSession }
})