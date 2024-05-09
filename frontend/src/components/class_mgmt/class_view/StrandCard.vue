<script setup>
import Card from 'primevue/card';
import { useRouter } from 'vue-router';
import ProgressBar from 'primevue/progressbar';
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

const customPt = {
    root: {
        class: ['rounded-lg', 'shadow-md', 'bg-surface-0', 'u-txt-active', 
            'hover:shadow-xl hover:cursor-pointer transition-all duration-500 hover:transform hover:scale-105' 
        ]
    },
    body: {
        class: '!p-0 flex flex-col h-full'
    },
    caption: {
        class: 'px-8 pt-8 flex-[2]'
    },
    title: {
        class: 'text-lg font-bold'
    },
    content: {
        class: 'px-8 pb-8 flex-[2]'
    },
    footer: {
        class: '!pt-0 u-bg-pcolor rounded-b-lg overflow-hidden'
    }
}
</script>

<template>
    <Card
    @click="showStrand"
    :pt-options="{mergeProps:true}"
    :pt="customPt">
        <template #title> {{ data.learning_strand.name }} </template>
        <template #subtitle><ProgressBar :value="50"></ProgressBar></template>
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
    </Card>
</template>