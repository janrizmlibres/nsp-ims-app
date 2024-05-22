import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('token') || null)
  const refreshToken = ref(sessionStorage.getItem('refreshToken') || null)
  const user = ref(JSON.parse(sessionStorage.getItem('user')) || null)
  const isAuthenticated = computed(() => token.value !== null)

  async function login(inputUserId, password) {
    const result = await axios.post('http://localhost:8080/auth/login', {
      userId: inputUserId,
      password
    })

    const tokenData = result.data.token
    const refreshTokenData = result.data.refreshToken
    const userData = result.data.user

    /*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
    const { id, userId, createdAt, updatedAt, ...cleanedPerms } = userData.permissions
    userData.permissions = cleanedPerms

    sessionStorage.setItem('token', tokenData)
    sessionStorage.setItem('refreshToken', refreshTokenData)
    sessionStorage.setItem('user', JSON.stringify(userData))

    token.value = tokenData
    refreshToken.value = refreshTokenData
    user.value = userData
  }

  /**
   * Extend the session of the current user.
   * This is done by sending a refresh token to the server.
   * If the server accepts the refresh token, a new token is issued.
   * If the server rejects the refresh token, the user is logged out.
   */
  async function extendSession() {
    try {
      const result = await axios.post('http://localhost:8080/auth/refresh-token', {
        refreshToken: refreshToken.value
      })

      const newTokenData = result.data.token
      const newRefreshTokenData = result.data.refreshToken

      sessionStorage.setItem('token', newTokenData)
      sessionStorage.setItem('refreshToken', newRefreshTokenData)

      token.value = newTokenData
      refreshToken.value = newRefreshTokenData
    } catch (error) {
      console.error('Failed to refresh token', error)
      await logout()
    }
  }

  async function logout() {
    try {
      await axios.post('http://localhost:8080/auth/logout', {
        token: token.value,
        refreshToken: refreshToken.value
      })
    } catch (error) {
      console.error('Failed to logout', error)
    }

    sessionStorage.removeItem('token')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('user')

    token.value = null
    refreshToken.value = null
    user.value = null
  }

  return { token, refreshToken, user, isAuthenticated, login, logout, extendSession }
})
