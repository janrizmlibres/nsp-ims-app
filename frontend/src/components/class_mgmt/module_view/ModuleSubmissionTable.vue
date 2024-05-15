<script setup>
// Presets
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useToast } from 'primevue/usetoast';

const classLearningStrandStore = useClassLearningStrandStore()

const route = useRoute()
const toast = useToast()

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

const props = defineProps(['modelValue'])
const emit = defineEmits(['onUpdate'])
const status = computed(() => route.query.status)
const isFetching = ref(false)
const learners = ref([])
const noChanges = ref(true)
const startingData = []
const updatedData = new Set([])

watch(() => props.modelValue, (data) => {
    console.log(typeof route.query.status);
    isFetching.value = true
    learners.value.length = 0

    for (const moduleSubmission of data.module_submissions) {
        if (moduleSubmission.date_submitted !== null) {
            moduleSubmission.date_submitted = new Date(moduleSubmission.date_submitted)
        }

        const temp = {
            id: moduleSubmission.id,
            lastName: moduleSubmission.enrollment.student.lastName,
            firstName: moduleSubmission.enrollment.student.firstName,
            middleName: moduleSubmission.enrollment.student.middleName,
            status: moduleSubmission.status,
            date_submitted: moduleSubmission.date_submitted,
            remarks: moduleSubmission.remarks,
            updatedAt: new Date(moduleSubmission.updatedAt)
        }

        const len = learners.value.push(temp)
        startingData.push(structuredClone(temp))
        
        watch(learners.value[len - 1], (newData) => {
            updatedData.add(newData)
            noChanges.value = false
        })
    }
    
    isFetching.value = false
}, {immediate: false})

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

async function updateSubmissions() {
    try {
        await classLearningStrandStore.updateModuleSubmissions({ updatedData: Array.from(updatedData) })
        classLearningStrandStore.getModule(route.query.id).then((data) => {
            emit('onUpdate', data)
        })

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Updated Grades Successfully',
            life: 5000
        })

        noChanges.value = true
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
        })
    }
}

function resetData() {
    learners.value = structuredClone(startingData)
    updatedData.clear()

    for (const datum of learners.value) {
        watch(datum, (newData) => {
        updatedData.add(newData)
        noChanges.value = false
        })
    }

    noChanges.value = true
}
// const editingRows = ref([]);

// const onRowEditSave = async (event) => {
//     let { data, newData } = event;

//     if ( JSON.stringify(data) !== JSON.stringify(newData) ) {
//         let date = null
//         if (newData.date_submitted) {
//             const offset = newData.date_submitted.getTimezoneOffset()
//             date = new Date(newData.date_submitted.getTime() - (offset*60*1000))
//         }

//         await classLearningStrandStore.updateModuleSubmissions(newData.id, {
//             newStatus: newData.status,
//             newSubmissionDate: date,
//             newRemarks: newData.remarks
//         })

//         classLearningStrandStore.getModule(route.query.id).then((data) => {
//             emit('onUpdate', data)
//         })
//     }
// };

const exportRef = ref()
function exportCSV() {
    exportRef.value.exportCSV()
}
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
            resizableColumns columnResizeMode="fit" showGridlines ref="exportRef"
            :paginator="learners.length > 10" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
            :ptOptions="{mergeProps:true}"
            :pt="customPt"
        >
            <template #empty> <div class="text-center">No records found.</div> </template>
            <template #loading> <div class="text-center">Loading class records. Please wait.</div> </template>

            <Column field="lastName" header="Last Name" frozen sortable />
            <Column field="firstName" header="First Name" frozen sortable />
            <Column field="middleName" header="Middle Name" />
            <Column field="status" header="Status" sortable>
                <template #body="slotProps">
                    <Dropdown v-model="slotProps.data.status" :options="statuses" optionLabel="label" optionValue="value" :placeholder="slotProps.data.status" :disabled="status === 'false'" autofocus >
                        <template #value="slotProps">
                            <Tag :value="slotProps.placeholder" :severity="getStatusLabel(slotProps.placeholder)" />
                        </template>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column field="date_submitted" header="Submission Date" sortable>
                <template #body="slotProps">
                    <Calendar v-model="slotProps.data.date_submitted" id="calendar" showIcon iconDisplay="input" :disabled="status === 'false'" autofocus>
                        <template #value="slotProps">
                            {{ slotProps.data.date_submitted.toDateString() }}
                        </template>
                    </Calendar>
                </template>
            </Column>
            <Column field="remarks" header="Remarks">
                <template #body="slotProps">
                    <InputText v-model="slotProps.data.remarks" :disabled="status === 'false'" autofocus />
                </template>
            </Column>
            <Column field="updatedAt" header="Updated At" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.updatedAt.toLocaleString() }}
                </template>
            </Column>
            <template #paginatorstart>
            
            </template>
            <template #paginatorend>
                <Button type="button" icon="pi pi-download" @click="exportCSV" text />
            </template>
        </DataTable>
        <div v-if="status === 'true'" class="flex justify-end gap-2 mt-4">
            <Button icon="fa fa-check" type="button" label="Update" :disabled="noChanges" @click="updateSubmissions"></Button>
            <Button icon="fa fa-rotate-left" type="button" label="Reset" severity="danger" :disabled="noChanges" @click="resetData"></Button>
        </div>
    </div>
</template>

<style>
</style>