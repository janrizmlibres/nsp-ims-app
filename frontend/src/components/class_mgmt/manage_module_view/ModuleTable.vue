<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Toolbar from 'primevue/toolbar';
import MeterGroup from 'primevue/metergroup';
import Tag from 'primevue/tag';
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

// Custom
import AddModuleDialog from './AddModuleDialog.vue';
import EditModuleDialog from './EditModuleDialog.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const classLearningStrandStore = useClassLearningStrandStore()

const props = defineProps(['learningStrands', 'termStatus'])
const toast = useToast()
const router = useRouter()

const cols = ref([
    {field: 'no_submissions', header: 'No Submissions'},
    {field: 'lacking', header: 'Lacking'},
    {field: 'complete', header: 'Complete'},
    {field: 'total', header: 'Total'},
])

const customPt = {
    table: {
        class: ['px-4 border-spacing-y-4']
    },
    column: {
        headercell: ({ context, props }) => ({
            class: [
                'u-txt-active',
                // Color
                (props.sortable === '' || props.sortable) && context.sorted ? 'bg-surface-200' : 'bg-surface-200'
            ]
        }),
        bodycell: {
            class: ['my-4']
        }
    },
    bodyrow: {
        class: ['rounded-lg shadow-[0_0_2px_rgb(0,0,0,0.2)]']
    },
}

const termStatus = computed(() => props.termStatus)
const isFetching = ref(false)
const allModules = ref([])
const module = ref()
const classLearningStrandId = ref()
const learningStrandInput = ref()
const selectedModules = ref([])
const metaKey = ref(true)
const editModuleDialog = ref(false)
const addModuleDialog = ref(false)

const meterProgress = ref((data) => {
    return [{
        label: `() of ${data.length} completed`, 
        value: data.length
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
            status: module.status
        })
    }
}

async function deleteModules() {
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

function editModule(data) {
    module.value = {... data}
    showEditModuleDialog()
}

function showEditModuleDialog() {
    editModuleDialog.value = !editModuleDialog.value
}

function showAddModuleDialog() {
    addModuleDialog.value = !addModuleDialog.value
}
</script>

<template>
    <div class="flex flex-row grow">
        <div class="flex flex-col w-[15%] rounded-md mr-6 p-2 gap-4" >
            <Button icon="fa fa-plus" label="Add Module" aria-label="Add Module" iconClass="['mr-4']" text rounded raised :disabled="!(termStatus && learningStrandInput)" @click="showAddModuleDialog"/>
            
            <div v-if="termStatus && learningStrandInput" class="mt-2">
                <label>Module Progress</label>
                <MeterGroup :value="meterProgress(allModules)" :max="allModules.length" />
            </div>
        </div>
        <div class="w-[85%] shadow-xl">
            <Toolbar class="!p-2">
                <template #start>
                    <span v-if="selectedModules.length" class="flex flex-row gap-8 items-center mx-2">
                        <span class="flex items-center gap-2">
                            <Button icon="fa fa-circle-xmark fa-lg" text aria-label="Edit Mode" style="height: 2rem; width: 2rem;" @click="deselect"/>
                            <p>
                                {{ selectedModules.length + ' selected' }}
                            </p>
                        </span>
                        <span class="flex gap-1">
                            <Button icon="fa fa-download" text aria-label="Download Selected" style="height: 2rem; width: 2rem;" @click="{}"/>
                            <Button icon="fa fa-trash" text aria-label="Delete Selected" style="height: 2rem; width: 2rem;" @click="deleteModules"/>
                        </span>
                    </span>
                </template>
                <template #end>
                    <Dropdown v-model="learningStrandInput" :options="props.learningStrands" optionLabel="learning_strand.name" placeholder="Select a Learning Strand" style="width: 20rem;" @update:modelValue="deselect" />    
                </template>
            </Toolbar>
            <DataTable 
                :value="allModules" dataKey="id" 
                v-model:selection="selectedModules"
                selectionMode="multiple" :metaKeySelection="metaKey" @row-dblclick="viewModule"
                sortField="retrieval_date" :sortOrder="-1" removableSort
                :pt="customPt" :ptOptions="{mergeProps:true}" class="unselectable"
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
                <Column v-for="col of cols" :key="col.field" :field="col.field" :header="col.header" />
                <Column field="status" header="Status">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status ? 'Finished' : 'Unfinished'" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <AddModuleDialog :id="classLearningStrandId" :state="addModuleDialog" @onUpdate="updateModuleTable" @onUpdateDisplay="showAddModuleDialog" /> 
    <EditModuleDialog :id="classLearningStrandId" :data="module" :state="editModuleDialog" @onUpdate="updateModule" @onUpdateDisplay="showEditModuleDialog" />
</template>

<style>
.unselectable {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

</style>