<script setup>
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner'
import { computed, ref } from 'vue';

const props = defineProps(['data'])

const isLoading = ref(false)
const selectedData = ref('Students')

const dataOptions = ref(['Students', 'Enrollments', 'Volunteers'])
const dataset = computed(() => props.data)

function changeDataset() {
    isLoading.value = true
    setTimeout(function(){
        isLoading.value = false
    }, 500);
}
</script>

<template>
    <Card class="!rounded-2xl shadow-2xl row-span-3 u-border-bottom"
        :pt="{body: {class: ['h-full']}, content: {class:['h-full']}}" :ptOptions="{mergeProps: true}"
    >
        <template #content>
            <span class="flex flex-col justify-end mb-2">
                <small>Dataset</small>
                <Dropdown v-model="selectedData" :options="dataOptions" placeholder="Select a dataset..." @update:modelValue="changeDataset" />
            </span>
            <ProgressSpinner v-if="isLoading" class="h-full flex justify-center" />
            <DataTable
                v-else-if="!isLoading && selectedData === 'Students'"
                :value="dataset.students"
            >
                <template #empty> <div class="text-center">No records found.</div> </template>

                <Column field="fullname" header="Name" />
                <Column field="category" header="Category" />
            </DataTable>
            <DataTable
                v-else-if="!isLoading && selectedData === 'Enrollments'"
                :value="dataset.enrollments"
            >
                <template #empty> <div class="text-center">No records found.</div> </template>

                <Column field="student.fullname" header="Name" />
                <Column field="class_level.school_level" header="School Level" />
            </DataTable>
            <DataTable
                v-else-if="!isLoading && selectedData === 'Volunteers'"
                :value="dataset.volunteers"
            >
                <template #empty> <div class="text-center">No records found.</div> </template>

                <Column field="fullname" header="Name" />
                <Column field="affiliation" header="Affiliation" />
            </DataTable>
        </template>
    </Card>
</template>