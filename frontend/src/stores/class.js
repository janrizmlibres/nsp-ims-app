import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useClassStore = defineStore('class', () => {
    const allStrands = ref(JSON.parse(sessionStorage.getItem('allStrands')))

    async function count(formData) {
        const authStore = useAuthStore()

        const result = await axios.get('http://localhost:8080/class/count', {
            headers: {Authorization: 'Bearer ' + authStore.token},
            data: formData
        })

        return result
    }

    async function getClass(form) {
        const authStore = useAuthStore()

        const result = await axios.post('http://localhost:8080/class/getClass', form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        return result
    }
    

    async function addLearningStrand(form) {
        const authStore = useAuthStore()

        const result = await axios.post('http://localhost:8080/class/addLearningStrand', form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        console.log(result);
    }

    async function addSchedule(form) {
        const authStore = useAuthStore()

        const result = await axios.post('http://localhost:8080/class/learningStrand/addSchedule', form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })

        console.log(result);
    }

    async function getAllStrands(form) {
        const authStore = useAuthStore()

        const result = await axios.post('http://localhost:8080/class/allStrands', form, {
            headers: {Authorization: 'Bearer ' + authStore.token},
        })
        console.log(result.data.learningStrands);
        sessionStorage.setItem('allStrands', JSON.stringify(result.data.learningStrands))
        allStrands.value = JSON.parse(sessionStorage.getItem('allStrands'))
    }

    return { allStrands, count, getClass, addLearningStrand, addSchedule, getAllStrands }
})


