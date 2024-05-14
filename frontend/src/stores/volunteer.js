import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useVolunteerStore = defineStore('volunteer', () => {
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

  return { volunteers, getAllVolunteers }
})