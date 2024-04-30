import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('sidebar', {
  state: () => ({
    isPinned: true,
    isHovering: false, // add isHovering to the state
  }),

  actions: {
    changePinnedState() {
      this.isPinned = !this.isPinned
    },
    
    // add actions to change the value of isHovering
    handleMouseOver() {
      this.isHovering = true;
    },

    handleMouseLeave() {
      this.isHovering = false;
    }
  }
})