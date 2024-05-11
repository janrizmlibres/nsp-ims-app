<template>
  <ContentPane header="Volunteer Records">
    <TheHeader />
    <DataTable
  :value="teachers"
  :globalFilterFields="['name', 'subject', 'dob', 'course', 'yearLevel', 'work', 'address', 'contactNumber', 'email', 'facebook']"
  scrollable
>
  <template #empty> No teachers found. </template>
  <template #loading> Loading teachers data. Please wait. </template>

  <Column header="Actions">
    <template #body="slotProps">
      <div class="flex">
        <Button class="h-8 mr-2" label="Edit" icon="fa-solid fa-user-pen" outlined />
        <Button class="h-8" label="Delete" icon="pi pi-trash" outlined />
      </div>
    </template>
  </Column>
  <Column field="name" header="Name" sortable></Column>
  <Column field="subject" header="Subject" sortable></Column>
  <Column field="dob" header="Date of Birth" sortable></Column>
  <Column field="course" header="Course" sortable></Column>
  <Column field="yearLevel" header="Year Level" sortable></Column>
  <Column field="work" header="Work" sortable></Column>
  <Column field="address" header="Address" sortable></Column>
  <Column field="contactNumber" header="Contact Number" sortable></Column>
  <Column field="email" header="Email Address" sortable></Column>
  <Column field="facebook" header="Facebook" sortable></Column>
</DataTable>
<div class="pl-8 pt-2 font-medium">
  <p>
    Total Record(s): <span class="u-txt-red">{{ recordCount }} </span>
  </p>
</div>
  </ContentPane>
</template>

<script>
import ContentPane from "@/components/UI/ContentPane.vue"
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import TheHeader from '@/components/volunteer_view/VolunteerHeader.vue'
import Button from 'primevue/button'

export default {
  name: "VolunteerRecordsView",
  components: {
    ContentPane,
    DataTable,
    Column,
    TheHeader,
    Button,
  },
  data() {
    return {
      teachers: [
        { id: 1, name: 'John Doe', subject: 'Math', dob: '1980-01-01', course: 'Mathematics', yearLevel: '4', work: 'Teacher', address: '123 Street', contactNumber: '1234567890', email: 'johndoe@example.com', facebook: 'johndoe' },
        { id: 2, name: 'Jane Smith', subject: 'English', dob: '1985-01-01', course: 'English', yearLevel: '3', work: 'Teacher', address: '456 Street', contactNumber: '0987654321', email: 'janesmith@example.com', facebook: 'janesmith' },
      ]
    };
  },
  computed: {
    recordCount() {
      return this.teachers.length;
    },
  },
};
</script>