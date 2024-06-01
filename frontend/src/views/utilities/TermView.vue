<script setup>
// Presets
import { onMounted, provide, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import Tag from 'primevue/tag';
import { FilterMatchMode } from 'primevue/api';

// Custom
import AddTermPanel from '@/components/utilities_view/AddTermPanel.vue'
import ContentPane from '@/components/UI/ContentPane.vue'
import EditTermDialog from '@/components/utilities_view/EditTermDialog.vue';

// stores
import { useUtilitiesStore } from '@/stores/utilities';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { useRouter } from 'vue-router';

const utilitiesStore = useUtilitiesStore()

const router = useRouter()
const toast = useToast()
const isLoading = ref(true)

const terms = ref([])
const selectedRow = ref({})
const primarySelection = ref(null)
const term = ref()
const op = ref()
const editTermDialogState = ref(false)
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const numericColumns = ref([
    {field: 'activeCount', header: 'Active'},
    {field: 'inactiveCount', header: 'Inactive'},
    {field: 'dropCount', header: 'Drop'},
    {field: 'total', header: 'Total'}
])

provide('editTermDialogState', editTermDialogState)
provide('term', term)
provide('op', op)
provide('updateTermsTable', updateTermsTable)

onMounted(async () => {
  updateTermsTable()
})

async function updateTermsTable() {
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
}

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

function getStatusLabel(field) {
    switch (field) {
        case false:
        return 'warning'

        case true:
        return 'success'

        default:
        return null
    }
}

function onExpandRow(id) {
    selectedRow.value = {}
    const checkProp = id in selectedRow.value
    if (checkProp) delete selectedRow.value[id]
    else selectedRow.value[id] = true
    selectedRow.value = { ...selectedRow.value }
}

function onCollapseRow() {
    selectedRow.value = {}
}

function editTerm(data) {
    term.value = {... data}
    editTermDialogState.value = true
}

function configureClass(data) {
  router.push( { name: 'class-configuration', query: {id: data.id}})
}

const toggle = (event) => {
    op.value.toggle(event);
}
</script>

<template>
    <ProgressSpinner v-if="isLoading" class="h-full" />
    <ContentPane v-else :breadcrumb="[{label: 'Management'}, {label: 'Terms'}]">
        <div class="flex justify-end gap-2 mb-2">
            <span class="relative">
                <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText v-model="filters['global'].value" placeholder="Search..." class="pl-10 font-normal w-96 shadow-sm"
                />
            </span>
            <span>
              <Button class="u-bg-pcolor text-white hover:u-bg-pcolor" icon="fa fa-calendar-plus" raised rounded @click="toggle"/>
              <AddTermPanel />
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
                    <Column expander style="width: 2rem" />
                    <Column :exportable="false" style="width:2rem">
                        <template #body="slotProps">
                            <Button icon="fa fa-pencil" text @click="editTerm(slotProps.data)" :class="[{'u-txt-pcolor hover:u-bg-pcolor hover:text-white': !primarySelection}, {'text-white hover:u-bg-scolor': primarySelection}]" />
                        </template>
                    </Column>
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
                    <Column field="status" header="Status">
                      <template #body="slotProps">
                        <Tag :value="slotProps.data.status ? 'Active' : 'Inactive'" :severity="getStatusLabel(slotProps.data.status)" />
                      </template>
                    </Column>

                    <template #expansion="slotProps">
                        <div class="p-1 rounded-md">
                            <DataTable
                            :value="slotProps.data.class_levels"
                            dataKey="id"
                            >
                              <Column header="School Level" field="school_level" />
                              <Column v-for="col of numericColumns" :key="col.field" :field="col.field" :header="col.header">
                                  <template #body="{ data, field }">
                                      <Badge :value="data[field]" :severity="getNumericLabel(col.field)"></Badge>
                                  </template>
                              </Column>
                              <Column
                                headerStyle="width: 5rem; text-align: center"
                                bodyStyle="text-align: center; overflow: visible"
                                class="right-0"
                                frozen
                              >
                                <template #body="{ data }">
                                  <Button
                                    type="button"
                                    icon="fa fa-gear"
                                    @click="configureClass(data)"
                                    text
                                    aria-haspopup="true"
                                    aria-controls="overlay_menu"
                                    class="u-txt-active hover:transform hover:bg-transparent hover:scale-[1.10]"
                                  />
                                </template>
                              </Column>
                            </DataTable>
                        </div>
                    </template>
                </DataTable>
            </template>
        </Card>
        <EditTermDialog />
    </ContentPane>
</template>
