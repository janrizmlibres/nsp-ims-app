<script setup>
// Custom Components
import ContentPane from '@/components/UI/ContentPane.vue';
import ActivitiesTimelineSection from '@/components/class_mgmt/class_view/ActivitiesTimelineSection.vue';
import StrandsSection from '@/components/class_mgmt/class_view/StrandsSection.vue';
import ClassRosterSection from '@/components/class_mgmt/class_view/ClassRosterSection.vue';
</script>

<template>
    <ContentPane>
        <ActivitiesTimelineSection />
        <StrandsSection />
        <ClassRosterSection />
    </ContentPane>
</template>

<style>
</style>