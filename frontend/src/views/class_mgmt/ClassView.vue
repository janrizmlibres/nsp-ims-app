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

defineProps(['term'])
const route = useRoute()

const classStore = useClassStore()

const schoolLevel = ref()
const isLoading = ref(true)

async function fetchClassLevel(id) {
    const classLevel = await classStore.getClass({classId: id})
    schoolLevel.value = classLevel.school_level

    isLoading.value = false
}

watch(() => route.query.id, fetchClassLevel, {immediate: true})
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