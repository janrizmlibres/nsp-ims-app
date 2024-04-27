<template>
    <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            series: [44, 55, 41, 17, 15],
            chartOptions: {
                chart: {
                    type: 'donut',
                    background: 'transparent',
                },
                legend: {
                    show: false
                },
            }
        }
    }
}
</script>