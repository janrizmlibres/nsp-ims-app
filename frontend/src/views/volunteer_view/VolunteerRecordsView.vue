<template>
  <ContentPane header="Volunteer Records">
    <TheHeader :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />
    <DataTable :value="filteredVolunteers" :filters="filters" scrollable style=" overflow: auto;">
      <template #empty> No volunteers found. </template>
      <template #loading> Loading volunteers data. Please wait. </template>

      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex">
            <Button class="h-8 mr-2" label="Edit" icon="fa-solid fa-user-pen" outlined />
            <Button class="h-8" label="Delete" icon="pi pi-trash" outlined />
          </div>
        </template>
      </Column>

      <Column v-for="(column, index) in columns" :key="index" :field="column.field" :header="column.header" sortable></Column>
    </DataTable>
    <div class="pl-8 pt-2 font-medium">
      <p>
        Total Record(s): <span class="u-txt-red">{{ recordCount }} </span>
      </p>
    </div>
  </ContentPane>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useVolunteerStore } from '@/stores/volunteer';
import ContentPane from "@/components/UI/ContentPane.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TheHeader from '@/components/volunteer_view/VolunteerHeader.vue';
import Button from 'primevue/button';
import { FilterMatchMode } from 'primevue/api';

export default {
  components: {
    ContentPane,
    DataTable,
    Column,
    TheHeader,
    Button,
  },
  setup() {
    const volunteerStore = useVolunteerStore();
    const volunteers = ref([]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const columns = ref([
      { field: 'volunteerId', header: 'Volunteer ID' },
      { field: 'fullName', header: 'Full Name' },
      { field: 'affiliation', header: 'Affiliation' },
      { field: 'personalInformation.nickname', header: 'Nickname' },
      { field: 'personalInformation.sex', header: 'Sex' },
      { field: 'personalInformation.address', header: 'Address' },
      { field: 'contactInformation.contactNumber', header: 'Contact Number' },
      { field: 'contactInformation.email', header: 'Email' },
      { field: 'contactInformation.facebook', header: 'Facebook' },
      { field: 'specialization.area', header: 'Specialization' },
      { field: 'availability.day', header: 'Availability' },
      { field: 'emergencyContact.fullname', header: 'Emergency Contact' },
      { field: 'emergencyContact.contactNumber', header: 'Emergency Contact Number' },
      { field: 'emergencyContact.relationship', header: 'Emergency Contact Relationship' },
    ]);

    const updateGlobalFilter = (newValue) => {
      filters.value.global.value = newValue;
    };

    onMounted(async () => {
      await volunteerStore.getAllVolunteers();
      volunteers.value = volunteerStore.volunteers.map(volunteer => ({
        ...volunteer,
        fullName: `${volunteer.firstName} ${volunteer.middleName ? volunteer.middleName + ' ' : ''}${volunteer.lastName}${volunteer.suffix ? ' ' + volunteer.suffix : ''}`,
        personalInformation: volunteer.volunteer_personal_information,
        contactInformation: volunteer.volunteer_contact_information,
        specialization: volunteer.volunteer_specialization,
        availability: volunteer.volunteer_availability,
        emergencyContact: volunteer.volunteer_emergency_contact,
      }));
    });

    const recordCount = computed(() => volunteers.value.length);

    const filteredVolunteers = computed(() => {
      if (!filters.value.global.value) {
        return volunteers.value;
      }
      return volunteers.value.filter(volunteer =>
        Object.values(volunteer).some(value =>
          value && value.toString().toLowerCase().includes(filters.value.global.value.toLowerCase())
        )
      );
    });

    return { filteredVolunteers, columns, filters, updateGlobalFilter, recordCount };
  },
};
</script>