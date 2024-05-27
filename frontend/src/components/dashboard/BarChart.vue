<script setup>
import Chart from 'primevue/chart';
import { ref, onMounted } from "vue";

const props = defineProps({
  chartData: {
    type: Array,
    required: true
  }
});

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Students', 'Grade School', 'Junior High School', 'Active Students', 'Inactive Students'],
        
        datasets: [
            {
                label: 'Students',
                backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                data: props.chartData
            },
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                },
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}
</script>


<template>
    <div class="BarChart-widget">
      <Chart type="bar" :data="chartData" :options="chartOptions" style="height: 100%;" />
    </div>
</template>

<style>
.BarChart-widget {
    height: 100%;
    padding-left: 0.3125rem;
    padding-right: 0.3125rem;
    background-color: white;
    border-radius: 0.625rem;
    border-bottom: 0.3125rem solid #265492;
}
</style>