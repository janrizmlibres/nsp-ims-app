import { defineStore } from 'pinia'

export const useSideBarStateStore = defineStore('sidebar-state', {
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
