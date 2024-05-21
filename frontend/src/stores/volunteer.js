import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './auth'
import axios from 'axios'

export const useVolunteerStore = defineStore('volunteer', () => {
  const volunteers = ref([])

  const volunteersNormalized = computed(() => {
  return volunteers.value.map((volunteer) => {
    const { volunteer_personal_information, volunteer_contact_information, ...identity } = volunteer

    delete Object.assign(volunteer_personal_information, { ['personalInfoId']: volunteer_personal_information['id'] })['id']
    delete Object.assign(volunteer_contact_information, { ['contactInfoId']: volunteer_personal_information['id'] })['id']

    return { ...identity, ...volunteer_personal_information, ...volunteer_contact_information }
  })
})

  async function getAllVolunteers() {
    const authStore = useAuthStore()
    
    const result = await axios.get('http://localhost:8080/volunteer/volunteers', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    volunteers.value = result.data.volunteers
  }

  async function addVolunteer(formData) {
    const authStore = useAuthStore()

    const result = await axios.post('http://localhost:8080/volunteer/add-volunteer', formData, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  async function getVolunteer(volunteerId) {
  const authStore = useAuthStore()

  const result = await axios.get(`http://localhost:8080/volunteer/${volunteerId}`, {
    headers: { Authorization: 'Bearer ' + authStore.token }
  })

    return result
  }

  async function updateVolunteer(volunteerId, formData) {
  const authStore = useAuthStore()

  const result = await axios.put(`http://localhost:8080/volunteer/${volunteerId}`, formData, {
    headers: { Authorization: 'Bearer ' + authStore.token }
  })

    return result
  }
  
  return { volunteers, getAllVolunteers, addVolunteer, getVolunteer, updateVolunteer, volunteersNormalized }
})