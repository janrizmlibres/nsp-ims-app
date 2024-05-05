import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useStrandStore = defineStore('strand', () => {
    const strand = ref()
    const modules = ref()
    const visibleDialog = ref(false)

    async function getStrand(classLearningStrandId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/strand/${classLearningStrandId}`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        strand.value = result.data.data
    }

    async function addModule(classLearningStrandId, form) {
        const authStore = useAuthStore()

        await axios.post(`http://localhost:8080/strand/${classLearningStrandId}/module/add`, form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
    }

    async function getAllModules(classLearningStrandId) {
        const authStore = useAuthStore()

        const result = await axios.get(`http://localhost:8080/strand/${classLearningStrandId}/modules`, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        
        modules.value = result.data.data
    }

    function showHideDialog() {
        this.visibleDialog = !this.visibleDialog
    }

    return { strand, modules, visibleDialog, getStrand, showHideDialog, addModule, getAllModules }
})


