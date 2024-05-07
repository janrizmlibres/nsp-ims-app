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

const toast = useToast()

const classStore = useClassStore()

const learningStrandData = ref()
const tableData = ref([])

async function addStrand(strandData, strandScheduleData, id, state) {
    const scheduleData = ref([])
    for (const schedule of strandScheduleData) {

        const start_time = to24hr(schedule.start_time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
        const end_time = to24hr(schedule.end_time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))

        if (state) {
            scheduleData.value.push({
                name: strandData.strand.name,
                days: schedule.school_days.toString(),
                start_time: start_time,
                end_time: end_time,
            })
        } else {
            scheduleData.value.push({
                name: strandData.strand.learning_strand.name,
                days: schedule.school_days.toString(),
                start_time: start_time,
                end_time: end_time,
            })
        }
    }

    learningStrandData.value = {
        classLevelId: strandData.classLevel.id,
        name: strandData.strand.name,
        teacher: strandData.volunteer,
        schedule: scheduleData.value
    }

    try {
        if (state) {
            await classStore.addLearningStrand(learningStrandData.value.classLevelId, learningStrandData.value)
        }

        for (var schedule of learningStrandData.value.schedule) {
            console.log(learningStrandData.value.classLevelId, schedule);
            try {
                await classStore.addSchedule(learningStrandData.value.classLevelId, schedule)
            } catch (error) {
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: "Cannot add a schedule.",
                    life: 3000
                })
            }
        }

        try {
            await classStore.getAllStrands(id)

            updateScheduleTable(classStore.strands)

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Learning Strand Added Successfully',
                life: 3000
            })
        } catch(error) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Unexpected error while fetching data.',
                life: 3000
            })
        }
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Duplicated Learning Strand',
            detail: error.response.data.message,
            life: 3000
        })
        console.log(error.response.data.message);
    }

    learningStrandData.value.length = 0
}

function updateScheduleTable(data) {
    tableData.value.length = 0

    for (const learningStrand of data) {
        for (const schedule of learningStrand.class_schedules) {
            const start_time = to12hr(schedule.start_time)
            const end_time = to12hr(schedule.end_time)

            tableData.value.push({
                id: learningStrand.id,
                name: learningStrand.learning_strand.name,
                teacher: learningStrand.teacher,
                classLevelId: learningStrand.classLevelId,
                scheduleId: schedule.id,
                school_days: schedule.days,
                start_time: start_time,
                end_time: end_time
            })
        }
    }
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
        <CreateClassForm @submit="addStrand" @chooseLevel="updateScheduleTable" />
 
        <div class="bg-white rounded-md shadow-xl flex flex-col p-7 pt-4 flex-1" >            
            <LearningStrandsTable :classData="tableData" @updateSchedule="updateScheduleTable" />
        </div>
    </ContentPane>
</template>