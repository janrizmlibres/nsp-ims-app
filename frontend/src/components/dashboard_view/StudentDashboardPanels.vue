<template>
    <div class="student-dashboard-panels">
        <div class="widget">
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
      <div class="widget">
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
      <div class="widget">
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
      <div class="widget">
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
  </template>
  
  <script>
  export default {
    name: 'StudentDashboardPanels',
    // Add any props, data, computed properties, methods, etc. that are needed
  };
  </script>
  
  <style scoped>
    .gender-container {
        display: flex;
        justify-content: space-between;
    }

    .male-text{
        font-size: 15px;
        color: #265492;
        margin-left: 10px;
    }

    .female-text{
        font-size: 15px;
        color: #265492;
        margin-left: 10px;
    }

    .total-text{
        font-weight: bold;
        font-size: 40px;
        color: #233255B2;
        margin-left: 120px;
    }

    .widget-title {
        font-weight: bold;
        font-size: 22px;
        margin-top: 0px; /* Adjust this value to move the title up/down */
        margin-left: 120px; /* Adjust this value to move the title left/right */
        color: #3C4043;
    }

    .widget {
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Aligns children to the start on the main axis */
        align-items: flex-start; /* Aligns children to the start on the cross axis */
        width: 350px;
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
    margin-left: 120px;
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