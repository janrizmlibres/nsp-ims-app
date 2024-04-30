import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('sidebar', {
  state: () => ({
    isPinned: true,
    isExpanded: true,
    isHovering: false, // add isHovering to the state
  }),

  actions: {
    changePinnedState() {
      this.isPinned = !this.isPinned
    },
  
    changeExpansionState() {
      this.isExpanded = !this.isExpanded
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