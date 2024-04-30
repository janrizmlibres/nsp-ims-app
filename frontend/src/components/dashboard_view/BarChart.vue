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
      <apexchart type="bar" height="310" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>