
<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import ClassRecordsTable from '@/components/class_view/ClassRecordsTable.vue'; 

import { ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const years = ref([
    {
        id: 1,
        batchnumber: '7',
        academicyear: '2022-2023',
        startdate: 'August 01, 2022',
        enddate: 'May 31, 2023',
        schoollevels: 
            [
                {
                    id: '1001-1',
                    schoollevel: 'Grade School',
                    totalstudents: 12,
                    active: 10,
                    inactive: 1,
                    drop: 1
                },
                {
                    id: '1001-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 9,
                    active: 4,
                    inactive: 4,
                    drop: 1
                }
            ]
    },
    {
        id: 2,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 3,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 4,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 5,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 6,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 7,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 8,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 9,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 10,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 11,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 12,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 13,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 14,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 15,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 16,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 17,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    },
    {
        id: 18,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    }
]);

const selectedRow = ref({})

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    batchnumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    academicyear: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startdate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    enddate: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const globalFilters = ref(['academicyear', 'startdate', 'enddate'])

const dataColumns = ref([
    { field: 'batchnumber', header: 'Batch no.' },
    { field: 'academicyear', header: 'Academic Year' },
    { field: 'startdate', header: 'Start Date' },
    { field: 'enddate', header: 'End Date' }
]);

const expansionColumns = ref([
    { field: 'id', header: 'Id' },
    { field: 'schoollevel', header: 'School Level' },
    { field: 'active', header: 'Active' },
    { field: 'inactive', header: 'Inactive' },
    { field: 'drop', header: 'Drop' },
    { field: 'totalstudents', header: 'Total Students' }
]);
</script>

<template>
    <ContentPane>
        <ClassRecordsTable 
        :data="years" 
        :rowExpansion="selectedRow" 
        :filtering="filters" 
        :globalFilters="globalFilters"
        :dataCol="dataColumns" 
        :expCol="expansionColumns"
        expData="schoollevels"/>
    </ContentPane>
</template>

<style scoped>
</style>