<template>
  <div class="container">
    <span class="logout-text">
      <font-awesome-icon :icon="['fass', 'right-from-bracket']" class="logo" /> Logout
    </span>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSignOutAlt as sharpSignOutAlt } from "@fortawesome/free-solid-svg-icons";

library.add(sharpSignOutAlt); // Add the sharp sign-out icon to the library

export default {
  name: 'App',
  components: {
    FontAwesomeIcon, // Register the Vue component
  },
};
</script>

<style scoped>
  .container {
    /* Optional styles for the entire container */
  }

  .logout-text {
    position: fixed;
    top: 15px;
    right: 50px;
    padding: 10px;
    font-size: 15px;
    display: flex; /* Make logout text a flex container */
    align-items: center; /* Align logo and text vertically */
    cursor: pointer; /* Indicate clickable behavior (optional) */
  }

  .logo {
    margin-right: 10px; /* Add some margin between logo and text */
    width: 1.5rem; /* Example width adjustment */
    height: 1.5rem; /* Example height adjustment */
    color: inherit; /* Inherit color from parent element */
  }
</style>
