import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('token') || null)
  const userId = ref(sessionStorage.getItem('userId') || null)
  const isAuthenticated = computed(() => token.value !== null)

  function login(thatToken, thatUserId) {
    sessionStorage.setItem('token', thatToken)
    sessionStorage.setItem('userId', thatUserId)
    token.value = thatToken
    userId.value = thatUserId
  }

  function logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    token.value = null
    userId.value = null
  }

  return { token, userId, isAuthenticated, login, logout }
})
