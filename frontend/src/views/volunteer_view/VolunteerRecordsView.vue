<script setup>
import { ref, onMounted, computed } from 'vue';
import { useVolunteerStore } from '@/stores/volunteer';
import ContentPane from "@/components/UI/ContentPane.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TheHeader from '@/components/volunteer_view/VolunteerHeader.vue';
import Button from 'primevue/button';
import { FilterMatchMode } from 'primevue/api';

const volunteerStore = useVolunteerStore();
const volunteers = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const columns = ref([
  { field: 'volunteerId', header: 'Volunteer ID' },
  { field: 'fullname', header: 'Full Name' },
  { field: 'affiliation', header: 'Affiliation' }
]);

const updateGlobalFilter = (newValue) => {
  filters.value.global.value = newValue;
};

onMounted(async () => {
  await volunteerStore.getAllVolunteers();
  volunteers.value = volunteerStore.volunteers.map(volunteer => ({
    ...volunteer,
    personalInformation: volunteer.volunteer_personal_information,
    contactInformation: volunteer.volunteer_contact_information,
    specialization: volunteer.volunteer_specialization,
    availability: volunteer.volunteer_availability,
    emergencyContact: volunteer.volunteer_emergency_contact,
    student: volunteer.student_volunteer,
    professional: volunteer.professional_volunteer,
  }));
});

const recordCount = computed(() => volunteers.value.length);

const filteredVolunteers = computed(() => {
  if (!filters.value.global.value) {
    return volunteers.value;
  }
  const searchValue = filters.value.global.value.toLowerCase();
  return volunteers.value.filter(volunteer =>
    Object.values(volunteer).some(value => {
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(nestedValue =>
          nestedValue && nestedValue.toString().toLowerCase().includes(searchValue)
        );
      }
      return value && value.toString().toLowerCase().includes(searchValue);
    })
  );
});
</script>

<template>
  <ContentPane header="Volunteer Records">
    <TheHeader :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />
    <DataTable :value="filteredVolunteers" :filters="filters" scrollable style=" overflow: auto;">
      <template #empty> No volunteers found. </template>
      <template #loading> Loading volunteers data. Please wait. </template>

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
      v-for="(column, index) in columns" 
      :key="index" 
      :field="column.field" 
      :header="column.header" 
      sortable></Column>
    </DataTable>
    <div class="pl-8 pt-2 font-medium">
      <p>
        Total Record(s): <span class="u-txt-red">{{ recordCount }} </span>
      </p>
    </div>
  </ContentPane>
</template>

