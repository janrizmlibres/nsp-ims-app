<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [{
        name: 'Enrollments',
        data: [
          { x: '2016', y: 10 },
          { x: '2017', y: 41 },
          { x: '2018', y: 35 },
          { x: '2019', y: 51 },
          { x: '2020', y: 49 },
          { x: '2021', y: 62 },
          { x: '2022', y: 69 },
          { x: '2023', y: 91 },
          { x: '2024', y: 148 }
        ]
      }],
      chartOptions: {
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
          type: 'category', // or 'datetime' if your x values are dates
          title: {
            text: 'Year'
          }
        },
        yaxis: {
          title: {
            text: 'Number of Enrollments'
          }
        }
      },
    };
  },
};
</script>


<template>
    <div class="LineChart-widget">
        <apexchart type="line" height="310" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<style>
.LineChart-widget {
    padding: 0.3125rem;
    width: 65rem;
    height: 20.0625rem;
    background-color: white;
    border-radius: 0.625rem;
    border-bottom: 0.3125rem solid #265492;
}
</style>
