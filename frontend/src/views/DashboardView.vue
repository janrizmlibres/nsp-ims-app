<script setup>
import { onMounted, provide, ref, toRaw, watch } from 'vue';
import Fieldset from 'primevue/fieldset';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import ContentPane from "@/components/UI/ContentPane.vue";
import YearButton from "@/components/dashboard/YearButton.vue";
import StudentWidget from "@/components/dashboard/StudentWidget.vue";
import BarChart from "@/components/dashboard/BarChart.vue";
import LineChart from "@/components/dashboard/LineChart.vue";
import CumulativeWidget from "@/components/dashboard/CumulativeWidget.vue"
import CumulativeLineChart from "@/components/dashboard/CumulativeLineChart.vue"
import ListWidget from "@/components/dashboard/ListWidget.vue"
import KPIWidget from "@/components/dashboard/KPIWidget.vue"
import StudentStatusWidget from "@/components/dashboard/StudentStatusWidget.vue"
import LearnersProfile from "@/components/dashboard/LearnersProfileWidget.vue"

import { useEnrollmentStore } from '@/stores/enrollment';

import ScrollPanel from 'primevue/scrollpanel';
import Card from 'primevue/card';
import { useUtilitiesStore } from '@/stores/utilities';
import { useStudentsStore } from '@/stores/students';
import { useVolunteerStore } from '@/stores/volunteer';
import Dropdown from 'primevue/dropdown';

const enrollmentStore = useEnrollmentStore();
const utilitiesStore = useUtilitiesStore()
const studentsStore = useStudentsStore()
const volunteersStore = useVolunteerStore()

const documentStyle = getComputedStyle(document.body);
const terms = ref()
const cData = ref({
  students: [],
  volunteers: []
})

const dataByYear = ref({
  students: null,
  enrollments: null,
  volunteers: null,
})

const isLoading = ref(false)
const enrollmentKPIData = ref([])
const quickViewData = ref()
const schoolLevelData = ref({
  gradeSchool: [],
  juniorHighSchool: []
})
const selectedTerm = ref()

const studentFilter = ref()
const volunteerFilter = ref()

const isCReload = ref(false)
const isPReload = ref(false)

const selectedData = ref('Enrollments')

onMounted(async () => {
  await utilitiesStore.getTerms()
  terms.value = utilitiesStore.terms
  selectedTerm.value = terms.value[0]

  await studentsStore.getStudents()
  for (const student of studentsStore.students) {
    let temp = {
      id: student.id,
      category: student.category,
      civilStatus: student.personal_info.civilStatus,
      religion: student.personal_info.religion,
      sex: student.personal_info.sex,
      homeCity: student.personal_info.homeCity,
      schoolType: student.previous_school.schoolType,
      highestEducation: student.previous_school.highestEducation
    }
    cData.value.students.push(temp)
  }

  studentFilter.value = [
    {label:'Category', value: 'category'},
    {label:'Civil Status', value: 'civilStatus'},
    {label:'Religion', value: 'religion'},
    {label:'Sex', value: 'sex'},
    {label:'Home City', value: 'homeCity'},
    {label:'Previous School Type', value: 'schoolType'},
    {label:'Educational Attainment', value: 'highestEducation'},
  ]

  await enrollmentStore.getAllEnrollments()

  await volunteersStore.getAllVolunteers()
  for (const volunteer of volunteersStore.volunteers) {
    let temp = {
      id: volunteer.id,
      affiliation: volunteer.affiliation,
      sex: volunteer.volunteer_personal_information.sex,
      city: volunteer.volunteer_personal_information.city
    }
    cData.value.volunteers.push(temp)
  }

  volunteerFilter.value = [
    {label:'Affiliation', value: 'affiliation'},
    {label:'Sex', value: 'sex'},
    {label:'Home City', value: 'city'}
  ]

  updateDatasets(selectedTerm.value)
})

