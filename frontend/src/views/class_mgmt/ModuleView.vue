<script setup>
// Presets
import { useRoute } from 'vue-router';
import { provide, ref, watch } from 'vue';
import Divider from 'primevue/divider';
import { useToast } from 'primevue/usetoast';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue';
import ModuleInfoSection from '@/components/class_mgmt/module_view/ModuleInfoSection.vue';
import ModuleTab from '@/components/class_mgmt/module_view/ModuleTab.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const route = useRoute()
const toast = useToast()

const classLearningStrandStore = useClassLearningStrandStore()

const active = ref()
const inactive = ref()
const drop = ref()
const term = ref()
const classLevel = ref()
const learningStrand = ref()
const module = ref()
const moduleTitle = ref()
const strandName = ref()
const isFetching = ref(false)

provide('active', active)
provide('inactive', inactive)
provide('drop', drop)
provide('isFetching', isFetching)
provide('term', term)
provide('classLevel', classLevel)
provide('learningStrand', learningStrand)
provide('module', module)
provide('updateModuleSubmissionTable', updateModuleSubmissionTable)

function updateModuleSubmissionTable() {
    isFetching.value = true

    classLearningStrandStore.getModule(route.query.id).then((data) => {
        const actTemp = []
        const inactTemp = []
        const dropTemp = []

        for (const moduleSubmission of data.module_submissions) {
            const enrollment = moduleSubmission.enrollment

            if (enrollment.status == 'Active') actTemp.push(moduleSubmission)
            else if (enrollment.status == 'Inactive') inactTemp.push(moduleSubmission)
            else dropTemp.push(moduleSubmission)
        }

        active.value = actTemp
        inactive.value = inactTemp
        drop.value = dropTemp

        console.log(data);
        term.value = data.class_learning_strand.class_level.term
        classLevel.value = data.class_learning_strand.class_level
        learningStrand.value = data.class_learning_strand.learning_strand
        module.value = data
        moduleTitle.value = data.title
        strandName.value = data.class_learning_strand.learning_strand.name
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
    if (route.name === 'module-info') {
        updateModuleSubmissionTable()
    }
}, {immediate: true})
</script>

<template>
    <ContentPane :breadcrumb="[{label: 'Management'}, {label: 'Class'}, {label: strandName}, {label: moduleTitle}]">
        <ModuleInfoSection />
        <Divider class="before:border-t before:border-surface-400 my-10"/>
        <ModuleTab />
    </ContentPane>
</template>

<style>
</style>