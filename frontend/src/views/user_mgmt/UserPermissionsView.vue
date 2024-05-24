<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useToast } from 'primevue/usetoast'
import { FilterMatchMode } from 'primevue/api'

import ContentPane from '@/components/UI/ContentPane.vue'
import TheHeader from '@/components/user_mgmt/TheHeader.vue'

import { useUsersStore } from '@/stores/users'
import { ref, onMounted, watch } from 'vue'
import { AccessLevels } from '@/util/user_utils'

const usersStore = useUsersStore()
const toast = useToast()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const data = ref([])
const noChanges = ref(true)

const startingData = []
const updatedData = new Set([])

const columns = [
  { field: 'canMgStuds', header: 'Manage Students' },
  { field: 'canMgEnrollment', header: 'Manage Enrollment' },
  { field: 'canMgVolunteer', header: 'Manage Volunteers' },
  { field: 'canMgClass', header: 'Manage Classes' },
  { field: 'canMgUser', header: 'Manage Users' }
]

async function updatePerms() {
  try {
    const result = await usersStore.updatePermissions({ updatedData: Array.from(updatedData) })

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: result.data.message,
      life: 5000
    })

    noChanges.value = true
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

function updateGlobalFilter(newValue) {
  filters.value.global.value = newValue
}

function resetData() {
  data.value = structuredClone(startingData)
  updatedData.clear()

  for (const datum of data.value) {
    watch(datum, (newData) => {
      updatedData.add(newData)
      noChanges.value = false
    })
  }

  noChanges.value = true
}

onMounted(async () => {
  try {
    await usersStore.getAllUser({ includePerms: true, levelsToFetch: [AccessLevels.Staff] })

    for (const user of usersStore.users) {
      const permissionData = user.permission

      /*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
      const { id, userId, createdAt, updatedAt, ...permissions } = permissionData

      const userData = {
        id: user.id,
        fullname: user.fullname,
        ...permissions
      }

      const len = data.value.push(userData)
      startingData.push(structuredClone(userData))

      watch(data.value[len - 1], (newData) => {
        updatedData.add(newData)
        noChanges.value = false
      })
    }
  } catch (error) {
    console.log(error.response.data.message)
  }
})
</script>

<template>
  <ContentPane header="Staff Permissions">
    <TheHeader
      :includeExport="false"
      :globalFilter="filters.global.value"
      @filterChanged="updateGlobalFilter"
    />

    <Card :pt="{ content: 'h-full', body: 'h-full px-4 pb-4' }" class="rounded-md">
      <template #content>
        <DataTable
          v-model:filters="filters"
          :value="data"
          :users="['id', 'fullname']"
          scrollable
          removableSort
          :ptOptions="{ mergeProps: true }"
        >
          <template #empty> No users found. </template>
          <template #loading> Loading users data. Please wait. </template>

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
                v-else-if="col.field === 'canMgEnrollment'"
                v-model="slotProps.data.canMgEnrollment"
                :binary="true"
              />
              <Checkbox
                v-else-if="col.field === 'canMgVolunteer'"
                v-model="slotProps.data.canMgVolunteer"
                :binary="true"
              />
              <Checkbox
                v-else-if="col.field === 'canMgClass'"
                v-model="slotProps.data.canMgClass"
                :binary="true"
              />
              <Checkbox v-else v-model="slotProps.data.canMgUser" :binary="true" />
            </template>
          </Column>

          <template #footer>
            <span class="font-medium">
              Staff count:
              <span class="u-txt-red">
                {{ data.length }}
              </span>
            </span>
          </template>
        </DataTable>
      </template>
    </Card>

    <div class="flex justify-end">
      <div class="mt-4">
        <Button class="h-10 u-bg-green" :disabled="noChanges" @click="updatePerms">
          <font-awesome-icon
            icon="fa-solid fa-circle-check"
            class="absolute top-2/4 -mt-2 left-3"
          />
          <h2 class="pl-5 font-bold">Save</h2>
        </Button>

        <Button
          class="h-10 ml-2 u-bg-red"
          label="Reset"
          icon="fa-solid fa-circle-xmark"
          :disabled="noChanges"
          @click="resetData"
        />
      </div>
    </div>
  </ContentPane>
</template>
