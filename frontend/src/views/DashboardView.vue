<template>
  <div class="container">
    <div class="dashboard-text">Dashboard</div>
    <div class="widget"></div>
    <div class="widget"></div>
    <div class="widget"></div>
    <div class="widget"></div>
  </div>
  <div class="middle-container">
    <div class="middle-widget"></div>
    <div class="middle-widget"></div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
};
</script>

<style scoped>
  .container {
    display: flex-start;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 70px;
  }

  .dashboard-text {
    font-weight: bold;
    font-size: 30px;
  }

  .widget {
    width: 290px;
    height: 130px;
    background-color: white;
    margin-top: 10px;
    border-radius: 10px;
  }

  .middle-container {
    position: absolute;
    bottom: 25px;
    left: 315px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .middle-widget {
    width: 900px;
    height: 269px;
    background-color: white;
    margin-top: 10px;
    border-radius: 10px;
  }
</style>