<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { useEnrollmentStore } from '@/stores/enrollment.js'
import { useTermStore } from '@/stores/term.js'
import { useUsersStore } from '@/stores/users.js'
import { useConfirm } from 'primevue/useconfirm'
import Menu from 'primevue/menu'
import EnrollmentHeader from './EnrollmentHeader.vue'

const enrollmentStore = useEnrollmentStore()
const usersStore = useUsersStore()

const learnersData = computed(() => enrollmentStore.learners)

const router = useRouter()
const confirm = useConfirm()
const toast = useToast()
const termStore = useTermStore()
const dt = ref()

const menu = ref()
const items = ref((data) => [
  {
    label: 'Options',
    items: [
      {
        label: 'edit',
        icon: 'fa fa-pencil',
        command: () => editEnrolled(data)
      },
      {
        label: data.status === 'Active' ? 'Deactivate' : 'Activate',
        icon: data.status === 'Active' ? 'fa fa-toggle-on' : 'fa fa-toggle-off',
        command: () => confirmStatusChange(data)
      },
      {
        label: 'drop',
        icon: 'fa fa-user-minus',
        command: () => confirmDrop(data)
      }
    ]
  }
])

const toggle = (event) => {
  menu.value.toggle(event)
}

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
    await usersStore.addAudit(`Changed student ${data.lastName} status to ${statusToChange}`)
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
    await enrollmentStore.getAllEnrolledFromTerm(termStore.chosenTerm)
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

async function downloadEnrollmentForm(name, filePath) {
  try {
    filePath = filePath.replace(/ /g, '%20');
    const response = await fetch(import.meta.env.VITE_API_ENDPOINT + `${filePath}`)
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status)
    }
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${name}_enrollment_form.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
      life: 3000
    })
  }
}

refreshStudentTable()
</script>

<template>
  <EnrollmentHeader :dt="dt" :globalFilter="filters" />
  <Card
    :pt="{ content: 'h-full', body: 'h-full px-4 pt-1' }"
    class="h-full !rounded-2xl inline-block"
  >
    <template #content>
      <DataTable
        ref="dt"
        v-model:filters="filters"
        :value="learnersData"
        paginator
        :rows="15"
        :rowsPerPageOptions="[15, 20, 30, 50]"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        dataKey="id"
        filterDisplay="menu"
        :globalFilterFields="[
          'lrn',
          'lastName',
          'firstName',
          'middleName',
          'schoolLevel',
          'status'
        ]"
        removableSort
      >
        <template #empty> <div class="text-center">No records found.</div> </template>

        <column frozen field="lrn" header="LRN" style="min-width: 12rem" sortable>
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
        <column frozen field="lastName" header="Last Name" style="min-width: 12rem" sortable>
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
        <column frozen field="firstName" header="First Name" style="min-width: 12rem" sortable>
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
        <column field="middleName" header="Middle Name" style="min-width: 14rem" sortable>
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
          style="min-width: 12rem"
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
        <column field="dateEnrolled" header="Date Enrolled" style="min-width: 12rem" sortable>
          <template #body="{ data }">
            {{ data.dateEnrolled ? new Date(data.dateEnrolled).toISOString().split('T')[0] : '' }}
          </template>
        </column>
        <column header="Enrollment Form" style="min-width: 10rem">
          <template #body="{ data }">
            <Button
              icon="fa fa-eye"
              label="View"
              @click="downloadEnrollmentForm(data.lastName, data.enrollmentFormURL)"
              size="small"
              class="u-bg-scolor text-white hover:transform hover:u-bg-scolor hover:scale-[1.10]"
            />
          </template>
        </column>
        <column
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
        </column>
        <column
          headerStyle="width: 5rem; text-align: center"
          bodyStyle="text-align: center; overflow: visible"
          class="right-0"
          frozen
        >
          <template #body="{ data }">
            <Button
              v-if="data.status !== 'Drop'"
              type="button"
              icon="pi pi-ellipsis-v"
              @click="toggle"
              text
              aria-haspopup="true"
              aria-controls="overlay_menu"
              class="u-txt-active hover:transform hover:bg-transparent hover:scale-[1.10]"
            />
            <Menu ref="menu" id="overlay_menu" :model="items(data)" :popup="true" />
          </template>
        </column>

        <template #footer>
          <span class="font-medium">
            Record(s) count:
            <span class="u-txt-red">
              {{ learnersData.length }}
            </span>
          </span>
        </template>
      </DataTable>
    </template>
  </Card>
</template>