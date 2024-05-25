<script setup>
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  chartData: {
    type: Array,
    required: true
  }
});

const series = [
  {
    name: 'Student',
    data: props.chartData
  }
];

const chartOptions = {
  chart: {
    type: 'bar',
    height: 350
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
    categories: ['Students', 'Grade School', 'Junior High School', 'Active Students', 'Inactive Students'],
  },
};
</script>

<template>
    <div class="BarChart-widget">
      <vue-apex-charts type="bar" height="310" :options="chartOptions" :series="series"></vue-apex-charts>
    </div>
</template>

<style>
.BarChart-widget {
    padding: 0.3125rem;
    width: 51.35rem;
    height: 20.0625rem;
    background-color: white;
    border-radius: 0.625rem;
    border-bottom: 0.3125rem solid #265492;
}
</style>