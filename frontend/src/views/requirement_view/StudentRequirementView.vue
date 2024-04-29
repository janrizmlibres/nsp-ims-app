<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import StudentRequirementTable from '@/components/requirement_view/StudentRequirementTable.vue'; 
import StudentRequirementTableHeader from '@/components/requirement_view/StudentRequirementTableHeader.vue';
</script>

<template>
    <ContentPane header="Student Requirement Management">
        <StudentRequirementTableHeader />
        <StudentRequirementTable />
    </ContentPane>
</template>