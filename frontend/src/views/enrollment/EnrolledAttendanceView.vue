<script setup>
// Custom
import EnrolledSessionTable from '@/components/enrollment_view/EnrolledSessionTable.vue'
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
    
</template>