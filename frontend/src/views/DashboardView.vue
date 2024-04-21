<template>
  <div class="container">
    <span class="logout-text">
      <img class="logo" src="../views/LogoutIco.png" alt="Logout Logo"> Logout
    </span>
  </div>
</template>

<script>
export default {
  name: 'App',
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
    margin-right: 5px; /* Add some margin between logo and text */
    @apply w-2 h-2; /* Apply larger size using Tailwind utility classes */
  }
</style>
