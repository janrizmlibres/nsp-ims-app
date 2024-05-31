<script setup>
// Presets
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import { FilterMatchMode } from 'primevue/api';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue'

// stores
import { useUtilitiesStore } from '@/stores/utilities';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { useRouter } from 'vue-router';

const utilitiesStore = useUtilitiesStore()

const toast = useToast()
const router = useRouter()
const isLoading = ref(true)

const terms = ref([])
const selectedRow = ref({})
const selectedClass = ref()
const primarySelection = ref({})

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const numericColumns = ref([
    {field: 'activeCount', header: 'Active'},
    {field: 'inactiveCount', header: 'Inactive'},
    {field: 'dropCount', header: 'Drop'},
    {field: 'total', header: 'Total'}
])

onMounted(async () => {
    try {
        await utilitiesStore.getTerms()
        terms.value = utilitiesStore.terms
        isLoading.value = false
    } catch(error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered. Please refresh this page.',
            life: 3000
        })
    }
})

function getNumericLabel(field) {
    switch (field) {
        case 'dropCount':
        return 'danger'

        case 'inactiveCount':
        return 'warning'

        case 'activeCount':
        return 'success'

        case 'total':
        return 'info'

        default:
        return null
    }
}

function onExpandRow(id) {
    selectedRow.value = {}
    selectedClass.value = null
    const checkProp = id in selectedRow.value
    if (checkProp) delete selectedRow.value[id]
    else selectedRow.value[id] = true
    selectedRow.value = { ...selectedRow.value }
}

function onCollapseRow() {
    selectedRow.value = {}
    selectedClass.value = null
}

function navigateToClass(id) {
    router.push({ name: 'class', query: {id: id}})
}
</script>

<template>
    <ProgressSpinner v-if="isLoading" class="h-full" />
    <ContentPane v-else :breadcrumb="[{label: 'Management'}, {label: 'Classes'}]">
        <div class="flex justify-between mb-2">
            <span class="u-txt-active text-lg font-semibold self-center ml-4"> Select a class from a school year </span>
            <span class="relative">
                <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText v-model="filters['global'].value" placeholder="Search..." class="pl-10 font-normal w-96 shadow-sm"
                />
            </span>
        </div>
        <Card class="h-full !rounded-2xl overflow-hidden" 
            :pt="{body: {class:['flex flex-col h-full overflow-hidden']}, content: {class:['flex-grow !py-0 overflow-hidden']}}" 
            :ptOptions="{mergeProps:true}">
            <template #content>
                <DataTable
                    :loading="isLoading" scrollable
                    v-model:expandedRows="selectedRow"
                    :value="terms"
                    dataKey="id"
                    v-model:filters="filters"
                    v-model:selection="primarySelection"
                    selectionMode="single"
                    @rowSelect="onExpandRow(primarySelection.id)"
                    @rowUnselect="onCollapseRow()"
                >
                    <template #empty> <div class="text-center">No records found.</div> </template>
                    <template #loading> <ProgressSpinner class="flex justify-center" /> </template>
                    <Column expander style="width: 5rem" />
                    <Column field="batch_number" header="Batch No." />
                    <Column field="academic_year" header="Academic Year" />
                    <Column field="start_date" header="Start Date">
                        <template #body="slotProps">
                            {{ new Date(slotProps.data.start_date).toDateString() }}
                        </template>
                    </Column>
                    <Column field="end_date" header="End Date">
                        <template #body="slotProps">
                            {{ new Date(slotProps.data.end_date).toDateString() }}
                        </template>
                    </Column>

                    <template #expansion="slotProps">
                        <div class="p-1 rounded-md">
                            <DataTable
                            v-model:selection="selectedClass"
                            :value="slotProps.data.class_levels"
                            dataKey="id"
                            >
                            <Column selectionMode="single" headerStyle="width: 3rem"></Column>
                            <Column header="School Level" field="school_level"> </Column>
                            <Column v-for="col of numericColumns" :key="col.field" :field="col.field" :header="col.header">
                                <template #body="{ data, field }">
                                    <Badge :value="data[field]" :severity="getNumericLabel(col.field)"></Badge>
                                </template>
                            </Column>
                            </DataTable>
                        </div>
                    </template>
                </DataTable>
            </template>

            <template #footer>
                <div class="flex justify-end mt-2">
                    <Button icon="fa fa-location-arrow" label="Select" class="u-bg-pcolor hover:u-bg-pcolor" :disabled="!selectedClass" @click="navigateToClass(selectedClass.id)" />
                </div>
            </template>
        </Card>
    </ContentPane>
</template>