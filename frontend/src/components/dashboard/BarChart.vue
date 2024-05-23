
<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },

  props: {
    chartData: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      series: [{
        data: this.chartData
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
        title: {
          text: 'STUDENT DISTRIBUTION',
          align: 'center'
        },
        xaxis: {
          categories: ['Students', 'Grade School', 'Junior High School', 'Active Learners'
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

<style>
.BarChart-widget {
    padding: 0.3125rem;
    width: 65rem;
    height: 20.0625rem;
    background-color: white;
    border-radius: 0.625rem;
    border-bottom: 0.3125rem solid #265492;
}
</style>