<script setup>
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { useClassesStore } from '@/stores/classes';
import { useRouter } from 'vue-router';

const router = useRouter()
const classesStore = useClassesStore()

function showModule() {
    router.push('/module-information')
}
</script>

<template>
    <div>
        <div class="bg-transparent border-none flex flex-row justify-between items-center px-4">
            <div class="u-txt-active font-semibold text-3xl content-center">Modules</div>
        </div>
        <Divider class="before:border-t before:border-surface-400"/>
        
        <div class="bg-white shadow-xl rounded-md p-5">
            <DataTable 
            :value="classesStore.data" dataKey="id" 
            :sortField="Object.keys(classesStore.data[0])[0]" :sortOrder="-1" removableSort 
            resizableColumns columnResizeMode="fit"
            v-model:filters="classesStore.filters" :globalFilterFields="classesStore.globalFilters"
            paginator :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
            v-model:selection="classesStore.primarySelection" selectionMode="single" 
            @rowSelect="showModule" @rowUnselect="{}"
            :ptOptions="{mergeProps:true}"
            :pt="{
                root: {
                    class: ['flex flex-col h-full pt-2 justify-between overflow-auto']
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
                        { 'hover:u-bg-pcolor hover:text-white': props.selectionMode && !context.selected },
                        // Misc
                        { 'cursor-pointer': props.selectionMode }
                    ]
                }),
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

            <Column header="" style="width: 1rem; padding-left: 2rem">
                <template #body>
                    <i class="fa fa-eye" />
                </template>
            </Column>
            <Column v-for="col of classesStore.dataColumns" :key="col.field" :field="col.field" :header="col.header" sortable></Column>
        </DataTable>
        </div>
    </div>
</template>

<style>
</style>