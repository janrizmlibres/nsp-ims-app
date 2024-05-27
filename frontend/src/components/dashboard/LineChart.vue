<script setup>
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';

const props = defineProps({
  data: Array
});

const chartData = ref(null);

onMounted(fetchData);

function fetchData() {
  let data = props.data;
  chartData.value = {
    labels: data.map(item => item.year),
    datasets: [{
      label: 'Enrollment Trends',
      data: data.map(item => item.frequency),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
}
</script>

<template>
  <div class="LineChart-widget">
    <Chart type="line" :data="chartData" :options="chartOptions" style="height: 100%;" />
  </div>
</template>

<style>
.LineChart-widget {
  height: 100%;
    padding-left: 0.3125rem;
    padding-right: 0.3125rem;
    background-color: white;
    border-radius: 0.625rem;
    border-bottom: 0.3125rem solid #265492;
}
</style>
