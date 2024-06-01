<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Toolbar from 'primevue/toolbar';
import Tag from 'primevue/tag';
import Badge from 'primevue/badge';
import InputText from 'primevue/inputtext';
import { computed, inject, provide, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRoute, useRouter } from 'vue-router';
import ProgressSpinner from 'primevue/progressspinner';
import { useConfirm } from 'primevue/useconfirm';

// Custom
import AddModulePanel from './AddModulePanel.vue'
import EditModuleDialog from './EditModuleDialog.vue'

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useUsersStore } from '@/stores/users';


const toast = useToast()
const router = useRouter()
const confirm = useConfirm()
const route = useRoute()

const classLearningStrandStore = useClassLearningStrandStore()
const usersStore = useUsersStore()

const filters = inject('filters')
const term = inject('term')
const classLevel = inject('classLevel')
const learningStrand = inject('learningStrand')

const allModules = ref([])
const module = ref()
const selectedModules = ref([])
const isFetching = ref(false)
const metaKey = ref(true)
const editModuleDialogState = ref(false)
const dt = ref()
const op = ref()
const cols = ref([
    { field: 'no_submissions', header: 'No Submissions' },
    { field: 'submitted', header: 'Submitted' },
    { field: 'graded', header: 'Graded' },
    { field: 'total_score', header: 'Total Score' }
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

provide('op', op)
provide('allModules', allModules)
provide('module', module)
provide('editModuleDialogState', editModuleDialogState)
provide('updateModuleTable', updateModuleTable)

watch(() => learningStrand.value, () => updateModuleTable())

function updateModuleTable() {
    deselect()

    isFetching.value = true
    allModules.value.length = 0
    
    classLearningStrandStore.getAllModules(learningStrand.value.id).then((modules) => {
        for (const module of modules) {
            allModules.value.push({
                id: module.id,
                title: module.title,
                distribution_date: new Date(module.distribution_date).toLocaleDateString(),
                retrieval_date: new Date(module.retrieval_date).toLocaleDateString(),
                no_submissions: module.noSubmissions,
                submitted: module.submitted,
                graded: module.graded,
                total_score: module.total_score,
                status: module.status,
                updatedAt: new Date(module.updatedAt).toLocaleString()
            })
        }

        isFetching.value = false
    }).catch((error) => {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
        })

        isFetching.value = false
    })
}

async function deleteModules() {
    confirm.require({
        message: 'Do you really want to delete?',
        header: 'Delete Confirmation',
        accept: async () => {
            try {
                const moduleIds = selectedModules.value.map(module => module.id)
                await classLearningStrandStore.deleteModules({moduleIds: moduleIds}).then((message) => {
                    toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: message,
                        life: 3000
                    })

                    try {
                        selectedModules.value.forEach(async (module) => {
                            await usersStore.addAudit(
                                `Deleted: ${module.title} from ${learningStrand.value.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                            ).then(deselect())
                        })
                    } catch(error) {
                        console.log(error);
                    }

                    updateModuleTable()
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
        const status = structuredClone(selectedModulesStatus.value)
        await classLearningStrandStore.updateModuleStatus({
            status: status,
            moduleIds: moduleIds
        }).then((message) => {
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: message,
                life: 3000
            })

            try {
                selectedModules.value.forEach(async (module) => {
                    await usersStore.addAudit(
                        `Updated: Marked ${module.title} as ${status ? 'undone' : 'done'} from ${learningStrand.value.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                    ).then(deselect())
                })
            } catch(error) {
                console.log(error);
            }

            updateModuleTable()
        })
    } catch(error) {
        console.log(error);
    }
}

function viewModule() {
    router.push({ name: 'class', query: { ...route.query, module: selectedModules.value[selectedModules.value.length - 1].id}})
}

function deselect() {
    selectedModules.value = []
}

const getStatusLabel = (status) => {
    switch (status) {
        case true:
        return 'success'

        case false:
        return 'warning'

        default:
        return null
    }
}

const getNumericLabel = (field) => {
    switch (field) {
        case 'no_submissions':
        return 'danger'

        case 'submitted':
        return 'warning'

        case 'graded':
        return 'success'

        case 'total_score':
        return 'info'

        default:
        return null
    }
}

function editModule(data) {
    module.value = {... data}
    editModuleDialogState.value = true
}

const toggle = (event) => {
    op.value.toggle(event);
}
</script>

<template>
    <div class="flex h-full w-full">
        <div class="flex flex-col h-full w-full overflow-hidden">
            <Toolbar class="!p-2">
                <template #start>
                    <span v-if="selectedModules.length" class="flex flex-row gap-8 items-center mx-2">
                        <span class="flex items-center gap-2">
                            <Button icon="fa fa-circle-xmark fa-lg" text aria-label="Deselect" style="height: 2rem; width: 2rem;" @click="deselect"/>
                            <p>
                                {{ selectedModules.length + ' selected' }}
                            </p>
                        </span>
                        <span class="flex gap-1 items-center">
                            <!-- <Button icon="fa fa-download" text aria-label="download-selected" style="height: 2rem; width: 2rem;" @click="{}"/> -->
                            <Button icon="fa fa-trash" text aria-label="delete-selected" style="height: 2rem; width: 2rem;" @click="deleteModules"/>
                            <Button v-if="selectedModulesStatus === false" label="mark as done" text aria-label="mark-as-done" size="small" @click="markAs"/>
                            <Button v-if="selectedModulesStatus === true" label="mark as undone" text aria-label="mark-as-undone" size="small" @click="markAs"/>
                        </span>
                    </span>
                </template>
                <template #end>
                    <span>
                        <Button text icon="fa fa-plus" label="Add Module" aria-label="add-module" style="height: 2rem;" class="!rounded-full mr-2 gap-2" @click="toggle"/>
                        <AddModulePanel /> 
                    </span>
                    <span class="relative">
                        <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" class="pl-10 font-normal"/>
                    </span>
                </template>
            </Toolbar>
            <DataTable 
                :value="allModules" dataKey="id" ref="dt" :loading="isFetching"
                scrollable class="unselectable" 
                v-model:filters="filters" filterDisplay="menu"
                :globalFilterFields="['title', 'distribution_date', 'retrieval_date', 'status']"
                sortField="title" :sortOrder="1" removableSort 
                v-model:selection="selectedModules" selectionMode="multiple" :metaKeySelection="metaKey"
                paginator :rows="15" :rowsPerPageOptions="[15, 20, 30, 50]"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                @row-dblclick="viewModule"
            >
                <template #loading> <ProgressSpinner class="self-center" /> </template>
                <template #empty> <div class="text-center">No records found.</div> </template>

                <template #paginatorstart>
                    <Button type="button" icon="pi pi-refresh" text @click="updateModuleTable" />
                </template>
                <template #paginatorend>
                    <div></div>
                </template>
                <Column :exportable="false" selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column :exportable="false" style="width:2rem">
                    <template #body="slotProps">
                        <Button icon="fa fa-pencil" text @click="editModule(slotProps.data)" :class="[{'u-txt-pcolor hover:u-bg-pcolor hover:text-white': !selectedModules.length}, {'text-white hover:u-bg-scolor': selectedModules.length}]" />
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
                        <Dropdown v-model="filterModel.value" :options="statuses" optionLabel="label" optionValue="value"  placeholder="Select One" class="w-full" showClear>
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

<style></style>
