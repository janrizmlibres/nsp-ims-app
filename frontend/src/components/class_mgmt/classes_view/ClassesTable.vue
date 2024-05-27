<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import { useClassesStore } from '@/stores/classes'
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useTermStore } from '@/stores/term'

const props = defineProps(['filters', 'globalFilters'])
const classesStore = useClassesStore()
const termStore = useTermStore()

const filters = ref(props.filters)
const globalFilters = ref(props.globalFilters)

const selectedRow = ref({})
const primarySelection = ref({})

const terms = ref([])

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

onMounted(async () => {
  await termStore.getAllTerms()
  terms.value = termStore.terms
  console.log(terms.value)
})

const firstCustomPt = {
  root: {
    class: ['flex flex-col h-full pt-2 justify-between overflow-auto']
  },
  column: {
    headercell: ({ context, props }) => ({
      class: [
        'font-medium',
        {
          'space-nowrap border-y bg-clip-padding': context.resizable
          // Resizable
        },
        // Color
        (props.sortable === '' || props.sortable) && context.sorted
          ? 'bg-white u-txt-active'
          : 'bg-white u-txt-active',
        { 'hover:bg-surface-50': context.sorted }
      ]
    }),
    sorticon: ({ context }) => ({
      class: [
        'ml-2',
        context.sorted ? 'u-txt-scolor dark:text-white/80' : 'u-txt-active dark:text-white/70'
      ]
    }),
    bodycell: { class: 'py-3 ' }
  },
  bodyrow: ({ context, props }) => ({
    class: [
      { 'u-bg-pcolor text-surface-100 dark:bg-primary-400/30': context.selected },
      { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },
      { 'font-bold bg-surface-0 dark:bg-surface-800': props.frozenRow },
      // State
      {
        'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-transparent':
          context.selectable
      },
      { 'hover:bg-surface-100 hover:u-txt-active': props.selectionMode && !context.selected },
      // Misc
      { 'cursor-pointer': props.selectionMode }
    ]
  }),
  rowexpansion: {
    class: 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-white/80 flex-1'
  },
  paginator: {
    root: {
      class: [
        'flex items-center justify-center flex-wrap object-bottom',
        'px-4 pt-4 pb-2',
        'border-0 rounded-bl-xl rounded-br-xl',
        'bg-transparent dark:bg-surface-800',
        'text-surface-500 dark:text-white/60'
      ]
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
        }
      ]
    })
  }
}

const secCustomPt = {
  column: {
    headercell: ({ context, props }) => ({
      class: [
        'font-medium',
        {
          'overflow-hidden space-nowrap border-y bg-clip-padding': context.resizable
          // Resizable
        },
        // Color
        (props.sortable === '' || props.sortable) && context.sorted
          ? 'bg-white text-white'
          : 'bg-white text-surface-700'
      ]
    })
  },
  bodyrow: ({ context, props }) => ({
    class: [
      'gap-y-4 ',
      { 'bg-surface-100 u-txt-active dark:bg-primary-400/30': context.selected },
      { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },
      { 'font-bold bg-surface-0 dark:bg-surface-800': props.frozenRow },
      // State
      {
        'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-transparent ring-inset dark:focus:ring-primary-300/50':
          context.selectable
      },
      { 'hover:bg-surface-100 hover:u-txt-active': props.selectionMode && !context.selected },
      // Misc
      { 'cursor-pointer': props.selectionMode }
    ]
  })
}

function formatDate(inputDate) {
  let date = new Date(inputDate)
  date = date.toDateString()
  return date
}
</script>

<template>
  <DataTable
    v-model:expandedRows="selectedRow"
    :value="terms"
    dataKey="id"
    :sortField="Object.keys(classesStore.data[0])[0]"
    :sortOrder="-1"
    removableSort
    resizableColumns
    columnResizeMode="fit"
    v-model:filters="filters"
    :users="globalFilters"
    :paginator="terms.length > 10"
    :rows="10"
    :rowsPerPageOptions="[10, 20, 50, 100]"
    v-model:selection="primarySelection"
    selectionMode="single"
    @rowSelect="onExpandRow(primarySelection.id)"
    @rowUnselect="onCollapseRow()"
    :ptOptions="{ mergeProps: true }"
    :pt="firstCustomPt"
  >
    <template #empty> <div class="text-center">No records found.</div> </template>
    <template #loading>
      <div class="text-center">Loading class records. Please wait.</div>
    </template>

    <Column expander style="width: 5rem" />
    <Column field="batch_number" header="Batch No." />
    <Column field="academic_year" header="Academic Year" />
    <Column field="start_date" header="Start Date">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.start_date) }}
      </template>
    </Column>
    <Column field="end_date" header="End Date">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.end_date) }}
      </template>
    </Column>

    <template #expansion="slotProps">
      <div class="p-1 rounded-md">
        <DataTable
          :value="slotProps.data.class_levels"
          :ptOptions="{ mergeProps: true }"
          :pt="secCustomPt"
        >
          <Column header="" style="width: 1rem; padding-left: 2rem">
            <template #body="slotProps">
              <RouterLink :to="{ name: 'class', query: { id: slotProps.data.id } }">
                <i class="fa fa-eye" />
              </RouterLink>
            </template>
          </Column>
          <Column header="School Level" field="school_level"> </Column>
          <Column header="Active" field="activeCount"> </Column>
          <Column header="Inactive" field="inactiveCount"> </Column>
          <Column header="Drop" field="dropCount"> </Column>
          <Column header="Total" field="total"> </Column>
        </DataTable>
      </div>
    </template>
  </DataTable>
</template>
