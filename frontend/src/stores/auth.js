import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('token') || null)
  const userId = ref(sessionStorage.getItem('userId') || null)

  return { token, userId }
})
