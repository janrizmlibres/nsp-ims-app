<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { useEnrollmentStore } from '@/stores/enrollment.js'
import { useTermStore } from '@/stores/term.js'
import { useConfirm } from 'primevue/useconfirm'

const enrollmentStore = useEnrollmentStore()

const learnersData = computed(() => enrollmentStore.learners)

const router = useRouter()
const confirm = useConfirm()
const toast = useToast()
const termStore = useTermStore()

const confirmDrop = (data) => {
  confirm.require({
    group: 'authenticationError',
    message: ' Are you sure you want to Drop the Student from the Current School Level?',
    header: 'Confirmation',
    acceptButton: 'Yes',
    rejectButton: 'Cancel',
    accept: () => {
      changeStatus(data, 'Drop')
    },
    reject: () => {}
  })
}

const confirmStatusChange = (data) => {
  const statusToChange = data.status === 'Active' ? 'Inactive' : 'Active'
  confirm.require({
    group: 'authenticationError',
    message: ` Are you sure you want to set the status of the Student to ${statusToChange}?`,
    header: 'Confirmation',
    acceptButton: 'Yes',
    rejectButton: 'Cancel',
    accept: () => {
      changeStatus(data, statusToChange)
    },
    reject: () => {}
  })
}

async function changeStatus(data, statusToChange) {
  try {
    await enrollmentStore.changeEnrolledStatus(data.enrollmentId, statusToChange)
    await refreshStudentTable()
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Student has been successfully set to ${statusToChange}`,
      life: 3000
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

async function refreshStudentTable() {
  try {
    await termStore.getActiveTerm()
    const currentTerm = termStore.activeTerm

    await enrollmentStore.getAllEnrolledFromTerm(currentTerm.id)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

const getSeverity = (data) => {
  switch (data) {
    case 'Active':
      return 'success'

    case 'Inactive':
      return 'warning'

    case 'Drop':
      return 'danger'

    default:
      return null
  }
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lrn: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
  },
  lastName: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
  },
  firstName: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
  },
  middleName: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
  },
  schoolLevel: { value: null, matchMode: FilterMatchMode.EQUALS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS }
})

const statuses = ref(['Active', 'Inactive', 'Drop'])
const schoolLevels = ref(['Grade School', 'Junior High School'])

function editEnrolled(data) {
  router.push({
    name: 'edit-enrolled',
    query: { studentId: data.studentId, enrollmentId: data.enrollmentId, academicYear: data.term }
  })
}

</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="learnersData"
    paginator
    :rows="10"
    dataKey="id"
    filterDisplay="menu"
    :globalFilterFields="['lrn', 'lastName', 'firstName', 'middleName', 'schoolLevel', 'status']"
    removableSort
  >
    <column field="lrn" header="LRN" sortable>
      <template #body="{ data }">
        {{ data.lrn }}
      </template>
      <template #filter="{ filterModel }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          placeholder="Search by name"
        />
      </template>
    </column>
    <column frozen field="lastName" header="Last Name" sortable>
      <template #body="{ data }">
        {{ data.lastName }}
      </template>
      <template #filter="{ filterModel }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          placeholder="Search by name"
        />
      </template>
    </column>
    <column frozen field="firstName" header="First Name" sortable>
      <template #body="{ data }">
        {{ data.firstName }}
      </template>
      <template #filter="{ filterModel }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          placeholder="Search by name"
        />
      </template>
    </column>
    <column field="middleName" header="Middle Name" sortable>
      <template #body="{ data }">
        {{ data.middleName }}
      </template>
      <template #filter="{ filterModel }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          placeholder="Search by name"
        />
      </template>
    </column>
    <column
      header="School Level"
      filterField="schoolLevel"
      :showFilterMatchModes="false"
      :filterMenuStyle="{ width: '9rem' }"
      style="min-width: 9rem"
    >
      <template #body="{ data }">
        <div class="flex align-items-center gap-2">
          <span>{{ data.schoolLevel }}</span>
        </div>
      </template>
      <template #filter="{ filterModel }">
        <Dropdown
          v-model="filterModel.value"
          :options="schoolLevels"
          placeholder="Select One"
          class="p-column-filter"
        >
          <template #option="slotProps">
            <div class="flex align-items-center gap-2">
              <span>{{ slotProps.option }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </column>
    <column field="dateEnrolled" header="Date Enrolled" sortable>
      <template #body="{ data }">
        {{ data.dateEnrolled ? new Date(data.dateEnrolled).toISOString().split('T')[0] : '' }}
      </template>
    </column>
    <Column
      header="Status"
      filterField="status"
      :showFilterMatchModes="false"
      :filterMenuStyle="{ width: '7rem' }"
      style="min-width: 7rem"
    >
      <template #body="{ data }">
        <div class="flex align-items-center gap-2">
          <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </div>
      </template>
      <template #filter="{ filterModel }">
        <Dropdown
          v-model="filterModel.value"
          :options="statuses"
          placeholder="Select One"
          class="p-column-filter"
        >
          <template #option="slotProps">
            <div class="flex align-items-center gap-2">
              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>
    <Column
      headerStyle="width: 5rem; text-align: center"
      bodyStyle="text-align: center; overflow: visible"
    >
      <template #body="{ data }">
        <Button icon="pi pi-pencil" label="Edit" @click="editEnrolled(data)" />
      </template>
    </Column>
    <Column
      headerStyle="width: 5rem; text-align: center"
      bodyStyle="text-align: center; overflow: visible"
    >
      <template #body="{ data }">
        <Button label="Drop" @click="confirmDrop(data)" :disabled="data.status === 'Drop'" />
      </template>
    </Column>
    <Column
      headerStyle="width: 5rem; text-align: center"
      bodyStyle="text-align: center; overflow: visible"
    >
      <template #body="{ data }">
        <Button
          :label="data.status === 'Active' ? 'Deactivate' : 'Activate'"
          @click="confirmStatusChange(data)"
          class="w-40"
        />
      </template>
    </Column>
  </DataTable>
</template>
