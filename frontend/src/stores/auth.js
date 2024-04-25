import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('token') || null)
  const userId = ref(sessionStorage.getItem('userId') || null)
  const isAuthenticated = computed(() => !!token.value)

  return { token, userId, isAuthenticated }
})
