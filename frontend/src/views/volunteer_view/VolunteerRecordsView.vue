<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

import TheHeader from '@/components/volunteer_view/VolunteerHeader.vue';
import ContentPane from "@/components/UI/ContentPane.vue";
import { useVolunteerStore } from '@/stores/volunteer';

import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';

import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const volunteerStore = useVolunteerStore();

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const columns = ref([
  { field: 'volunteerId', header: 'Volunteer ID' },
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
        message: 'Do you want to delete this record?',
        header: 'Danger Zone',
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
    volunteerStore.deleteVolunteer(id);
    window.location.reload();
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
  <ContentPane header="Volunteer Records">
    <TheHeader :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />
    
    <DataTable 
      :value="volunteerStore.volunteers"
      v-model:filters="filters"
      :globalFilterFields="['volunteerId', 'firstName', 'lastName', 'affiliation']"
      scrollable
      removableSort>

      <Column header="">
        <template #body="slotProps">
          <div class="flex">
            <RouterLink :to="{ name: 'view-volunteer', params: { id: slotProps.data.id } }">
              <Button class="h-8" label="View" icon="fa-solid fa-eye" outlined />
            </RouterLink>
            <Button severity="danger" class="h-8 ml-2" label="Delete" icon="pi pi-trash" outlined @click="confirmDelete(slotProps.data.id)"/>
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
  </ContentPane>
</template>

