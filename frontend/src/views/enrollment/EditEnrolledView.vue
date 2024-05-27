<script setup>
import EditEnrolledForm from '@/components/enrollment_view/EditEnrolledForm.vue' 
import { useRoute } from 'vue-router'
import ContentPane from '@/components/UI/ContentPane.vue'

const route = useRoute()

</script>

<template>
  <ContentPane :breadcrumb="[{label: 'Records'}, {label: 'Enrollment'}, {label: 'Edit'}]">
    <div class="h-full flex justify-center bg-white rounded-2xl shadow-xl p-2 px-4">
      <div class="flex flex-col w-full">
        <EditEnrolledForm 
          class="h-fit mt-10" 
          :studentId="route.query.studentId"
          :enrollmentId="route.query.enrollmentId"
          :academicYear="route.query.academicYear"
        />
      </div>
    </div>
  </ContentPane>
</template>

<style scoped>

</style>