<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DoughnutChart from './DoughnutChart.vue'

export default {
  components: {
    'font-awesome-icon': FontAwesomeIcon,
    DoughnutChart
  },
  props: {
    seriesData: {
      type: Array,
      required: true
    },
    widgetTitle: {
      type: String,
      required: true
    },
    totalText: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="widget">
    <div class="widget-wrapper">
      <DoughnutChart class="my-chart" :seriesData="seriesData" />
      <font-awesome-icon class="graduate-icon" :icon="['fas', 'user-graduate']" />
      <div class="widget-container">
        <div class="widget-title">{{ widgetTitle }}</div>
        <div class="gender-container">
          <div class="male-icon"></div>
          <div class="male-text">Male</div>
          <div class="female-icon"></div>
          <div class="female-text">Female</div>
        </div>
        <div class="total-container">
          <div class="total-text">{{ totalText }}</div>
          <button class="total-button">View List</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-chart {
  position: absolute;
  top: 2px;
  left: -11px;
  width: 169px;
  height: 169px;
  z-index: 1; /* place the chart behind other elements */
}
.graduate-icon {
  font-size: 55px; /* adjust as needed */
  margin-left: 50px;
  color: #11285e;
  position: relative;
}

.widget-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.widget-container {
  margin-left: 0px; /* adjust as needed */
}

.gender-container {
  display: flex;
  justify-content: space-between;
}

.male-text {
  font-size: 15px;
  color: #265492;
}

.female-text {
  font-size: 15px;
  color: #265492;
}

.total-text {
  font-weight: bold;
  font-size: 40px;
  width: 24px;
  color: #233255b2;
  margin-left: 60px;
}

.widget-title {
  font-weight: bold;
  font-size: 22px;
  margin-top: 0px; /* Adjust this value to move the title up/down */
  margin-left: 60px; /* Adjust this value to move the title left/right */
  color: #3c4043;
}

.widget {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Aligns children to the start on the main axis */
  align-items: flex-start; /* Aligns children to the start on the cross axis */
  width: 390px;
  height: 150px;
  background-color: white;
  border-radius: 10px;
  border-bottom: 5px solid #265492;
  padding: 10px; /* Add padding to the widget for better control of inner elements */
  margin-bottom: 20px;
  margin-right: 20px;
}

.total-container {
  display: flex;
  align-items: center;
}

.total-button {
  margin-top: 30px;
  margin-left: 90px;
  background-color: #265492;
  padding: 8px;
  color: white;
  border-radius: 10px;
  font-size: 12px;
}

.male-icon {
  margin-top: 7px;
  margin-left: 60px;
  width: 10px;
  height: 10px;
  background-color: #265492;
}

.female-icon {
  margin-top: 7px;
  margin-left: 40px;
  width: 10px;
  height: 10px;
  background-color: #bf9039;
}
</style>
