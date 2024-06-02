<script setup>
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import { computed, ref } from 'vue';

const props = defineProps(['data', 'filterOptions', 'icon', 'title', 'color'])
const chartData = computed(() => setChartData())
const chartOptions = computed(() => setChartOptions())
const datasets = ref()
const filterAttribute = ref()
const op = ref()
function setChartData() {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: datasets.value ? Object.keys(datasets.value) : ['Total'],
        datasets: [
            {
                data: datasets.value ? Object.values(datasets.value) : [props.data ? props.data.length : 0],
                backgroundColor: [
                    documentStyle.getPropertyValue('--cyan-500'),
                    documentStyle.getPropertyValue('--pink-500'),
                    documentStyle.getPropertyValue('--yellow-500'),
                    documentStyle.getPropertyValue('--bluegray-500'),
                    documentStyle.getPropertyValue('--indigo-500'), 
                    documentStyle.getPropertyValue('--teal-500'), 
                    documentStyle.getPropertyValue('--orange-500'), 
                    documentStyle.getPropertyValue('--bluegray-500'), 
                    documentStyle.getPropertyValue('--orange-500'), 
                    documentStyle.getPropertyValue('--purple-500'), 
                ]
            }
        ]
    };
};

function setChartOptions() {
    return {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true
                }
            }
        }
    };
};

function filter(filterAttribute) {
    const result = {};
    props.data.forEach(item => {
        if (result[item[filterAttribute]]) {
        result[item[filterAttribute]]++;
        } else {
        result[item[filterAttribute]] = 1;
        }
    });
    datasets.value = result
}

const toggle = (event) => {
    op.value.toggle(event);
}
</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <Card class="!rounded-2xl shadow-2xl"
            :pt="{body:{class:['h-full flex flex-col !p-0 ']}, content: {class:['flex-1 pt-5 px-5']}, footer: {class:[`${props.color} !rounded-b-xl !p-4 shadow-inner !font-normal`]}}" :ptOptions="{mergeProps: true}">
            <template #content>
                <div class="grid md:grid-flow-col md:justify-between grid-flow-row gap-4 items-center">
                    <span class="flex flex-col">
                        <p class="text-4xl font-semibold u-txt-scolor text-pretty">{{ props.data ? props.data.length : 0 }}</p>
                        <small class="text-base font-bold text-pretty">{{ props.title }}</small>
                    </span>
                    <i :class="`${props.icon} fa-xl aspect-square ${props.color} text-white rounded-lg p-2 row-start-1 shadow-xl`" />
                </div>
            </template>
            <template #footer>
                <div>
                    <Button icon="fa fa-sliders" iconPos="right" class="h-3 w-full text-start !text-sm !text-white" text label="filter data" @click="toggle" />
                    <OverlayPanel ref="op" class="w-52">
                        <div class="flex flex-col">
                            <small>Filter by</small>
                            <Dropdown v-model="filterAttribute" inputId="filter" :options="props.filterOptions" optionLabel="label" optionValue="value" placeholder="Filter by Atrribute" class="w-full text-pretty" @update:modelValue="filter(filterAttribute)" />
                        </div>
                    </OverlayPanel>
                </div>
            </template>
        </Card>
        <Card class="!rounded-2xl shadow-2xl u-border-bottom"
            :pt="{body: {class: ['h-full']}, content: {class:['h-full !py-0']}, header:{class:['px-4 pt-4']}}" :ptOptions="{mergeProps: true}">
            <template #header>
                <label class="font-semibold">{{ `Filter by ${filterAttribute ? filterAttribute : ''}` }}</label>
            </template>
            <template #content>
                <span class="relative self-center">
                    <Chart type="pie" :data="chartData" :options="chartOptions"
                        :pt="{canvas: {class:['!h-24']}}" :ptOptions="{mergeProps: true}"
                    />
                </span>
            </template>
        </Card>
    </div>
</template>