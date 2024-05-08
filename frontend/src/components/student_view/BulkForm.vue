<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import BaseCard from '@/components/UI/BaseCard.vue'
</script>

<template>
  <BaseCard isNotPadded="true" class="grow p-2">
    <TabView>
      <TabPanel header="Personal Information"> </TabPanel>
      <TabPanel header="Contact Information">
        <h2>Wow hello world</h2>
      </TabPanel>
      <TabPanel header="Parental Information"> </TabPanel>
      <TabPanel header="Previous School"> </TabPanel>
      <TabPanel header="Others"> </TabPanel>
    </TabView>
  </BaseCard>
</template>
