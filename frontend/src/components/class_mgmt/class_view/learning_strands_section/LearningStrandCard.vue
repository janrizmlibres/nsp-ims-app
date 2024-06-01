<script setup>
import { useRoute, useRouter } from 'vue-router';
import MeterGroup from 'primevue/metergroup';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import { computed, ref } from 'vue';
import { format } from 'date-fns';

const router = useRouter()
const route = useRoute()
const props = defineProps(['data'])

const data = computed(() => props.data)
const finishedModules = computed(() => {
    return data.value.modules.filter(module => module.status === true)
})
const op = ref();

const toggle = (event) => {
    op.value.toggle(event);
}

function showStrand() {
    router.push({ name: 'class', query: { ...route.query, strand: data.value.id } })
}
</script>

<template>
    <div class="flex flex-row justify-between bg-white u-border-bottom hover:u-bg-pcolor hover:text-white u-txt-active shadow-md rounded-2xl p-6 transition-all duration-300">
        <div class="flex flex-col font-semibold content-center flex-1 mr-8 hover:cursor-pointer hover:underline">
            <p class="u-txt-inactive">{{ data.code }}</p>
            <p class="text-lg"
            @click="showStrand">
                {{ data.name }}
            </p>
        </div>
        <MeterGroup :value="[{label:'Complete', value: finishedModules.length}]" :max="data ? data.modules.length : 0" class="flex-[2] self-center" />
        <Button icon="fa fa-circle-info fa-xl" text rounded aria-label="Filter" class="ml-4" @click="toggle" />
        <OverlayPanel ref="op">
            <div class="flex flex-col">
                <span class="text-lg font-semibold u-txt-active mb-4">Class Schedules</span>
                <div v-if="!data.class_schedules.length"><span>No Schedules Yet.</span></div>
                <div v-else v-for="class_schedule of data.class_schedules" :key="class_schedule.id" class="flex flex-col mb-2">
                    <span> {{ class_schedule.volunteer.fullname }} </span>
                    <span> {{ class_schedule.days }} </span>
                    <span> {{ format(new Date("01/01/0001 " + class_schedule.start_time), "hh:mm aaa") }} </span>
                    <span> {{ format(new Date("01/01/0001 " + class_schedule.end_time), "hh:mm aaa") }} </span>
                </div>
            </div>
        </OverlayPanel>
    </div>
    <!-- <Card
    @click="showStrand"
    :pt-options="{mergeProps:true}"
    :pt="customPt">
        <template #title> {{ data.learning_strand.name }} </template>
        <template #subtitle></template>
        <template #content>
            <h3> {{ data.teacher }} </h3>
            <div class="flex flex-col justify-center">
                <p v-for="schedule of schedules" :key="schedule.data" class="m-0 max-h">
                    {{ schedule.data }}
                </p>
            </div>
            
        </template>
        <template #footer>
            <div class="u-bg-pcolor flex justify-center py-2 text-white font-semibold">View</div>
        </template>
    </Card> -->
</template>