<script setup>
// Presets
import Divider from 'primevue/divider';
import StrandCard from './StrandCard.vue';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router'

// stores
import { useClassStore } from '@/stores/class';

const route = useRoute()

const classStore = useClassStore()

const isFetching = ref(true)
const allStrands = ref([])

async function fetchStrands(query) {
    console.log(query);
    route.value = useRoute()
    isFetching.value = true
    
    try {
        await classStore.getAllStrands(query.id)
        allStrands.value = classStore.strands
    } catch(error) {
        console.log(error.response.data.message)
    }

    isFetching.value = false
}

watch(() => route.query, fetchStrands, {immediate: true})
</script>

<template>
    <div class="mb-12">
        <div class="bg-transparent border-none flex flex-row gap-x-6 items-center px-4">
            <div class="u-txt-active font-semibold text-3xl content-center">Learning Strands</div>
            <div class="relative mr-2">
                <router-link :to="{ name: 'class', query: { id: route.query.id, action: 'addLearningStrand' } }">
                    <Button type="button" icon="fa fa-plus" label="Add" />
                </router-link>
            </div>
        </div>
        <Divider class="before:border-t before:border-surface-400"/>
        
        <ProgressSpinner v-if="isFetching && allStrands.length === 0" class="flex justify-center" />
        <span v-else-if="!isFetching && allStrands.length === 0" class="flex flex-col text-center">No learning strands created.</span>
        <div v-else class="grid lg:grid-cols-3 md:grid-cols-1 gap-12 p-4">
            <StrandCard v-for="learningStrand of allStrands" :key="learningStrand.teacher" :title="learningStrand.learning_strand.name" :teacher="learningStrand.teacher" :schedule="learningStrand.class_schedules" />
        </div>
    </div>
</template>

<style>
</style>