/* App.vue */
<script>
export default {
  data() {
    return {
      chart: null,
      options: {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title:{
          text: "ENROLLMENT TREND"
        },
        axisX:{
          valueFormatString: "YYYY",
          labelTextAlign: "center",
          labelAngle: 0
        },
        axisY: {
          title: "Students Enrolled",
        },
        data: [{
          type: "line",
          yValueFormatString: "₹##,##,##0.## crores",
          dataPoints: [
            { label: "2016", y: 130},
            { label: "2017", y: 233 },
            { label: "2018", y: 102 },
            { label: "2019", y: 60 },
            { label: "2020", y: 80},
            { label: "2021", y: 90 }
          ]
        }]
      },
      styleOptions: {
        width: "100%",
        height: "360px"
      }
    }
  },
  methods: {
    chartInstance(chart) {
      this.chart = chart;
    }
  }
}
</script>
<template>
    <div class="LineChart-widget">
        <CanvasJSChart :options="options" :style="styleOptions" @chart-ref="chartInstance"/>
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