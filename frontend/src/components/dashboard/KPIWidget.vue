<script setup>
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import { computed } from 'vue';

const props = defineProps(['data', 'kpi', 'title', 'label', 'chartColor'])

const chartData = computed(() => setChartData())
const chartOptions = computed(() => setChartOptions())

function setChartData() {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: [props.label, 'Remaining Target'],
        datasets: [
            {
                data: [props.data, props.kpi - props.data],
                backgroundColor: [
                    props.chartColor,
                    documentStyle.getPropertyValue('--bluegray-500'),
                ]
            }
        ]
    };
};

function setChartOptions() {
    return {
        maintainAspectRatio: false,
        rotation: 270,
        circumference: 180,
        cutout: '75%',
        plugins: {
            legend: {
                display: false
            }
        }
    };
};
</script>

<template>
    <Card class="!rounded-2xl shadow-2xl u-border-bottom"
        :pt="{body: {class: ['h-full']}, content: {class:['h-full !py-0']}, header:{class:['px-4 pt-4']}}" :ptOptions="{mergeProps: true}">
        <template #header>
            <label class="font-semibold">{{ props.title }}</label>
        </template>
        <template #content>
            <span class="relative self-center">
                <Chart type="doughnut" :data="chartData" :options="chartOptions" />
                <div class="absolute w-full text-center top-20"><label class="text-4xl font-bold u-txt-active float-center">{{ props.data }}</label></div>
            </span>
        </template>
    </Card>
</template>