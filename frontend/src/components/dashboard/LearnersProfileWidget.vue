<script setup>
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import ColumnGroup from 'primevue/columngroup';
import Column from 'primevue/column';
import Row from 'primevue/row';
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner'
import { computed, ref } from 'vue';

const props = defineProps(['data'])

const isLoading = ref(false)
const selectedLevel = ref('Grade School')

const dataOptions = ref([
    {label: 'Grade School', value: 'gradeSchool'},
    {label: 'Junior High School', value: 'juniorHighSchool'},
])
const tableData = ref([])
const filteredData = ref()
const dataset = computed(() => {
    return {
        gradeSchool: props.data.map(enrollment => {
            if (enrollment.class_level.school_level === 'Grade School') {
                return {
                    sex: enrollment.student.sex,
                    civilStatus: enrollment.student.personal_info.civilStatus,
                    religion: enrollment.student.personal_info.religion,
                    category: enrollment.student.category
                }
            }
        }),
        juniorHighSchool: props.data.map(enrollment => {
            if (enrollment.class_level.school_level === 'Junior High School') {
                return {
                    sex: enrollment.student.sex,
                    civilStatus: enrollment.student.personal_info.civilStatus,
                    religion: enrollment.student.personal_info.religion,
                    category: enrollment.student.category
                }
            }
        })
    }
})

function changeDataset(selectedLevel) {
    console.log(props.data);
    console.log(dataset.value);
    console.log(filter(dataset.value[selectedLevel]));

    isLoading.value = true
    setTimeout(function(){
        isLoading.value = false
    }, 500);
}

function filter(array) {
    const result = {};
    array.forEach(item => {
        Object.keys(item).forEach(key => {
            if (result[item[key]]) {
                result[item[key]]++;
            } else {
                result[item[key]] = 1;
            }
        })
    });
    return result
}
</script>

<template>
    <Card class="!rounded-2xl shadow-2xl row-span-2 col-span-3 u-border-bottom"
        :pt="{body: {class: ['h-full']}, content: {class:['h-full']}}" :ptOptions="{mergeProps: true}"
    >
        <template #content>
            <span class="flex flex-col justify-end mb-2">
                <small>School Level</small>
                <Dropdown v-model="selectedLevel" :options="dataOptions" optionLabel="label" optionValue="value" placeholder="Select a dataset..." @update:modelValue="changeDataset(selectedLevel)" />
            </span>
            <ProgressSpinner v-if="isLoading" class="h-full flex justify-center" />
            <DataTable
                v-else
                :value="tableData"
            >
                <template #empty> <div class="text-center">No records found.</div> </template>

                <ColumnGroup type="header">
                    <Row>
                        <Column header="Sex" :colspan="2" />
                        <Column header="Civil Status" :colspan="2" />
                        <Column header="Religion" :colspan="2" />
                        <Column header="Category" :colspan="2" />
                    </Row>
                </ColumnGroup>
                <Column field="tableData.sex.keys" />
                <Column field="tableData.sex.values" />
                <Column field="tableData.civilStatus.keys" />
                <Column field="tableData.civilStatus.values" />
                <Column field="tableData.religion.keys" />
                <Column field="tableData.religion.values" />
                <Column field="tableData.category.keys" />
                <Column field="tableData.category.values" />
            </DataTable>
        </template>
    </Card>
</template>