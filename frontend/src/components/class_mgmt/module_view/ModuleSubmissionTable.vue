<script setup>
// Presets
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Tag from 'primevue/tag';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// stores
import { useModuleStore } from '@/stores/module';


const moduleStore = useModuleStore()

const route = useRoute()

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
            bodycell: ({ state }) => ({
                style:  state['d_editing']&&'padding-top: 0.6rem; padding-bottom: 0.6rem',
                class: 'py-3 '
        })
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
const learners = ref([])
async function fetchModule(data) {
    isFetching.value = true
    learners.value.length = 0

    try {
        for (const moduleSubmission of data.module_submissions) {
            let date1 = null
            let date2 = null

            if (moduleSubmission.date_submitted !== null) {
                date1 = new Date(moduleSubmission.date_submitted)
                date1 = date1.toDateString()
            }

            if (moduleSubmission.updatedAt !== null) {
                date2 = new Date(moduleSubmission.updatedAt)
                date2 = date2.toLocaleString()
            }

            const temp = {
                id: moduleSubmission.id,
                lastName: moduleSubmission.learner.lastName,
                firstName: moduleSubmission.learner.firstName,
                middleName: moduleSubmission.learner.middleName,
                status: moduleSubmission.status,
                date_submitted: date1,
                remarks: moduleSubmission.remarks,
                updatedAt: date2
            }

            learners.value.push(temp)
        }
    } catch(error) {
        console.log(error)
    }
    
    isFetching.value = false
}

watch(() => moduleStore.module, fetchModule, {immediate: false})

const getStatusLabel = (status) => {
    switch (status) {
        case 'Complete':
            return 'success';

        case 'Lacking':
            return 'warning';

        case 'No Submission':
            return 'danger';

        default:
            return null;
    }
};

const statuses = ref([
    { label: 'Complete', value: 'Complete' },
    { label: 'Lacking', value: 'Lacking' },
    { label: 'No Submission', value: 'No Submission' }
]);

const editingRows = ref([]);

const onRowEditSave = async (event) => {
    let { newData } = event;
    console.log(newData);

    let date = null
    if (newData.date_submitted) {
        const offset = newData.date_submitted.getTimezoneOffset()
        date = new Date(newData.date_submitted.getTime() - (offset*60*1000))
    }

    await moduleStore.updateModuleSubmission(newData.id, {
        newStatus: newData.status,
        newSubmissionDate: date,
        newRemarks: newData.remarks
    })

    await moduleStore.getModule(route.query.id)
};
</script>

<template>
    <div class="bg-white shadow-xl rounded-md p-5">
        <div class="flex flex-row gap-4 items-center px-4">
            <i class="fa fa-note-sticky fa-2xl u-txt-active"></i>
            <span class="font-semibold text-3xl u-txt-active">Submissions</span>
        </div>
        <Divider />
        <DataTable 
            :value="learners" dataKey="id" 
            sortField="lastName" :sortOrder="1" removableSort 
            resizableColumns columnResizeMode="fit" showGridlines 
            paginator :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
            v-model:editingRows="editingRows" editMode="row" @row-edit-save="onRowEditSave"
            :ptOptions="{mergeProps:true}"
            :pt="customPt"
        >
            <template #empty> <div class="text-center">No records found.</div> </template>
            <template #loading> <div class="text-center">Loading class records. Please wait.</div> </template>

            <Column field="lastName" header="Last Name" frozen sortable />
            <Column field="firstName" header="First Name" frozen sortable />
            <Column field="middleName" header="Middle Name" />
            <Column field="status" header="Status" sortable>
                <template #editor="{ data, field }">
                    <Dropdown v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status" autofocus >
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                        </template>
                    </Dropdown>
                </template>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                </template>
            </Column>
            <Column field="date_submitted" header="Submission Date" sortable>
                <template #editor="{ data, field }">
                    <Calendar v-model="data[field]" id="calendar" showIcon iconDisplay="input" autofocus />
                </template>
            </Column>
            <Column field="remarks" header="Remarks">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" autofocus />
                </template>
            </Column>
            <Column field="updatedAt" header="Updated At" sortable />
            <Column :rowEditor="true" bodyStyle="text-align:center" frozen class="sticky right-0"></Column>
        </DataTable>
        </div>
</template>

<style>
</style>