<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { format } from 'date-fns';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';

// Custom

// stores
import { useClassesStore } from '@/stores/classes';
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const classesStore = useClassesStore()
const classLearningStrandStore = useClassLearningStrandStore()

const props = defineProps(['id', 'termStatus'])
const toast = useToast()
const confirm = useConfirm()
const router = useRouter()

const cols = ref([
    {field: 'absent', header: 'Absent'},
    {field: 'present', header: 'Present'},
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

const termStatus = computed(() => props.termStatus)
const isFetching = ref(false)
const allSessions = ref([])
const classLearningStrandId = ref()
const editingRows = ref([]);
const leave = ref(true)

function updateSessionTable(sessions) {
    isFetching.value = true
    allSessions.value.length = 0
    
    for (const session of sessions) {
        let date = new Date(session.date)
        
        const temp = ref({
            id: session.id,
            date: date,
            absent: session.absent,
            present: session.present,
            total: session.total,
            remarks: session.remarks
        })
        allSessions.value.push(temp.value)
    }
    
    isFetching.value = false
}

watch(() => props.id, (id) => {
    isFetching.value = true
    classLearningStrandId.value = id
    try {
        classLearningStrandStore.getAllSessions(id).then((data) => {
            updateSessionTable(data)
        })
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered.',
            life: 3000
        })
    }
    isFetching.value = false
}, {immediate: false})

async function addSession() {
    const date = new Date()
    const offset = date.getTimezoneOffset()
    let newDate = format(new Date(date.getTime() - (offset*60*1000)), "yyyy-MM-dd");

    try {
        await classLearningStrandStore.addSession(classLearningStrandId.value, {date:newDate})
        classLearningStrandStore.getAllSessions(classLearningStrandId.value).then((data) => {
            updateSessionTable(data)
        })
        
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Session created successfully',
            life: 3000
        })
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail:"Session exists already!",
            life: 3000
        })
    }
}

watch(() =>  editingRows.value, (data) => {
    if (data.length === 0) leave.value = true
    else leave.value = false
})

const onRowEditSave = async (event) => {
    let { data, newData } = event;

    if (Object.values(data) != Object.values(newData)) {
        try {
            await classLearningStrandStore.updateSession(newData.id, {remarks: newData.remarks})
            classLearningStrandStore.getAllSessions(classLearningStrandId.value).then((data) => {
                updateSessionTable(data)
            })
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Session updated successfully',
                life: 3000
            })
        } catch(error) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail:"Unexpected error encountered.",
                life: 3000
            })
        }
    }
};

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
    <Dropdown v-model="learningStrandInput" :options="learningStrands" optionLabel="learning_strand.name" placeholder="Select a Strand" class="w-full mb-4" @update:modelValue="updateLearningStand" />
    <DataTable 
        :value="allSessions" dataKey="id" 
        :sortField="Object.keys(classesStore.data[0])[0]" :sortOrder="-1" removableSort 
        resizableColumns columnResizeMode="fit" showGridlines
        v-model:editingRows="editingRows" editMode="row" @row-edit-save="onRowEditSave"
        :paginator="allSessions.length > 10" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
        :ptOptions="{mergeProps:true}"
        :pt="customPt"
    >
        <template #empty> <div class="text-center">No records found.</div> </template>
        <template #loading> <div class="text-center">Loading class records. Please wait.</div> </template>

        <Column header="" class="u-txt-active text-center" style="width: 2rem">
            <template #body="slotProps">
                <RouterLink :to="{ name: 'session-info', query: { id: slotProps.data.id, status: termStatus } }">
                    <i class="fa fa-eye" />
                </RouterLink>
            </template>
        </Column>
        <Column field="date" header="Session Date">
            <template #body="slotProps">
                {{ slotProps.data.date.toDateString() }}
            </template>
        </Column>
        <Column v-for="col of cols" :key="col.field" :field="col.field" :header="col.header" sortable />
        <Column field="remarks" header="Remarks" style="max-width: 10rem;">
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" autofocus />
            </template>
        </Column>
        <Column :rowEditor="true" bodyStyle="text-align:center"></Column>
        <template #footer v-if="termStatus"> 
            <Button icon="fa fa-plus" label="Add Session" text raised rounded aria-label="Submit" @click="addSession"/>
        </template>
    </DataTable>
</template>

<style>
</style>