<script setup>
// Presets
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
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
const module = ref()
const name = ref()
const strand = ref()

function updateModuleSubmissionTable(data) {
    module.value = data
}

watch(() => route.query, (query) => {
    try {
        classLearningStrandStore.getModule(query.id).then((data) => {
            updateModuleSubmissionTable(data)
            name.value = data.title
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
    <ContentPane :header="name" :subheader="strand">
        <ModuleInfoSection v-model="module" />
        <Divider class="before:border-t before:border-surface-400 my-10"/>
        <ModuleTab v-model="module" @onUpdate="updateModuleSubmissionTable" />
    </ContentPane>
</template>

<style>
</style>