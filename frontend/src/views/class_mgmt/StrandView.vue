<script setup>
// Presets
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue';
import OptionCard from '@/components/class_mgmt/strand_view/OptionCard.vue';
import ModuleTable from '@/components/class_mgmt/strand_view/ModuleTable.vue';

// stores
import { useStrandStore } from '@/stores/strand';
import StrandInfoSection from '@/components/class_mgmt/strand_view/StrandInfoSection.vue';

const strandStore = useStrandStore()
const route = useRoute()

const name = ref()
const teacher = ref()

async function fetchStrand(query) {
    try {
        await strandStore.getStrand(query.id)
        
        name.value = strandStore.strand.learning_strand.name
        teacher.value = strandStore.strand.teacher
    } catch (error) {
        console.log(error)
    }
}

watch(() => route.query, fetchStrand, {immediate: true})
</script>

<template>
    <ContentPane :header="name">
        <StrandInfoSection />
        <div class="grid grid-cols-2 gap-12 p-2 mb-12">
            <OptionCard title="Grades " content="View Grades" />
            <OptionCard title="Attendance " content="View Attendance" />
        </div>
        <ModuleTable />
    </ContentPane>
</template>

<style>
</style>