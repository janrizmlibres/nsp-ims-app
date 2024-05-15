<script setup>
// Custom
import SessionTable from '@/components/class_mgmt/manage_session_view/SessionTable.vue';

const props = defineProps(['selectedLearningStrandId', 'state', 'termStatus'])
</script>

<template>
    <SessionTable :id="props.sselectedLearningStrandId" :state="props.state" :termStatus="props.termStatus" />
</template>