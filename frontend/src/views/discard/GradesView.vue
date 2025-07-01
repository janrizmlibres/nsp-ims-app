<script setup>
// Presets
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';

// // Custom
import ContentPane from '@/components/UI/ContentPane.vue';
import GradesSection from '@/components/class_mgmt/class_learning_strand_view/grades_tab/GradesTab.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const classLearningStrandStore = useClassLearningStrandStore()
const route = useRoute()
const toast = useToast()

const name = ref()

async function fetchGrades(query) {
    try {
        await classLearningStrandStore.getStrand(query.id)
        await classLearningStrandStore.getAllGrades(query.id)

        name.value = classLearningStrandStore.strand.learning_strand.name
    } catch (error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: "Unexpected error encountered!",
            life: 3000
        })
    }
}

watch(() => route.query, fetchGrades, {immediate: true})
</script>

<template>
    <ContentPane header="View Grades" :subheader="name">
        <GradesSection />
    </ContentPane>
</template>

<style>
</style>