provide('isLoading', isLoading)
provide('selectedData', selectedData)
provide('updateQuickViewTable', updateQuickViewTable)
provide('resetQuickViewTable', resetQuickViewTable)
provide('changeDataset', changeDataset)

function updateDatasets(selectedTerm) {
  dataByYear.value.students = studentsStore.students.filter(student => student.admitted_year === selectedTerm.academic_year)

  dataByYear.value.enrollments = enrollmentStore.allEnrolled.filter(enrollment => {
      let date = new Date(enrollment.dateEnrolled).getFullYear()

      return (date + '-' + (date+1)) === selectedTerm.academic_year
  })

  enrollmentKPIData.value = dataByYear.value.enrollments.reduce((acc, current) => {
    if (current.class_level.school_level === 'Grade School') {
      acc[0] = (acc[0] || 0) + 1;
    } else {
      acc[1] = (acc[1] || 0) + 1;
    }
    return acc;
  }, [0, 0]);

  dataByYear.value.volunteers = volunteersStore.volunteers.filter(volunteer => volunteer.admitted_year === selectedTerm.academic_year)

  quickViewData.value = JSON.parse(JSON.stringify(dataByYear.value))

  schoolLevelData.value.gradeSchool = dataByYear.value.enrollments.filter(enrollment => enrollment.class_level.school_level === 'Grade School')
  schoolLevelData.value.juniorHighSchool = dataByYear.value.enrollments.filter(enrollment => enrollment.class_level.school_level === 'Junior High School')

  reloadpVisuals()
}

function updateQuickViewTable(classLevel, attribute, selectedLabel) {
  selectedData.value = 'Enrollments'
  quickViewData.value.enrollments = dataByYear.value.enrollments.filter(enrollment => {
    if(attribute.value === 'category') {
      return (enrollment.student[attribute.value] === selectedLabel && enrollment.class_level.school_level === classLevel)
    } else {
      return (enrollment.student.personal_info[attribute.value] === selectedLabel && enrollment.class_level.school_level === classLevel)
    }
  })
  changeDataset()
}

function resetQuickViewTable() {
  quickViewData.value = JSON.parse(JSON.stringify(dataByYear.value))
  changeDataset()
}

function changeDataset() {
    isLoading.value = true
    setTimeout(function(){
        isLoading.value = false
    }, 500);
}

function reloadCVisuals() {
  isCReload.value = true
  setTimeout(function(){
    isCReload.value = false
  }, 500);
}

function reloadpVisuals() {
  isPReload.value = true
  setTimeout(function(){
    isPReload.value = false
  }, 500);
}
// const isSidebarHovering = computed(() => sidebarStore.isHovering);
// const isSidebarPinned = computed(() => sidebarStore.isPinned);

// const totalEnrolledStudents = ref(0)
// const activeEnrolledStudents = ref(0)
// const inactiveEnrolledStudents = ref(0)

// const gradeSchoolCount = ref(0)
// const activeGradeSchoolCount = ref(0)
// const inactiveGradeSchoolCount = ref(0)
// const juniorHighSchoolCount = ref(0)
// const activeJuniorHighSchoolCount = ref(0)
// const inactiveJuniorHighSchoolCount = ref(0)

// const enrollmentTrend = ref([])

// function getTotalEnrolledStudents() {
//   totalEnrolledStudents.value = enrollmentStore.learners.length;
// }

// function getSchoolLevelCounts () {
//   gradeSchoolCount.value = 0;
//   juniorHighSchoolCount.value = 0;

//   enrollmentStore.learners.forEach(student => {
//     if (student.schoolLevel === 'Junior High School') {
//       juniorHighSchoolCount.value++;
//     } else if (student.schoolLevel === 'Grade School') {
//       gradeSchoolCount.value++;
//     }
//   });
// };

// function getEnrolledStatusCounts() {
//   activeEnrolledStudents.value = 0;
//   inactiveEnrolledStudents.value = 0;

