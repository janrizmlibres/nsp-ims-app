<script setup>
// Presets
import { useRoute } from 'vue-router';
import { provide, ref, watch } from 'vue';
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
const regular = ref()
const hybrid = ref()
const drop = ref()
const strand = ref()
const learningStrand = ref()
const term = ref()
const classLevel = ref()
const isFetching = ref(false)

provide('regular', regular)
provide('hybrid', hybrid)
provide('drop', drop)
provide('term', term)
provide('classLevel', classLevel)
provide('learningStrand', learningStrand)
provide('session', session)
provide('updateAttendanceTable', updateAttendanceTable)
provide('isFetching', isFetching)

function updateAttendanceTable() {
    isFetching.value = true

    classLearningStrandStore.getSession(route.query.id).then((data) => {
        console.log(data);
        learningStrand.value = data.classLearningStrand.learning_strand
        term.value = data.classLearningStrand.class_level.term
        classLevel.value = data.classLearningStrand.class_level
        session.value = data.session
        regular.value = data.attendances.regular
        hybrid.value = data.attendances.hybrid
        drop.value = data.attendances.drop
        date.value = new Date(session.value.date).toDateString()
        strand.value = data.classLearningStrand.learning_strand.name
    }).catch((error) => {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
        })
    })

    isFetching.value = false
}

watch(() => route.query, () => {
    if (route.name === 'session-info') {
        updateAttendanceTable()
    }
}, {immediate: true})
</script>

<template>
    <ContentPane :breadcrumb="[{label: 'Management'}, {label: 'Class'}, {label: strand}, {label: date}]">
        <AttendanceTab />
    </ContentPane>
</template>

<style>
</style>