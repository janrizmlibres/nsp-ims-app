/* App.vue */
<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [{
        name: "Students",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        colors: ['#265492'],
      },
    };
  },
};
</script>


<template>
    <div class="LineChart-widget">
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<style scoped>
    .LineChart-widget {
        padding: 5px;
        width: 1005px;
        height: 380px;
        background-color: white;
        margin-top: 20px;
        border-radius: 10px;
        border-bottom: 5px solid #265492;
        position: relative; /* Add this line */
    }
</style>