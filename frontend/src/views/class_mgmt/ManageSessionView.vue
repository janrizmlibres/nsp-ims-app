<script setup>
// Custom
import SessionTable from '@/components/class_mgmt/manage_session_view/SessionTable.vue';

const props = defineProps(['term', 'learningStrands', 'termStatus'])
</script>

<template>
    <SessionTable :term="props.term" :learningStrands="props.learningStrands" :termStatus="props.termStatus" />
</template>