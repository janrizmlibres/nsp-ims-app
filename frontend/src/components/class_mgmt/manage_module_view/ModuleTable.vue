<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';

// Custom
import AddModuleDialog from './AddModuleDialog.vue';

// stores
import { useClassesStore } from '@/stores/classes';
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const classesStore = useClassesStore()
const classLearningStrandStore = useClassLearningStrandStore()

const props = defineProps(['id', 'termStatus'])
const toast = useToast()
const router = useRouter()
const confirm = useConfirm()

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
    column: {
        headercell: ({ context, props }) => ({
            class: [
                'font-medium',
                // Color
                (props.sortable === '' || props.sortable) && context.sorted ? 'bg-white u-txt-active' : 'bg-white u-txt-active'
            ]
        }),
            sorticon: ({ context }) => ({
                class: ['ml-2', context.sorted ? 'u-legend-txt-color dark:text-white/80' : 'u-txt-active dark:text-white/70']
        }),
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

const termStatus = computed(() => props.termStatus)
const isFetching = ref(false)
const allModules = ref([])
const classLearningStrandId = ref()

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

watch(() => props.id, (id) => {
    isFetching.value = true
    classLearningStrandId.value = id
    try {
        classLearningStrandStore.getAllModules(id).then((data) => {
            updateModuleTable(data)
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


const editingRows = ref([]);
const leave = ref(true)

watch(() =>  editingRows.value, (data) => {
    if (data.length === 0) leave.value = true
    else leave.value = false
})

const onRowEditSave = async (event) => {
    let { data, newData } = event;
    if ( JSON.stringify(data) !== JSON.stringify(newData) ) {
        try {
            await classLearningStrandStore.updateModule(newData.id, {
                title: newData.title,
                distribution_date: newData.distribution_date,
                retrieval_date: newData.retrieval_date
            })

            classLearningStrandStore.getAllModules(classLearningStrandId.value).then((data) => {
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
                severity: 'error',
                summary: 'Error',
                detail: 'Unexpected error encountered.',
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
                <RouterLink :to="{ name: 'module-info', query: {id: slotProps.data.id, status: termStatus} }">
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
        <Column v-for="col of cols" :key="col.field" :field="col.field" :header="col.header" />
        <Column :rowEditor="termStatus" bodyStyle="text-align:center" frozen class="right-0" />
        <template #footer v-if="termStatus"> 
            <Button icon="fa fa-plus" label="Add Module" text raised rounded aria-label="Submit" @click="classLearningStrandStore.showHideAddModuleDialog"/>
            <AddModuleDialog @onUpdate="updateModuleTable" :id="classLearningStrandId" /> 
        </template>
    </DataTable>
</template>

<style>
</style>