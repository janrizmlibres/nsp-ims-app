<script setup>
// Presets
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';

// Custom
import ProgressSpinner from 'primevue/progressspinner';
import ContentPane from '@/components/UI/ContentPane.vue'
import TheHeader from '@/components/class_mgmt/TheHeader.vue';
import GradesTab from '@/components/class_mgmt/manage_grade_view/GradesTab.vue';

// stores
import { useUtilitiesStore } from '@/stores/utilities';

const selectedLearningStrandId = ref()
const state = ref(false)
const termStatus = ref()
const utilitiesStore = useUtilitiesStore()
const isLoading = ref(true)
const toast = useToast()

function updateLearningStand(learningStrandId) {
    selectedLearningStrandId.value = learningStrandId
}

function updateState(learningStrandInput, status) {
    termStatus.value = status
    if (learningStrandInput) state.value = true
    else state.value = false
}

onMounted(async () => {
    try {
        await utilitiesStore.getTerms()
        isLoading.value = false
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered. Please refresh this page.',
            life: 3000
        })
    }
})
</script>

<template>
    <ProgressSpinner v-if="isLoading" />
    <ContentPane v-else header="Grades" subheader="Management">
        <TheHeader @chooseLearningStrand="updateLearningStand" @updateState="updateState" :state="state" />
        <GradesTab :id="selectedLearningStrandId" :state="state" :termStatus="termStatus" />
    </ContentPane>
</template>