<script setup>
// Presets
import Divider from 'primevue/divider';
import TimelineCard from './TimelineCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// stores
import { useClassStore } from '@/stores/class';

const route = useRoute()

const classStore = useClassStore()

const isFetching = ref(true)
const allModules = ref([])
async function fetchModules(id) {
    const modules = await classStore.getAllModules({classId: id})
    allModules.value.push(... modules)

    isFetching.value = false
}

watch(() => route.query.id, fetchModules, {immediate: true})
</script>

<template>
    <div class="pt-[0.1rem] u-bg-pcolor rounded-md mb-12">
        <div class="bg-white shadow-xl p-4 rounded-md">
            <span class="font-semibold text-xl u-txt-active">Timeline</span>
            <Divider />

            <ProgressSpinner v-if="isFetching" class="flex justify-center" />
            <div v-else class="flex flex-col gap-2 px-8 pb-4 overflow-auto justify-center">
                <span v-if="allModules.length === 0" class="text-center">No upcoming activities due</span>
                <TimelineCard v-else v-for="module of allModules" :key="module.id" />
            </div>
        </div>
    </div>
</template>