//   enrollmentStore.learners.forEach(student => {
//     if (student.status === 'Active') {
//       activeEnrolledStudents.value++;
//     } else if (student.status === 'Inactive') {
//       inactiveEnrolledStudents.value++;
//     }
//   });
// };

// function getGradeSchoolStatusCounts() {
//   enrollmentStore.learners.forEach(learner => {
//     if (learner.schoolLevel === 'Grade School') {
//       if (learner.status === 'Active') {
//         activeGradeSchoolCount.value++;
//       } else if (learner.status === 'Inactive') {
//         inactiveGradeSchoolCount.value++;
//       }
//     }
//   });
// }

// function getJuniorHighSchoolStatusCounts() {
//   enrollmentStore.learners.forEach(learner => {
//     if (learner.schoolLevel === 'Junior High School') {
//       if (learner.status === 'Active') {
//         activeJuniorHighSchoolCount.value++;
//       } else if (learner.status === 'Inactive') {
//         inactiveJuniorHighSchoolCount.value++;
//       }
//     }
//   });
// }

// function getEnrollmentTrendByMonth() {
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//   const enrollmentsByMonth = months.reduce((obj, month) => ({ ...obj, [month]: 0 }), {});

//   for (const learner of enrollmentStore.learners) {
//     const month = new Date(learner.dateEnrolled).getMonth();
//     enrollmentsByMonth[months[month]]++;
//   }
//   enrollmentTrend.value = months.map(month => ({ x: month, y: enrollmentsByMonth[month] }));
// }

// const handleTermIdChanged = async (newTermId) => {
//   //reset the values
//   totalEnrolledStudents.value = 0;
//   activeEnrolledStudents.value = 0;
//   inactiveEnrolledStudents.value = 0;

//   gradeSchoolCount.value = 0;
//   activeGradeSchoolCount.value = 0;
//   inactiveGradeSchoolCount.value = 0;
//   juniorHighSchoolCount.value = 0;
//   activeJuniorHighSchoolCount.value = 0;
//   inactiveJuniorHighSchoolCount.value = 0;

//   enrollmentTrend.value = [];

//   // handle the new term ID here
//   await enrollmentStore.getAllEnrolledFromTerm(newTermId);
//   getTotalEnrolledStudents();
//   getSchoolLevelCounts();
//   getEnrolledStatusCounts();
//   getGradeSchoolStatusCounts();
//   getJuniorHighSchoolStatusCounts();
//   getEnrollmentTrendByMonth();
// };
</script>

