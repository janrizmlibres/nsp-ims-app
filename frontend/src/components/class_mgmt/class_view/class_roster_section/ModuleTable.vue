<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Badge from 'primevue/badge';
import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';

const studentModules = inject('studentModules')
const filters = inject('filters')
const selectedModules = ref([])
const metaKey = ref(true)
const dt = ref()
const dtDiv = ref()

const statuses = ref([
    { label: 'Graded', value: 'Graded' },
    { label: 'Submitted', value: 'Submitted' },
    { label: 'No Submission', value: 'No Submission' }
]);

const getStatusLabel = (status) => {
    switch (status) {
        case 'Graded':
        return 'success'

        case 'Submitted':
        return 'warning'

        case 'No Submission':
        return 'danger'

        default:
        return null
    }
}

const getScoreBadge = (score, totalScore) => {
    if (score >= 0.75*totalScore) return 'success'
    else if (score < 0.75*totalScore && score >= 0.50*totalScore) return 'warning'
    else if (score < 0.50*totalScore && score >= 0) return 'danger'
    else return null
}

function sumSelectedModulesScore() {
    return selectedModules.value.reduce((total, item) => total + item.score, 0)
}

function deselect() {
    selectedModules.value = []
}

function onClickOutside(event) {
    if (dt.value && !dtDiv.value.contains(event.target)) deselect()
}

onMounted(() => {
    document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside)
})
</script>

<template>
    <div class="flex flex-col h-full w-full" ref="dtDiv">
        <Toolbar class="!p-2">
            <template #start>
                <span v-if="selectedModules.length" class="flex items-center gap-2 ml-2">
                    <Button icon="fa fa-circle-xmark fa-lg" text aria-label="Edit Mode" style="height: 2rem; width: 2rem;" @click="deselect"/>
                    <p class="mr-6">
                        {{ selectedModules.length + ' selected' }}
                    </p>
                    <span class="flex gap-1 items-center float-end">
                        Computed Score: {{ sumSelectedModulesScore() }}
                    </span>
                </span>
            </template>
            <template #end>
                <span class="relative">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search"  class="pl-10 font-normal"/>
                </span>
            </template>
        </Toolbar>
        <DataTable 
            :value="studentModules" dataKey="id" scrollable style=" overflow: auto;" ref="dt"
            v-model:filters="filters" filterDisplay="menu"
            :globalFilterFields="['title', 'distribution_date', 'retrieval_date', 'status', 'date_submitted', 'remarks']"
            sortField="lastName" :sortOrder="1" 
            v-model:selection="selectedModules" selectionMode="multiple" :metaKeySelection="metaKey"
        >
            <template #empty> <div class="text-center">No records found.</div> </template>

            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="title" header="Title" />
            <Column field="distribution_date" header="Distribution Date" />
            <Column field="retrieval_date" header="Retrieval Date" />
            <Column field="status" header="Status">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="statuses" optionLabel="label" optionValue="value"  placeholder="Select One" class="p-column-filter" showClear>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.label" :severity="getStatusLabel(slotProps.option.value)" />
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column field="date_submitted" header="Date Submitted" />
            <Column field="score" header="Score">
                <template #body="slotProps">
                    <Badge :value="slotProps.data.score" :severity="getScoreBadge(slotProps.data.score, slotProps.data.total_score)" />
                </template>
            </Column>
            <Column field="total_score" header="Total Score">
                <template #body="slotProps">
                    <Badge :value="slotProps.data.total_score" severity="info" />
                </template>
            </Column>
            <Column field="remarks" header="Remarks" />
        </DataTable>
    </div>
</template>
