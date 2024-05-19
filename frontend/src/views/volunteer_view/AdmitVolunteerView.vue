<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import PersonalInformationForm from '@/components/volunteer_view/PersonalInformationForm.vue'
import ContactInformationForm from '@/components/volunteer_view/ContactInformationForm.vue'
import PreferencesForm from '@/components/volunteer_view/PreferencesForm.vue'
import AdmitVolunteerHeader from '@/components/volunteer_view/AdmitVolunteerHeader.vue'
import Button from 'primevue/button'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { useToast } from 'primevue/usetoast';
import { useVolunteerStore } from '@/stores/volunteer';
import FormParts from '../../util/volunteer_form_parts'
import { useRouter } from 'vue-router'

const router = useRouter()
const volunteerStore = useVolunteerStore();
const toast = useToast();

const formData = {
  Volunteer: {
    volunteerId: null,
    affiliation: null,
    firstName: null,
    middleName: null,
    lastName: null,
    suffix: null,
  },

  VolunteerPersonalInformation: {
    nickname: null,
    birthday: null,
    sex: null,
    housing: null,
    barangay: null,
    city: null,
    province: null
  },

  VolunteerContactInformation: {
    contactNumber: null,
    email: null,
    facebook: null,
  },

  VolunteerEmergency: {
    lastName: null,
    firstName: null,
    middleName: null,
    suffix: null,
    contactNumber: null,
    relationship: null,
  },

  VolunteerAvailability: {
    day: null,
  },

  VolunteerSpecialization: {
    area: null,
  },

  StudentVolunteer: {
    program: null,
    year: null,
  },

  ProfessionalVolunteer: {
    work: null,
  },

  //add work
}

function updateFormData(part, data) {
  const updateMapping = {
    [FormParts.Volunteer]: () => (formData.Volunteer = data),
    [FormParts.VolunteerPersonalInformation]: () => (formData.VolunteerPersonalInformation = data),
    [FormParts.VolunteerContactInformation]: () => (formData.VolunteerContactInformation = data),
    [FormParts.VolunteerEmergency]: () => (formData.VolunteerEmergency = data),
    [FormParts.VolunteerAvailability]: () => (formData.VolunteerAvailability = data),
    [FormParts.VolunteerSpecialization]: () => (formData.VolunteerSpecialization = data),
    [FormParts.StudentVolunteer]: () => (formData.StudentVolunteer = data),
    [FormParts.ProfessionalVolunteer]: () => (formData.ProfessionalVolunteer = data)
  }
    updateMapping[part]()
}

async function goToVolunteerRecords() {
  await router.replace({ name: 'volunteer-records' })
}

async function submitForm() {
  try {
    const result = await volunteerStore.addVolunteer(formData)
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: result.data.message,
      life: 5000
    })
    await goToVolunteerRecords()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}
</script>

<template>
  <ContentPane header="Admit Volunteer">
    <div class="flex flex-col gap-3 h-full mr-1">
      <BaseCard>
        <AdmitVolunteerHeader @dataChanged="updateFormData" />
      </BaseCard>
      <BaseCard class="grow">
        <TabView>
          <TabPanel header="Personal Infromation">
            <PersonalInformationForm @dataChanged="updateFormData" />
          </TabPanel>
          <TabPanel header="Contact Infromation">
            <ContactInformationForm @dataChanged="updateFormData" />
          </TabPanel>
          <TabPanel header="Preferences">
            <PreferencesForm @dataChanged="updateFormData" />
          </TabPanel>
        </TabView>
      </BaseCard>

      <div class="flex-none text-right">
        <div class="inline-block">
          <Toast />
          <Button class="h-10 u-bg-green" @click="submitForm">
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
            @click="goToVolunteerRecords"
          />
        </div>
      </div>
    </div>
  </ContentPane>
  </template>

