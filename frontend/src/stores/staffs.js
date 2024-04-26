import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStaffsStore = defineStore('staffs', () => {
  const staffs = ref([])
  return { staffs }
})
