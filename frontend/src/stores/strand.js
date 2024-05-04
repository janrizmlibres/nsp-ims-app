import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useStrandStore = defineStore('strand', () => {
    const strand = ref()
    const visibleDialog = ref(false)

    async function getStrand(classLearningStrandId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/strand/${classLearningStrandId}`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        strand.value = result.data.data
    }

    function showHideDialog() {
        this.visibleDialog = !this.visibleDialog
    }

    return { strand, visibleDialog, getStrand, showHideDialog }
})


