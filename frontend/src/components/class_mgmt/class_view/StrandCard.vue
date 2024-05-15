<script setup>
import { useRouter } from 'vue-router';
import MeterGroup from 'primevue/metergroup';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import { ref } from 'vue';

const router = useRouter()
const props = defineProps(['data'])

const data = ref(props.data)

function showStrand() {
    router.push({ name: 'strand', query: { id: data.value.id} })
}

const class_schedules = data.value.class_schedules
const schedules = ref([])

for (const schedule of class_schedules) {
    const format = schedule.days + ' | ' + formatDate(schedule.start_time) + ' - ' + formatDate(schedule.end_time) 
    schedules.value.push({data:format})
}

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
const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}
</script>

<template>
    <div class="flex flex-row justify-between bg-white u-txt-active shadow-md rounded-lg p-4">
        <div class="flex flex-col font-semibold content-center flex-1 mr-8 hover:cursor-pointer hover:underline hover:u-txt-pcolor">
            <p class="u-txt-inactive">{{ data.learning_strand.code }}</p>
            <p class="text-lg"
            @click="showStrand">
                {{ data.learning_strand.name }}
            </p>
        </div>
        <MeterGroup :value="[{label:'Complete', value: null}]" class="flex-[2]" />
        <Button icon="fa fa-circle-info" text rounded aria-label="Filter" class="ml-4" @click="toggle" />
        <OverlayPanel ref="op">
            <div class="flex flex-col w-[16rem]">
                Test
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