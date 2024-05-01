<template>
    <div class="widget">
        <div class="widget-wrapper">
            <DoughnutChart  class="my-chart" :seriesData="seriesData" />
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

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DoughnutChart from "@/components/dashboard_view/DoughnutChart.vue";

export default {
    components: {
        'font-awesome-icon': FontAwesomeIcon,
        DoughnutChart,
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

<style scoped>
.my-chart {
    position: absolute;
    top: 0.125rem;
    left: -0.6875rem;
    width: 10.5625rem;
    height: 10.5625rem;
    z-index: 1; /* place the chart behind other elements */
}
.graduate-icon {
    font-size: 3.4375rem; /* adjust as needed */
    margin-left: 3.125rem;
    color: #11285E;
    position: relative;
}

.widget-wrapper {
    display: flex;
    align-items: center;
    position: relative;
}

.gender-container {
  display: flex;
  justify-content: space-between;
}

.male-text{
  font-size: 0.9375rem;
  color: #265492;
}

.female-text{
  font-size: 0.9375rem;
  color: #265492;
}

.total-text{
  font-weight: bold;
  font-size: 2.5rem;
  width: 1.5rem;
  color: #233255B2;
  margin-left: 3.75rem;
}

.widget-title {
  font-weight: bold;
  font-size: 1.375rem;
  margin-left: 3.75rem; /* Adjust this value to move the title left/right */
  color: #3C4043;
}

.widget {
    display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Aligns children to the start on the main axis */
  align-items: flex-start; /* Aligns children to the start on the cross axis */
  width: 24.375rem;
  height: 9.375rem;
  background-color: white;
  border-radius: 0.625rem;
  border-bottom: 0.3125rem solid #265492;
  padding: 0.625rem; /* Add padding to the widget for better control of inner elements */
  margin-bottom: 1.25rem;
  margin-right: 1.25rem;
}

.total-container {
  display: flex;
  align-items: center;
}

.total-button {
  margin-top: 1.875rem;
  margin-left: 5.625rem;
  background-color: #265492;
  padding: 0.5rem;
  color: white;
  border-radius: 0.625rem;
  font-size: 0.75rem;
}

.male-icon {
  margin-top: 0.4375rem;
  margin-left: 3.75rem;
  width: 0.625rem;
  height: 0.625rem;
  background-color: #265492;
}

.female-icon {
  margin-top: 0.4375rem;
  margin-left: 2.5rem;
  width: 0.625rem;
  height: 0.625rem;
  background-color: #BF9039;
}
</style>