<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';
import StrandCard from '@/components/class_view/StrandCard.vue';
import Divider from 'primevue/divider';
import TimelineTable from '@/components/class_view/TimelineTable.vue';
</script>

<template>
    <ContentPane header="Class Information">
        <div class="flex flex-col u-router-view-max-h h-screen overflow-auto px-4">
            <TimelineTable />
            
            <div class="bg-transparent border-none flex flex-row justify-start items-center">
                <div class="px-4 u-txt-active font-semibold text-3xl content-center">Learning Strands</div>
            </div>
            <Divider class="before:border-t before:border-surface-400"/>
            
            <div class="grid md:grid-cols-3 sm:grid-cols-1 gap-12 pt-4 px-4">
                <StrandCard />
                <StrandCard />
                <StrandCard />
            </div>
        </div>
    </ContentPane>
</template>

<style>
</style>