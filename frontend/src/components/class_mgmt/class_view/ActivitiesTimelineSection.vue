<script setup>
// Presets
import Divider from 'primevue/divider';
import TimelineCard from './TimelineCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// stores
import { useClassStore } from '@/stores/class';

const route = useRoute()

const classStore = useClassStore()

const isFetching = ref(true)
const allModules = ref([])
onMounted(async () => {
    const modules = await classStore.getAllModules({classId: route.query.id})
    allModules.value.push(... modules)

    isFetching.value = false
})
</script>

<template>
    <div class="pt-[0.1rem] u-bg-pcolor rounded-md mb-12">
        <div class="bg-white shadow-xl p-4 rounded-md">
            <span class="font-semibold text-xl u-txt-active">Timeline</span>
            <Divider />
            <div class="flex flex-col gap-2 px-8 pb-4 overflow-auto">
                <ProgressSpinner v-if="isFetching && allModules.length === 0" />
                <span v-else-if="!isFetching && allModules.length === 0" class="text-center">No upcoming activities due</span>
                <TimelineCard v-else v-for="module of allModules" :key="module.id" />
            </div>
        </div>
    </div>
</template>