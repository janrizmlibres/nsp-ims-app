import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'

export const useUtilitiesStore = defineStore('utilities', () => {
    const requirements = ref([])
    const visibleAddRequirementDialog = ref(false)
    
    // for Student Requirements
    async function addRequirement(requirement) {
        const authStore = useAuthStore()

        await axios.post('http://localhost:8080/utilities/requirement/create', requirement, {
        headers: {Authorization: 'Bearer ' + authStore.token}
        })
    }

    async function getRequirements() {
        const authStore = useAuthStore()

        const result = await axios.get('http://localhost:8080/utilities/requirements', {
        headers: {Authorization: 'Bearer ' + authStore.token}
        })
        console.log(result.data.data);
        requirements.value = result.data.data
    } 

    function showHideAddRequirementDialog() {
        visibleAddRequirementDialog.value = !visibleAddRequirementDialog.value
    }

    return { requirements, visibleAddRequirementDialog, addRequirement, getRequirements, showHideAddRequirementDialog }
})
