<script setup>
// Presets
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

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
async function fetchData(query) {
    try {
        await moduleStore.getModule(query.id)
        module.value = moduleStore.module
        
        name.value = module.value.title
        strand.value = module.value.class_learning_strand.learning_strand.name
    } catch (error) {
        console.log(error)
    }
}

watch(() => route.query, fetchData, {immediate: true})
</script>

<template>
    <ContentPane :header="name" :subheader="strand">
        <ModuleInfoSection />
        <ModuleSubmissionTable />
    </ContentPane>
</template>

<style>
</style>