<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import ClassesTable from '@/components/classes_view/ClassesTable.vue'; 
import ClassesTableHeader from '@/components/classes_view/ClassesTableHeader.vue';
</script>

<template>
    <ContentPane header="Class Records">
        <ClassesTableHeader />
        <ClassesTable />
    </ContentPane>
</template>