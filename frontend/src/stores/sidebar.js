import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('sidebar', {
  state: () => ({
    isPinned: true,
    isExpanded: true
  }),

  actions: {
    changePinnedState() {
      this.isPinned = !this.isPinned
    },
  
    changeExpansionState() {
      this.isExpanded = !this.isExpanded
    }
  }
})
