<template>
<ContentPane header="Staff Records">
  <div>
    <h1>Add Volunteer</h1>
    <form @submit.prevent="addVolunteer">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="volunteer.name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="volunteer.email" required>
      </div>
      <button type="submit">Add Volunteer</button>
    </form>
  </div>
</ContentPane>
</template>

<script>
import ContentPane from '@/components/UI/ContentPane.vue'
export default {
    name: "VolunteerRecordsView",
    components: {
        ContentPane
    },
  data() {
    return {
      volunteer: {
        name: '',
        email: ''
      }
    };
  },
  methods: {
    addVolunteer() {
      // Add the volunteer to your data store.
      // You'll need to implement this based on how your application should handle new volunteers.
    }
  }
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>