<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { useClassesStore } from '@/stores/classes';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const props = defineProps(['filters', 'globalFilters'])
const router = useRouter()
const classesStore = useClassesStore()

const filters = ref(props.filters)
const globalFilters = ref(props.globalFilters)
const selectedRow = ref({})
const primarySelection = ref({})
const secondarySelection= ref({})

function onExpandRow(id) {
    selectedRow.value = {}
    const checkProp = id in selectedRow.value
    if (checkProp) delete selectedRow.value[id]
    else selectedRow.value[id] = true
    selectedRow.value = { ...selectedRow.value }
}

function onCollapseRow() {
    selectedRow.value = {}
}

function showClass() {
    onCollapseRow()
    primarySelection.value = {}
    secondarySelection.value = {}
    router.push('/class-information')
}
</script>

<template>
    <DataTable 
        v-model:expandedRows="selectedRow" 
        :value="classesStore.data" dataKey="id" 
        :sortField="Object.keys(classesStore.data[0])[0]" :sortOrder="-1" removableSort 
        resizableColumns columnResizeMode="fit"
        v-model:filters="filters" :globalFilterFields="globalFilters"
        paginator :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
        v-model:selection="primarySelection" selectionMode="single" 
        @rowSelect="onExpandRow(primarySelection.id)" @rowUnselect="onCollapseRow()"
        :ptOptions="{mergeProps:true}"
        :pt="{
            root: {
                class: ['flex flex-col h-full pt-2 justify-between overflow-auto']
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
                class: 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-white/80 flex-1'
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

        <Column expander style="width: 5rem" />
        <Column v-for="col of classesStore.dataColumns" :key="col.field" :field="col.field" :header="col.header" sortable></Column>

        <template #expansion="slotProps">
            <div class="p-1 rounded-md">
                <DataTable 
                :value="slotProps.data.schoollevels" 
                v-model:selection="secondarySelection" selectionMode="single"
                @rowSelect="showClass()"
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
                    <Column header="" style="width: 1rem; padding-left: 2rem">
                        <template #body>
                            <i class="fa fa-eye" />
                        </template>
                    </Column>
                    <Column v-for="col of classesStore.expansionColumns" :key="col.field" :field="col.field" :header="col.header"></Column>
                </DataTable>
            </div>
        </template>
    </DataTable>
</template>