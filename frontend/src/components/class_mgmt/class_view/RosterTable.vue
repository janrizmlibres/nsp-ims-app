<script setup>
//  Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { ref, watch } from 'vue';

const props = defineProps(['modelValue', 'filters'])
const filters = ref(props.filters)
const list = ref([])
const listLength = ref()

watch(() => props.modelValue, (data) => {
    list.value = data
    listLength.value = data.length
}, {immediate: false})

const dataColumns = ref([
    { field: 'middleName', header: 'Middle Name' },
    { field: 'category', header: 'Category' }
])

const exportRef = ref()

function exportCSV() {
    exportRef.value.exportCSV()
}

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
}

// async function changeStatus(learnerId, currentStatus) {
//     const newStatus = ref()
//     if (currentStatus === 'Active') newStatus.value = 'Inactive'
//     else if (currentStatus === 'Inactive') newStatus.value = 'Active'

//     await classStore.updateStudentStatus(route.query.id, learnerId, newStatus.value)
//     await classStore.getAllStudents(route.query.id)
// }

// const dropStudent = (learnerId, studentLastName, studentFirstName) => {
//     confirm.require({
//         group: 'actionGuard',
//         message: 'Are you sure you want to drop ' + '"' + studentLastName + ', ' + studentFirstName + '"',
//         header: 'Confirmation',
//         accept: async () => {
//             await classStore.updateStudentStatus(route.query.id, learnerId, 'Drop')
//             await classStore.getAllStudents(route.query.id)
//         },
//         reject: () => {}
//     });
// };
</script>

<template>
    <DataTable 
        :value="list" dataKey="id" 
        sortField="lastName" :sortOrder="1" removableSort 
        v-model:filters="filters" :globalFilterFields="['lrn', 'lastName', 'firstName', 'middleName', 'category']"
        :paginator="list.length > 10" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
        ref="exportRef"  scrollable showGridlines
        @rowSelect="{}" @rowUnselect="{}"
        :ptOptions="{mergeProps:true}"
        :pt="customPt"
    >
        <template #empty> <div class="text-center">No records found.</div> </template>
        <template #loading> <div class="text-center">Loading class roster. Please wait.</div> </template>

        <Column header="" class="u-txt-active text-center">
                <template #body="slotProps">
                    <RouterLink :to="{ name: 'module-info', query: { id: slotProps.data.id} }">
                        <i class="fa fa-eye" />
                    </RouterLink>
                </template>
            </Column>
        <Column field="lrn" header="LRN" frozen sortable />
        <Column field="lastName" header="Last Name" frozen sortable />
        <Column field="firstName" header="First Name" frozen sortable />
        <Column v-for="col of dataColumns" :key="col.field" :field="col.field" :header="col.header" sortable></Column>
        <template #footer>
            <div class="flex justify-between items-center">
            <p>
                Record(s) count: <span class="u-txt-red"> {{ list.length }} </span>
            </p>
            <Button type="button" icon="pi pi-download" @click="exportCSV" text />
        </div>
        </template>
    </DataTable>
</template>

<style scoped>
.u-table-width {
    width: calc(100vw - 24rem)
}
</style>