<script setup>
import { defineProps, reactive, ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  chartData: {
    type: Array,
    required: true
  }
});

let series = reactive([
  {
    name: 'Enrollments',
    data: props.chartData
  }
]);

const chartOptions = reactive({
  chart: {
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
      text: 'Month'
    }
  },
  yaxis: {
    title: {
      text: 'Number of Enrollments'
    }
  }
});

watch(() => props.chartData, (newChartData) => {
  series[0].data = newChartData;
});
</script>

<template>
  <div class="LineChart-widget">
    <vue-apex-charts type="line" height="100%" :options="chartOptions" :series="series"></vue-apex-charts>
  </div>
</template>

<style>
.LineChart-widget {
    padding: 0.3125rem;
    
    background-color: white;
    border-radius: 0.625rem;
    border-bottom: 0.3125rem solid #265492;
}
</style>
