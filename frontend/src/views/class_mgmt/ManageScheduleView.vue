<script setup>
// Presets
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { format } from 'date-fns';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue'
import ManageScheduleForm from '@/components/class_mgmt/manage_schedule_view/ManageScheduleForm.vue';
import SchedulesTable from '@/components/class_mgmt/manage_schedule_view/SchedulesTable.vue';

//  stores
import { useClassStore } from '@/stores/class';
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const toast = useToast()

const classStore = useClassStore()
const classLearningStrandStore = useClassLearningStrandStore()

const selectedTerm = ref()
const tableData = ref([])
const state = ref(false)

async function addSchedule(learningStrand, form) {
    try {
        await classLearningStrandStore.addSchedule(learningStrand.id, {
            volunteer: form.volunteer,
            days: form.school_days.toString(),
            start_time: format(new Date(form.start_time), "HH:mm"),
            end_time: format(new Date(form.end_time), "HH:mm"),
        })

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
            detail: "Unexpected error encountered.",
            life: 3000
        })
    }
}

function updateScheduleTable(classId) {
    if (classId) state.value = true
    else state.value = false

    tableData.value.length = 0

    classStore.getAllLearningStrands(classId).then((data) => {
        for (const learningStrand of data) {
            for (const schedule of learningStrand.class_schedules) {
                const start_time = format(new Date("01/01/0001 " + schedule.start_time), "hh:mm aaa")
                const end_time = format(new Date("01/01/0001 " + schedule.end_time), "hh:mm aaa")

                tableData.value.push({
                    id: learningStrand.id,
                    classLevelId: learningStrand.classLevelId,
                    scheduleId: schedule.id,
                    name: learningStrand.learning_strand.name,
                    volunteer: schedule.volunteer,
                    school_days: schedule.days.split(','),
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
</script>

<template>
    <ContentPane header="Class Schedules" subheader="Management">
        <ManageScheduleForm @chooseYear="resetTable" @chooseLevel="updateScheduleTable" @submit="addSchedule" :state="state" />
        <SchedulesTable v-model="tableData" :term="selectedTerm" @updateSchedule="updateScheduleTable" :state="state" />
    </ContentPane>
</template>