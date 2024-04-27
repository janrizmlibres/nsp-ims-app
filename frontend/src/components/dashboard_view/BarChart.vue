/* app.vue */
<script>
export default {
  data() {
    return {
      chart: null,
      options: {
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "STUDENTS ENROLLED"
        },
        axisX: {
          labelTextAlign: "right"
        },
        axisY: {
        },
        data: [{
          type: "bar",
          dataPoints: [
            { label: "LEARNERS", y: 3 },
            { label: "ELEMENTARY", y: 18 },
            { label: "JUNIOR HIGH", y: 27 },
            { label: "ACTIVE LEARNERS", y: 42 }
          ]
        }]
      }
    }
  }
}
</script>
<template>
    <div class="BarChart-widget">
        <CanvasJSChart :options="options"/>
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