<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import LearningStrandTable from '@/components/strand_view/LearningStrandTable.vue'; 
import LearningStrandTableHeader from '@/components/strand_view/LearningStrandTableHeader.vue';
</script>

<template>
    <ContentPane header="Learning Strand Management">
        <LearningStrandTableHeader />
        <LearningStrandTable />
    </ContentPane>
</template>
