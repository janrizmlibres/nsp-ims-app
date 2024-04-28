<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';
import TimelineTable from '@/components/class_mgmt/class_view/TimelineTable.vue';
import StrandsGrid from '@/components/class_mgmt/class_view/StrandsGrid.vue';
import ClassRosterTabs from '@/components/class_mgmt/class_view/ClassRosterTabs.vue';
</script>

<template>
    <ContentPane header="Class Information">
        <TimelineTable />
        <StrandsGrid />
        <ClassRosterTabs />
    </ContentPane>
</template>

<style>
</style>