<script setup>
// Presets
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';

// Custom Components
import ContentPane from '@/components/UI/ContentPane.vue';
import ActivitiesTimelineSection from '@/components/class_mgmt/class_view/ActivitiesTimelineSection.vue';
import StrandsSection from '@/components/class_mgmt/class_view/StrandsSection.vue';
import ClassRosterSection from '@/components/class_mgmt/class_view/ClassRosterSection.vue';

// stores
import { useClassStore } from '@/stores/class';

const route = useRoute()
const toast = useToast()
const classStore = useClassStore()

const schoolLevel = ref()
const term = ref()
const modules = ref([])
const strands = ref([])
const students = ref([])

watch(() => route.query, (query) => {
    try {
        classStore.getClass(query.id).then((data) => {
            schoolLevel.value = data.school_level
            term.value = data.term.academic_year
        });
        classStore.getAllModules(query.id).then((data) => {
            modules.value = data
        })
        classStore.getAllLearningStrands(query.id).then((data) => {
            strands.value = data
        })
        classStore.getAllStudents(query.id).then((data) => students.value = data)
    } catch (error) {
        console.log(error);
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
    <ContentPane :header="schoolLevel" :subheader="'Academic Year ' + term">
        <ActivitiesTimelineSection v-model="modules" />
        <StrandsSection v-model="strands" />
        <ClassRosterSection v-model="students" />
    </ContentPane>
</template>

<style>
</style>