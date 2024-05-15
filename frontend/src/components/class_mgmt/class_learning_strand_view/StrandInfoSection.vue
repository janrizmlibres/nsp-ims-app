<script setup>
// Presets
import ProgressSpinner from 'primevue/progressspinner';
import Panel from 'primevue/panel';
import { ref, watch } from 'vue';
import { format } from 'date-fns';

const props = defineProps(['modelValue'])

const isFetching = ref(true)
const volunteers = ref([])

watch(() => props.modelValue, (data) => {
    console.log(data);
    isFetching.value = true
    
    for (const volunteer of data.volunteers) {
        for (const schedule of volunteer.class_schedules) {
            const start_time = format(new Date("01/01/0001 " + schedule.start_time), "hh:mm aaa")
            const end_time = format(new Date("01/01/0001 " + schedule.end_time), "hh:mm aaa")
            schedule.schedule = schedule.days + ' | ' + start_time + ' - ' + end_time 
        }
    }

    volunteers.value = data.volunteers
    console.log(volunteers.value);
    isFetching.value = false
}, {immediate: false})

const customPt = {
    header: {
        class: [
            '!rounded-none',
        ]
    },
    content: {
        class: ['!rounded-none']
    }
}
</script>

<template>
    <Panel toggleable class="shadow-md">
        <template #header>
            <div class="flex items-center gap-2">
                <i class="fa fa-circle-info fa-xl"></i>
                <span class="u-txt-active font-semibold text-xl content-center">Class Schedules Information</span>
            </div>
        </template>
        
        <ProgressSpinner v-if="isFetching" class="flex justify-center" />
        <div v-else class="flex flex-col">
            <Panel toggleable v-for="volunteer of volunteers" :key="volunteer.id" :pt-options="{mergeProps:true}" :pt="customPt">
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-chalkboard"></i>
                        <span class="u-txt-active font-semibold content-center">{{ volunteer.fullname }}</span>
                    </div>
                </template>
                <div v-for="schedule of volunteer.class_schedules" :key="schedule.id" class="flex flex-row">
                    <span class="pr-4 font-semibold">Schedule: {{ schedule.schedule }}</span>
                </div>
            </Panel>
        </div>
    </Panel>
</template>

<style>
</style>