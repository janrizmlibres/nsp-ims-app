<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'

defineProps(['staffs'])

const columns = [
  { field: 'userId', header: 'User ID' },
  { field: 'fullName', header: 'Full Name' },
  { field: 'canAddStuds', header: 'A' },
  { field: 'canEnroll', header: 'B' },
  { field: 'canUpdateStuds', header: 'C' },
  { field: 'canGrade', header: 'D' },
  { field: 'canAttendance', header: 'E' }
]
</script>

<template>
  <DataTable
    :value="staffs"
    scrollable
    :pt="{ column: { headercell: 'bg-white' } }"
    :pt-options="{ mergeProps: true }"
  >
    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :sortable="['userId', 'fullName'].includes(col.field)"
    >
      <template #body="slotProps" v-if="!['userId', 'fullName'].includes(col.field)">
        <Checkbox
          v-if="col.field === 'canAddStuds'"
          v-model="slotProps.data.canAddStuds"
          :binary="true"
        />
        <Checkbox
          v-else-if="col.field === 'canEnroll'"
          v-model="slotProps.data.canEnroll"
          :binary="true"
        />
        <Checkbox
          v-else-if="col.field === 'canUpdateStuds'"
          v-model="slotProps.data.canUpdateStuds"
          :binary="true"
        />
        <Checkbox
          v-else-if="col.field === 'canGrade'"
          v-model="slotProps.data.canGrade"
          :binary="true"
        />
        <Checkbox v-else v-model="slotProps.data.canAttendance" :binary="true" />
      </template>
    </Column>
  </DataTable>
</template>
