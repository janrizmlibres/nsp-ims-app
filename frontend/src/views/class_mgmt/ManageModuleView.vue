<script setup>
// Custom
import ModuleTable from '@/components/class_mgmt/manage_module_view/ModuleTable.vue';

const props = defineProps(['selectedLearningStrandId', 'state', 'termStatus'])
</script>

<template>
    <ModuleTable :id="props.selectedLearningStrandId" :state="props.state" :termStatus="props.termStatus" />
</template>