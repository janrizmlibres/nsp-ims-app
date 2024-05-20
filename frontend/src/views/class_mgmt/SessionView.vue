<script setup>
// Presets
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue';
import AttendanceTab from '@/components/class_mgmt/session_view/AttendanceTab.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const route = useRoute()
const toast = useToast()

const classLearningStrandStore = useClassLearningStrandStore()
const session = ref()
const date = ref()
const attendances = ref()
const strand = ref()

function updateAttendanceTable(data) {
    session.value = data.session
    attendances.value = data.attendances
    date.value = new Date(session.value.date).toDateString()
}

watch(() => route.query, (query) => {
    try {
        classLearningStrandStore.getSession(query.id).then((data) => {
            updateAttendanceTable(data)
            strand.value = data.classLearningStrand.learning_strand.name
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
    <ContentPane :header="date" :subheader="strand">
        <AttendanceTab v-model="attendances" @onUpdate="updateAttendanceTable" />
    </ContentPane>
</template>

<style>
</style>