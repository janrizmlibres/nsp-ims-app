<template>
  <ContentPane>
    <div class="dashboard-text">Dashboard</div>
    <StudentDashboardPanels />
    <div class="student-dashboard-panels">
    </div>
    <div class="middle-container">
        <YearButton />
      <div class="middle-widget"></div>
      <div class="middle-widget"></div>
    </div>
  </ContentPane>
</template>

<script>
import ContentPane from "@/components/UI/ContentPane.vue";
import YearButton from "@/components/dashboard_view/YearButton.vue"; // import the YearButton component
import StudentDashboardPanels from "@/components/dashboard_view/StudentDashboardPanels.vue"; // import the StudentDashboardPanels component

export default {
  name: "DashboardView",
  components: {
    ContentPane,
    YearButton, // register the YearButton component
    StudentDashboardPanels, // register the StudentDashboardPanels component
  },
  // ... other options ...
};
</script>

<style scoped>
  .dashboard-text {
    font-weight: bold;
    font-size: 30px;
    margin-top: 50px;
    margin-left: 10px;
  }
  .middle-container {
    position: absolute;
    top: 184px;
    left: 720px;
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
    position: relative; /* Add this line */
  }
</style>