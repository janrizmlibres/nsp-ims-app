
<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import TheClassHistoryTable from '@/components/class_view/TheClassRecordsTable.vue'; 

import { ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';



const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    batchnumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    academicyear: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startdate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    enddate: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
</script>

<template>
    <ContentPane>
        <TheClassHistoryTable />
    </ContentPane>
</template>

<style scoped>
</style>