<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DoughnutChart from './DoughnutChart.vue'
import ViewList from './ViewList.vue'
import ViewListClassLevel from './ViewListClassLevel.vue'
import { useStudentsStore } from '@/stores/students'
import { useVolunteerStore } from '@/stores/volunteer'
import { useEnrollmentStore } from '@/stores/enrollment'
import { watch, ref, computed } from 'vue'
const enrollmentStore = useEnrollmentStore()
const volunteerStore = useVolunteerStore()
const studentsStore = useStudentsStore()

const props = defineProps({
  seriesData: {
    type: Array,
    required: true
  },
  labelsData: {
    type: Array,
    required: true
  },
  widgetTitle: {
    type: String,
    required: true
  },
  totalText: {
    type: String,
    required: true
  },
  Data1: {
    type: String,
    required: true
  },
  Data2: {
    type: String,
    required: true
  },
  icon: {
      type: Array,
      required: true
    },
})

const learners = ref([]);

// Watch for changes in enrollmentStore.learners
watch(() => enrollmentStore.learners, (newLearners) => {
  learners.value = newLearners;
});

const gradeSchoolLearners = computed(() => {
  return learners.value.filter(learner => learner.schoolLevel === 'Grade School');
});

const juniorHighSchoolLearners = computed(() => {
  return learners.value.filter(learner => learner.schoolLevel === 'Junior High School');
});
</script>

<template>
  <div class="widget">
    <div class="widget-wrapper">
      <DoughnutChart class="my-chart" :seriesData="seriesData" :labelsData="labelsData"/>
      <font-awesome-icon class="graduate-icon" :icon="icon" />
      <div class="widget-container">
        <div class="widget-title">{{ widgetTitle }}</div>
        <div class="gender-container">
          <div class="male-icon"></div>
          <div class="male-text">{{ Data1 }} ({{ seriesData[1] }})</div>
          <div class="female-icon"></div>
          <div class="female-text">{{ Data2 }} ({{ seriesData[0] }})</div>
        </div>
        <div class="total-container">
          <div class="total-text">{{ totalText }}</div>
          <div class="total-button">
            <ViewList
              v-if="widgetTitle=='ENROLLED STUDENTS'" 
              :values="learners"
              :header="widgetTitle" />
            <ViewList
              v-if="widgetTitle=='GRADE SCHOOL'" 
              :values="gradeSchoolLearners"
              :header="widgetTitle" />
            <ViewList
              v-if="widgetTitle=='JUNIOR HIGH SCHOOL'" 
              :values="juniorHighSchoolLearners"
              :header="widgetTitle" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-chart {
  position: absolute;
  top: 2px;
  left: -22px;
  width: 169px;
  height: 169px;
  z-index: 1; /* place the chart behind other elements */
}
.graduate-icon {
  font-size: 55px; /* adjust as needed */
  margin-left: 40px;
  color: #11285e;
  position: relative;
}

.widget-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.widget-container {
  margin-left: -15px; /* adjust as needed */
}

.gender-container {
  display: flex;
}

.male-text {
  font-size: 15px;
  color: #265492;
}

.female-text {
  font-size: 15px;
  color: #265492;
}

.total-text {
  font-weight: bold;
  font-size: 40px;
  width: 24px;
  color: #233255b2;
  margin-left: 60px;
}

.widget-title {
  font-weight: bold;
  font-size: 21px;
  margin-top: 0px; /* Adjust this value to move the title up/down */
  margin-left: 60px; /* Adjust this value to move the title left/right */
  color: #3c4043;
}

.widget {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Aligns children to the start on the main axis */
  align-items: flex-start; /* Aligns children to the start on the cross axis */
  width: 380px;
  height: 150px;
  background-color: white;
  border-radius: 10px;
  border-bottom: 5px solid #265492;
  padding: 10px; /* Add padding to the widget for better control of inner elements */
  margin-bottom: 20px;
}

.total-container {
  display: flex;
  align-items: center;
}

.total-button {
  margin-left: 30px;
}

.male-icon {
  margin-top: 7px;
  margin-left: 60px;
  margin-right: 5px;
  width: 10px;
  height: 10px;
  background-color: #265492;
}

.female-icon {
  margin-top: 7px;
  margin-left: 10px;
  margin-right: 5px;
  width: 10px;
  height: 10px;
  background-color: #bf9039;
}
</style>
