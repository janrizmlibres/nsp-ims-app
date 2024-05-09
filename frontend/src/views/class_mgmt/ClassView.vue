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

watch(() => route.query, (query) => {
    try {
        classStore.getClass(query.id).then((data) => {
            schoolLevel.value = data.school_level
            term.value = data.term.academic_year
        });
    } catch (error) {
        console.log(error.response.data.message)
    }
}, {immediate: true})

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