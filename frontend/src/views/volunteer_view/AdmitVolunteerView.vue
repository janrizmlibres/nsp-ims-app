<template>
  <ContentPane header="Admit Volunteer">
    <div class="flex flex-col gap-3 h-full mr-1">
      <BaseCard>
        <AdmitVolunteerHeader @dataChanged="handleDataChange" />
      </BaseCard>
      <BaseCard class="grow">
        <TabView>
          <TabPanel header="Personal Infromation">
            <PersonalInformationForm @dataChanged="handleDataChange" />
          </TabPanel>
          <TabPanel header="Contact Infromation">
            <ContactInformationForm @dataChanged="handleDataChange" />
          </TabPanel>
          <TabPanel header="Preferences">
            <PreferencesForm @dataChanged="handleDataChange" />
          </TabPanel>
          <TabPanel header="Emergency Contact">
            <EmergencyContactForm @dataChanged="handleDataChange" />
          </TabPanel>
        </TabView>
      </BaseCard>

      <div class="flex-none text-right">
        <div class="inline-block">
          <Button class="h-10 u-bg-green" @click="handleSubmit">
              <font-awesome-icon
                icon="fa-solid fa-circle-check"
                class="absolute top-2/4 -mt-2 left-3"
              />
              <h2 class="pl-5 font-bold">Submit</h2>
          </Button>
          <Button
            class="h-10 ml-2 u-bg-red"
            label="Cancel"
            icon="fa-solid fa-circle-xmark"
          />
        </div>
      </div>
    </div>
  </ContentPane>
  </template>

<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import PersonalInformationForm from '@/components/volunteer_view/PersonalInformationForm.vue'
import ContactInformationForm from '@/components/volunteer_view/ContactInformationForm.vue'
import PreferencesForm from '@/components/volunteer_view/PreferencesForm.vue'
import EmergencyContactForm from '@/components/volunteer_view/EmergencyContactForm.vue'
import AdmitVolunteerHeader from '@/components/volunteer_view/AdmitVolunteerHeader.vue'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { ref, watch } from 'vue';

const formData = ref({
    id: '',
    selectedAffiliation: '',
    firstName: '',
    middleName: '',
    lastName: '',
    nickname: '',
    dateOfBirth: '',
    suffix: '',
    course: '',
    yearLevel: '',
    work: '',
    housing: '',
    city: '',
    barangay: '',
    province: '',
    contactNumber: '',
    emailAddress: '',
    facebook: '',
    availability: '',
    emergencyLastName: '', 
    emergencyFirstName: '', 
    emergencyMiddleName: '', 
    emergencySuffix: '', 
    emergencyContact: '', 
    emergencyRelationship: ''
});

const handleDataChange = (newData) => {
    // Merge the new data into the existing formData
    Object.assign(formData.value, newData);
};

const handleSubmit = () => {
    console.log(formData.value);
};

watch(formData, handleDataChange);

</script>