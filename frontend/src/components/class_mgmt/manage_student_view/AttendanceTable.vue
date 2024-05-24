<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { inject, ref, watch } from 'vue';
import { format } from 'date-fns';

const studentAttendaces = inject('studentAttendances')
const filters = inject('filters')
const attendances = ref([])
const selectedRow = ref()

const statuses = ref([
  { label: 'Present', value: 'Present' },
  { label: 'Absent', value: 'Absent' }
])

watch(() => studentAttendaces.value, (data) => {
    attendances.value = []

    for (const attendance of data) {
      const temp = {
        month: format(new Date(attendance.date), 'MMMM yyyy'),
        date: new Date(attendance.date).toDateString(),
        status: attendance.attendances[0].status,
        attendanceRemarks: attendance.attendances[0].remarks,
        sessionRemarks: attendance.remarks
      }

      attendances.value.push(temp)
    }
})

const getStatusLabel = (status) => {
    switch (status) {
        case 'Present':
            return 'success';

        case 'Absent':
            return 'danger';

        default:
            return null;
    }
};

function onExpandRow() {
  if (selectedRow.value.length > 1) selectedRow.value.splice(0, 1)
}

function countPresent(month) {
  let total = 0

  if (attendances.value) {
    for (const session of attendances.value) {
      if (session.month === month && session.status === 'Present') total++
    }
  }

  return total
}
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <DataTable
      :value="attendances"
      dataKey="id"
      scrollable
      style="overflow: auto"
      sortField=""
      :sortOrder="1"
      v-model:filters="filters"
      filterDisplay="menu"
      v-model:expandedRowGroups="selectedRow"
      @rowgroup-expand="onExpandRow"
      expandableRowGroups
      rowGroupMode="subheader"
      groupRowsBy="month"
      :users="['date', 'status', 'attendancesRemarks', 'sessionRemarks']"
    >
      <template #empty> <div class="text-center">No records found.</div> </template>

      <template #header>
        <span class="relative float-end">
          <i
            class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
          />
          <InputText
            v-model="filters['global'].value"
            placeholder="Keyword Search"
            class="pl-10 font-normal"
          />
        </span>
      </template>
      <template #groupheader="slotProps">
        <span class="font-semibold">{{ slotProps.data.month }}</span>
      </template>
      <Column field="month" header="Month" />
      <Column field="date" header="Session Date" />
      <Column field="status" header="Status">
        <template #body="slotProps">
          <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
        </template>
        <template #filter="{ filterModel }">
          <Dropdown
            v-model="filterModel.value"
            :options="statuses"
            optionLabel="label"
            optionValue="value"
            placeholder="Select One"
            class="p-column-filter"
            showClear
          >
            <template #option="slotProps">
              <Tag
                :value="slotProps.option.label"
                :severity="getStatusLabel(slotProps.option.value)"
              />
            </template>
          </Dropdown>
        </template>
      </Column>
      <Column field="attendanceRemarks" header="Attendance Remarks" />
      <Column field="sessionRemarks" header="Session Remarks" />
      <template #groupfooter="slotProps">
        <div class="flex justify-start font-bold w-full">
          Total Present: {{ countPresent(slotProps.data.month) }}
        </div>
      </template>
    </DataTable>
  </div>
</template>
