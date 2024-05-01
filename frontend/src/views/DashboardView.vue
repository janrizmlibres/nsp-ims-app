<template>
  <ContentPane>
    <div class="header-container">
      <div class="dashboard-text">Dashboard</div>
      <YearButton class="year-button"/>
    </div>
    <div class="student-dashboard-panels">
        <StudentWidget class="student-widget-" :seriesData="[50, 50]" widgetTitle="LEARNERS" totalText="100" />
        <StudentWidget 
          :class="!isSidebarHovering && !isSidebarPinned ? 'animate' : 'student-widget'" 
          :style="`--translate-x: 26.25rem; --translate-y: -10.625rem`"
          :seriesData="[30, 70]" 
          widgetTitle="ELEMENTARY" 
          totalText="60" />
        <StudentWidget 
          :class="!isSidebarHovering && !isSidebarPinned ? 'animate' : 'student-widget'" 
          :style="`--translate-x: 52.5rem; --translate-y: -21.25rem`"
          :seriesData="[80, 20]" 
          widgetTitle="JUNIOR HIGH" 
          totalText="120" />
        <StudentWidget
        :class="!isSidebarHovering && !isSidebarPinned ? 'animate' : 'student-widget'" 
        :style="`--translate-x: 78.75rem; --translate-y: -31.875rem`"
          :seriesData="[60, 40]" 
          widgetTitle="ACTIVE LEARNERS" 
          totalText="180" />
    </div>
      <LineChart 
          :key="lineChartKey"
          :class="!isSidebarHovering && !isSidebarPinned ? 'animate-line-chart' : 'line-chart'"
          :style="`--initial-x: 28.125rem; --initial-y: 0.9375rem; --translate-x: 53.125rem; --translate-y: 13.125rem;`" />
      <BarChart 
          :key="barChartKey"
          :class="!isSidebarHovering && !isSidebarPinned ? 'animate-bar-chart' : 'bar-chart'"
          :style="`--initial-x: 28.125rem; --initial-y: 2.125rem; --translate-x: 0.625rem; --translate-y: -6.9375rem;`" />
  </ContentPane>
</template>

<script>
import ContentPane from "@/components/UI/ContentPane.vue";
import YearButton from "@/components/dashboard_view/YearButton.vue"; // import the YearButton component
import StudentWidget from "@/components/dashboard_view/StudentWidget.vue";
import BarChart from "@/components/dashboard_view/BarChart.vue"; // import the StudentDashboardPanels component
import LineChart from "@/components/dashboard_view/LineChart.vue";

import { useSidebarStore } from '@/stores/sidebar.js'

export default {
  name: "DashboardView",
  components: {
    ContentPane,
    YearButton, // register the YearButton component
    StudentWidget, // register the StudentDashboardPanels component
    BarChart,
    LineChart,
  },
  computed: {
    isSidebarHovering() {
      const sidebarStore = useSidebarStore()
      return sidebarStore.isHovering
    },
    isSidebarPinned() {
      const sidebarStore = useSidebarStore()
      return sidebarStore.isPinned
    },
  },
};
</script>

<style scoped>
  .student-widget {
    margin-bottom: 1.25rem;
    margin-right: 1.25rem;
    animation: slide-back 0.5s ease 0s 1 normal forwards;
  }
  .year-button {
    position: absolute;
    display: block;
    top: 10rem;
    left: 104.375rem;
    z-index: 3;
  }

  .header-container {
    display: flex;
    align-items: center; /* This will vertically align the items */
    margin-bottom: 1.25rem;
  }

  .dashboard-text {
    font-weight: bold;
    font-size: 1.875rem;
    margin-left: 0.625rem;
  }
  .middle-container {
    position: absolute;
  }
  
  .student-dashboard-panels {
    position: absolute;
    margin-top: 5rem;
    margin-left: 0.625rem;
    margin-right: 0.625rem;
  }

  .line-chart {
    margin-top: 4.0625rem;
    position: absolute;
    animation: slide-back 0.5s ease 0s 1 normal forwards;
  }
  
  .bar-chart {
    margin-top: 24.0625rem;
    position: absolute;
    animation: slide-back 0.5s ease 0s 1 normal forwards;
  }

  :root {
    --translate-x: 0rem;
    --translate-y: 0rem;
    --initial-x: 0rem;
    --initial-y: 0rem;
  }

  @keyframes slide {
  from {
    transform: translate(var(--initial-x), var(--initial-y));
  }
  to {
    transform: translate(var(--translate-x), var(--translate-y));
  }
}

@keyframes slide-back {
  from {
    transform: translate(var(--translate-x), var(--translate-y));
  }
  to {
    transform: translate(var(--initial-x), var(--initial-y));
  }
}

  .animate {
    animation: slide 0.5s ease 0s 1 normal forwards;
  }

  .animate-line-chart {
    animation: slide 0.5s ease 0s 1 normal forwards;
    width: 50.625rem;
  }

  .animate-bar-chart {
    animation: slide 0.5s ease 0s 1 normal forwards;
    width: 50.625rem;
  }

</style>