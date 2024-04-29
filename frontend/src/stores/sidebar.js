import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('sidebar', {
  state: () => ({
    isPinned: true,
  }),

  actions: {
    changePinnedState() {
      this.isPinned = !this.isPinned
    },
  }
})
