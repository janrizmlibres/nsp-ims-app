<script setup>
// Presets
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import EditStrandInfoDialog from './EditStrandInfoDialog.vue';
import { ref, watch } from 'vue';

// stores
import { useStrandStore } from '@/stores/strand';

const strandStore = useStrandStore()

const isFetching = ref(true)
const teacher = ref()
const schedule = ref()

function formatDate(time) {
    let hms = time.split(':')
    let hours = hms[0]
    const minutes = hms[1]
    const seconds = hms[2]
    let dd = "AM"

    if (hours >= 12) {
        hours = hours - 12
        dd = "PM"
    }
    if (hours === 0) {
        hours = 12
    }

    const formattedTime = `${hours}:${minutes} ${dd}`
    return time.replace(new RegExp(`${hms[0]}:${minutes}:${seconds}`), formattedTime)
}

async function fetchStrandInfo(data) {
    isFetching.value = true
    
    console.log(data.class_schedules);
    try {
        teacher.value = data.teacher
        schedule.value = data.class_schedules.days + ' | ' + formatDate(data.class_schedules.start_time) + ' - ' + formatDate(data.class_schedules.end_time) 
    } catch(error) {
        console.log(error.response.data.message)
    }

    isFetching.value = false
}

watch(() => strandStore.strand, fetchStrandInfo, {immediate: false})
</script>

<template>
    <div class="mb-12">
        <div class="bg-transparent border-none flex flex-row gap-x-6 items-center px-4">
            <div class="u-txt-active font-semibold text-3xl content-center">Learning Strand Information</div>
            <div class="relative mr-2">
                <Button type="button" icon="fa fa-pencil" label="Edit" @click="strandStore.showHideDialog" />
                <EditStrandInfoDialog />
            </div>
        </div>
        <Divider class="before:border-t before:border-surface-400"/>
        
        <ProgressSpinner v-if="isFetching" class="flex justify-center" />
        <div v-else class="flex flex-col px-4">
            <span class="text-2xl u-txt-active flex flex-row">
                <p class="pr-4">Teacher:</p> 
                <p>{{ teacher }}</p>
            </span>
            <span class="text-2xl u-txt-active flex flex-row">
                <p class="pr-4">Class Schedule:</p>
                <p>{{ schedule }}</p>
            </span>
        </div>
        <Divider class="before:border-t before:border-surface-400"/>
    </div>
</template>

<style>
</style>