<script setup>
// Presets
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Custom Components
import ContentPane from '@/components/UI/ContentPane.vue';
import ActivitiesTimelineSection from '@/components/class_mgmt/class_view/ActivitiesTimelineSection.vue';
import StrandsSection from '@/components/class_mgmt/class_view/StrandsSection.vue';
import ClassRosterSection from '@/components/class_mgmt/class_view/ClassRosterSection.vue';

// stores
import { useClassStore } from '@/stores/class';

const route = useRoute()

const classStore = useClassStore()
const schoolLevel = ref()
const term = ref()

async function fetchClassLevel(query) {
    try {
        await classStore.getClass(query.id)
        schoolLevel.value = classStore.classLevel.school_level
        term.value = classStore.classLevel.term.academic_year

        await classStore.getAllModules(query.id)
        await classStore.getAllStrands(query.id)
        await classStore.getAllStudents(query.id)
    } catch (error) {
        console.log(error.response.data.message)
    }
}

watch(() => route.query, fetchClassLevel, {immediate: true})
</script>

<template>
    <ContentPane :header="schoolLevel" :subheader="'Academic Year ' + term">
        <ActivitiesTimelineSection />
        <StrandsSection />
        <ClassRosterSection />
    </ContentPane>
</template>

<style>
</style>