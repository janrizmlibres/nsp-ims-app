<script setup>
// Custom
import EnrolledModuleTable from '@/components/enrollment_view/EnrolledModuleTable.vue'
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
    <EnrolledModuleTable :schoolLevelId="props.schoolLevelId" :enrollmentId="props.enrollmentId" />
</template>