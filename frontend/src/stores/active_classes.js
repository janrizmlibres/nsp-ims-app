import { defineStore } from 'pinia'

export const useTermStore = defineStore('term', {
  state: () => ({
    
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
