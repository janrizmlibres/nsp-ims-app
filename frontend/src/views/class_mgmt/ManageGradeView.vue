<script setup>
// Custom
import GradesTab from '@/components/class_mgmt/manage_grade_view/GradesTab.vue';

const props = defineProps(['learningStrands', 'termStatus'])
</script>

<template>
    <GradesTab :learningStrands="props.learningStrands" :termStatus="props.termStatus" />
</template>