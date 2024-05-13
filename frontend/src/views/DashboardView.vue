<script>
import ContentPane from '@/components/UI/ContentPane.vue'
import YearButton from '@/components/dashboard/YearButton.vue' // import the YearButton component
import StudentWidget from '@/components/dashboard/StudentWidget.vue'
import BarChart from '@/components/dashboard/BarChart.vue' // import the StudentDashboardPanels component
import LineChart from '@/components/dashboard/LineChart.vue'

import { useSidebarStore } from '@/stores/sidebar.js'

export default {
  name: 'DashboardView',
  components: {
    ContentPane,
    YearButton, // register the YearButton component
    StudentWidget, // register the StudentDashboardPanels component
    BarChart,
    LineChart
  },
  computed: {
    isSidebarHovering() {
      const sidebarStore = useSidebarStore()
      return sidebarStore.isHovering
    },
    isSidebarPinned() {
      const sidebarStore = useSidebarStore()
      return sidebarStore.isPinned
    }
  }
}
</script>

<template>
  <ContentPane>
    <div class="header-container">
      <div class="dashboard-text">Dashboard</div>
      <YearButton class="year-button" />
    </div>
    <div class="student-dashboard-panels">
      <StudentWidget
        class="student-widget-"
        :seriesData="[50, 50]"
        widgetTitle="LEARNERS"
        totalText="100"
      />
      <StudentWidget
        :class="!isSidebarHovering && !isSidebarPinned ? 'animate' : 'student-widget'"
        :style="`--translate-x: 420px; --translate-y: -170px`"
        :seriesData="[30, 70]"
        widgetTitle="ELEMENTARY"
        totalText="60"
      />
      <StudentWidget
        :class="!isSidebarHovering && !isSidebarPinned ? 'animate' : 'student-widget'"
        :style="`--translate-x: 840px; --translate-y: -340px`"
        :seriesData="[80, 20]"
        widgetTitle="JUNIOR HIGH"
        totalText="120"
      />
      <StudentWidget
        :class="!isSidebarHovering && !isSidebarPinned ? 'animate' : 'student-widget'"
        :style="`--translate-x: 1260px; --translate-y: -510px`"
        :seriesData="[60, 40]"
        widgetTitle="ACTIVE LEARNERS"
        totalText="180"
      />
    </div>
    <LineChart
      :class="!isSidebarHovering && !isSidebarPinned ? 'animate-charts' : 'line-chart'"
      :style="`--translate-x: 850px; --translate-y: 230px`"
    />
    <BarChart
      :class="!isSidebarHovering && !isSidebarPinned ? 'animate-charts' : 'bar-chart'"
      :style="`--translate-x: 10px; --translate-y: -90px`"
    />
  </ContentPane>
</template>

<style scoped>
.charts {
  margin-top: 45px;
  overflow: hidden;
}
.student-widget {
  margin-bottom: 1.25rem;
  margin-right: 1.25rem;
  animation: slide-back 0.5s ease 0s 1 normal forwards;
}
.year-button {
  position: absolute;
  display: block;
  top: 10rem;
  left: 104.6rem;
  z-index: 3;
}

.header-container {
  display: flex;
  align-items: center; /* This will vertically align the items */
  margin-bottom: 1.25rem;
}

.dashboard-text {
  font-weight: bold;
  position: absolute;
  font-size: 1.875rem;
  margin-top: 3rem;
  margin-left: 0.625rem;
}

.student-dashboard-panels {
  position: absolute;
  margin-top: 5rem;
  margin-left: 0.625rem;
  margin-right: 0.625rem;
}

.line-chart {
  position: absolute;
  animation: slide-back 0.5s ease 0s 1 normal forwards;
}

.bar-chart {
  margin-top: 20.0625rem;
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

.animate-student-widget {
  animation: slide 0.5s ease 0s 1 normal forwards;
}

.animate-line-chart {
  position: absolute;
  margin-top: 4.0625rem;
  animation: slide 0.5s ease 0s 1 normal forwards;
  width: 50.625rem;
}

.animate-bar-chart {
  position: absolute;
  margin-top: 24.0625rem;
  animation: slide 0.5s ease 0s 1 normal forwards;
  width: 50.625rem;
}
</style>
