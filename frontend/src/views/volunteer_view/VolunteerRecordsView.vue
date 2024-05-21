<script setup>
import { ref, onMounted } from 'vue';
import { useVolunteerStore } from '@/stores/volunteer';
import ContentPane from "@/components/UI/ContentPane.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TheHeader from '@/components/volunteer_view/VolunteerHeader.vue';
import Button from 'primevue/button';
import { FilterMatchMode } from 'primevue/api';

const volunteerStore = useVolunteerStore();

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const columns = ref([
  { field: 'volunteerId', header: 'Volunteer ID' },
  { field: 'fullname', header: 'Full Name' },
  { field: 'sex', header: 'Sex'},
  { field: 'affiliation', header: 'Affiliation' },
  { field: 'contactNumber', header: 'Contact Number' },
]);

const updateGlobalFilter = (newValue) => {
  filters.value.global.value = newValue;
};

onMounted(async () => {
  try{
    await volunteerStore.getAllVolunteers();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <ContentPane header="Volunteer Records">
    <TheHeader ::globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />
    
    <DataTable 
      :value="volunteerStore.volunteersNormalized"
      v-model:filters="filters"
      :globalFilterFields="['volunteerId', 'firstName', 'lastName', 'affiliation']"
      scrollable
      removableSort>

      <Column header="">
        <template #body="slotProps">
          <div class="flex">
            <RouterLink :to="{ name: 'view-volunteer', params: { volunteerId: slotProps.data.id } }">
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

