import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useUtilitiesStore = defineStore('utilities', () => {
    const strands = ref([])
    const visibleAddStrandDialog = ref(false)
    const requirements = ref([])
    const visibleAddRequirementDialog = ref(false)

    // for Learning Strands
    async function addLearningStrand(strands) {
        const authStore = useAuthStore()

        await axios.post('http://localhost:8080/utilities/strand/create', strands, {
        headers: {Authorization: 'Bearer ' + authStore.token}
        })
    }

    async function getLearningStrands() {
        const authStore = useAuthStore()

        const result = await axios.get('http://localhost:8080/strands', {
        headers: {Authorization: 'Bearer ' + authStore.token}
        })
        console.log(result.data.data);
        requirements.value = result.data.data
    } 

    
    function showHideAddStrandDialog() {
        visibleAddStrandDialog.value = !visibleAddStrandDialog.value
    }

    
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

    return { strands, visibleAddStrandDialog, addLearningStrand, getLearningStrands, showHideAddStrandDialog, requirements, visibleAddRequirementDialog, addRequirement, getRequirements, showHideAddRequirementDialog }
})
