<template>
  <ContentPane header="Admit Volunteer">
    <div class="flex flex-col gap-3 h-full mr-1">
      <BaseCard>
        <AdmitVolunteerHeader />
      </BaseCard>
      <BaseCard class="grow">
        <TabView>
          <TabPanel header="Personal Infromation">
            <PersonalInformationForm />
          </TabPanel>
          <TabPanel header="Contact Infromation">
            <ContactInformationForm />
          </TabPanel>
          <TabPanel header="Preferences">
            <PreferencesForm />
          </TabPanel>
        </TabView>
      </BaseCard>

      <div class="flex-none text-right">
        <div class="inline-block">
          <Button class="h-10 u-bg-green" >
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
};
</script>