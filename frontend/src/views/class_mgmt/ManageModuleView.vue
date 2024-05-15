<script setup>
// Presets
import { ref } from 'vue';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue'
import TheHeader from '@/components/class_mgmt/TheHeader.vue';
import ModuleTable from '@/components/class_mgmt/manage_module_view/ModuleTable.vue';

const selectedLearningStrandId = ref()
const termStatus = ref()
const state = ref(false)

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
    <ContentPane header="Modules" subheader="Management">
        <TheHeader @chooseLearningStrand="updateLearningStand" @updateState="updateState" :state="state" />
        <ModuleTable :id="selectedLearningStrandId" :state="state" :termStatus="termStatus" />
    </ContentPane>
</template>