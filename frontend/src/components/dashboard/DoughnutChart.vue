<template>
    <vue-apex-charts :key="chartKey" type="donut" :options="chartOptions" :series="series"></vue-apex-charts>
</template>

<script setup>
import { defineProps, reactive, ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
    seriesData: Array,
    labelsData: Array
});

let series = reactive(props.seriesData);
let chartKey = ref(0);

const chartOptions = reactive({
    chart: {
        type: 'donut',
        background: 'transparent',
        width: '3.125rem', 
        height: '3.125rem',
    },
    plotOptions: {
        pie: {
            donut: {
                size: '87%',
            },
        },
    },
    colors: ['#BB9837', '#265492'],
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false
    },
    labels: props.labelsData,
});

watch(() => props.seriesData, (newSeriesData) => {
    series = reactive(newSeriesData);
    chartKey.value++;
});
</script>