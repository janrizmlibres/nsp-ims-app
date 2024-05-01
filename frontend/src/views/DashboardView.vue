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
          :style="`--translate-x: 420px; --translate-y: -170px`"
          :seriesData="[30, 70]" 
          widgetTitle="ELEMENTARY" 
          totalText="60" />
        <StudentWidget 
          :class="!isSidebarHovering && !isSidebarPinned ? 'animate' : 'student-widget'" 
          :style="`--translate-x: 840px; --translate-y: -340px`" 
          :seriesData="[80, 20]" 
          widgetTitle="JUNIOR HIGH" 
          totalText="120" />
        <StudentWidget
        :class="!isSidebarHovering && !isSidebarPinned ? 'animate' : 'student-widget'" 
          :style="`--translate-x: 1260px; --translate-y: -510px`" 
          :seriesData="[60, 40]" 
          widgetTitle="ACTIVE LEARNERS" 
          totalText="180" />
    </div>
      <LineChart 
          :class="!isSidebarHovering && !isSidebarPinned ? 'animate-charts' : 'line-chart'" 
          :style="`--translate-x: 850px; --translate-y: 230px`"  />
      <BarChart 
          :class="!isSidebarHovering && !isSidebarPinned ? 'animate-charts' : 'bar-chart'" 
          :style="`--translate-x: 10px; --translate-y: -90px`"  />
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
}
};
</script>

<style scoped>
  .student-widget {
    margin-bottom: 20px;
    margin-right: 20px;
    animation: slide-back 1s ease 0s 1 normal forwards;
  }
  .year-button {
    position: absolute;
    display: block;
    top: 160px;
    left: 1630px;
  }

  .header-container {
    display: flex;
    align-items: center; /* This will vertically align the items */
    margin-bottom: 20px;
  }

  .dashboard-text {
    font-weight: bold;
    font-size: 30px;
    margin-top: 0px;
    margin-left: 10px;
  }
  .middle-container {
    position: absolute;
  }
  
  .student-dashboard-panels {
    position: absolute;
    margin-top: 80px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .line-chart {
    margin-top: 80px;
    margin-left: 450px;
    position: absolute;
    animation: slide-back 1s ease 0s 1 normal forwards;
  }
  
  .bar-chart {
    top: 580px;
    left: 730px;
    position: absolute;
    animation: slide-back 1s ease 0s 1 normal forwards;
  }

  :root {
    --translate-x: 0px;
    --translate-y: 0px;
  }

  @keyframes slide {
    from {
      transform: translateX(0);
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
      transform: translateX(0) translateY(0);
    }
  }

  .animate {
    animation: slide 1s ease 0s 1 normal forwards;
  }

  .animate-charts {
    animation: slide 1s ease 0s 1 normal forwards;
    width: 810px;
  }

</style>