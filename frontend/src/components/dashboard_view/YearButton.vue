<template>
    <button class="year-button" @click="toggleDatePicker">
      <font-awesome-icon :icon="['fas', 'filter']" />
      Year
    </button>
    <vue3-datepicker v-if="showDatePicker" v-model="selectedDate"></vue3-datepicker>
  </template>
  
  <script>
  import Vue3Datepicker from 'vue3-datepicker';
  
  export default {
    name: 'YearButton',
    components: {
      Vue3Datepicker,
    },
    data() {
      return {
        showDatePicker: false,
        selectedDate: null,
      };
    },
    methods: {
      toggleDatePicker() {
        this.showDatePicker = !this.showDatePicker;
      },
    },
  };
  </script>
  
  <style scoped>
    .year-button {
    align-self: flex-end;
    display: block;
    margin: 0 0 0 auto; /* Align the button to the right */
    background-color: white;
    color: black;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    width: 100px; /* Adjust this value to your needs */
  }
  </style>