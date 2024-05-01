<script setup>
// Presets
import Divider from 'primevue/divider';
import StrandCard from './StrandCard.vue';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// stores
import { useClassStore } from '@/stores/class';

const route = useRoute()

const classStore = useClassStore()

const isFetching = ref(true)
const allStrands = ref([])
onMounted(async () => {
    const strands = await classStore.getAllStrands({classId: route.query.id})
    allStrands.value.push(... strands)

    isFetching.value = false
})
</script>

<template>
    <div class="mb-12">
        <div class="bg-transparent border-none flex flex-row gap-x-6 items-center px-4">
            <div class="u-txt-active font-semibold text-3xl content-center">Learning Strands</div>
            <div class="relative mr-2">
                <Button type="button" icon="fa fa-plus" label="Add" @click="{}" aria-haspopup="true" aria-controls="overlay_menu" />
            </div>
        </div>
        <Divider class="before:border-t before:border-surface-400"/>
        
        <ProgressSpinner v-if="isFetching && allStrands.length === 0" class="flex justify-center" />
        <span v-else-if="!isFetching && allStrands.length === 0" class="flex flex-col justify-center">No learning strands created.</span>
        <div v-else class="grid lg:grid-cols-3 md:grid-cols-1 gap-12 p-4">
            <StrandCard v-for="learningStrand of allStrands" :key="learningStrand.teacher" :title="learningStrand.learning_strand.name" :teacher="learningStrand.teacher"/>
        </div>
    </div>
</template>

<style>
</style>