<script setup>
// Custom
import EnrolledGradesTab from '@/components/enrollment_view/EnrolledGradesTab.vue'
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
    <EnrolledGradesTab :schoolLevelId="props.schoolLevelId" :enrollmentId="props.enrollmentId" />
</template>