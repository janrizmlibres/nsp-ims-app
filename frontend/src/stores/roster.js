import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useRosterStore = defineStore('roster', () => {
    const exportRef = ref()
    
    function exportCSV() {
        this.exportRef.exportCSV();
    }

    return ( { exportRef, exportCSV })
})
