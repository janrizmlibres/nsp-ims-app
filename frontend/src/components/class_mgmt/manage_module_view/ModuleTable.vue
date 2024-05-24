<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Toolbar from 'primevue/toolbar';
import MeterGroup from 'primevue/metergroup';
import Tag from 'primevue/tag';
import Badge from 'primevue/badge';
import InputText from 'primevue/inputtext';
import { computed, inject, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

// Custom
import AddModuleSection from './AddModuleSection.vue';
import EditModuleDialog from './EditModuleDialog.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useConfirm } from 'primevue/useconfirm';
import ProgressSpinner from 'primevue/progressspinner';
import { useStaffsStore } from '@/stores/staffs';

const toast = useToast()
const router = useRouter()
const confirm = useConfirm()

const classLearningStrandStore = useClassLearningStrandStore()
const staffsStore = useStaffsStore()

const learningStrands = inject('learningStrands')
const termStatus = inject('termStatus')
const term = inject('term')
const classLevel = inject('classLevel')

const allModules = ref([])
const module = ref()
const classLearningStrandId = ref()
const learningStrandInput = ref()
const selectedModules = ref([])

const isFetching = ref(false)
const metaKey = ref(true)
const editModuleDialogState = ref(false)
const dt = ref()
const dtDiv = ref()

const cols = ref([
    {field: 'no_submissions', header: 'No Submissions'},
    {field: 'lacking', header: 'Lacking'},
    {field: 'complete', header: 'Complete'},
    {field: 'total', header: 'Total'},
])

const selectedModulesStatus = computed(() => {
    let data = [... new Set(selectedModules.value.map(module => module.status))]
    if (data.length === 1) return data[0] ? true : false
    else return null
})

const statuses = ref([
    {label: 'Not Done', value: false},
    {label: 'Done', value: true}
]);

const meterProgress = ref([{
    label: `${allModules.value.filter((datum) => datum.status === true).length} of ${allModules.value.length} completed`, 
    color: '#265492',
    value: allModules.value.filter(datum => datum.status === true).length
}])

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
});

provide('classLearningStrandId', classLearningStrandId)
provide('allModules', allModules)
provide('module', module)
provide('editModuleDialogState', editModuleDialogState)
provide('learningStrandInput', learningStrandInput)
provide('updateModuleTable', updateModuleTable)

watch(() => learningStrands.value, () => {
    learningStrandInput.value = null
    allModules.value.length = 0
})

watch(() => learningStrandInput.value, (input) => {
    if (input) {
        try {
            classLearningStrandId.value = input.id

            classLearningStrandStore.getAllModules(input.id).then((data) => {
                updateModuleTable(data)
            })
        } catch (error) {
            console.log(error);
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Unexpected error encountered. Please refresh this page.',
                life: 3000
            })
        }
    }
})

function updateModuleTable(modules) {
    isFetching.value = true
    allModules.value.length = 0

    for (const module of modules) {
        allModules.value.push({
            id: module.id,
            title: module.title,
            distribution_date: new Date(module.distribution_date).toLocaleDateString(),
            retrieval_date: new Date(module.retrieval_date).toLocaleDateString(),
            no_submissions: module.noSubmissions,
            lacking: module.lacking,
            complete: module.complete,
            total: module.total,
            status: module.status,
            updatedAt: new Date(module.updatedAt).toLocaleString()
        })
    }

    isFetching.value = false
}

