<script setup>
// Custom
import EnrolledAttendanceTable from '@/components/enrollment_view/EnrolledSessionTable.vue'
import { defineProps } from 'vue'

const props = defineProps({
  schoolLevelId: {
    type: String,
    required: true
  },
  enrollmentId: {
    type: String,
    required: true
  },
})
</script>

<template>
  <EnrolledAttendanceTable :schoolLevelId="props.schoolLevelId" :enrollmentId="props.enrollmentId" />
</template>