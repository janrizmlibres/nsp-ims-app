<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import LearningStrandTable from '@/components/term_view/LearningStrandTable.vue'; 
import LearningStrandTableHeader from '@/components/term_view/LearningStrandTableHeader.vue';
</script>

<template>
    <ContentPane header="Learning Strand Management">
        <LearningStrandTableHeader />
        <LearningStrandTable />
    </ContentPane>
</template>