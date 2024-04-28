<template>
  <ContentPane>
    <div class="dashboard-text">Dashboard</div>
    <StudentDashboardPanels />
    <div class="student-dashboard-panels">
        <StudentWidget :seriesData="[50, 50]" widgetTitle="LEARNERS" totalText="100" />
        <StudentWidget :seriesData="[30, 70]" widgetTitle="ELEMENTARY" totalText="60" />
        <StudentWidget :seriesData="[80, 20]" widgetTitle="JUNIOR HIGH" totalText="120" />
        <StudentWidget :seriesData="[60, 40]" widgetTitle="ACTIVE LEARNERS" totalText="180" />
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
import StudentWidget from "@/components/dashboard_view/StudentWidget.vue";
import BarChart from "@/components/dashboard_view/BarChart.vue"; // import the StudentDashboardPanels component
import LineChart from "@/components/dashboard_view/LineChart.vue";

export default {
  name: "DashboardView",
  components: {
    ContentPane,
    YearButton, // register the YearButton component
    StudentWidget, // register the StudentDashboardPanels component
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
  .student-dashboard-panels {
        display: flex-start;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: 0px;
        margin-left: 10px;
        margin-right: 10px;
    }
</style>