<script setup>
import EditEnrolledForm from '@/components/enrollment_view/EditEnrolledForm.vue' 
import { useRoute } from 'vue-router'
import ContentPane from '@/components/UI/ContentPane.vue'

const route = useRoute()

</script>

<template>
  <ContentPane header="Enrollment" :subheader="'Edit Enrolled'">
    <div class="h-full flex justify-center bg-white rounded-md shadow-xl p-2 px-4">
      <div class="flex flex-col w-full">
        <EditEnrolledForm 
          class="h-fit mt-10" 
          :lrn="route.query.lrn" 
          :academic-year="route.query.academicYear" 
          :class-level="route.query.classLevel"
        />
      </div>
    </div>
  </ContentPane>
</template>

<style scoped>

</style>