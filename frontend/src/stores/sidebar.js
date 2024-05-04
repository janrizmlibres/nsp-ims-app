import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  // State properties
  const isPinned = ref(true)
  const isHovering = ref(false)

  // Actions
  function changePinnedState() {
    isPinned.value = !isPinned.value
  }

  function handleMouseOver() {
    isHovering.value = true
  }

  function handleMouseLeave() {
    isHovering.value = false
  }

  // Return exposed state and actions
  return {
    isPinned,
    isHovering,
    changePinnedState,
    handleMouseOver,
    handleMouseLeave
  }
})