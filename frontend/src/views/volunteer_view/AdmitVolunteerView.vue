<template>
  <ContentPane header="Admit Volunteer">
    <div class="flex flex-col gap-3 h-full mr-1">
      <BaseCard>
        <AdmitVolunteerHeader @update="handleUpdate" />
      </BaseCard>
      <BaseCard class="grow">
        <TabView>
          <TabPanel header="Personal Infromation">
            <PersonalInformationForm @update="handleUpdate" />
          </TabPanel>
          <TabPanel header="Contact Infromation">
            <ContactInformationForm @update="handleUpdate" />
          </TabPanel>
          <TabPanel header="Preferences">
            <PreferencesForm @update="handleUpdate" />
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

<script>
import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import PersonalInformationForm from '@/components/volunteer_view/PersonalInformationForm.vue'
import ContactInformationForm from '@/components/volunteer_view/ContactInformationForm.vue'
import PreferencesForm from '@/components/volunteer_view/PreferencesForm.vue'
import AdmitVolunteerHeader from '@/components/volunteer_view/AdmitVolunteerHeader.vue'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { ref } from 'vue';

export default {
    name: "VolunteerRecordsView",
    components: {
        ContentPane,
        PersonalInformationForm,
        ContactInformationForm,
        PreferencesForm,
        BaseCard,
        Button,
        ProgressSpinner,
        AdmitVolunteerHeader,
        TabPanel,
        TabView,
    },
    setup() {
    const formData = ref({
      selectedAffiliation: '', 
      id: '',
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
      areaOfSpecialization: ''
    });

    const handleUpdate = (data) => {
      formData.value = { ...formData.value, ...data };
    };

    const handleSubmit = () => {
      console.log(formData.value);
    };

    return { handleUpdate, handleSubmit };
  },
};
</script>