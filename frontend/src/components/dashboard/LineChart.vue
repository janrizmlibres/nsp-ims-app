<script setup>
import { onMounted, ref } from 'vue';
import VueApexCharts from "vue3-apexcharts";
import { useEnrollmentStore } from '@/stores/enrollment';

let isLoading = ref(true);
let series = ref([
  {
    name: 'Enrollments',
    data: [],
  },
]);

let chartOptions = {
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'ENROLLMENT TREND',
    align: 'center'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5
    },
  },
  xaxis: {
    type: 'category',
    title: {
      text: 'Year'
    }
  },
  yaxis: {
    title: {
      text: 'Number of Enrollments'
    }
  }
};

onMounted(async () => {
  const enrollmentStore = useEnrollmentStore();
  const enrollments = await enrollmentStore.allEnrolled;

  const yearCounts = {};
  enrollments.forEach(enrollment => {
    const year = new Date(enrollment.dateEnrolled).getFullYear();
    if (yearCounts[year]) {
      yearCounts[year]++;
    } else {
      yearCounts[year] = 1;
    }
  });

  series.value[0].data = Object.entries(yearCounts).map(([year, count]) => ({ x: year, y: count }));
  isLoading.value = false
});
</script>

<template>
  <div class="LineChart-widget">
    <div v-if="isLoading">Loading...</div>
    <vue-apex-charts v-else type="line" height="310" :options="chartOptions" :series="series"></vue-apex-charts>
  </div>
</template>

<style>
.LineChart-widget {
    padding: 0.3125rem;
    width: 51.35rem;
    height: 20.0625rem;
    background-color: white;
    border-radius: 0.625rem;
    border-bottom: 0.3125rem solid #265492;
}
</style>
