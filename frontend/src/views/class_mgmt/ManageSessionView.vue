<script setup>
// Custom
import SessionTable from '@/components/class_mgmt/manage_session_view/SessionTable.vue';

const props = defineProps(['learningStrands', 'termStatus'])
</script>

<template>
    <SessionTable :learningStrands="props.learningStrands" :termStatus="props.termStatus" />
</template>