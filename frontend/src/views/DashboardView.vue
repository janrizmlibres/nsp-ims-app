<template>
  <ContentPane>
    <div class="header-container">
      <div class="dashboard-text">Dashboard</div>
      <YearButton :class="!isSidebarHovering && !isSidebarPinned ? 'year-button-not-hovering' : 'year-button'"/>
    </div>
    <div :class="!isSidebarHovering && !isSidebarPinned ? 'student-dashboard-panels-not-hovering' : 'student-dashboard-panels'">
        <StudentWidget :seriesData="[50, 50]" widgetTitle="LEARNERS" totalText="100" />
        <StudentWidget :seriesData="[30, 70]" widgetTitle="ELEMENTARY" totalText="60" />
        <StudentWidget :seriesData="[80, 20]" widgetTitle="JUNIOR HIGH" totalText="120" />
        <StudentWidget :seriesData="[60, 40]" widgetTitle="ACTIVE LEARNERS" totalText="180" />
    </div>
    <div :class="!isSidebarHovering && !isSidebarPinned ? 'middle-container-not-hover' : 'middle-container'">
      <LineChart :class="!isSidebarHovering && !isSidebarPinned ? 'line-chart-not-hover' : 'line-chart'" />
      <BarChart :class="!isSidebarHovering && !isSidebarPinned ? 'bar-chart-not-hover' : 'bar-chart'"/>
    </div>
  </ContentPane>
</template>

<script>
import ContentPane from "@/components/UI/ContentPane.vue";
import YearButton from "@/components/dashboard_view/YearButton.vue"; // import the YearButton component
import StudentWidget from "@/components/dashboard_view/StudentWidget.vue";
import BarChart from "@/components/dashboard_view/BarChart.vue"; // import the StudentDashboardPanels component
import LineChart from "@/components/dashboard_view/LineChart.vue";

import { useSideBarStore } from '@/stores/sidebar'

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
  computed: {
    isSidebarHovering() {
      const sidebarStore = useSideBarStore()
      return sidebarStore.isHovering
    },
    isSidebarPinned() {
      const sidebarStore = useSideBarStore()
      return sidebarStore.isPinned
    }
  }
}
</script>

<style scoped>
  .year-button {
    align-self: flex-end;
    display: block;
    margin-left: 1038px;
  }

  .year-button-not-hovering{
    align-self: flex-end;
    display: block;
    margin-left: 1368px;
  }

  .header-container {
    display: flex;
    align-items: center; /* This will vertically align the items */
    }
  .dashboard-text {
    font-weight: bold;
    font-size: 30px;
    margin-top: 0px;
    margin-left: 10px;
  }
  .middle-container {
    position: absolute;
    top: 55px;
    left: 720px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .middle-container-not-hover {
  position: absolute;
  top: 280px;
  left: 130px;
  display: flex;
  flex-direction: row; /* Change this from column to row */
  /* Your existing styles */
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

  .student-dashboard-panels-not-hovering {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 0px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .line-chart {
    padding: 5px;
    width: 850px;
    height: 321px;
    background-color: white;
    margin-top: 169px;
    border-radius: 10px;
    border-bottom: 5px solid #265492;
    position: relative; /* Add this line */
    }

    .line-chart-not-hover {
    padding: 5px;
    width: 850px;
    height: 321px;
    background-color: white;
    margin-top: 135px;
    border-radius: 10px;
    border-bottom: 5px solid #265492;
    position: relative; /* Add this line */
    }
  
    .bar-chart {
      padding: 5px;
      width: 850px;
      height: 321px;
      background-color: white;
      border-radius: 10px;
      border-bottom: 5px solid #265492;
      position: relative; /* Add this line */
      margin-top: 20px;
    }

    .bar-chart-not-hover {
      padding: 5px;
      width: 850px;
      height: 321px;
      background-color: white;
      border-radius: 10px;
      border-bottom: 5px solid #265492;
      position: relative; /* Add this line */
      margin-top: 135px;
      margin-left: 20px;
    }
</style>