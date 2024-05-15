<script setup>
// Presets
import { ref } from 'vue';

// Custom
import TheHeader from '@/components/class_mgmt/TheHeader.vue';
import GradesTab from '@/components/class_mgmt/manage_grade_view/GradesTab.vue';

const selectedLearningStrandId = ref()
const state = ref(false)
const termStatus = ref()

function updateLearningStand(learningStrandId) {
    selectedLearningStrandId.value = learningStrandId
}

function updateState(learningStrandInput, status) {
    termStatus.value = status
    if (learningStrandInput) state.value = true
    else state.value = false
}
</script>

<template>
    <TheHeader @chooseLearningStrand="updateLearningStand" @updateState="updateState" :state="state" />
    <GradesTab :id="selectedLearningStrandId" :state="state" :termStatus="termStatus" />
</template>