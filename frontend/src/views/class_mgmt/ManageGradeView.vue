<script setup>
// Presets
import { ref } from 'vue';

// Custom
import GradesTab from '@/components/class_mgmt/manage_grade_view/GradesTab.vue';

const props = defineProps(['selectedLearningStrandId', 'state', 'termStatus'])
</script>

<template>
    <GradesTab :id="props.selectedLearningStrandId" :state="props.state" :termStatus="props.termStatus" />
</template>