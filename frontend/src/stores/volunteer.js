import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'

export const useVolunteerStore = defineStore('volunteer', () => {
  const volunteers = ref()

  async function getAllVolunteers() {
    const authStore = useAuthStore()
    
    const response = await axios.get('http://localhost:8080/volunteer/volunteers', {
      headers: {
        'Authorization': `Bearer ${authStore.token}` // replace 'authStore.token' with your actual token path
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
  
  return { volunteers, getAllVolunteers, addVolunteer }
})