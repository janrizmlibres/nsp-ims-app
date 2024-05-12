<script setup>
// Presets
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import { ref, watch } from 'vue';
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
const isFetching = ref(false)
const learners = ref([])
const noChanges = ref(true)
const startingData = []
const updatedData = new Set([])

watch(() => props.modelValue, (data) => {
    isFetching.value = true
    learners.value.length = 0

    for (const attendance of data.attendances) {

        const temp = {
            id: attendance.id,
            lastName: attendance.enrollment.student.lastName,
            firstName: attendance.enrollment.student.firstName,
            middleName: attendance.enrollment.student.middleName,
            status: attendance.status,
            remarks: attendance.remarks,
            updatedAt: new Date(attendance.updatedAt)
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

const statuses = ref([
    { label: 'Absent', value: 'Absent' },
    { label: 'Present', value: 'Present' }
]);

async function updateAttendances() {
    try {
        await classLearningStrandStore.updateAttendances({ updatedData: Array.from(updatedData) })
        classLearningStrandStore.getSession(route.query.id).then((data) => {
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

const exportRef = ref()
function exportCSV() {
    exportRef.value.exportCSV()
}
</script>

<template>
    <div class="bg-white shadow-xl rounded-md p-5">
        <div class="flex flex-row gap-4 items-center px-4">
            <i class="fa fa-note-sticky fa-2xl u-txt-active"></i>
            <span class="font-semibold text-3xl u-txt-active">Attendances</span>
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
            <Column field="status" header="Status" style="max-width: 10rem;" sortable>
                <template #body="slotProps">
                    <div class="flex gap-4">
                        <div v-for="status in statuses" :key="status.value" class="flex align-items-center">
                            <RadioButton v-model="slotProps.data.status" :inputId="status.value" name="dynamic" :value="status.value" />
                            <label :for="status.label" class="ml-2">{{ status.label }}</label>
                        </div>
                    </div>
                </template>
            </Column>
            <Column field="remarks" header="Remarks" style="max-width: 10rem;">
                <template #body="slotProps">
                    <InputText v-model="slotProps.data.remarks" autofocus />
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
        <div class="flex justify-end gap-2 mt-4">
            <Button icon="fa fa-check" type="button" label="Update" :disabled="noChanges" @click="updateAttendances"></Button>
            <Button icon="fa fa-rotate-left" type="button" label="Reset" severity="danger" :disabled="noChanges" @click="resetData"></Button>
        </div>
    </div>
</template>

<style>
</style>