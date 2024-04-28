import { defineStore } from 'pinia'

export const useTermStore = defineStore('term', {
  state: () => ({
    active_year: JSON.parse(sessionStorage.getItem('active_year')) || null
  }),
  

  actions: {
    setActiveYear(thatYear) {
      sessionStorage.setItem('active_year', JSON.stringify(thatYear))
    },
  
    removeItem() {
      sessionStorage.removeItem('active_year')
    }
  }
})
