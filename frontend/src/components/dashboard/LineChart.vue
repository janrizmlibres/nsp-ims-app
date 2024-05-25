<script>
import VueApexCharts from "vue3-apexcharts";
import { useEnrollmentStore } from '@/stores/enrollment';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [{
        name: 'Enrollments',
        data: []
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
      },
    };
  },
  async created() {
    const enrollmentStore = useEnrollmentStore();
    const enrollments = await enrollmentStore.getAllEnrollments();

    const yearCounts = {};
    enrollments.forEach(enrollment => {
      const year = new Date(enrollment.dateEnrolled).getFullYear();
      if (yearCounts[year]) {
        yearCounts[year]++;
      } else {
        yearCounts[year] = 1;
      }
    });

    const yearCountsArray = Object.entries(yearCounts).map(([year, count]) => ({ x: year, y: count }));
    //should be refactored where yearCountsArray is placed inside data: []
    this.series[0].data = yearCountsArray;
  }
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
    width: 50.625rem;
    height: 20.0625rem;
    background-color: white;
    border-radius: 0.625rem;
    border-bottom: 0.3125rem solid #265492;
}
</style>
