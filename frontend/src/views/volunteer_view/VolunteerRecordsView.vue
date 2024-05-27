<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Card from 'primevue/card';

import TheHeader from '@/components/volunteer_view/VolunteerHeader.vue';
import ContentPane from "@/components/UI/ContentPane.vue";
import { useVolunteerStore } from '@/stores/volunteer';
import { useUsersStore } from '@/stores/users';

import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const volunteerStore = useVolunteerStore();
const userStore = useUsersStore();
const dt = ref(null)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const columns = ref([
  /*{ field: 'id', header: 'Database ID' },
  { field: 'student_volunteer.id', header: 'Volunteer ID' },*/
  { field: 'fullname', header: 'Full Name' },
  { field: 'volunteer_personal_information.sex', header: 'Sex'},
  { field: 'affiliation', header: 'Affiliation' },
  { field: 'volunteer_contact_information.contactNumber', header: 'Contact Number' },
]);

const updateGlobalFilter = (newValue) => {
  filters.value.global.value = newValue
};

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
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        }
    });
};

async function handleDelete(id) {
  try {
    const result = await volunteerStore.getVolunteer(id);
    const volunteer = result.data.volunteer
    volunteerStore.deleteVolunteer(id);
    addAuditTrail(`Deleted: Volunteer "${volunteer.fullname}" with ID: ${volunteer.id}`);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function addAuditTrail(descripton) {
  try {
    await userStore.addAudit(descripton);
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  try{
    await volunteerStore.getAllVolunteers()
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <ContentPane :breadcrumb="[{label: 'Records'}, {label: 'Volunteers'}]">
    <TheHeader :dt="dt" :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />
    <Card :pt="{ content: 'h-full', body: 'h-full px-4 pt-1' }" class="h-full overflow-hidden !rounded-2xl">
      <template #content>
        <DataTable 
          ref="dt"
          :value="volunteerStore.volunteers"
          v-model:filters="filters"
          :globalFilterFields="['id', 'firstName', 'lastName', 'affiliation']"
          scrollable
          :sortOrder="1"
          removableSort
          paginator :rows="15" :rowsPerPageOptions="[15, 20, 30, 50]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          >

          <Column header="" style="width: 14rem;">
            <template #body="slotProps">
              <div class="flex gap-2">
                <RouterLink :to="{ name: 'view-volunteer', params: { id: slotProps.data.id } }">
                  <Button
                    class="u-bg-scolor hover:u-bg-scolor"
                    label="View"
                    icon="fa-solid fa-eye"
                    rounded
                    raised
                    aria-label="View"
                    size="small"
                  />
                </RouterLink>
                <Button
                  label="Delete"
                  icon="fa-solid fa-trash"
                  rounded
                  raised
                  severity="danger"
                  aria-label="View"
                  size="small"
                  @click="confirmDelete(slotProps.data.id)"
                />
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

          <template #footer>
            <div class="pl-8 pt-2 font-medium">
              <p>
                Record(s) count: <span class="u-txt-red"> {{ volunteerStore.volunteers.length }} </span>
              </p>
            </div>
          </template>
        </DataTable>
      </template>
    </Card>
  </ContentPane>
</template>

