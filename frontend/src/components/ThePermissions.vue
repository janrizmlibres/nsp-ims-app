<template>
  <div class="flex">
    <DataTable
      class="flex-1"
      :value="students"
      tableStyle="min-width: 50rem"
      :pt="{ column: { headercell: 'bg-white' } }"
      :pt-options="{ mergeProps: true }"
    >
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
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
    <div class="px-14 py-2">
      <div class="text-3xl mb-4">
        <h1>LEGEND</h1>
      </div>
      <div class="pl-4">
        <ul class="list-disc list-inside">
          <li>A - Add Students</li>
          <li>B - Enroll Students</li>
          <li>C - Update Student Information</li>
          <li>D - Grade Students</li>
          <li>E - Check Student Attendance</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'

defineProps(['students'])

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
