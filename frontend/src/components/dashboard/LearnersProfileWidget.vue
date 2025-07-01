<script setup>
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import ProgressSpinner from 'primevue/progressspinner'
import Chart from 'primevue/chart';
import { computed, inject, ref } from 'vue';

const props = defineProps(['data'])

const isLoading = ref(false)
const levelOp = ref()
const filterOp = ref()
const chartRef = ref()
const chartData = computed(() => setChartData())
const chartOptions = computed(() => setChartOptions())
const selectedLevel = ref()
const filterAttribute = ref()
const filterLevel = ref()
const dataOptions = ref([
    {label: 'Grade School', value: 'gradeSchool'},
    {label: 'Junior High School', value: 'juniorHighSchool'},
])

const filterOptions = ref([
    {label: 'Sex', value: 'sex'},
    {label: 'Civil Status', value: 'civilStatus'},
    {label: 'Religion', value: 'religion'},
    {label: 'Category', value: 'category'},
])

const onUpdate = inject('updateQuickViewTable')

const filteredData = ref()
const dataset = computed(() => {
    return {
        gradeSchool: props.data.reduce((arr, enrollment) => {
            if (enrollment.class_level.school_level === 'Grade School') {
                let temp = {
                    sex: enrollment.student.personal_info.sex,
                    civilStatus: enrollment.student.personal_info.civilStatus,
                    religion: enrollment.student.personal_info.religion,
                    category: enrollment.student.category
                }

                if (arr.constructor !== Array) arr = []
                arr.push(temp)

                return arr
            }

            return arr
        }, []),
        juniorHighSchool: props.data.reduce((arr, enrollment) => {
            if (enrollment.class_level.school_level === 'Junior High School') {
                let temp = {
                    sex: enrollment.student.personal_info.sex,
                    civilStatus: enrollment.student.personal_info.civilStatus,
                    religion: enrollment.student.personal_info.religion,
                    category: enrollment.student.category
                }

                if (arr.constructor !== Array) arr = []
                arr.push(temp)

                return arr
            }

            return arr
        }, [])
    }
})

function setChartData() {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: filteredData.value ? Object.keys(filteredData.value) : [],
        datasets: [
            {
                data: filteredData.value ? Object.values(filteredData.value) : [props.data ? props.data.length : 0],
                label: filterAttribute.value ? filterAttribute.value.label : 'None',
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

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
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

function updateChart() {
    isLoading.value = true
    filter(filterAttribute.value.value)
    setTimeout(function(){
        isLoading.value = false
    }, 500);
}

function changeDataset(selectedLevel) {
    filterAttribute.value = null
    filterLevel.value = dataset.value[selectedLevel]
}

function filter(filterAttribute) {
    const result = {};
    filterLevel.value.forEach(item => {
        if (result[item[filterAttribute]]) {
        result[item[filterAttribute]]++;
        } else {
        result[item[filterAttribute]] = 1;
        }
    });
    filteredData.value = result
}


const toggleLevel = (event) => {
    levelOp.value.toggle(event);
}

const toggleFilter = (event) => {
    filterOp.value.toggle(event);
}
</script>

<template>
    <Card class="!rounded-2xl shadow-2xl row-span-2 col-span-3 u-border-bottom"
        :pt="{root:{class:['h-full flex flex-col overflow-hidden']}, body: {class: ['grow overflow-hidden']}, content: {class:['h-full !py-0 overflow-hidden']}, header:{class:['px-4 pt-4']}}" :ptOptions="{mergeProps: true}"
    >
        <template #header>
            <div class="flex flex-row justify-between">
                <label class="font-semibold">Learners' Profile</label>
                <span class="flex flex-row gap-2">
                    <Button icon="fa fa-school" raised class="bg-white hover:bg-white u-txt-active !rounded-full mb-2" @click="toggleLevel" />
                    <OverlayPanel ref="levelOp">
                        <span class="flex flex-col justify-end mb-2">
                            <small>School Level</small>
                            <Dropdown v-model="selectedLevel" :options="dataOptions" optionLabel="label" placeholder="Select a dataset..." @update:modelValue="changeDataset(selectedLevel.value)" />
                        </span>
                    </OverlayPanel>
                    <Button icon="fa fa-sliders" raised class="bg-white hover:bg-white u-txt-active !rounded-full mb-2" @click="toggleFilter" />
                    <OverlayPanel ref="filterOp">
                        <span class="flex flex-col justify-end mb-2">
                            <small>Filter by</small>
                            <Dropdown v-model="filterAttribute" :options="filterOptions" optionLabel="label" :disabled="!selectedLevel" placeholder="Select a dataset..." @update:modelValue="updateChart" />
                        </span>
                    </OverlayPanel>
                </span> 
            </div>
        </template>
        <template #content>
            <ProgressSpinner v-if="isLoading" class="h-full flex justify-center" />
            <div v-else-if="!isLoading && !filterAttribute" class="h-full flex flex-col justify-center text-center">Select a class and filter</div>
            <Chart v-else type="bar" :data="chartData" :options="chartOptions" class="h-full" ref="chartRef"
            @select="(event) => {
                const { index } = event.element
                const barLabel = chartRef.chart.data.labels[index]
                onUpdate(selectedLevel.label, filterAttribute, barLabel)
            }" />
        </template>
    </Card>
</template>