<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import AddTermDialog from '@/components/utilities_view/AddTermDialog.vue'

import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useToast } from 'primevue/usetoast'
import { ref, watch, onMounted } from 'vue'

import { useUtilitiesStore } from '@/stores/utilities';

const termStore = useUtilitiesStore()
const toast = useToast()

const terms = ref([])
const editingRows = ref([])

const onRowEditSave = async (event) => {
    let { data, newData } = event
    if (JSON.stringify(data) !== JSON.stringify(newData)) {

        if (newData.start_date === null || newData.end_date === null) {
            toast.add({
              severity: 'error',
              summary: 'Incomplete Form',
              detail: 'Please fill all necessary information',
              life: 3000
            })
          return
        }

        if (terms.value.some(term => term.start_date.getFullYear() === newData.start_date.getFullYear() && term.end_date.getFullYear() === newData.end_date.getFullYear())) {
            toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Academic Term already exists.',
              life: 3000
            })
          return
        }

        let startDateYear = newData.start_date.getFullYear();
        let endDateYear = newData.end_date.getFullYear();

        if (endDateYear - startDateYear !== 1) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Start Date and End Date must only be a year apart.',
                life: 3000
            })
          return
        }

        if (newData.start_date > newData.end_date) {
            toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'End Date cannot be earlier than the Start Date.',
              life: 3000
            })
          return
        }

        try {
            await termStore.updateTerm(newData.id, {
                start_date: newData.start_date,
                end_date: newData.end_date,
                academic_year: newData.start_date.getFullYear() + '-' + newData.end_date.getFullYear()
            })

            await termStore.getTerms()

            toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Date Range updated successfully!',
              life: 3000
            })
        } catch (error) {
            toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Unexpected error encountered.',
              life: 3000
            })
        }
    }
}

onMounted(async () => {
  try {
    await termStore.getTerms()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Unexpected error encountered.',
      life: 3000
    })
  }
})

async function fetchTerms(data) {
  terms.value.length = 0
  try {
    for (const term of data) {
      let start_date = new Date(term.start_date)
      let end_date = new Date(term.end_date)

      const temp = ref({
        id: term.id,
        academic_year: term.academic_year,
        start_date: start_date,
        end_date: end_date,
        status: term.status
      })

      terms.value.push(temp.value)
    }
  } catch (error) {
    console.log(error)
  }
}

watch(() => termStore.terms, fetchTerms, { immediate: false })
</script>

<template>
  <ContentPane header="Academic Term" subheader="Configuration">
    <div class="bg-white shadow-xl rounded-md p-5">
      <DataTable
        v-model:value="terms"
        dataKey="id"
        sortField="id"
        :sortOrder="-1"
        removableSort
        resizableColumns
        columnResizeMode="fit"
        showGridlines
        scrollable
        v-model:editingRows="editingRows"
        editMode="row"
        @row-edit-save="onRowEditSave"
        :ptOptions="{ mergeProps: true }"
        :pt="{
          root: {
            class: ['flex flex-col justify-between overflow-auto']
          },
          table: {
            class: 'bg-white border-spacing-0 border-separate'
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
                },
                (props.sortable === '' || props.sortable) && context.sorted
                  ? 'bg-white u-txt-active'
                  : 'bg-white u-txt-active',
                {
                  'hover:bg-surface-50': context.sorted
                }
              ]
            }),
            sorticon: ({ context }) => ({
              class: [
                'ml-2',
                context.sorted
                  ? 'u-legend-txt-color dark:text-white/80'
                  : 'u-txt-active dark:text-white/70'
              ]
            }),
            bodycell: { class: 'py-4 ' },
            roweditorinitbutton: {
              class: [
                'relative',
                'inline-flex items-center justify-center',
                'text-left',
                'w-8 h-8',
                'border-0 rounded-full',
                'u-txt-link',
                'border-transparent',
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50',
                'hover:text-surface-700 hover:bg-surface-300/20',
                'transition duration-200',
                'overflow-hidden',
                'cursor-pointer select-none'
              ]
            }
          },
          bodyrow: ({ context, props }) => ({
            class: [
              { 'u-bg-pcolor text-surface-100 dark:bg-primary-400/30': context.selected },
              { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },
              { 'font-bold bg-surface-0 dark:bg-surface-800': props.frozenRow },
              {
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-transparent':
                  context.selectable
              },
              {
                'hover:bg-surface-100 hover:u-txt-active': props.selectionMode && !context.selected
              },
              { 'cursor-pointer': props.selectionMode }
            ]
          })
        }"
      >
        <template #empty> <div class="text-center">No academic terms found.</div> </template>
        <template #loading>
          <div class="text-center">Loading academic terms records. Please wait.</div>
        </template>

        <Column field="id" header="Batch No." sortable/>
        <Column field="academic_year" header="Academic Year" />
        <Column field="start_date" header="Start Date">
          <template #body="slotProps">
            {{ slotProps.data.start_date.toDateString() }}
          </template>
          <template #editor="{ data, field }">
            <Calendar
              v-model="data[field]"
              id="calendar"
              showIcon
              iconDisplay="input"
              :manualInput="false"
            />
          </template>
        </Column>
        <Column field="end_date" header="End Date">
          <template #body="slotProps">
            {{ slotProps.data.end_date.toDateString() }}
          </template>
          <template #editor="{ data, field }">
            <Calendar
              v-model="data[field]"
              id="calendar"
              showIcon
              iconDisplay="input"
              :manualInput="false"
            />
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="slotProps">
            {{ slotProps.data.status ? 'Active' : 'Inactive' }}
          </template>
        </Column>
        <Column :rowEditor="true" bodyStyle="text-align:center" class="sticky right-0" style="width: 5rem;" />
        <template #footer> 
            <Button class="u-txt-link hover:bg-surface-300/20" icon="fa fa-plus" label="Create an Academic Term" text raised rounded @click="termStore.showHideAddTermDialog"/>
            <AddTermDialog />
        </template>
      </DataTable>
    </div>
  </ContentPane>
</template>
