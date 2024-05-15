<script setup>
// Presets
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';

// // Custom
import ContentPane from '@/components/UI/ContentPane.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import AttendanceTable from '@/components/class_mgmt/attendance_view/AttendanceTable.vue';

const route = useRoute()
const toast = useToast()
const classLearningStrandStore = useClassLearningStrandStore()

const name = ref()

async function fetchSessions(query) {
    try {
        await classLearningStrandStore.getStrand(query.id)
        await classLearningStrandStore.getAllSessions(query.id)

        name.value = classLearningStrandStore.strand.learning_strand.name
    } catch (error) {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: "Added schedule successfully!",
            life: 3000
        })
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