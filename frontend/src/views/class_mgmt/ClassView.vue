<script setup>
// Presets
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';

// Custom Components
import ContentPane from '@/components/UI/ContentPane.vue';
import LearningStrandsSection from '@/components/class_mgmt/class_view/learning_strands_section/LearningStrandsSection.vue';
import ClassRosterSection from '@/components/class_mgmt/class_view/class_roster_section/ClassRosterSection.vue';

// stores
import { useClassStore } from '@/stores/class';

const route = useRoute()
const toast = useToast()
const classStore = useClassStore()

const schoolLevel = ref()
const term = ref()
const strands = ref([])
const students = ref([])

watch(() => route.query, (query) => {
    try {
        classStore.getClass(query.id).then((data) => {
            schoolLevel.value = data.school_level
            term.value = data.term
        });
        classStore.getAllLearningStrands(query.id).then((data) => 
            strands.value = data
        )
        classStore.getAllStudents(query.id).then((data) => 
            students.value = data
        )
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: "Unexpected error encountered! Please refresh this page.",
            life: 3000
        })
    }
}, {immediate: true})
</script>

<template>
    <ContentPane :breadcrumb="[{label: `S.Y ${term ? term.academic_year : ''}`}, {label: schoolLevel}]">
        <div class="h-full overflow-y-auto">
            <LearningStrandsSection v-model="strands" />
            <ClassRosterSection v-model="students" />
        </div>
    </ContentPane>
</template>

<style>
</style>