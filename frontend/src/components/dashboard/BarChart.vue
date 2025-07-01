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
    name: 'Student',
    data: props.chartData
  }
]);

const chartOptions = reactive({
  chart: {
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: 'end',
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  title: {
    text: 'STUDENT DISTRIBUTION',
    align: 'center'
  },
  xaxis: {
    categories: ['Enrolled Students', 'Active Students', 'Inactive Students', 'Grade School', 'Junior High School'],
  }
});

watch(() => props.chartData, (newChartData) => {
  series = reactive([
    {
      name: 'Student',
      data: newChartData
    }
  ]);
});
</script>

<template>
    <div class="BarChart-widget">
      <vue-apex-charts type="bar" height="100%" :options="chartOptions" :series="series"></vue-apex-charts>
    </div>
</template>

<style>
.BarChart-widget {
    padding: 0.3125rem;
    background-color: white;
    border-radius: 0.625rem;
    border-bottom: 0.3125rem solid #265492;
}
</style>