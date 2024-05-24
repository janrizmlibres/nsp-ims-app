<template>
    <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
    components: {
        apexchart: VueApexCharts,
    },
    props: {
        seriesData: Array,
        labelsData: Array
    },
    data() {
        return {
            series: this.seriesData,
            chartOptions: {
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
                labels: this.labelsData,
            }
        }
    }
}
</script>