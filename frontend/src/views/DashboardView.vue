<template>
  <div class="container">
    <div class="dashboard-text">Dashboard</div>
    <div class="widget"></div>
    <div class="widget"></div>
    <div class="widget"></div>
    <div class="widget"></div>
  </div>
  <div class="middle-container">
    <button class="year-button">
    <font-awesome-icon :icon="['fas', 'filter']" />
    Year
    </button>
    <div class="middle-widget"></div>
    <div class="middle-widget"></div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView'
};
</script>

<style scoped>
  .container {
    display: flex-start;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 100px;
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
    bottom: 55px;
    left: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
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