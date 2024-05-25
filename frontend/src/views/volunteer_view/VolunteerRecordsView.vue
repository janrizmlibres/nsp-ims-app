<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Card from 'primevue/card'

import TheHeader from '@/components/volunteer_view/VolunteerHeader.vue'
import ContentPane from "@/components/UI/ContentPane.vue"
import { useVolunteerStore } from '@/stores/volunteer'
import { useUsersStore } from '@/stores/users'

import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'

import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"

const confirm = useConfirm()
const toast = useToast()
const volunteerStore = useVolunteerStore()
const userStore = useUsersStore()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const columns = ref([
  { field: 'fullname', header: 'Full Name' },
  { field: 'volunteer_personal_information.sex', header: 'Sex'},
  { field: 'affiliation', header: 'Affiliation' },
  { field: 'volunteer_contact_information.contactNumber', header: 'Contact Number' },
])

const updateGlobalFilter = (newValue) => {
  filters.value.global.value = newValue
}

const confirmDelete = (id) => {
    confirm.require({
        message: 'Are you sure you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            handleDelete(id)
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
        }
    })
}

async function handleDelete(id) {
  try {
    const result = await volunteerStore.getVolunteer(id)
    const volunteer = result.data.volunteer
    volunteerStore.deleteVolunteer(id)
    addAuditTrail(`Deleted: Volunteer "${volunteer.fullname}" with ID: ${volunteer.id}`)
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

async function addAuditTrail(descripton) {
  try {
    await userStore.addAudit(descripton)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try{
    await volunteerStore.getAllVolunteers()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <ContentPane header="Volunteer Records">
    <TheHeader 
      :globalFilter="filters.global.value" 
      @filterChanged="updateGlobalFilter" />

    <Card :pt="{ content: 'h-full', body: 'h-full px-4 pt-1' }" class="rounded-md inline-block">
      <template #content>
        <DataTable 
          :value="volunteerStore.volunteers"
          v-model:filters="filters"
          :globalFilterFields="['id', 'firstName', 'lastName', 'affiliation']"
          scrollable
          removableSort
          :rowsPerPageOptions="[5, 10, 20, 50]"
          paginator :rows="5">

      <template #empty> No volunteers found. </template>
      <template #loading> Loading volunteers data. Please wait. </template>

      <Column header="">
        <template #body="slotProps">
          <div class="flex">
            <RouterLink :to="{ name: 'view-volunteer', params: { id: slotProps.data.id } }">
              <Button 
                label="View"
                icon="fa-solid fa-eye"
                rounded
                raised
                aria-label="View"
                size="small" />
            </RouterLink>
            <Button 
              severity="danger"
              label="Delete"
              icon="pi pi-trash" 
              rounded
              raised
              aria-label="Delete"
              size="small"
              class="ml-2"
              @click="confirmDelete(slotProps.data.id)"/>
          </div>
        </template>
      </Column>

      <Column 
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        sortable
      ></Column>
    </DataTable>
    <div class="pl-8 pt-2 font-medium">
      <p>
        Record(s) count: <span class="u-txt-red"> {{ volunteerStore.volunteers.length }} </span>
      </p>
    </div>
  </template>
    </Card>
  </ContentPane>
</template>

