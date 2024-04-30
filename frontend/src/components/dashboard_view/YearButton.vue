<template>
    <button class="button" @click="toggleDatePicker">
      <font-awesome-icon :icon="['fas', 'filter']" />
      Year
    </button>
  </template>
  
  <script>
  </script>
  
  <style scoped>
    .button {
    background-color: white;
    color: black;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    width: 100px; /* Adjust this value to your needs */
  }
  </style>