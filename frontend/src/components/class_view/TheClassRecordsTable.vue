<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { ref, onMounted, reactive } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const state = reactive({
  yearList: [],
  expandedRows: {}
})

onMounted(() => {
    state.yearList = years.value;
});

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

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    batchnumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    academicyear: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startdate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    enddate: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const selectedItem = ref();

const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};

const dataColumns = [
    { field: 'batchnumber', header: 'Batch no.' },
    { field: 'academicyear', header: 'Academic Year' },
    { field: 'startdate', header: 'Start Date' },
    { field: 'enddate', header: 'End Date' }
];

const expansionColumns = [
    { field: 'id', header: 'Batch no.' },
    { field: 'schoollevel', header: 'Academic Year' },
    { field: 'active', header: 'Start Date' },
    { field: 'inactive', header: 'End Date' },
    { field: 'drop', header: 'End Date' },
    { field: 'total', header: 'End Date' }
];
</script>

<template>
    <DataTable v-model:expandedRows="state.expandedRows" :value="state.yearList" dataKey="id" 
        sortField="batchnumber" :sortOrder="-1" removableSort resizableColumns columnResizeMode="fit"
        paginator :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
        v-model:filters="filters" :globalFilterFields="['academicyear', 'startdate', 'enddate']"
        ref="dt"
        :ptOptions="{mergeProps:true}"
        :pt="{
            root: {
                class: ['flex flex-col h-full']
            },
            wrapper: {
                class: 'flex flex-col grow'
            },
            header: {
                class: 'bg-transparent border-none'
            },
            table: {
                class: 'bg-white',
            },
            thead: {
                class: 'bg-surface-50 top-0 z-40 sticky'
            },
            tbody: {
                class: 'sticky z-20'
            },
            column: {
                headercell: ({ context, props }) => ({
                    class: [
                        'font-medium',
                        {
                        'overflow-hidden space-nowrap border-y bg-clip-padding': context.resizable
                        // Resizable
                        },
                        // Color
                        (props.sortable === '' || props.sortable) && context.sorted ? 'u-bg-scolor-2 text-white' : 'bg-surface-50 text-surface-700'
                    ]
            }),
                sorticon: ({ context }) => ({
                    class: ['ml-2', context.sorted ? 'text-white dark:text-white/80' : 'text-surface-700 dark:text-white/70']
            }),
                columnresizer: {
                    class: ['block', 'absolute top-0 right-0', 'w-2 h-full', 'm-0 p-0', 'border border-transparent', 'cursor-col-resize']
                },
            },
            paginator: {
                root: {
                    class: ['flex items-center justify-center flex-wrap object-bottom', 'px-4 pt-4 pb-2', 'border-0 rounded-bl-xl rounded-br-xl', 'bg-transparent dark:bg-surface-800', 'text-surface-500 dark:text-white/60']
                },
                pagebutton: ({ context }) => ({
                    class: [
                    'relative',
                    // Flex & Alignment
                    'inline-flex items-center justify-center',
                    // Shape
                    'border-0 rounded-full dark:rounded-md',
                    // Size
                    'min-w-[3rem] h-12 m-[0.143rem]',
                    'leading-none',
                    // Color
                    'text-surface-500 dark:text-white/80',
                    {
                        'u-bg-scolor-2 border-primary-50 text-white font-semibold': context.active
                    },
                    // State
                    {
                        'hover:bg-surface-50': !context.disabled && !context.active,
                        'focus:u-ring-scolor': !context.disabled
                    },
                    ]
                }),
            }
        }"
    >
        <template #header>
            <div class="flex justify-end">
                <span class="relative mr-2">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search"  class="pl-10 font-normal"/>
                </span>
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
            </div>
        </template>
        <template #empty> <div class="text-center">No records found.</div> </template>
        <template #loading> <div class="text-center">Loading class records. Please wait.</div> </template>
        <Column expander style="width: 5rem" />
        <Column v-for="col of dataColumns" :key="col.field" :field="col.field" :header="col.header" sortable></Column>
        <template #expansion="slotProps">
            <div class="p-3 u-bg-pcolor-2">
                <DataTable :value="slotProps.data.schoollevels" v-model:selection="selectedItem" selectionMode="single"
                :ptOptions="{mergeProps:true}"
                :pt="{
                    column: {
                        headercell: ({ context, props }) => ({
                            class: [
                                'font-medium',
                                {
                                'overflow-hidden space-nowrap border-y bg-clip-padding': context.resizable
                                // Resizable
                                },
                                // Color
                                (props.sortable === '' || props.sortable) && context.sorted ? 'u-bg-scolor-2 text-white' : 'bg-surface-50 text-surface-700'
                            ]
                        })
                    },
                    bodyrow: ({ context, props }) => ({
                        class: [
                        'gap-y-4 ',
                        { 'u-bg-scolor text-white dark:bg-primary-400/30': context.selected },
                        { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },
                        { 'font-bold bg-surface-0 dark:bg-surface-800': props.frozenRow },
                        // State
                        { 'focus:outline-none focus:outline-offset-0 focus:ring focus:u-ring-scolor ring-inset dark:focus:ring-primary-300/50': context.selectable },
                        { 'hover:u-bg-scolor hover:text-white': props.selectionMode && !context.selected },
                        // Misc
                        { 'cursor-pointer': props.selectionMode }
                        ]
                    })
                }">
                    <Column v-for="col of expansionColumns" :key="col.field" :field="col.field" :header="col.header"></Column>
                </DataTable>
            </div>
        </template>
    </DataTable>
</template>