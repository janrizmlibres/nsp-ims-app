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
          <Toast />
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
import { useToast } from 'primevue/usetoast';
import { useVolunteerStore } from '@/stores/volunteer';

const volunteerStore = useVolunteerStore();

async function submitForm() {
  try {
    const result = await volunteerStore.addVolunteer(formData.value)
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: result.data.message,
      life: 5000
    })
    await router.replace({ name: 'volunteer-records' })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

const toast = useToast();

const formData = ref({
    volunteerId: '',
    affiliation: '',
    firstName: '',
    middleName: '',
    lastName: '',
    nickname: '',
    birthday: '',
    suffix: '',
    program: '',
    year: '',
    work: '',
    housing: '',
    city: '',
    barangay: '',
    province: '',
    contactNumber: '',
    email: '',
    facebook: '',
    day: '',
    area: '',
    emergencyLastName: '', 
    emergencyFirstName: '', 
    emergencyMiddleName: '', 
    emergencySuffix: '', 
    emergencyContact: '', 
    emergencyRelationship: ''
});

const validateField = (fieldName, regex, errorMessage) => {
  if (formData.value[fieldName] && !regex.test(formData.value[fieldName])) {
    toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
    return false;
  }
  return true;
};

const handleDataChange = (newData) => {
    // Merge the new data into the existing formData
    Object.assign(formData.value, newData);
};

const handleSubmit = () => {
  const results = [
    validateField('firstName', /^[a-zA-Z\s]*$/, 'Invalid First Name'),
    validateField('middleName', /^[a-zA-Z\s]*$/, 'Invalid Middle Name'),
    validateField('lastName', /^[a-zA-Z\s]*$/, 'Invalid Last Name'),
    validateField('nickname', /^[a-zA-Z\s]*$/, 'Invalid Nickname'),
    validateField('suffix', /^[a-zA-Z\s]*$/, 'Invalid Suffix'),
    validateField('yearLevel', /^[a-zA-Z0-9\s]*$/, 'Invalid Year Level'),
    validateField('course', /^[a-zA-Z\s]*$/, 'Invalid Course'),
    validateField('work', /^[a-zA-Z0-9\s]*$/, 'Invalid Work'),
    validateField('contactNumber', /^\d{1,13}$/, 'Invalid Contact Number'),
    validateField('emergencyFirstName', /^[a-zA-Z\s]*$/, 'Invalid Emergency Contact First Name'),
    validateField('emergencyMiddleName', /^[a-zA-Z\s]*$/, 'Invalid Emergency Contact Middle Name'),
    validateField('emergencyLastName', /^[a-zA-Z\s]*$/, 'Invalid Emergency Contact Last Name'),
    validateField('emergencySuffix', /^[a-zA-Z\s]*$/, 'Invalid Emergency Contact Suffix'),
    validateField('emergencyContact', /^\d{1,13}$/, 'Invalid Emergency Contact Number'),
    validateField('emergencyRelationship', /^[a-zA-Z\s]*$/, 'Invalid input for Relationship with Emergency Contact'),
  ];

  if (results.every(result => result)) {
    console.log(formData.value);
    submitForm();
  }
};

watch(formData, handleDataChange);

</script>