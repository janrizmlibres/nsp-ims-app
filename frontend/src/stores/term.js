import { defineStore } from 'pinia'

export const useTermStore = defineStore('term', {
  state: () => ({
    active_year: JSON.parse(sessionStorage.getItem('active_year')),
    active_class: JSON.parse(sessionStorage.getItem('active_classes'))
  }),
  
  actions: {
    setActiveYear(thatYear) {
      sessionStorage.setItem('active_year', JSON.stringify(thatYear))
      this.active_year = JSON.parse(sessionStorage.getItem('active_year'))
    },

    setActiveClasses(thatClasses) {
      sessionStorage.setItem('active_classes', JSON.stringify(thatClasses))
    },
  
    removeItem() {
      sessionStorage.removeItem('active_year')
    }
  }
})
