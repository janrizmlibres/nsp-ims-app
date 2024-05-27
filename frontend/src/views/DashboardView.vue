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

let cumulativeStudets = ref(0);
let maleStudents = ref(0);
let femaleStudents = ref(0);
let gradeSchool = ref(0);
let juniorHighSchool = ref(0);
let totalClassLevels = ref(0);
let activeStudents = ref(0);
let inactiveStudents = ref(0);
let totalVolunteers = ref(0);
let studentVolunteerCount = ref(0);
let professionalVolunteerCount = ref(0);
const enrollmentTrends = ref([]);

function getEnrollmentYearsFrequency(enrollments) {
  const yearFrequency = {};

  enrollments.forEach(enrollment => {
    const year = new Date(enrollment.dateEnrolled).getFullYear().toString();

    if (yearFrequency[year]) {
      yearFrequency[year]++;
    } else {
      yearFrequency[year] = 1;
    }
  });

  return Object.entries(yearFrequency).map(([year, frequency]) => ({ year, frequency }));
}

const countEnrollmentStatus = (enrollments) => {
  let activeCount = 0;
  let inactiveCount = 0;

  enrollments.forEach(enrollment => {
    if (enrollment.status === 'Active') {
      activeCount++;
    } else if (enrollment.status === 'Inactive') {
      inactiveCount++;
    }
  });

  return { activeCount, inactiveCount };
};

function countClassLevels(studentsWithClassLevel) {
  let gradeSchoolCount = 0;
  let juniorHighSchoolCount = 0;

  studentsWithClassLevel.forEach(student => {
    student.class_levels.forEach(level => {
      if (level.school_level === 'Grade School') {
        gradeSchoolCount++;
      } else if (level.school_level === 'Junior High School') {
        juniorHighSchoolCount++;
      }
    });
  });

  return { gradeSchoolCount, juniorHighSchoolCount };
}

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


onMounted(async () => {
  await volunteerStore.getAllVolunteers()
  await studentsStore.getStudents()
  await enrollmentStore.getAllEnrollments()
  await studentsStore.getStudentsWithClassLevel()
  await studentsStore.getStudents()

  const statusCount = countEnrollmentStatus(await enrollmentStore.allEnrolled.data);
  activeStudents.value = statusCount.activeCount;
  inactiveStudents.value = statusCount.inactiveCount;

  gradeSchool.value = countClassLevels(studentsStore.studentsWithClassLevel).gradeSchoolCount;
  juniorHighSchool.value = countClassLevels(studentsStore.studentsWithClassLevel).juniorHighSchoolCount;
  maleStudents.value = countGenders(studentsStore.students).maleCount;
  femaleStudents.value = countGenders(studentsStore.students).femaleCount;
  cumulativeStudets.value = studentsStore.students.length;
  totalClassLevels.value = gradeSchool.value + juniorHighSchool.value;
  totalVolunteers.value = volunteerStore.volunteers.length

  for (let volunteer of volunteerStore.volunteers) {
    if (volunteer.affiliation === 'Student') {
      studentVolunteerCount.value++;
    } else if (volunteer.affiliation === 'Professional') {
      professionalVolunteerCount.value++;
    }
  }
  
  enrollmentTrends.value = getEnrollmentYearsFrequency(enrollmentStore.allEnrolled.data);

  console.log(cumulativeStudets.value, gradeSchool.value, juniorHighSchool.value, activeStudents.value, inactiveStudents.value)
});

console.log(cumulativeStudets);
console.log(gradeSchool);
console.log(juniorHighSchool);
console.log(activeStudents);
console.log(inactiveStudents);
</script>

<template>
  <ContentPane :breadcrumb="[{label: 'Dashboard'}]">
    <div>
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
          v-if="activeStudents || inactiveStudents"
          class="student-widget" 
          :seriesData="[inactiveStudents, activeStudents]" 
          :labelsData="['Inactive', 'Active']" 
          widgetTitle="ENROLLED STUDENTS" 
          :totalText= "(inactiveStudents+activeStudents).toString()"
          Data1= "Active"
          Data2= "Inactive"
          :icon="['fas', 'user-graduate']"
           />
        <StudentWidget 
          v-if="gradeSchool || juniorHighSchool"
          class="student-widget" 
          :seriesData="[juniorHighSchool, gradeSchool]" 
          :labelsData="['Junior High School', 'Grade School']" 
          widgetTitle="CLASS LEVEL" 
          :totalText= totalClassLevels.toString()
          Data1= "GS"
          Data2= "JHS"
          :icon="['fas', 'user-graduate']" />
        <StudentWidget
          v-if="studentVolunteerCount || professionalVolunteerCount"
          class="student-widget" 
          :seriesData="[professionalVolunteerCount, studentVolunteerCount]" 
          :labelsData="['Professional', 'Student']" 
          widgetTitle="VOLUNTEERS" 
          :totalText= "totalVolunteers.toString()"
          Data1= "Student"
          Data2= "Professional"
          :icon="['fas', 'user']"  />
        
      </div>
      <div class="charts">
        <BarChart 
          v-if="cumulativeStudets"
          class="bar-chart"
          :chartData="[cumulativeStudets, gradeSchool, juniorHighSchool, activeStudents, inactiveStudents]" />
        <LineChart 
          v-if="enrollmentTrends && enrollmentTrends.length > 0" 
          class="line-chart" :data="enrollmentTrends"/>
      </div>
    </div>
  </ContentPane>
</template>

<style scoped>
.charts {
    height: 80vh; /* 75% of the viewport height */
    width: 80vw; /* 80% of the viewport width */
    display: flex;
    flex-direction: column;
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

  .dashboard-text {
    font-weight: bold;
    position: absolute;
    font-size: 1.875rem;
    margin-top: 3rem;
    margin-left: 0.625rem;
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
    
    flex-grow: 1;
  }
  
  .bar-chart {
    margin-left: 25.5rem;
    margin-bottom: 1.25rem;
    flex-grow: 1;
  }

</style>