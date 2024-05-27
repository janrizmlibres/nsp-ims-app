<template>
    <VueApexCharts type="donut" :options="chartOptions" :series="series"></VueApexCharts>
</template>

<script setup>
import { computed, reactive } from "vue";
import VueApexCharts from "vue3-apexcharts";

const props = defineProps(['seriesData', 'labelsData'])
const series = computed(() => props.seriesData)
const chartOptions = reactive({
    chart: {
        type: 'donut',
        background: 'transparent',
        width: '3.125rem', // adjust as needed
        height: '3.125rem' // adjust as needed
    },
    plotOptions: {
        pie: {
            donut: {
                size: '87%', // adjust as needed
            },
        },
    },
    colors: ['#BB9837', '#265492'],
    dataLabels: {
        enabled: false, // disable data labels
    },
    legend: {
        show: false
    },
    labels: props.labelsData,
})
</script>