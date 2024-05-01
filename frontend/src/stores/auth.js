import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('token') || null)
  const userId = ref(sessionStorage.getItem('userId') || null)
  const userName = ref(sessionStorage.getItem('userName') || null)
  const isAuthenticated = computed(() => token.value !== null)

  function login(thatToken, thatUserId, thatUserName) {
    sessionStorage.setItem('token', thatToken)
    sessionStorage.setItem('userId', thatUserId)
    sessionStorage.setItem('userName', thatUserName)
    token.value = thatToken
    userId.value = thatUserId
    userName.value = thatUserName
  }

  function logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    token.value = null
    userId.value = null
  }

  return { token, userId, userName, isAuthenticated, login, logout }
})
