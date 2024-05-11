<template>
  <ContentPane header="Volunteer Records">
    <TheHeader />
    <DataTable
      :value="volunteers"
      :globalFilterFields="columns.map(column => column.field)"
      scrollable
    >
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
import { ref, onMounted } from 'vue';
import { useVolunteerStore } from '@/stores/volunteer';
import ContentPane from "@/components/UI/ContentPane.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TheHeader from '@/components/volunteer_view/VolunteerHeader.vue';
import Button from 'primevue/button';

export default {
  name: "VolunteerRecordsView",
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
    const columns = ref([
      { field: 'volunteerId', header: 'Volunteer ID' },
      { field: 'affiliation', header: 'Affiliation' },
      { field: 'fullName', header: 'Full Name' },
    ]);

    onMounted(async () => {
      await volunteerStore.getAllVolunteers();
      volunteers.value = volunteerStore.volunteers;
      await volunteerStore.getAllVolunteers();
      volunteers.value = volunteerStore.volunteers.map(volunteer => ({
        ...volunteer,
        fullName: `${volunteer.firstName} ${volunteer.middleName ? volunteer.middleName + ' ' : ''}${volunteer.lastName}${volunteer.suffix ? ' ' + volunteer.suffix : ''}`
      }));
    });
    return { volunteers, columns };
    },
    computed: {
      recordCount() {
        return this.volunteers.length;
      },
    },
  };
</script>