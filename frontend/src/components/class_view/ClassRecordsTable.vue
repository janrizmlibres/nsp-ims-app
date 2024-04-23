<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

// Data
const props = defineProps(['data', 'rowExpansion', 'filtering', 'globalFilters', 'dataCol', 'expCol', 'expData'])
const filters = ref(props.filtering)
const expandedRow = ref(props.rowExpansion)
const primarySelection = ref()
var secondarySelection = ref();
const exportRef = ref();

// Functions
function exportCSV() {
    exportRef.value.exportCSV();
};

function onExpandRow(id) {
    expandedRow.value = {}
    const checkProp = id in expandedRow.value
    if (checkProp) delete expandedRow.value[id]
    else expandedRow.value[id] = true
    expandedRow.value = { ...expandedRow.value }
}

function onCollapseRow() {
    expandedRow.value = {}
}

function showClass() {
    onCollapseRow()
    secondarySelection = ref()
    router.push('/classRecords/classInformation')
}
</script>

<template>
    <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="bg-transparent border-none flex justify-between p-4">
            <div class="pt-4 text-surface-600">Select a class in an academic year</div>
            <div>
                <span class="relative mr-2">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText v-model="filters['global'].value" placeholder="Search"  class="pl-10 font-normal"/>
                </span>
                <Button icon="fa-solid fa-magnifying-glass" label="Export" @click="exportCSV($event)" />
            </div>
        </div>

        <!-- Data Table -->
        <DataTable 
            v-model:expandedRows="expandedRow" :value="props.data" dataKey="id" 
            sortField="batchnumber" :sortOrder="-1" removableSort 
            resizableColumns columnResizeMode="fit"
            v-model:filters="filters" :globalFilterFields="props.globalFilters"
            paginator :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
            ref="exportRef" 
            v-model:selection="primarySelection" selectionMode="single" 
            @rowSelect="onExpandRow(primarySelection.id)" @rowUnselect="onCollapseRow()"
            class="p-4 h-full overflow-auto"
            :ptOptions="{mergeProps:true}"
            :pt="{
                root: {
                    class: ['flex flex-col h-full']
                },
                wrapper: {
                    class: 'flex flex-col grow'
                },
                table: {
                    class: 'bg-white border-spacing-0 border-separate',
                },
                thead: {
                    class: 'bg-surface-0 top-0 z-40 sticky'
                },
                tbody: {
                    class: 'sticky z-20'
                },
                column: {
                    headercell: ({ context, props }) => ({
                        class: [
                            'font-medium',
                            {
                            'space-nowrap border-y bg-clip-padding': context.resizable
                            // Resizable
                            },
                            // Color
                            (props.sortable === '' || props.sortable) && context.sorted ? 'bg-white u-txt-active' : 'bg-white u-txt-active',
                            {'hover:bg-surface-50': context.sorted}
                        ]
                    }),
                        sorticon: ({ context }) => ({
                            class: ['ml-2', context.sorted ? 'u-legend-txt-color dark:text-white/80' : 'u-txt-active dark:text-white/70']
                    }),
                        bodycell: {class: 'py-3 '}
                },
                bodyrow: ({ context, props }) => ({
                    class: [
                        { 'u-bg-pcolor text-surface-100 dark:bg-primary-400/30': context.selected },
                        { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },
                        { 'font-bold bg-surface-0 dark:bg-surface-800': props.frozenRow },
                        // State
                        { 'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-transparent': context.selectable },
                        { 'hover:bg-surface-100 hover:u-txt-active': props.selectionMode && !context.selected },
                        // Misc
                        { 'cursor-pointer': props.selectionMode }
                    ]
                }),
                rowexpansion: {
                    class: 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-white/80'
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
            <template #empty> <div class="text-center">No records found.</div> </template>
            <template #loading> <div class="text-center">Loading class records. Please wait.</div> </template>

            <div class="bg-white">
                <Column expander style="width: 5rem" />
                <Column v-for="col of props.dataCol" :key="col.field" :field="col.field" :header="col.header" sortable></Column>
            </div>

            <template #expansion="slotProps">
                <div class="p-1 rounded-md">
                    <DataTable 
                    :value="slotProps.data[props.expData]" 
                    v-model:selection="secondarySelection" selectionMode="single"
                    @rowSelect="showClass"
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
                                    (props.sortable === '' || props.sortable) && context.sorted ? 'bg-white text-white' : 'bg-white text-surface-700'
                                ]
                            })
                        },
                        thead: {
                            class: 'bg-surface-0'
                        },
                        bodyrow: ({ context, props }) => ({
                            class: [
                            'gap-y-4 ',
                            { 'bg-surface-100 u-txt-active dark:bg-primary-400/30': context.selected },
                            { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },
                            { 'font-bold bg-surface-0 dark:bg-surface-800': props.frozenRow },
                            // State
                            { 'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-transparent ring-inset dark:focus:ring-primary-300/50': context.selectable },
                            { 'hover:bg-surface-100 hover:u-txt-active': props.selectionMode && !context.selected },
                            // Misc
                            { 'cursor-pointer': props.selectionMode }
                            ]
                        })
                    }">
                        <Column v-for="col of props.expCol" :key="col.field" :field="col.field" :header="col.header"></Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>
    </div>
</template>