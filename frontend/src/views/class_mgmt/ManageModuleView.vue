<script setup>
// Custom
import ModuleTable from '@/components/class_mgmt/manage_module_view/ModuleTable.vue';

const props = defineProps(['learningStrands', 'termStatus'])
</script>

<template>
    <ModuleTable :learningStrands="props.learningStrands" :termStatus="props.termStatus" />
</template>