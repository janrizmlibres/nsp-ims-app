<script setup>
import EnrollmentTable from '@/components/enrollment_view/EnrollmentTable.vue'
import ContentPane from '@/components/UI/ContentPane.vue'

</script>

<template>
  <ContentPane :breadcrumb="[{label: 'Records'}, {label: 'Enrollments'}]">
    <EnrollmentTable />
  </ContentPane>
</template>