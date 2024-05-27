<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

import BaseCard from '@/components/UI/BaseCard.vue'

import PersonalInfoForm from './bulk_form/PersonalInfoForm.vue'
import ContactInfoForm from './bulk_form/ContactInfoForm.vue'
import ParentalInfoForm from './bulk_form/ParentalInfoForm.vue'
import PrevSchoolForm from './bulk_form/PrevSchoolForm.vue'

const emit = defineEmits(['dataChanged'])

function handleUpdate(part, data) {
  emit('dataChanged', part, data)
}
</script>

<template>
  <BaseCard :isNotPadded="true" class="grow px-2">
    <TabView :pt="{ nav: {class:['rounded-t-2xl']}, tabpanel: { headerAction: { class: [''] }}}" :ptOptions="{mergeProps: true}">
      <TabPanel header="Personal Information">
        <PersonalInfoForm @dataChanged="handleUpdate" />
      </TabPanel>

      <TabPanel header="Contact Information">
        <ContactInfoForm @dataChanged="handleUpdate" />
      </TabPanel>

      <TabPanel header="Parental Information">
        <ParentalInfoForm @dataChanged="handleUpdate" />
      </TabPanel>

      <TabPanel header="Previous School">
        <PrevSchoolForm @dataChanged="handleUpdate" />
      </TabPanel>
    </TabView>
  </BaseCard>
</template>
