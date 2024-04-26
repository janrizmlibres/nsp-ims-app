<template>
  <ContentPane>
    <div class="dashboard-text">Dashboard</div>
    <StudentDashboardPanels />
    <div class="student-dashboard-panels">
    </div>
    <div class="middle-container">
        <YearButton />
      <div class="middle-widget"></div>
      <div class="middle-widget"><CanvasJSChart :options="options"/></div>
    </div>
  </ContentPane>
</template>

<script>
import ContentPane from "@/components/UI/ContentPane.vue";
import YearButton from "@/components/dashboard_view/YearButton.vue"; // import the YearButton component
import StudentDashboardPanels from "@/components/dashboard_view/StudentDashboardPanels.vue"; // import the StudentDashboardPanels component

export default {
  name: "DashboardView",
  components: {
    ContentPane,
    YearButton, // register the YearButton component
    StudentDashboardPanels, // register the StudentDashboardPanels component
  },
  // ... other options ...
   data() {
    return {
      chart: null,
      options: {
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "Primary Plastic Production by Industry Section - 2015"
        },
        axisX: {
          labelTextAlign: "right"
        },
        axisY: {
          title: "in Million Tonnes per Year",
          suffix: "M"
        },
        data: [{
          type: "bar",
          yValueFormatString: "#,###M tonnes",
          dataPoints: [
            { label: "Industrial Machinery", y: 3 },
            { label: "Electrical/Electronic", y: 18 },
            { label: "Transportation", y: 27 },
            { label: "Consumer & Institutional Products", y: 42 },
            { label: "Other sectors", y: 47 },
            { label: "Textiles", y: 59 },
            { label: "Building and Construction", y: 65 },
            { label: "Packaging", y: 146 }
          ]
        }]
      }
    }
  } 
};
</script>

<style scoped>
  .dashboard-text {
    font-weight: bold;
    font-size: 30px;
    margin-top: 50px;
    margin-left: 10px;
  }
  .middle-container {
    position: absolute;
    top: 184px;
    left: 720px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
  }
  .middle-widget {
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