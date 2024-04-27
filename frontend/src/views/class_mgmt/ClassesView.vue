<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import ClassesTable from '@/components/classes_view/ClassesTable.vue'; 
import ClassesTableHeader from '@/components/classes_view/ClassesTableHeader.vue';
</script>

<template>
    <ContentPane header="Class Records">
        <div class="flex flex-col u-router-view-max-h h-screen px-4">
            <ClassesTableHeader />
            <ClassesTable />
        </div>
    </ContentPane>
</template>