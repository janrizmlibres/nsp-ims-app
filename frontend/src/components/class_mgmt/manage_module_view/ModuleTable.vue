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
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

// Custom
import AddModuleSection from './AddModuleSection.vue';
import EditModuleDialog from './EditModuleDialog.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useConfirm } from 'primevue/useconfirm';

const classLearningStrandStore = useClassLearningStrandStore()

const props = defineProps(['learningStrands', 'termStatus'])
const toast = useToast()
const router = useRouter()
const confirm = useConfirm()

const cols = ref([
    {field: 'no_submissions', header: 'No Submissions'},
    {field: 'lacking', header: 'Lacking'},
    {field: 'complete', header: 'Complete'},
    {field: 'total', header: 'Total'},
])

const termStatus = computed(() => props.termStatus)
const isFetching = ref(false)
const allModules = ref([])
const module = ref()
const classLearningStrandId = ref()
const learningStrandInput = ref()
const selectedModules = ref([])
const metaKey = ref(true)
const editModuleDialog = ref(false)
const status = computed(() => {
    let data = [... new Set(selectedModules.value.map(module => module.status))]
    if (data.length === 1) return data[0] ? true : false
    else return null
})

const meterProgress = ref((data) => {
    return [{
        label: `${data.filter((datum) => datum.status === true).length} of ${data.length} completed`, 
        value: data.filter(datum => datum.status === true).length
    }]
})

function updateModuleTable(modules) {
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
            total: module.total,
            status: module.status,
            updatedAt: module.updatedAt
        })
    }
}

async function deleteModules() {
    confirm.require({
        message: 'Do you really want to delete?',
        header: 'Delete Confirmation',
        accept: async () => {
            try {
                const moduleIds = selectedModules.value.map(module => module.id)
                await classLearningStrandStore.deleteModules({moduleIds: moduleIds})
                deselect()
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Module(s) deleted successfully!',
                    life: 3000
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
    })
}

async function markAs() {
    try {
        const moduleIds = selectedModules.value.map(module => module.id)
        await classLearningStrandStore.updateModuleStatus({
            status: status.value,
            moduleIds: moduleIds
        })

        classLearningStrandStore.getAllModules(classLearningStrandId.value).then((data) => {
            updateModuleTable(data)
        })
    } catch(error) {
        console.log(error);
    }
}

function viewModule() {
    router.push({ name: 'module-info', query: {id: selectedModules.value[selectedModules.value.length-1].id, status: termStatus.value} })
}

function updateModule(data) {
    updateModuleTable(data)
    showEditModuleDialog()
}

function deselect() {
    selectedModules.value = []
}

watch(() => props.learningStrands, () => {
    learningStrandInput.value = null
    allModules.value.length = 0
})

watch(() => learningStrandInput.value, (input) => {
    if (input) {
        isFetching.value = true
        classLearningStrandId.value = input.id
        try {
            classLearningStrandStore.getAllModules(input.id).then((data) => {
                updateModuleTable(data)
            })
            
            isFetching.value = false
        } catch (error) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Unexpected error encountered. Please refresh this page.',
                life: 3000
            })
        }
    }
})

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
    showEditModuleDialog()
}

function showEditModuleDialog() {
    editModuleDialog.value = !editModuleDialog.value
}
</script>

<template>
    <div class="flex h-full w-full">
        <div class="flex flex-col w-[17%] rounded-md mr-10 p-2 gap-4" >
            <AddModuleSection :id="classLearningStrandId"  @onUpdate="updateModuleTable" /> 
            
            <div class="mt-2 p-4">
                <label>Module Progress</label>
                <MeterGroup :value="meterProgress(allModules)" :max="allModules.length" class="font-semibold" />
            </div>
        </div>
        <div class="w-[83%] flex flex-col h-full overflow-hidden shadow-xl">
            <Toolbar class="!p-2">
                <template #start>
                    <span v-if="selectedModules.length" class="flex flex-row gap-8 items-center mx-2">
                        <span class="flex items-center gap-2">
                            <Button icon="fa fa-circle-xmark fa-lg" text aria-label="Edit Mode" style="height: 2rem; width: 2rem;" @click="deselect"/>
                            <p>
                                {{ selectedModules.length + ' selected' }}
                            </p>
                        </span>
                        <span class="flex gap-1 items-center">
                            <Button icon="fa fa-download" text aria-label="Download Selected" style="height: 2rem; width: 2rem;" @click="{}"/>
                            <Button icon="fa fa-trash" text aria-label="delete-selected" style="height: 2rem; width: 2rem;" @click="deleteModules"/>
                            <Button v-if="status === false" label="mark as done" text aria-label="mark-as-done" size="small" @click="markAs"/>
                            <Button v-if="status === true" label="mark as undone" text aria-label="mark-as-undone" size="small" @click="markAs"/>
                        </span>
                    </span>
                </template>
                <template #end>
                    <div class="flex flex-row gap-4 items-center">
                        <label class="font-semibold">Learning Strand:</label>
                        <Dropdown v-model="learningStrandInput" :options="props.learningStrands" optionLabel="learning_strand.name" placeholder="Select a Learning Strand" style="width: 20rem;" @update:modelValue="deselect" /> 
                    </div>
                </template>
            </Toolbar>
            <DataTable 
                :value="allModules" dataKey="id" 
                v-model:selection="selectedModules" scrollable style=" overflow: auto;"
                selectionMode="multiple" :metaKeySelection="metaKey" @row-dblclick="viewModule"
                sortField="title" :sortOrder="1" removableSort class="unselectable"
            >
                <template #empty> <div class="text-center">No records found.</div> </template>

                <Column :exportable="false" style="width:2rem">
                    <template #body="slotProps">
                        <Button icon="fa fa-pencil" text @click="editModule(slotProps.data)" />
                    </template>
                </Column>
                <Column field="title" header="Title" sortable />
                <Column field="distribution_date" header="Distribution Date" sortable>
                    <template #body="slotProps">
                        {{ slotProps.data.distribution_date.toDateString() }}
                    </template>
                </Column>
                <Column field="retrieval_date" header="Retrieval Date" sortable>
                    <template #body="slotProps">
                        {{ slotProps.data.retrieval_date.toDateString() }}
                    </template>
                </Column>
                <Column v-for="col of cols" :key="col.field" :field="col.field" :header="col.header">
                    <template #body="{ data, field }">
                        <Badge :value="data[field]" :severity="getNumericLabel(col.field)"></Badge>
                    </template>
                </Column>
                <Column field="status" header="Status">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status ? 'Done' : 'Not Done'" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                </Column>
                <Column field="updatedAt" header="Updated At" sortable style="width: 10rem;">
                    <template #body="slotProps">
                        {{ new Date(slotProps.data.updatedAt).toLocaleString() }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <EditModuleDialog :id="classLearningStrandId" :data="module" :state="editModuleDialog" @onUpdate="updateModule" @onUpdateDisplay="showEditModuleDialog" />
</template>

<style>
</style>