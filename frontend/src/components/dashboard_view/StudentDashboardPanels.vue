<template>
    <div class="student-dashboard-panels">
        <StudentWidget :seriesData="[50, 50]" widgetTitle="LEARNERS" totalText="100" />
        <StudentWidget :seriesData="[30, 70]" widgetTitle="ELEMENTARY" totalText="60" />
        <StudentWidget :seriesData="[80, 20]" widgetTitle="JUNIOR HIGH" totalText="120" />
        <StudentWidget :seriesData="[60, 40]" widgetTitle="ACTIVE LEARNERS" totalText="180" />
    </div>
  </template>
  
  <script>
  import StudentWidget from "@/components/dashboard_view/StudentWidget.vue";
  export default {
    name: "StudentDashboardPanels",
    components: {
    StudentWidget,
  }
    // Add any props, data, computed properties, methods, etc. that are needed
  };
  </script>
  
  <style scoped>

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