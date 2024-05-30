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
import { useEnrollmentStore } from '@/stores/enrollment';
import { useVolunteerStore } from '@/stores/volunteer';

const enrollmentStore = useEnrollmentStore();
const studentsStore = useStudentsStore();
const sidebarStore = useSidebarStore();
const utilitiesStore = useUtilitiesStore();
const volunteerStore = useVolunteerStore();

const isSidebarHovering = computed(() => sidebarStore.isHovering);
const isSidebarPinned = computed(() => sidebarStore.isPinned);

const cumulativeStudets = ref(0);
const maleStudents = ref(0);
const femaleStudents = ref(0);

const totalEnrolledStudents = ref(0)
const gradeSchoolCount = ref(0)
const juniorHighSchoolCount = ref(0)

function countGenders(students) {
  let maleCount = 0;
  let femaleCount = 0;

  students.forEach(student => {
    if (student.personal_info.sex === 'M') {
      maleCount++;
    } else if (student.personal_info.sex === 'F') {
      femaleCount++;
    }
  });

  return { maleCount, femaleCount };
}

function getTotalEnrolledStudents() {
  console.log(enrollmentStore.learners);
  totalEnrolledStudents.value = enrollmentStore.learners.length;
  //console.log(totalEnrolledStudents);
}

const getSchoolLevelCounts = () => {
  gradeSchoolCount.value = 0;
  juniorHighSchoolCount.value = 0;

  enrollmentStore.learners.forEach(student => {
    if (student.schoolLevel === 'Junior High School') {
      juniorHighSchoolCount.value++;
    } else if (student.schoolLevel === 'Grade School') {
      gradeSchoolCount.value++;
    }
  });
};

onMounted(async () => {
  await studentsStore.getStudents()

  maleStudents.value = countGenders(studentsStore.students).maleCount;
  femaleStudents.value = countGenders(studentsStore.students).femaleCount;
  cumulativeStudets.value = studentsStore.students.length;
  
});

const handleTermIdChanged = async (newTermId) => {
  // handle the new term ID here
  await enrollmentStore.getAllEnrolledFromTerm(newTermId);
  getTotalEnrolledStudents();
  getSchoolLevelCounts();
  //console.log(gradeSchoolCount.value, juniorHighSchoolCount.value);
};
</script>

<template>
  <ContentPane :breadcrumb="[{label: 'Dashboard'}]">
    <div>
      <YearButton @termId-changed="handleTermIdChanged" />
      <div class="student-dashboard-panels">
        <StudentWidget 
          v-if="maleStudents || femaleStudents"
          class="student-widget" 
          :seriesData="[femaleStudents, maleStudents]" 
          :labelsData="['Female', 'Male']" 
          widgetTitle="STUDENTS" 
          :totalText= cumulativeStudets.toString()
          Data1= "Male"
          Data2= "Female"
          :icon="['fas', 'user-graduate']" />
        <StudentWidget 
          class="student-widget" 
          :seriesData="[0, 0]" 
          :labelsData="['Inactive', 'Active']" 
          widgetTitle="ENROLLED STUDENTS" 
          :totalText= totalEnrolledStudents.toString()
          Data1= "Active"
          Data2= "Inactive"
          :icon="['fas', 'user-graduate']"
           />
        <StudentWidget
          class="student-widget" 
          :seriesData="[0, 0]" 
          :labelsData="['Inactive', 'Active']" 
          widgetTitle="GRADE SCHOOL" 
          :totalText= gradeSchoolCount.toString()
          Data1= "Active"
          Data2= "Inactive"
          :icon="['fas', 'user-graduate']" />
        <StudentWidget
          class="student-widget" 
          :seriesData="[0, 0]" 
          :labelsData="['Inactive', 'Active']" 
          widgetTitle="JUNIOR HIGH SCHOOL" 
          :totalText= juniorHighSchoolCount.toString()
          Data1= "Active"
          Data2= "Inactive"
          :icon="['fas', 'user']"  />
        
      </div>
      <div class="charts">
        <BarChart 
          class="bar-chart"
          :chartData="[10, 10, 10, 10, 10]" />
        <LineChart 
          class="line-chart" :data="enrollmentTrends"/>
      </div>
    </div>
  </ContentPane>
</template>

<style scoped>
.charts{
    width:80%;
    display: grid;
    grid-template-columns: 1fr;
    position: absolute;
    margin-right: 10rem;
}
  .student-widget {
    margin-bottom: 1.25rem;
    margin-right: 1.25rem;
  }

  .header-container {
    display: flex;
    align-items: center; /* This will vertically align the items */
    margin-bottom: 1.25rem;
  }
  
  .student-dashboard-panels {
    display: grid;
    grid-template-columns: 1fr;
    position: absolute;
    margin-right: 0.625rem;
    z-index: 1;
  }

  .line-chart {
    margin-left: 25.5rem;
  }
  
  .bar-chart {
    margin-left: 25.5rem;
    margin-bottom: 1.25rem;
  }

</style>