<script setup>
// Presets
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import Divider from 'primevue/divider';
import { useToast } from 'primevue/usetoast';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import SessionInfoSection from '@/components/class_mgmt/session_view/SessionInfoSection.vue';
import AttendanceTable from '@/components/class_mgmt/session_view/AttendanceTable.vue';


const route = useRoute()
const toast = useToast()

const classLearningStrandStore = useClassLearningStrandStore()
const session = ref()
const strand = ref()

function updateAttendanceTable(data) {
    session.value = data
}

watch(() => route.query, (query) => {
    try {
        classLearningStrandStore.getSession(query.id).then((data) => {
            updateAttendanceTable(data)
            strand.value = data.class_learning_strand.learning_strand.name
        })
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: "Unexpected error encountered!",
            life: 3000
        })
    }
}, {immediate: true})
</script>

<template>
    <ContentPane header="Attendance" :subheader="strand">
        <SessionInfoSection v-model="session" />
        <Divider class="before:border-t before:border-surface-400 my-10"/>
        <AttendanceTable v-model="session" @onUpdate="updateAttendanceTable" />
    </ContentPane>
</template>

<style>
</style>