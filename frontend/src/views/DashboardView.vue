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
const activeEnrolledStudents = ref(0)
const inactiveEnrolledStudents = ref(0)

const gradeSchoolCount = ref(0)
const activeGradeSchoolCount = ref(0)
const inactiveGradeSchoolCount = ref(0)
const juniorHighSchoolCount = ref(0)
const activeJuniorHighSchoolCount = ref(0)
const inactiveJuniorHighSchoolCount = ref(0)

const enrollmentTrend = ref([])

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

function getSchoolLevelCounts () {
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

function getEnrolledStatusCounts() {
  activeEnrolledStudents.value = 0;
  inactiveEnrolledStudents.value = 0;

  enrollmentStore.learners.forEach(student => {
    if (student.status === 'Active') {
      activeEnrolledStudents.value++;
    } else if (student.status === 'Inactive') {
      inactiveEnrolledStudents.value++;
    }
  });
};

function getGradeSchoolStatusCounts() {
  enrollmentStore.learners.forEach(learner => {
    if (learner.schoolLevel === 'Grade School') {
      if (learner.status === 'Active') {
        activeGradeSchoolCount.value++;
      } else if (learner.status === 'Inactive') {
        inactiveGradeSchoolCount.value++;
      }
    }
  });
}

function getJuniorHighSchoolStatusCounts() {
  enrollmentStore.learners.forEach(learner => {
    if (learner.schoolLevel === 'Junior High School') {
      if (learner.status === 'Active') {
        activeJuniorHighSchoolCount.value++;
      } else if (learner.status === 'Inactive') {
        inactiveJuniorHighSchoolCount.value++;
      }
    }
  });
}

function getEnrollmentTrendByMonth() {
  // Create an array with all months
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Initialize an object to store the count of enrollments for each month
  const enrollmentsByMonth = months.reduce((obj, month) => ({ ...obj, [month]: 0 }), {});

  // Iterate over the learners array
  for (const learner of enrollmentStore.learners) {
    // Extract the month from the dateEnrolled property
    const month = new Date(learner.dateEnrolled).getMonth();

    // Increment the count for this month
    enrollmentsByMonth[months[month]]++;
  }

  // Convert the enrollmentsByMonth object to the desired output format
  enrollmentTrend.value = months.map(month => ({ x: month, y: enrollmentsByMonth[month] }));
}

onMounted(async () => {
  await studentsStore.getStudents()

  maleStudents.value = countGenders(studentsStore.students).maleCount;
  femaleStudents.value = countGenders(studentsStore.students).femaleCount;
  cumulativeStudets.value = studentsStore.students.length;
  
});

const handleTermIdChanged = async (newTermId) => {
  //reset the values
  totalEnrolledStudents.value = 0;
  activeEnrolledStudents.value = 0;
  inactiveEnrolledStudents.value = 0;

  gradeSchoolCount.value = 0;
  activeGradeSchoolCount.value = 0;
  inactiveGradeSchoolCount.value = 0;
  juniorHighSchoolCount.value = 0;
  activeJuniorHighSchoolCount.value = 0;
  inactiveJuniorHighSchoolCount.value = 0;

  enrollmentTrend.value = [];

  // handle the new term ID here
  await enrollmentStore.getAllEnrolledFromTerm(newTermId);
  getTotalEnrolledStudents();
  getSchoolLevelCounts();
  getEnrolledStatusCounts();
  getGradeSchoolStatusCounts();
  getJuniorHighSchoolStatusCounts();
  getEnrollmentTrendByMonth();
  console.log(enrollmentTrend.value);
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
          widgetTitle="TOTAL STUDENTS" 
          :totalText= cumulativeStudets.toString()
          Data1= "Male"
          Data2= "Female"
          :icon="['fas', 'user-graduate']" />
        <StudentWidget 
          class="student-widget" 
          :seriesData="[inactiveEnrolledStudents, activeEnrolledStudents]" 
          :labelsData="['Inactive', 'Active']" 
          widgetTitle="ENROLLED STUDENTS" 
          :totalText= totalEnrolledStudents.toString()
          Data1= "Active"
          Data2= "Inactive"
          :icon="['fas', 'user-graduate']"
           />
        <StudentWidget
          class="student-widget" 
          :seriesData="[inactiveGradeSchoolCount, activeGradeSchoolCount]" 
          :labelsData="['Inactive', 'Active']" 
          widgetTitle="GRADE SCHOOL" 
          :totalText= gradeSchoolCount.toString()
          Data1= "Active"
          Data2= "Inactive"
          :icon="['fas', 'user-graduate']" />
        <StudentWidget
          class="student-widget" 
          :seriesData="[inactiveJuniorHighSchoolCount, activeJuniorHighSchoolCount]" 
          :labelsData="['Inactive', 'Active']" 
          widgetTitle="JUNIOR HIGH SCHOOL" 
          :totalText= juniorHighSchoolCount.toString()
          Data1= "Active"
          Data2= "Inactive"
          :icon="['fas', 'user-graduate']"  />
        
      </div>
      <div class="charts">
        <LineChart 
          class="line-chart"
          :chartData="enrollmentTrend"/>
        <BarChart 
          class="bar-chart"
          :chartData="[totalEnrolledStudents, activeEnrolledStudents, inactiveEnrolledStudents, gradeSchoolCount, juniorHighSchoolCount]" />
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
    margin-bottom: 1.25rem;
  }
  
  .bar-chart {
    margin-left: 25.5rem;
  }

</style>