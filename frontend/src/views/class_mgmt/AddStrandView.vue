<script setup>
// Presets
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue'
import CreateClassForm from '@/components/class_mgmt/create_class_view/CreateClassForm.vue';
import LearningStrandsTable from '@/components/class_mgmt/create_class_view/LearningStrandsTable.vue';

//  stores
import { useClassStore } from '@/stores/class';
import { useStrandStore } from '@/stores/strand';
const toast = useToast()

const classStore = useClassStore()
const strandStore = useStrandStore()

const selectedTerm = ref()
const tableData = ref([])

async function addSchedule(learningStrand, scheduleData) {
    const schedules = ref([])
    for (const schedule of scheduleData) {
        const start_time = to24hr(schedule.start_time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
        const end_time = to24hr(schedule.end_time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))

        schedules.value.push({
            volunteer: schedule.volunteer,
            days: schedule.school_days.toString(),
            start_time: start_time,
            end_time: end_time,
        })
    }

    try {
        for (const schedule of schedules.value) {
            await strandStore.addSchedule(learningStrand.id, schedule)
        }

        updateScheduleTable(learningStrand.classLevelId)

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: "Added schedule successfully!",
            life: 3000
        })
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: "Cannot add a schedule.",
            life: 3000
        })
        console.log(error);
    }
}

function updateScheduleTable(classId) {
    tableData.value.length = 0

    classStore.getAllStrands(classId).then((data) => {
        for (const learningStrand of data) {
            for (const schedule of learningStrand.class_schedules) {
                const start_time = to12hr(schedule.start_time)
                const end_time = to12hr(schedule.end_time)

                tableData.value.push({
                    id: learningStrand.id,
                    classLevelId: learningStrand.classLevelId,
                    scheduleId: schedule.id,
                    name: learningStrand.learning_strand.name,
                    teacher: schedule.volunteer.fullname,
                    school_days: schedule.days,
                    start_time: start_time,
                    end_time: end_time
                })
            }
        }
    })
}

function resetTable(term) {
    tableData.value.length = 0
    selectedTerm.value = term
}

function to12hr(time) {
    let hms = time.split(':')
    let hours = hms[0]
    const minutes = hms[1]
    const seconds = hms[2]
    let dd = "AM"

    if (hours >= 12) {
        hours = hours - 12
        dd = "PM"
    }
    if (hours === '00') {
        hours = 12
    }

    const formattedTime = `${hours}:${minutes} ${dd}`
    return time.replace(new RegExp(`${hms[0]}:${minutes}:${seconds}`), formattedTime)
}

function to24hr(time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}
</script>

<template>
    <ContentPane header="Manage" subheader="Class Schedules">
        <CreateClassForm @submit="addSchedule" @chooseYear="resetTable" @chooseLevel="updateScheduleTable" />

        <div class="bg-white rounded-md shadow-xl flex flex-col p-7 pt-4 flex-1" >            
            <LearningStrandsTable v-model="tableData" :term="selectedTerm" @updateSchedule="updateScheduleTable" />
        </div>
    </ContentPane>
</template>