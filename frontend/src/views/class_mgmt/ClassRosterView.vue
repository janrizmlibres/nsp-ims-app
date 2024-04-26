<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';
import RosterTable from '@/components/class_roster_view/RosterTable.vue';
import RosterTableHeader from '@/components/class_roster_view/RosterTableHeader.vue';
</script>

<template>
    <ContentPane header="Class Roster">
        <RosterTableHeader />
        <RosterTable />
    </ContentPane>
</template>