<script setup>
import DataTable from 'primevue/datatable';
import ColumnGroup from 'primevue/columngroup';
import Column from 'primevue/column';
import Row from 'primevue/row';

import { ref } from 'vue';
const props = defineProps(['classData'])
const classData = ref(props.classData)
</script>

<template>
    <DataTable 
        :value="classData" dataKey="name"
        :ptOptions="{mergeProps:true}"
        :pt="{
            root: {
                class: ['flex flex-col h-full pt-2 justify-between overflow-auto mb-8']
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
                    { 'hover:u-bg-pcolor hover:text-white': props.selectionMode && !context.selected },
                    // Misc
                    { 'cursor-pointer': props.selectionMode }
                ]
            })
        }"
    >
        <template #empty> <div class="text-center">Nothing added.</div> </template>

        <ColumnGroup type="header">
            <Row>
                <Column header="Learning Strand" :rowspan="2" />
                <Column header="Teacher" :rowspan="2" />
                <Column header="Schedule" :colspan="3" />
            </Row>
            <Row>
                <Column header="Days" field="school_days"/>
                <Column header="Start Time" field="start_time"/>
                <Column header="End Time" field="end_time"/>
            </Row>
        </ColumnGroup>
        <Column field="name" />
        <Column field="teacher" />
        <Column field="school_days" />
        <Column field="start_time" />
        <Column field="end_time" />
    </DataTable>
</template>

<style>
</style>