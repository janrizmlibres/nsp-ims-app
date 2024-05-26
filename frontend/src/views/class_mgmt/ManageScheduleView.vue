<script setup>
// Custom
import SchedulesTable from '@/components/class_mgmt/manage_schedule_view/SchedulesTable.vue';

const props = defineProps(['classLevel', 'termStatus'])
</script>

<template>
    <SchedulesTable :classLevel="props.classLevel" :termStatus="props.termStatus" />
</template>