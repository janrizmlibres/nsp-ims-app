<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';
import OptionCard from '@/components/class_mgmt/strand_view/OptionCard.vue';
import ModuleTable from '@/components/class_mgmt/strand_view/ModuleTable.vue';
</script>

<template>
    <ContentPane header="Strand Information">
        <div class="grid grid-cols-2 gap-12 p-2 mb-12">
            <OptionCard title="Grades " content="View Grades" />
            <OptionCard title="Attendance " content="View Attendance" />
        </div>
        <ModuleTable />
    </ContentPane>
</template>

<style>
</style>