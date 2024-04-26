<template>
  <ContentPane>
    <div class="dashboard-text">Dashboard</div>
    <StudentDashboardPanels />
    <div class="student-dashboard-panels">
    </div>
    <div class="middle-container">
      <YearButton />
      <LineChart />
      <BarChart />
    </div>
  </ContentPane>
</template>

<script>
import ContentPane from "@/components/UI/ContentPane.vue";
import YearButton from "@/components/dashboard_view/YearButton.vue"; // import the YearButton component
import StudentDashboardPanels from "@/components/dashboard_view/StudentDashboardPanels.vue"; // import the StudentDashboardPanels component
import BarChart from "@/components/dashboard_view/BarChart.vue"; // import the StudentDashboardPanels component
import LineChart from "@/components/dashboard_view/LineChart.vue";

export default {
  name: "DashboardView",
  components: {
    ContentPane,
    YearButton, // register the YearButton component
    StudentDashboardPanels, // register the StudentDashboardPanels component
    BarChart,
    LineChart,
  },
  // ... other options ...
 
};
</script>

<style scoped>
  .dashboard-text {
    font-weight: bold;
    font-size: 30px;
    margin-top: 45px;
    margin-left: 10px;
  }
  .middle-container {
    position: absolute;
    top: 120px;
    left: 720px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    margin-bottom: 10px;
  }
</style>