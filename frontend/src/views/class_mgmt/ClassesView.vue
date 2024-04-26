<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import ClassesTable from '@/components/classes_view/ClassesTable.vue'; 
import ClassesTableHeader from '@/components/classes_view/ClassesTableHeader.vue';
import { useSideBarStateStore } from '@/stores/sidebar_state';

const sideBarStateStore = useSideBarStateStore()
</script>

<template>
    <ContentPane header="Class Records">
        <div class="flex flex-col u-router-view-max-h h-screen px-4" :class="sideBarStateStore.isExpanded ? 'u-router-view-max-d-expanded' : 'u-router-view-max-d-collapsed'">
            <ClassesTableHeader />
            <ClassesTable />
        </div>
    </ContentPane>
</template>