<template>
  <ContentPane :breadcrumb="[{label: 'Dashboard'}]">
    <div class="h-full overflow-y-auto overflow-x-hidden px-4">
      <Fieldset
        :pt="{
          root: {class: ['h-full border-none bg-transparent !p-0 mb-4']},
          legend: {class: ['!rounded-2xl bg-transparent border-none']},
          toggler: {class: ['!p-2']},
          toggleableContent: {class:['h-full']},
          content: {class: ['!p-0 !pt-2 h-full flex flex-row']}
        }" :ptOptions="{mergeProps: true}">
        <template #legend>
            <div class="flex align-items-center gap-2 pl-2">
                <i class="fa fa-square-poll-vertical" />
                <span class="font-bold">Cumulative Stats</span>
            </div>
        </template>

        <ProgressSpinner v-if="isCReload" class="flex justify-center" />
        <div v-else id="cVisuals" class="grow grid xl:grid-cols-2 xl:grid-rows-3 grid-cols-1 grid-rows-3 auto-cols-max auto-rows-max gap-8">
          <CumulativeWidget :data="cData.students" :filterOptions="studentFilter" icon="fa fa-address-book" title="Admitted Students" color="u-bg-cyan" />
          <CumulativeWidget :data="cData.volunteers" :filterOptions="volunteerFilter" icon="fa fa-chalkboard-user" title="Admitted Volunteers" color="u-bg-pink" />
          <CumulativeLineChart />
        </div>

        <div class="ml-4"> <Button icon="fa fa-rotate-right" raised class="bg-white hover:bg-white u-txt-active !rounded-full mb-2" @click="reloadCVisuals" /> </div>
      </Fieldset>

      <Fieldset :toggleable="false"
        :pt="{
          root: {class: ['h-full border-none bg-transparent !p-0']},
          legend: {class: ['!rounded-2xl bg-transparent border-none']},
          toggler: {class: ['flex flex-col !p-2']},
          toggleableContent: {class:['h-full']},
          content: {class: ['h-full flex flex-col !p-0']}
        }" :ptOptions="{mergeProps: true}">
        <template #legend>
            <div class="flex align-items-center gap-2 pl-2">
                <i class="fa fa-square-poll-vertical" />
                <span class="font-bold">Stats by Year</span>
            </div>
        </template>

        <div class="flex flex-row justify-end items-center gap-2 ml-2"> 
          <small for="filterYear">Filter by Year</small>
          <Dropdown v-model="selectedTerm" inputId="filterYear" :options="terms" optionLabel="academic_year" placeholder="Filter by Year" class="h-10 !rounded-2xl" @update:modelValue="updateDatasets(selectedTerm)"/>
          <Button icon="fa fa-rotate-right" raised class="bg-white hover:bg-white u-txt-active !rounded-full mb-2" @click="reloadpVisuals" /> 
        </div>

        <ProgressSpinner v-if="isPReload" class="grow flex justify-center" />
        <div v-else id="cVisuals" class="grow grid grid-cols-4 grid-rows-4 auto-rows-max auto-cols-max gap-8">
          <ListWidget :data="quickViewData" />
          <KPIWidget :data="dataByYear.students ? [dataByYear.students.length] : [0]" :kpi="selectedTerm ? selectedTerm.student_admission_kpi : 0" title="Student Admissions" :label="['Student Admissions']" :chartColor="[documentStyle.getPropertyValue('--cyan-500')]" bgColor="u-bg-cyan" />
          <KPIWidget :data="enrollmentKPIData ? enrollmentKPIData : [0,0]" :kpi="selectedTerm ? selectedTerm.enrollment_kpi : 0" title="Enrollments" :label="['Grade School','Junior High School']" :chartColor="[documentStyle.getPropertyValue('--pink-500'), documentStyle.getPropertyValue('--purple-500')]" bgColor="u-bg-pink" />
          <KPIWidget :data="dataByYear.volunteers ? [dataByYear.volunteers.length] : [0]" :kpi="selectedTerm ?  selectedTerm.volunteer_admission_kpi : 0" title="Volunteer Admissions" :label="['Volunteer Admissions']" :chartColor="[documentStyle.getPropertyValue('--yellow-500')]" bgColor="u-bg-yellow" />
          <div class="grid grid-rows-subgrid grid-cols-2 col-span-3 gap-4">
            <StudentStatusWidget :data="schoolLevelData.gradeSchool" title="Grade School" icon="fa fa-school" bgColor="u-bg-indigo" />
            <StudentStatusWidget :data="schoolLevelData.juniorHighSchool" title="Junior High School" icon="fa fa-school" bgColor="u-bg-orange" />
          </div>
          <LearnersProfile :data="dataByYear.enrollments" />
        </div>
      </Fieldset>

      <!-- <div class="relative">
        <YearButton @termId-changed="handleTermIdChanged" />
        <div class="student-dashboard-panels">
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
            :chartData="enrollmentTrend" />
          <BarChart 
            class="bar-chart"
            :chartData="[totalEnrolledStudents, activeEnrolledStudents, inactiveEnrolledStudents, gradeSchoolCount, juniorHighSchoolCount]" />
        </div>
      </div> -->
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
    height: 35vh;
  }
  
  .bar-chart {
    margin-left: 25.5rem;
    height: 35vh;
  }

</style>