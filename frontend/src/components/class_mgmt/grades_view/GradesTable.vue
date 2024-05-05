<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import { ref, watch } from 'vue';

// stores
import { useGradeStore } from '@/stores/grade';
import { useStrandStore } from '@/stores/strand';
import { useRoute } from 'vue-router';

const route = useRoute()

const gradeStore = useGradeStore()
const strandStore = useStrandStore()

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

const props = defineProps(['modelValue', 'dropTable'])
const dropTable = ref(props.dropTable)
const learners = ref([])

function fetchData(data) {
    learners.value.length = 0
    console.log(data);
    
    for (const grade of data) {
        let date = new Date(grade.updatedAt)
        if (grade.updatedAt !== null) {
            date = new Date(grade.updatedAt)
            date = date.toLocaleString()
        }

        const temp = {
            id: grade.id,
            lastName: grade.learner.lastName,
            firstName: grade.learner.firstName,
            middleName: grade.learner.middleName,
            first_quarter: grade.first_quarter,
            second_quarter: grade.second_quarter,
            third_quarter: grade.third_quarter,
            fourth_quarter: grade.fourth_quarter,
            remarks: grade.remarks,
            updatedAt: date
        }
        learners.value.push(temp)
    }
}

watch(() => props.modelValue, fetchData, { immediate: true })

const editingRows = ref([]);

const onRowEditSave = async (event) => {
    let { newData } = event;
    console.log(newData);

    await gradeStore.updateGrade(newData.id, {
        newFirst_quarter: newData.first_quarter,
        newSecond_quarter: newData.second_quarter,
        newThird_quarter: newData.third_quarter,
        newFourth_quarter: newData.fourth_quarter,
        newRemarks: newData.remarks
    })

    await strandStore.getAllGrades(route.query.id)
};
</script>

<template>
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
        <Column field="first_quarter" header="Q1">
            <template #body="{ data, field }">
                <Checkbox v-model="data[field]" :binary="true" disabled />
            </template>
            <template #editor="{ data, field }">
                <Checkbox v-model="data[field]" :binary="true" />
            </template>
        </Column>
        <Column field="second_quarter" header="Q2">
            <template #body="{ data, field }">
                <Checkbox v-model="data[field]" :binary="true" disabled />
            </template>
            <template #editor="{ data, field }">
                <Checkbox v-model="data[field]" :binary="true" />
            </template>
        </Column>
        <Column field="third_quarter" header="Q3">
            <template #body="{ data, field }">
                <Checkbox v-model="data[field]" :binary="true" disabled />
            </template>
            <template #editor="{ data, field }">
                <Checkbox v-model="data[field]" :binary="true" />
            </template>
        </Column>
        <Column field="fourth_quarter" header="Q4">
            <template #body="{ data, field }">
                <Checkbox v-model="data[field]" :binary="true" disabled />
            </template>
            <template #editor="{ data, field }">
                <Checkbox v-model="data[field]" :binary="true" />
            </template>
        </Column>
        <Column field="remarks" header="Remarks">
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" autofocus />
            </template>
        </Column>
        <Column field="updatedAt" header="Updated At" sortable />
        <Column v-if="!dropTable" :rowEditor="true" bodyStyle="text-align:center" frozen class="sticky right-0"></Column>
    </DataTable>
</template>

<style>
</style>