<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const classLearningStrandStore = useClassLearningStrandStore()

const toast = useToast()
const router = useRouter()
const confirm = useConfirm()

const customPt = {
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

const emit = defineEmits(['onUpdate'])
const props = defineProps(['modelValue', 'isNotActive', 'id'])
const isNotActive = computed(() => props.isNotActive)
const classLearningStrandId = computed(() => props.id)
const grades = ref([])
const noChanges = ref(true)

const startingData = []
const updatedData = new Set([])
const leave = ref(true)

watch(() => props.modelValue, (data) => {
    grades.value.length = 0
    startingData.length = 0

    for (const datum of data) {
        const temp = {
            id: datum.id,
            enrollmentId: datum.enrollment.id,
            classLearningStrandId: datum.classLearningStrandId,
            lastName: datum.enrollment.student.lastName,
            firstName: datum.enrollment.student.firstName,
            middleName: datum.enrollment.student.middleName,
            grades: {
                first_quarter: datum.first_quarter,
                second_quarter: datum.second_quarter,
                third_quarter: datum.third_quarter,
                fourth_quarter: datum.fourth_quarter,
                remarks: datum.remarks,
                updatedAt: datum.updatedAt
            }
        }

        const len = grades.value.push(temp)
        startingData.push(structuredClone(temp))
        
        watch(grades.value[len - 1], (newData) => {
            updatedData.add(newData)
            leave.value = false
            noChanges.value = false
        })
    }
}, {immediate: true})

async function updateGrades() {
    try {
        await classLearningStrandStore.updateGrades({ updatedData: Array.from(updatedData) })
        classLearningStrandStore.getAllGrades(classLearningStrandId.value).then((data) => {
            emit('onUpdate', data)
        })

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Updated Grades Successfully',
            life: 5000
        })

        leave.value = true
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
    grades.value = structuredClone(startingData)
    updatedData.clear()
    leave.value = true

    for (const grade of grades.value) {
        watch(grade, (newData) => {
            updatedData.add(newData)
            leave.value = false
            noChanges.value = false
        })
    }

    noChanges.value = true
}

onBeforeRouteLeave((to) => {
    if (leave.value) {
        return true
    }

    confirm.require({
        message: 'Do you really want to leave? you have unsaved changes!',
        header: 'Redirect Confirmation',
        accept: async () => {
            leave.value = true
            await router.push(to)
        }
    })

    return false
})
</script>

<template>
    <DataTable 
        :value="grades" dataKey="id" 
        sortField="lastName" :sortOrder="1" removableSort 
        resizableColumns columnResizeMode="fit" showGridlines
        :paginator="grades.length > 10" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
        :ptOptions="{mergeProps:true}"
        :pt="customPt"
    >
        <template #empty> <div class="text-center">No records found.</div> </template>
        <template #loading> <div class="text-center">Loading class records. Please wait.</div> </template>

        <Column field="lastName" header="Last Name" frozen sortable />
        <Column field="firstName" header="First Name" frozen sortable />
        <Column field="middleName" header="Middle Name" />

        <Column field="first_quarter" header="Q1">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.grades.first_quarter" :disabled="isNotActive" :binary="true" />
            </template>
        </Column>
        <Column field="second_quarter" header="Q2">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.grades.second_quarter" :disabled="isNotActive" :binary="true" />
            </template>
        </Column>
        <Column field="third_quarter" header="Q3">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.grades.third_quarter" :disabled="isNotActive" :binary="true" />
            </template>
        </Column>
        <Column field="fourth_quarter" header="Q4">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.grades.fourth_quarter" :disabled="isNotActive" :binary="true" />
            </template>
        </Column>
        <Column field="remarks" header="Remarks">
            <template #body="slotProps">
                <InputText v-model="slotProps.data.grades.remarks" :disabled="isNotActive" autofocus />
            </template>
        </Column>
        <Column field="grades.updatedAt" header="Updated At" sortable>
            <template #body="slotProps">
                {{ new Date(slotProps.data.grades.updatedAt).toLocaleString() }}
            </template>
        </Column>
        <template #footer>
            <p>
                Record(s) count: <span class="u-txt-red"> {{ grades.length }} </span>
            </p>
        </template>
    </DataTable>
    <div v-if="!isNotActive" class="flex justify-end gap-2 mt-4">
        <Button icon="fa fa-check" type="button" label="Update" :disabled="noChanges" @click="updateGrades"></Button>
        <Button icon="fa fa-rotate-left" type="button" label="Reset" severity="danger" :disabled="noChanges" @click="resetData"></Button>
    </div>
</template>

<style>
</style>