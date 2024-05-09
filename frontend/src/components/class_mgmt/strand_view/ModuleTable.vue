<script setup>
// Presets
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRoute } from 'vue-router';

// Custom
import AddModuleDialog from './AddModuleDialog.vue';

// stores
import { useClassesStore } from '@/stores/classes';
import { useStrandStore } from '@/stores/strand';
import { useModuleStore } from '@/stores/module';

const classesStore = useClassesStore()
const strandStore = useStrandStore()
const moduleStore = useModuleStore()

const route = useRoute()
const toast = useToast()

const cols = ref([
    {field: 'no_submissions', header: 'No Submissions'},
    {field: 'lacking', header: 'Lacking'},
    {field: 'complete', header: 'Complete'},
    {field: 'total', header: 'Total'},
])

const customPt = {
    root: {
        class: ['flex flex-col pt-2 justify-between']
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
}


const isFetching = ref(false)
const allModules = ref([])

function updateModuleTable(modules) {
    isFetching.value = true
    allModules.value.length = 0

    for (const module of modules) {
        let distribution_date = new Date(module.distribution_date)
        let retrieval_date = new Date(module.retrieval_date)

        allModules.value.push({
            id: module.id,
            title: module.title,
            distribution_date: distribution_date,
            retrieval_date: retrieval_date,
            no_submissions: module.noSubmissions,
            lacking: module.lacking,
            complete: module.complete,
            total: module.total
        })
    }
    isFetching.value = false
}

watch(() => route.query, (query) => {
    isFetching.value = true
    try {
        strandStore.getAllModules(query.id).then((data) => {
            updateModuleTable(data)
        })
    } catch (error) {
        console.log(error)
    }
    isFetching.value = false
}, {immediate: true})

const editingRows = ref([]);

const onRowEditSave = async (event) => {
    let { data, newData } = event;
    console.log(newData);
    if ( JSON.stringify(data) !== JSON.stringify(newData) ) {
        try {
            await moduleStore.updateModule(newData.id, {
                title: newData.title,
                distribution_date: newData.distribution_date,
                retrieval_date: newData.retrieval_date
            })

            strandStore.getAllModules(route.query.id).then((data) => {
                updateModuleTable(data)
            })

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Module updated successfully!',
                life: 3000
            })
        } catch(error) {
            toast.add({
                severity: 'success',
                summary: 'Error',
                detail: 'Unexpected error encountered.',
                life: 3000
            })
        }
    }
};
</script>

<template>
    <div class="bg-white shadow-xl rounded-md p-5">
        <div class="flex flex-row gap-4 items-center px-4">
            <i class="fa fa-note-sticky fa-2xl u-txt-active"></i>
            <span class="font-semibold text-3xl u-txt-active">Modules</span>
        </div>
        <Divider />
        <DataTable 
            :value="allModules" dataKey="id" 
            :sortField="Object.keys(classesStore.data[0])[0]" :sortOrder="-1" removableSort 
            resizableColumns columnResizeMode="fit" showGridlines
            v-model:filters="classesStore.filters" :globalFilterFields="classesStore.globalFilters"
            v-model:editingRows="editingRows" editMode="row" @row-edit-save="onRowEditSave"
            :paginator="allModules.length > 10" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
            :ptOptions="{mergeProps:true}"
            :pt="customPt"
        >
            <template #empty> <div class="text-center">No records found.</div> </template>
            <template #loading> <div class="text-center">Loading class records. Please wait.</div> </template>

            <Column header="" class="u-txt-active text-center">
                <template #body="slotProps">
                    <RouterLink :to="{ name: 'module-info', query: { id: slotProps.data.id} }">
                        <i class="fa fa-eye" />
                    </RouterLink>
                </template>
            </Column>
            <Column field="title" header="Title" sortable>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" autofocus />
                </template>
            </Column>
            <Column field="distribution_date" header="Distribution Date" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.distribution_date.toDateString() }}
                </template>
                <template #editor="{ data, field }">
                    <Calendar v-model="data[field]" id="calendar" showIcon iconDisplay="input" autofocus />
                </template>
            </Column>
            <Column field="retrieval_date" header="Retrieval Date" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.retrieval_date.toDateString() }}
                </template>
                <template #editor="{ data, field }">
                    <Calendar v-model="data[field]" id="calendar" showIcon iconDisplay="input" autofocus />
                </template>
            </Column>
            <Column v-for="col of cols" :key="col.field" :field="col.field" :header="col.header" sortable />
            <Column :rowEditor="true" bodyStyle="text-align:center" frozen class="sticky right-0" />
            <template #footer> 
                <Button icon="fa fa-plus" label="Add Module" text raised rounded aria-label="Submit" @click="strandStore.showHideAddModuleDialog"/>
                <AddModuleDialog @onUpdate="updateModuleTable" /> 
            </template>
        </DataTable>
    </div>
</template>

<style>
</style>