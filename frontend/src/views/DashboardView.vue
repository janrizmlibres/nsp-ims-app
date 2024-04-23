<template>
  <ContentPane>
    <div class="container">
      <div class="dashboard-text">Dashboard</div>
      <div class="widget"></div>
      <div class="widget"></div>
      <div class="widget"></div>
      <div class="widget"></div>
    </div>
    <div class="middle-container">
      <button class="year-button" @click="showDatePicker = !showDatePicker">
        <font-awesome-icon :icon="['fas', 'filter']" />
        Year
      </button>
      <vue3-datepicker v-if="showDatePicker" v-model="selectedDate"></vue3-datepicker>
      <div class="middle-widget"></div>
      <div class="middle-widget"></div>
    </div>
  </ContentPane>
</template>

<script>
import ContentPane from '@/components/UI/ContentPane.vue';
import Vue3Datepicker from 'vue3-datepicker';

export default {
  name: 'DashboardView',
  components: {
    Vue3Datepicker,
    ContentPane
  },
  data() {
    return {
      showDatePicker: false,
      selectedDate: null
    };
  }
};
</script>

<style scoped>
  .container {
    display: flex-start;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .dashboard-text {
    font-weight: bold;
    font-size: 30px;
  }

  .widget {
    width: 350px;
    height: 150px;
    background-color: white;
    margin-top: 20px;
    border-radius: 10px;
    border-bottom: 5px solid #265492;
  }

  .middle-container {
    position: absolute;
    top: 184px;
    left: 680px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
  }

  .middle-widget {
    width: 1000px;
    height: 320px;
    background-color: white;
    margin-top: 20px;
    border-radius: 10px;
    border-bottom: 5px solid #265492;
  }

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