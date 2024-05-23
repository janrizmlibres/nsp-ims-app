<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

import TheHeader from '@/components/volunteer_view/VolunteerHeader.vue';
import ContentPane from "@/components/UI/ContentPane.vue";
import { useVolunteerStore } from '@/stores/volunteer';

import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const volunteerStore = useVolunteerStore();

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const columns = ref([
  { field: 'id', header: 'Database ID' },
  { field: 'volunteerId', header: 'Volunteer ID' },
  { field: 'fullname', header: 'Full Name' },
  { field: 'volunteer_personal_information.sex', header: 'Sex'},
  { field: 'affiliation', header: 'Affiliation' },
  { field: 'volunteer_contact_information.contactNumber', header: 'Contact Number' },
]);

const updateGlobalFilter = (newValue) => {
  filters.value.global.value = newValue
};

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

