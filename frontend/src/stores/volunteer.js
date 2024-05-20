import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'
import axios from 'axios'

export const useVolunteerStore = defineStore('volunteer', () => {
  const volunteers = ref()

  async function getAllVolunteers() {
    const authStore = useAuthStore()
    
    const response = await axios.get('http://localhost:8080/volunteer/volunteers', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });

    if (Array.isArray(response.data.data)) {
      volunteers.value = response.data.data.map(volunteer => ({
        ...volunteer
      }));
    }
  }

  async function addVolunteer(formData) {
    const authStore = useAuthStore()

    const result = await axios.post('http://localhost:8080/volunteer/add-volunteer', formData, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    return result
  }

  async function getVolunteer(id) {
  const authStore = useAuthStore()

  const result = await axios.get(`http://localhost:8080/volunteer/${id}`, {
    headers: { Authorization: 'Bearer ' + authStore.token }
  })

    return result
  }

  async function updateVolunteer(id, formData) {
  const authStore = useAuthStore()

  const result = await axios.put(`http://localhost:8080/volunteer/${id}`, formData, {
    headers: { Authorization: 'Bearer ' + authStore.token }
  })

    return result
  }
  
  return { volunteers, getAllVolunteers, addVolunteer, getVolunteer, updateVolunteer }
})