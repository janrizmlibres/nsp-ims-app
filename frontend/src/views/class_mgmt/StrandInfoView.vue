<script setup>
// Presets
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Divider from 'primevue/divider';

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
const strand = ref()

watch(() => route.query, (query) => {
    strandStore.getStrand(query.id).then((data) => {
        strand.value = data
        name.value = data.learning_strand.name
    })
}, {immediate: true})
</script>

<template>
    <ContentPane :header="name">
        <StrandInfoSection v-model="strand" />
        <Divider class="before:border-t before:border-surface-400 my-10"/>
        <div class="mb-6">
            <OptionCard title="Attendance " content="View Attendance" action="viewAttendance" />
        </div>
        <ModuleTable />
    </ContentPane>
</template>

<style>
</style>