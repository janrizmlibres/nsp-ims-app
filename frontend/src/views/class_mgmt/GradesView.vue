<script setup>
// Presets
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// // Custom
import ContentPane from '@/components/UI/ContentPane.vue';
import GradesSection from '@/components/class_mgmt/grades_view/GradesSection.vue';

// stores
import { useStrandStore } from '@/stores/strand';

const strandStore = useStrandStore()
const route = useRoute()

const name = ref()

async function fetchGrades(query) {
    try {
        await strandStore.getStrand(query.id)
        await strandStore.getAllGrades(query.id)

        name.value = strandStore.strand.learning_strand.name
    } catch (error) {
        console.log(error)
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