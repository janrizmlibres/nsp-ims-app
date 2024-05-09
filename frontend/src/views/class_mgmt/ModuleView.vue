<script setup>
// Presets
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import Divider from 'primevue/divider';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue';
import ModuleInfoSection from '@/components/class_mgmt/module_view/ModuleInfoSection.vue';

// stores
import { useModuleStore } from '@/stores/module';
import ModuleSubmissionTable from '@/components/class_mgmt/module_view/ModuleSubmissionTable.vue';

const route = useRoute()

const moduleStore = useModuleStore()
const module = ref()
const name = ref()
const strand = ref()

function updateModuleSubmissionTable(data) {
    module.value = data
}

watch(() => route.query, (query) => {
    try {
        moduleStore.getModule(query.id).then((data) => {
            updateModuleSubmissionTable(data)
            name.value = data.title
            strand.value = data.class_learning_strand.learning_strand.name
        })
    } catch (error) {
        console.log(error)
    }
}, {immediate: true})
</script>

<template>
    <ContentPane :header="name" :subheader="strand">
        <ModuleInfoSection v-model="module" />
        <Divider class="before:border-t before:border-surface-400 my-10"/>
        <ModuleSubmissionTable v-model="module" @onUpdate="updateModuleSubmissionTable" />
    </ContentPane>
</template>

<style>
</style>