import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSideBarStateStore = defineStore('sidebar-state', () => {
  const isPinned = ref(true)
  const isExpanded = ref(true)

  function changePinnedState() {
    isPinned.value = !isPinned.value
  }

  function changeExpansionState() {
    isExpanded.value = !isExpanded.value
  }

  return { isPinned, isExpanded, changePinnedState, changeExpansionState }
})
