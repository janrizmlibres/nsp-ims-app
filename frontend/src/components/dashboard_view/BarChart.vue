/* app.vue */
/* app.vue */
<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },

  data() {
    return {
      series: [{
        data: [100, 130, 148, 170]
      }],
      chartOptions: {
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
        xaxis: {
          categories: ['Learners', 'Elementary', 'Junior High', 'Active Learners'
          ],
        },
      },
    };
  },
};
</script>

<template>
    <div class="BarChart-widget">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<style scoped>
    .BarChart-widget {
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