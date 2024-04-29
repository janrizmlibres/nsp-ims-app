<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'

import { useStaffsStore } from '@/stores/staffs'
import { ref, onMounted } from 'vue'

const staffsStore = useStaffsStore()

const data = ref([])

const columns = [
  { field: 'canMgStuds', header: 'Manage Students' },
  { field: 'canMgStudReq', header: 'Manage Student Requirements' },
  { field: 'canMgTerm', header: 'Manage Term' },
  { field: 'canMgLs', header: 'Manage Learning Strand' },
  { field: 'canMgClass', header: 'Manage Class' },
  { field: 'canMgEnrollment', header: 'Manage Enrollment' },
  { field: 'canMgVolunteer', header: 'Manage Volunteer' }
]

onMounted(async () => {
  try {
    await staffsStore.getAllStaff({ includePerms: true })

    for (const staff of staffsStore.staffs) {
      const permissionData = staff.permission

      /*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
      const { id, staffId, createdAt, updatedAt, ...permissions } = permissionData

      const staffData = {
        id: staff.id,
        fullname: staff.fullname,
        ...permissions
      }

      data.value.push(staffData)
    }
  } catch (error) {
    console.log(error.response.data.message)
  }
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="data"
    :loading="isLoading"
    :globalFilterFields="['id', 'fullname']"
    scrollable
    removableSort
    :ptOptions="{ mergeProps: true }"
    :pt="custom_pt"
  >
    <template #empty> No staffs found. </template>
    <template #loading> Loading staffs data. Please wait. </template>

    <Column field="id" header="User ID" sortable></Column>
    <Column field="fullname" header="Full Name" sortable> </Column>

    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
      <template #body="slotProps">
        <Checkbox
          v-if="col.field === 'canMgStuds'"
          v-model="slotProps.data.canMgStuds"
          :binary="true"
        />
        <Checkbox
          v-else-if="col.field === 'canMgStudReq'"
          v-model="slotProps.data.canMgStudReq"
          :binary="true"
        />
        <Checkbox
          v-else-if="col.field === 'canMgTerm'"
          v-model="slotProps.data.canMgTerm"
          :binary="true"
        />
        <Checkbox
          v-else-if="col.field === 'canMgLs'"
          v-model="slotProps.data.canMgLs"
          :binary="true"
        />
        <Checkbox
          v-else-if="col.field === 'canMgClass'"
          v-model="slotProps.data.canMgClass"
          :binary="true"
        />
        <Checkbox
          v-else-if="col.field === 'canMgEnrollment'"
          v-model="slotProps.data.canMgEnrollment"
          :binary="true"
        />
        <Checkbox v-else v-model="slotProps.data.canMgVolunteer" :binary="true" />
      </template>
    </Column>
  </DataTable>
</template>
