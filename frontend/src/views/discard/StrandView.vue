<script setup>
// Presets
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Divider from 'primevue/divider';
import { useToast } from 'primevue/usetoast';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue';
import ModuleTable from '@/components/class_mgmt/strand_view/ModuleTable.vue';
import StrandInfoSection from '@/components/class_mgmt/strand_view/StrandInfoSection.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const classLearningStrandStore = useClassLearningStrandStore()
const route = useRoute()
const toast = useToast()

const name = ref()
const strand = ref()

watch(() => route.query, (query) => {
    try {
        classLearningStrandStore.getStrand(query.id).then((data) => {
            strand.value = data
            name.value = data.learning_strand.name
        })
    } catch(error) {
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
    <ContentPane :header="name">
        <StrandInfoSection v-model="strand" />
        <Divider class="before:border-t before:border-surface-400 my-10"/>
        <ModuleTable />
    </ContentPane>
</template>

<style>
</style>