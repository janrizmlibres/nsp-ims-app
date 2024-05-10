<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

import BaseCard from '@/components/UI/BaseCard.vue'

import PersonalInfoForm from './bulk_form/PersonalInfoForm.vue'
import ContactInfoForm from './bulk_form/ContactInfoForm.vue'
import ParentalInfoForm from './bulk_form/ParentalInfoForm.vue'
import PrevSchoolForm from './bulk_form/PrevSchoolForm.vue'
import OthersForm from './bulk_form/OthersForm.vue'
</script>

<template>
  <BaseCard isNotPadded="true" class="grow p-2">
    <TabView>
      <TabPanel header="Personal Information">
        <PersonalInfoForm />
      </TabPanel>

      <TabPanel header="Contact Information">
        <ContactInfoForm />
      </TabPanel>

      <TabPanel header="Parental Information">
        <ParentalInfoForm />
      </TabPanel>

      <TabPanel header="Previous School">
        <PrevSchoolForm />
      </TabPanel>

      <TabPanel header="Others">
        <OthersForm />
      </TabPanel>
    </TabView>
  </BaseCard>
</template>
