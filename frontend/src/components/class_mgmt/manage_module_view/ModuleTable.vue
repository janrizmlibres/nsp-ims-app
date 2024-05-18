<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Toolbar from 'primevue/toolbar';
import MeterGroup from 'primevue/metergroup';
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';

// Custom
import AddModuleDialog from './AddModuleDialog.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

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
const classLearningStrandId = ref()
const learningStrandInput = ref()
const selectedModules = ref([])
const metaKey = ref(true)

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
            total: module.total
        })
    }
}

async function deleteModules() {
    try {
        const moduleIds = selectedModules.value.map(module => module.id)
        await classLearningStrandStore.deleteModules({moduleIds: moduleIds})

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

function deselect() {
    selectedModules.value = []
}

function viewModule() {
    router.push({ name: 'module-info', query: {id: selectedModules.value[selectedModules.value.length-1].id, status: termStatus.value} })
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


const editingRows = ref([]);
const leave = ref(true)

watch(() =>  editingRows.value, (data) => {
    if (data.length === 0) leave.value = true
    else leave.value = false
})

const onRowEditSave = async (event) => {
    let { data, newData } = event;
    if ( JSON.stringify(data) !== JSON.stringify(newData) ) {
        isFetching.value = true
        try {
            await classLearningStrandStore.updateModule(newData.id, {
                title: newData.title,
                distribution_date: newData.distribution_date,
                retrieval_date: newData.retrieval_date
            })

            classLearningStrandStore.getAllModules(classLearningStrandId.value).then((data) => {
                updateModuleTable(data)
            })

            isFetching.value = false

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
    <div class="flex flex-row grow">
        <div v-if="termStatus && learningStrandInput" class="flex flex-col rounded-md mr-6 p-2 gap-4" >
            <Button  icon="fa fa-plus" label="Add Module" aria-label="Add Module" iconClass="['mr-4']" text rounded raised @click="classLearningStrandStore.showHideAddModuleDialog"/>
            <AddModuleDialog @onUpdate="updateModuleTable" :id="classLearningStrandId" /> 

            <Button icon="fa fa-pencil" label="Edit Mode" aria-label="Edit Mode" text rounded raised @click="{}"/>
            <div class="mt-2">
                <label>Module Progress</label>
                <MeterGroup :value="meterProgress(allModules)" :max="allModules.length" />
            </div>
        </div>
        <div class="flex-1 shadow-xl">
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
                :paginator="allModules.length > 10" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
                :pt="customPt" :ptOptions="{mergeProps:true}" class="unselectable"
            >
                <template #empty> <div class="text-center">No records found.</div> </template>

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
            </DataTable>
        </div>
    </div>
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