<script setup>
import { computed, ref, onMounted } from 'vue';
import ContentPane from "@/components/UI/ContentPane.vue";
import YearButton from "@/components/dashboard/YearButton.vue";
import StudentWidget from "@/components/dashboard/StudentWidget.vue";
import BarChart from "@/components/dashboard/BarChart.vue";
import LineChart from "@/components/dashboard/LineChart.vue";

import { useSidebarStore } from '@/stores/sidebar.js';
import { useStudentsStore } from '@/stores/students';
import { useUtilitiesStore } from '@/stores/utilities';


const studentsStore = useStudentsStore();
const sidebarStore = useSidebarStore();
const utilitiesStore = useUtilitiesStore();

const isSidebarHovering = computed(() => sidebarStore.isHovering);
const isSidebarPinned = computed(() => sidebarStore.isPinned);

let totalStudents = ref(0);
let maleStudents = ref(0);
let femaleStudents = ref(0);
let gradeSchool = ref(0);
let juniorHighSchool = ref(0);
let totalClassLevels = ref(0);
let activeStudents = ref(6);
let inactiveStudents = ref(8);

onMounted(async () => {
  const genderCount = await studentsStore.getGenderCount();
  const classLevelsCount = await utilitiesStore.countClassLevels();

  gradeSchool.value = classLevelsCount.gradeSchoolCount;
  juniorHighSchool.value = classLevelsCount.juniorHighSchoolCount;
  maleStudents.value = genderCount.data.maleCount;
  femaleStudents.value = genderCount.data.femaleCount;
  totalStudents.value = maleStudents.value + femaleStudents.value;
  totalClassLevels.value = gradeSchool.value + juniorHighSchool.value;
});
</script>

<template>
  <ContentPane>
    <div class="header-container">
      <div class="dashboard-text">Dashboard</div>
      <YearButton class="year-button"/>
    </div>
    <div class="student-dashboard-panels">
        <StudentWidget 
          v-if="maleStudents && femaleStudents"
          class="student-widget-" 
          :seriesData="[femaleStudents, maleStudents]" 
          :labelsData="['Female', 'Male']" 
          widgetTitle="STUDENTS" 
          :totalText= totalStudents.toString()
          Data1= "Male"
          Data2= "Female" />
        <StudentWidget
          :class="!isSidebarHovering && !isSidebarPinned ? 'animate-student-widget' : 'student-widget'" 
          :style="`--translate-x: 78.75rem; --translate-y: -31.875rem`"
          :seriesData="[1, 1]" 
          :labelsData="['Female', 'Male']" 
          widgetTitle="ACTIVE STUDENTS" 
          :totalText= "activeStudents.toString()"
          Data1= "Male"
          Data2= "Female" />
        <StudentWidget 
          :class="!isSidebarHovering && !isSidebarPinned ? 'animate-student-widget' : 'student-widget'" 
          :style="`--translate-x: 52.5rem; --translate-y: -21.25rem`"
          :seriesData="[1, 1]" 
          :labelsData="['Female', 'Male']" 
          widgetTitle="INACTIVE STUDENTS" 
          :totalText= "inactiveStudents.toString()"
          Data1= "Male"
          Data2= "Female" />
        <StudentWidget 
          v-if="gradeSchool && juniorHighSchool"
          :class="!isSidebarHovering && !isSidebarPinned ? 'animate-student-widget' : 'student-widget'" 
          :style="`--translate-x: 26.25rem; --translate-y: -10.625rem`"
          :seriesData="[gradeSchool, juniorHighSchool]" 
          :labelsData="['Junior High School', 'Grade School']" 
          widgetTitle="CLASS LEVELS" 
          :totalText= totalClassLevels.toString()
          Data1= "GS"
          Data2= "JHS" />
        
    </div>
    <div class="charts">
      <LineChart 
          :class="!isSidebarHovering && !isSidebarPinned ? 'animate-line-chart' : 'line-chart'"
          :style="`--initial-x: 28.125rem; --initial-y: 0.9375rem; --translate-x: 53.125rem; --translate-y: 13.125rem;`" />
      <BarChart 
          v-if="totalStudents"
          :class="!isSidebarHovering && !isSidebarPinned ? 'animate-bar-chart' : 'bar-chart'"
          :chartData="[totalStudents, gradeSchool, juniorHighSchool, activeStudents, inactiveStudents]"
          :style="`--initial-x: 28.125rem; --initial-y: 2.125rem; --translate-x: 0.625rem; --translate-y: -6.9375rem;`" />
    </div>
  </ContentPane>
</template>

<style scoped>
.charts{
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
    left: 104.600rem;
    z-index: 3;
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
    left: 90.600rem;
    z-index: 3;
  }

  .header-container {
    display: flex;
    align-items: center; /* This will vertically align the items */
    margin-bottom: 1.25rem;
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
  .animate-student-widget {
    animation: slide 0.5s ease 0s 1 normal forwards;
  }

  .animate-line-chart {
    position: absolute;
    margin-top: 2.0625rem;
    animation: slide 0.5s ease 0s 1 normal forwards;
    width: 50.625rem;
  }

  .animate-bar-chart {
    position: absolute;
    margin-top: 22.0625rem;
    animation: slide 0.5s ease 0s 1 normal forwards;
    width: 50.625rem;
  }

</style>