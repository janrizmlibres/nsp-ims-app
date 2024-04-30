import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const isPinned = ref(true)

  function changePinnedState() {
    isPinned.value = !isPinned.value
  }

  return({ isPinned, changePinnedState })
})
