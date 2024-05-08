<script setup>
// Presets
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// // Custom
import ContentPane from '@/components/UI/ContentPane.vue';

// stores
import { useStrandStore } from '@/stores/strand';
import AttendanceTable from '@/components/class_mgmt/attendance_view/AttendanceTable.vue';

const strandStore = useStrandStore()
const route = useRoute()

const name = ref()

async function fetchSessions(query) {
    try {
        await strandStore.getStrand(query.id)
        await strandStore.getAllSessions(query.id)

        name.value = strandStore.strand.learning_strand.name
    } catch (error) {
        console.log(error)
    }
}

watch(() => route.query, fetchSessions, {immediate: true})
</script>

<template>
    <ContentPane header="View Attendance" :subheader="name">
        <AttendanceTable />
    </ContentPane>
</template>

<style>
</style>