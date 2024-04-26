<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';
import StrandCard from '@/components/class_view/StrandCard.vue';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import TimelineTable from '@/components/class_view/TimelineTable.vue';
import { useRouter } from 'vue-router';

const route = useRouter()
function viewRoster() {
    route.push('/classRoster')
}
</script>

<template>
    <ContentPane header="Class Information">
        <TimelineTable />
            
        <div class="bg-transparent border-none flex flex-row justify-between items-center px-4">
            <div class="u-txt-active font-semibold text-3xl content-center">Learning Strands</div>
            <Button icon="fa fa-eye" label="View Class Roster" class="ml-2 h-10" @click="viewRoster" />
        </div>
        <Divider class="before:border-t before:border-surface-400"/>
        
        <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-12 pt-4 px-4">
            <StrandCard />
            <StrandCard />
            <StrandCard />
        </div>
    </ContentPane>
</template>

<style>
</style>