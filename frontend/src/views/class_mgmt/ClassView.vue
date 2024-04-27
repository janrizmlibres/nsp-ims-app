<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';
import StrandCard from '@/components/class_view/StrandCard.vue';
import Divider from 'primevue/divider';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import TimelineTable from '@/components/class_view/TimelineTable.vue';
import RosterTableHeader from '@/components/class_view/RosterTableHeader.vue';
import RosterTable from '@/components/class_view/RosterTable.vue';
</script>

<template>
    <ContentPane header="Class Information">
        <TimelineTable />
            
        <div class="bg-transparent border-none flex flex-row justify-between items-center px-4">
            <div class="u-txt-active font-semibold text-3xl content-center">Learning Strands</div>
        </div>
        <Divider class="before:border-t before:border-surface-400"/>
        
        <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-12 pt-4 px-4 mb-16">
            <StrandCard />
            <StrandCard />
            <StrandCard />
        </div>

        <div class="bg-transparent border-none flex flex-row justify-between items-center px-4">
            <div class="u-txt-active font-semibold text-3xl content-center">Class Roster</div>
            <RosterTableHeader />
        </div>
        <Divider class="before:border-t before:border-surface-400"/>

        <TabView class="p-2 bg-white shadow-xl rounded-md">
            <TabPanel header="Active">
                <RosterTable />
            </TabPanel>
            <TabPanel header="Inactive">
                <RosterTable />
            </TabPanel>
            <TabPanel header="Dropped">
                <RosterTable />
            </TabPanel>
        </TabView>
    </ContentPane>
</template>

<style>
</style>