import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStaffsStore = defineStore('staffs', () => {
  const staffs = ref([])
  const isFirstLoad = ref(true)

  function addStaff(staff) {
    staffs.value.push(staff)
  }

  return { staffs, isFirstLoad, addStaff }
})
