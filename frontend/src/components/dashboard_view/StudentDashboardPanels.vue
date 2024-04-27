<template>
    <div class="student-dashboard-panels">
        <div class="widget">
            <div class="widget-wrapper">
                <DoughnutChart class="my-chart"/>
                <font-awesome-icon class="graduate-icon" :icon="['fas', 'user-graduate']" />
                <div class="widget-container">
                    <div class="widget-title">LEARNERS</div>
                    <div class="gender-container">
                        <div class="male-icon"></div>
                        <div class="male-text">Male</div>
                        <div class="female-icon"></div>
                        <div class="female-text">Female</div>
                    </div>
                    <div class="total-container">
                        <div class="total-text">0</div>
                        <button class="total-button">View List</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="widget">
            <div class="widget-wrapper">
                <font-awesome-icon class="graduate-icon" :icon="['fas', 'user-graduate']" />
                <div class="widget-container">
                    <div class="widget-title">ELEMENTARY</div>
                    <div class="gender-container">
                        <div class="male-icon"></div>
                        <div class="male-text">Male</div>
                        <div class="female-icon"></div>
                        <div class="female-text">Female</div>
                    </div>
                    <div class="total-container">
                        <div class="total-text">0</div>
                        <button class="total-button">View List</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="widget">
            <div class="widget-wrapper">
                <font-awesome-icon class="graduate-icon" :icon="['fas', 'user-graduate']" />
                <div class="widget-container">
                    <div class="widget-title">JUNIOR HIGH</div>
                    <div class="gender-container">
                        <div class="male-icon"></div>
                        <div class="male-text">Male</div>
                        <div class="female-icon"></div>
                        <div class="female-text">Female</div>
                    </div>
                    <div class="total-container">
                        <div class="total-text">0</div>
                        <button class="total-button">View List</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="widget">
            <div class="widget-wrapper">
                <font-awesome-icon class="graduate-icon" :icon="['fas', 'user-graduate']" />
                <div class="widget-container">
                    <div class="widget-title">ACTIVE LEARNERS</div>
                    <div class="gender-container">
                        <div class="male-icon"></div>
                        <div class="male-text">Male</div>
                        <div class="female-icon"></div>
                        <div class="female-text">Female</div>
                    </div>
                    <div class="total-container">
                        <div class="total-text">0</div>
                        <button class="total-button">View List</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import DoughnutChart from "@/components/dashboard_view/DoughnutChart.vue";
  export default {
    name: "StudentDashboardPanels",
    components: {
    'font-awesome-icon': FontAwesomeIcon,
    DoughnutChart,
  }
    // Add any props, data, computed properties, methods, etc. that are needed
  };
  </script>
  
  <style scoped>
  .my-chart {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1; /* place the chart behind other elements */
}
  .graduate-icon {
    font-size: 55px; /* adjust as needed */
    margin-left: 50px;
    color: #11285E;
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

    .male-text{
        font-size: 15px;
        color: #265492;
    }

    .female-text{
        font-size: 15px;
        color: #265492;
    }

    .total-text{
        font-weight: bold;
        font-size: 40px;
        color: #233255B2;
        margin-left: 60px;
    }

    .widget-title {
        font-weight: bold;
        font-size: 22px;
        margin-top: 0px; /* Adjust this value to move the title up/down */
        margin-left: 60px; /* Adjust this value to move the title left/right */
        color: #3C4043;
    }

    .widget {
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Aligns children to the start on the main axis */
        align-items: flex-start; /* Aligns children to the start on the cross axis */
        width: 390px;
        height: 150px;
        background-color: white;
        margin-top: 20px;
        border-radius: 10px;
        border-bottom: 5px solid #265492;
        padding: 10px; /* Add padding to the widget for better control of inner elements */
    }

    .student-dashboard-panels {
        display: flex-start;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: 0px;
        margin-left: 10px;
        margin-right: 10px;
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
        background-color: #BF9039;
    }
  </style>