<script setup>
// Presets
import ProgressSpinner from 'primevue/progressspinner';
import Panel from 'primevue/panel';
import { ref, watch } from 'vue';

// stores
import { useStrandStore } from '@/stores/strand';

const strandStore = useStrandStore()

const isFetching = ref(true)
const teacher = ref()

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

const scheds = ref([])

async function fetchStrandInfo(data) {
    isFetching.value = true
    
    try {
        for (const schedule of data.class_schedules) {
            const format = schedule.days + ' | ' + formatDate(schedule.start_time) + ' - ' + formatDate(schedule.end_time) 
            scheds.value.push({data:format})
        }

        teacher.value = data.teacher
    } catch(error) {
        console.log(error.response.data.message)
    }

    isFetching.value = false
}

watch(() => strandStore.strand, fetchStrandInfo, {immediate: false})
</script>

<template>
    <Panel toggleable class="shadow-md">
        <template #header>
            <div class="flex items-center gap-2">
                <i class="fa fa-circle-info fa-xl"></i>
                <span class="u-txt-active font-semibold text-xl content-center">Learning Strand Information</span>
            </div>
        </template>
        <ProgressSpinner v-if="isFetching" class="flex justify-center" />
        <div v-else class="flex flex-col px-4">
            <span class="text-md u-txt-active flex flex-row">
                <p class="pr-4 font-semibold">Teacher:</p> 
                <p>{{ teacher }}</p>
            </span>
            <span class="text-md u-txt-active flex flex-row">
                <p class="pr-4 font-semibold">Class Schedule:</p>
                <div>
                    <p v-for="sched of scheds" :key="sched.data" class="m-0 max-h">
                        {{ sched.data }}
                    </p>
                </div>
            </span>
        </div>
    </Panel>
</template>

<style>
</style>