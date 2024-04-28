<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import TermTable from '@/components/term_view/TermTable.vue'; 
import TermTableHeader from '@/components/term_view/TermTableHeader.vue';
</script>

<template>
    <ContentPane header="Term Management">
        <TermTableHeader />
        <TermTable />
    </ContentPane>
</template>