<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';
import TimelineTable from '@/components/class_mgmt/class_view/TimelineTable.vue';
import StrandsGrid from '@/components/class_mgmt/class_view/StrandsGrid.vue';
import ClassRosterTabs from '@/components/class_mgmt/class_view/ClassRosterTabs.vue';
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
import { useClassStore } from '@/stores/class';

const route = useRoute()
const classStore = useClassStore()
const classId = route.query.id

onBeforeMount(async () => {
    try {  
        await classStore.getAllStrands({classId: classId})
        console.log(classStore.allStrands);
    } catch(error) {
        console.log(error.response.data.message);
    }
})
</script>

<template>
    <ContentPane :header="route.params.level" :subheader="'Academic Year ' + route.params.term">
        <TimelineTable :classId="classId" />
        <StrandsGrid :classId="classId" />
        <ClassRosterTabs />
    </ContentPane>
</template>

<style>
</style>