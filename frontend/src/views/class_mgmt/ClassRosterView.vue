<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';
import RosterTable from '@/components/class_roster_view/RosterTable.vue';
import RosterTableHeader from '@/components/class_roster_view/RosterTableHeader.vue';
</script>

<template>
    <ContentPane header="Class Roster">
        <div class="flex flex-col u-router-view-max-h h-screen px-4">
            <RosterTableHeader />
            <RosterTable />
        </div>
    </ContentPane>
</template>