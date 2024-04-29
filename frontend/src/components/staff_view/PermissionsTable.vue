<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

import { useStaffsStore } from '@/stores/staffs'
import { ref, onMounted, watch } from 'vue'

const staffsStore = useStaffsStore()
const toast = useToast()

const data = ref([])
const updatedData = new Set([])

const columns = [
  { field: 'canMgStuds', header: 'Manage Students' },
  { field: 'canMgStudReq', header: 'Manage Student Requirements' },
  { field: 'canMgTerm', header: 'Manage Term' },
  { field: 'canMgLs', header: 'Manage Learning Strand' },
  { field: 'canMgClass', header: 'Manage Class' },
  { field: 'canMgEnrollment', header: 'Manage Enrollment' },
  { field: 'canMgVolunteer', header: 'Manage Volunteer' }
]

async function updatePerms() {
  try {
    const result = await staffsStore.updatePermissions({ updatedData: Array.from(updatedData) })

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: result.data.message,
      life: 5000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

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

      const len = data.value.push(staffData)

      watch(data.value[len - 1], (newData) => {
        updatedData.add(newData)
      })
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
  <div class="flex justify-end mt-4">
    <Button class="h-10 u-bg-green" @click="updatePerms">
      <div>
        <font-awesome-icon icon="fa-solid fa-circle-check" class="absolute top-2/4 -mt-2 left-3" />
        <h2 class="pl-5 font-bold">Save</h2>
      </div>
    </Button>
  </div>
</template>