async function deleteModules() {
    confirm.require({
        message: 'Do you really want to delete?',
        header: 'Delete Confirmation',
        accept: async () => {
            try {
                const moduleIds = selectedModules.value.map(module => module.id)
                await classLearningStrandStore.deleteModules({moduleIds: moduleIds}).then((message) => {
                    deselect()
                    toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: message,
                        life: 3000
                    })

                    try {
                        classLearningStrandStore.getAllModules(learningStrandInput.value.id).then((data) => {
                            updateModuleTable(data)
                        })
                    } catch(error) {
                        console.log(error);
                    }
                    
                    try {
                        selectedModules.value.forEach(async (module) => {
                            await staffsStore.addAudit(
                                `Deleted: ${module.title} from ${learningStrandInput.value.learning_strand.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                            )
                        })
                    } catch(error) {
                        console.log(error);
                    }
                })
            } catch(error) {
                console.log(error);
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Unexpected error encountered. Please refresh this page.',
                    life: 3000
                })
            }
        }
    })
}

async function markAs() {
    try {
        const moduleIds = selectedModules.value.map(module => module.id)
        await classLearningStrandStore.updateModuleStatus({
            status: selectedModulesStatus.value,
            moduleIds: moduleIds
        }).then((message) => {
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: message,
                life: 3000
            })
        })
    } catch(error) {
        console.log(error);
    }

    try {
        classLearningStrandStore.getAllModules(learningStrandInput.value.id).then((data) => {
            updateModuleTable(data)
        })
    } catch(error) {
        console.log(error);
    }
}

function viewModule() {
    router.push({ name: 'module-info', query: {id: selectedModules.value[selectedModules.value.length-1].id, status: termStatus.value} })
}

function deselect() {
    selectedModules.value = []
}

const getStatusLabel = (status) => {
    switch (status) {
        case true:
            return 'success';

        case false:
            return 'warning';

        default:
            return null;
    }
};

const getNumericLabel = (field) => {
    switch (field) {
        case 'no_submissions':
            return 'danger';

        case 'lacking':
            return 'warning';

        case 'complete':
            return 'success';

        case 'total':
            return 'info';

        default:
            return null;
    }
}

function editModule(data) {
    module.value = {... data}
    editModuleDialogState.value = true
}

function onClickOutside(event) {
    if (dt.value && !dtDiv.value.contains(event.target)) deselect()
}

onMounted(() => {
    document.addEventListener('click', onClickOutside);
})

onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside);
})
</script>

<template>
    <div class="flex h-full w-full">
        <div v-if="termStatus" class="flex flex-col rounded-md mr-10 p-2 gap-8" >
            <AddModuleSection /> 
            
            <div class="u-bg-scolor shadow-xl rounded-md mt-2 p-4 text-surface-0">
                <label>Module Progress</label>
                <MeterGroup :value="meterProgress" :max="allModules.length" class="font-semibold" />
            </div>
        </div>
        <div class="flex flex-col h-full w-full overflow-hidden shadow-xl" ref="dtDiv">
            <Toolbar class="!p-2">
                <template #start>
                    <span v-if="selectedModules.length" class="flex flex-row gap-8 items-center mx-2">
                        <span class="flex items-center gap-2">
                            <Button icon="fa fa-circle-xmark fa-lg" text aria-label="Edit Mode" style="height: 2rem; width: 2rem;" @click="deselect"/>
                            <p>
                                {{ selectedModules.length + ' selected' }}
                            </p>
                        </span>
                        <span v-if="termStatus" class="flex gap-1 items-center">
                            <Button icon="fa fa-download" text aria-label="Download Selected" style="height: 2rem; width: 2rem;" @click="{}"/>
                            <Button icon="fa fa-trash" text aria-label="delete-selected" style="height: 2rem; width: 2rem;" @click="deleteModules"/>
                            <Button v-if="selectedModulesStatus === false" label="mark as done" text aria-label="mark-as-done" size="small" @click="markAs"/>
                            <Button v-if="selectedModulesStatus === true" label="mark as undone" text aria-label="mark-as-undone" size="small" @click="markAs"/>
                        </span>
                    </span>
                </template>
                <template #end>
                    <div class="flex flex-row gap-4 items-center mr-4">
                        <label class="font-semibold">Learning Strand:</label>
                        <Dropdown v-model="learningStrandInput" :options="learningStrands" optionLabel="learning_strand.name" placeholder="Select a Learning Strand" style="width: 20rem;" @update:modelValue="deselect" /> 
                    </div>
                    <span class="relative">
                        <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" class="pl-10 font-normal"/>
                    </span>
                </template>
            </Toolbar>
            <DataTable 
                :value="allModules" dataKey="id" ref="dt" :loading="isFetching"
                scrollable style=" overflow: auto;" class="unselectable" 
                v-model:filters="filters" filterDisplay="menu"
                :globalFilterFields="['title', 'distribution_date', 'retrieval_date', 'status']"
                sortField="title" :sortOrder="1" removableSort 
                v-model:selection="selectedModules" selectionMode="multiple" :metaKeySelection="metaKey" 
                @row-dblclick="viewModule"
            >
                <template #loading> <ProgressSpinner /> </template>
                <template #empty> <div class="text-center">No records found.</div> </template>

                <Column :exportable="false" style="width:2rem">
                    <template #body="slotProps">
                        <Button v-if="termStatus" icon="fa fa-pencil" text @click="editModule(slotProps.data)" />
                    </template>
                </Column>
                <Column field="title" header="Title" sortable />
                <Column field="distribution_date" header="Distribution Date" sortable />
                <Column field="retrieval_date" header="Retrieval Date" sortable />
                <Column v-for="col of cols" :key="col.field" :field="col.field" :header="col.header">
                    <template #body="{ data, field }">
                        <Badge :value="data[field]" :severity="getNumericLabel(col.field)"></Badge>
                    </template>
                </Column>
                <Column field="status" header="Status" :filterMenuStyle="{ width: '14rem' }">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status ? 'Done' : 'Not Done'" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                    <template #filter="{ filterModel }">
                        <Dropdown v-model="filterModel.value" :options="statuses" optionLabel="label" optionValue="value"  placeholder="Select One" class="p-column-filter" showClear>
                            <template #option="slotProps">
                                <Tag :value="slotProps.option.label" :severity="getStatusLabel(slotProps.option.value)" />
                            </template>
                        </Dropdown>
                    </template>
                </Column>
                <Column field="updatedAt" header="Updated At" sortable style="width: 10rem;" />
            </DataTable>
        </div>
    </div>
    <EditModuleDialog />
</template>

<style>
</style>