<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

import BaseCard from '@/components/UI/BaseCard.vue'

import PersonalInformationForm from '@/components/volunteer_view/bulk_form/PersonalInformationForm.vue'
import ContactInformationForm from '@/components/volunteer_view/bulk_form/ContactInformationForm.vue'
import PreferencesForm from '@/components/volunteer_view/bulk_form/PreferencesForm.vue'

const emit = defineEmits(['dataChanged'])

function handleUpdate(part, data) {
  emit('dataChanged', part, data)
}
</script>

<template>
    <BaseCard class="grow">
        <TabView>
            <TabPanel header="Personal Infromation">
                <PersonalInformationForm @dataChanged="handleUpdate" />
            </TabPanel>
            <TabPanel header="Contact Infromation">
                <ContactInformationForm @dataChanged="handleUpdate" />
            </TabPanel>
            <TabPanel header="Preferences">
                <PreferencesForm @dataChanged="handleUpdate" />
            </TabPanel>
        </TabView>
    </BaseCard>
</template>