<template>
  <ContentPane header="Admit Volunteer">
    <div class="flex flex-col gap-3 h-full mr-1">
      <BaseCard>
        <HeaderForm />
      </BaseCard>
      <BaseCard class="grow">
        <AdmitForm />
      </BaseCard>

      <div class="flex-none text-right">
        <div class="inline-block">
          <Button class="h-10 u-bg-green" :disabled="isInitialState" @click="submitData">
            <ProgressSpinner
              v-if="isLoading"
              style="width: 50px; height: 50px"
              strokeWidth="8"
              class="fill-surface-0 dark:fill-surface-800"
              animationDuration=".5s"
              aria-label="Custom ProgressSpinner"
            />

            <div v-else>
              <font-awesome-icon
                icon="fa-solid fa-circle-check"
                class="absolute top-2/4 -mt-2 left-3"
              />
              <h2 class="pl-5 font-bold">Submit</h2>
            </div>
          </Button>
          <Button
            class="h-10 ml-2 u-bg-red"
            label="Cancel"
            icon="fa-solid fa-circle-xmark"
            @click="goToStaffRecordsView"
          />
        </div>
      </div>
    </div>
  </ContentPane>
  </template>

<script>
import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import AdmitForm from '@/components/volunteer_view/AdmitForm.vue'
import HeaderForm from '@/components/volunteer_view/HeaderForm.vue'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
export default {
    name: "VolunteerRecordsView",
    components: {
        ContentPane,
        AdmitForm,
        BaseCard,
        Button,
        ProgressSpinner,
        HeaderForm,
    },
  data() {
    return {
      volunteer: {
        name: '',
        email: ''
      }
    };
  },
  methods: {
    addVolunteer() {
      // Add the volunteer to your data store.
      // You'll need to implement this based on how your application should handle new volunteers.
    }
  }
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>