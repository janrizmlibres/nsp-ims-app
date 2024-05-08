<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

import BaseCard from '@/components/UI/BaseCard.vue'
import PersonalInfoForm from '@/components/student_view/PersonalInfoForm.vue'
import ContactInfoForm from '@/components/student_view/ContactInfoForm.vue'
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

      <TabPanel header="Parental Information"> </TabPanel>
      <TabPanel header="Previous School"> </TabPanel>
      <TabPanel header="Others"> </TabPanel>
    </TabView>
  </BaseCard>
</template>
