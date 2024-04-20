import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSideBarStateStore = defineStore('sidebar-state', {
    state: () => ({
        isExpanded: true,
    }),
    actions: {
        changeState() {
            this.isExpanded = !this.isExpanded
        }
    }
})
