<script setup>
// Presets
import Panel from 'primevue/panel';

const props = defineProps(['modelValue'])

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
    <Panel toggleable class="shadow-md rounded-2xl"
        :pt="{header: {class:['!rounded-t-2xl']}, toggleableContent: {class: ['!rounded-b-2xl']}, content: {class: ['!rounded-b-2xl']}}"
        :ptOptions="{mergeProps: true}"
    >
        <template #header>
            <div class="flex items-center gap-2">
                <i class="fa fa-circle-info fa-xl"></i>
                <span class="u-txt-active font-semibold text-xl content-center">Class Schedules Information</span>
            </div>
        </template>

        <div v-if="props.modelValue" class="text-center">No Schedules Yet.</div>
        <div v-else class="flex flex-col p-2">
            <Panel toggleable v-for="class_schedule of props.modelValue" :key="class_schedule.id" :pt-options="{mergeProps:true}" :pt="customPt">
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-chalkboard"></i>
                        <span class="u-txt-active font-semibold content-center">{{ class_schedule.volunteer.fullname }}</span>
                    </div>
                </template>
                <span> {{ class_schedule.volunteer.fullname }} </span>
                <span> {{ class_schedule.school_days }} </span>
                <span> {{ format(new Date("01/01/0001 " + class_schedule.start_time), "hh:mm aaa") }} </span>
                <span> {{ format(new Date("01/01/0001 " + class_schedule.end_time), "hh:mm aaa") }} </span>
            </Panel>
        </div>
    </Panel>
</template>

<style>
</style>