<script setup>
// Presets
import DataTable from 'primevue/datatable';
import ColumnGroup from 'primevue/columngroup';
import Column from 'primevue/column';
import Row from 'primevue/row';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import { computed, onMounted, ref, watch } from 'vue';
import { format } from 'date-fns';

// Custom
import { useVolunteerStore } from '@/stores/volunteer';
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useToast } from 'primevue/usetoast';

// stores
const volunteerStore = useVolunteerStore()
const classLearningStrandStore = useClassLearningStrandStore()

const props = defineProps(['classLevel', 'termStatus'])
const toast = useToast()

const classData = ref([])
function updateScheduleTable(classId) {
    classData.value.length = 0

    classStore.getAllLearningStrands(classId).then((data) => {
        for (const learningStrand of data) {
            for (const schedule of learningStrand.class_schedules) {
                const start_time = format(new Date("01/01/0001 " + schedule.start_time), "hh:mm aaa")
                const end_time = format(new Date("01/01/0001 " + schedule.end_time), "hh:mm aaa")

                classData.value.push({
                    id: learningStrand.id,
                    classLevelId: learningStrand.classLevelId,
                    scheduleId: schedule.id,
                    name: learningStrand.learning_strand.name,
                    volunteer: schedule.volunteer,
                    school_days: schedule.days.split(','),
                    start_time: start_time,
                    end_time: end_time,
                    updatedAt: schedule.updatedAt
                })
            }
        }
    })
}

watch(() => props.classLevel, (data) => {
    try {
        updateScheduleTable(data.id)
        
        isFetching.value = false
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered. Please refresh this page.',
            life: 3000
        })
    }
}, { immediate: true })

    if ( JSON.stringify(data) !== JSON.stringify(newData) ) {
        if (newData.start_time instanceof Date) newData.start_time = format(newData.start_time, "HH:mm")
        else newData.start_time = to24hr(newData.start_time)

        if (newData.end_time instanceof Date) newData.end_time = format(newData.end_time, "HH:mm")
        else newData.end_time = to24hr(newData.end_time)
        
        try {
            await classLearningStrandStore.updateSchedule(data.scheduleId, {
                volunteerId: newData.volunteer.id,
                days: newData.school_days.length === 0 ? data.school_days.toString() : newData.school_days.toString(),
                start_time: newData.start_time,
                end_time: newData.end_time
            })
            
            emit('updateSchedule', newData.classLevelId)
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: "Updated learning strand schedule successfully!",
                life: 3000
            })
        } catch(error) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: error,
                life: 3000
            })
        }
    }
async function deleteSchedules() {
    confirm.require({
        message: 'Do you really want to delete?',
        header: 'Delete Confirmation',
        accept: async () => {
            try {
                const scheduleIds = selectedSchedules.value.map(schedule => schedule.scheduleId)
                await classLearningStrandStore.deleteSchedules({scheduleIds: scheduleIds})
                deselect()
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Schedule(s) deleted successfully!',
                    life: 3000
                })
            } catch(error) {
                console.log(error);
            }

            try {
                updateScheduleTable(props.classLevel.id)
            } catch(error) {
                console.log(error);
            }
        }
    })
}
function deselect() {
    selectedSchedules.value = []
}
</script>

<template>
    <div class="flex h-full w-full">
        <div class="flex flex-col w-[17%] mr-10 p-2 gap-4" >
            <AddScheduleSection :id="classLevelId" :learningStrands="learningStrands" @onUpdate="addSchedule" />
        </div>
        <div class="w-[83%] flex flex-col h-full overflow-hidden shadow-xl">
            <Toolbar class="!p-2 h-16">
                <template #start>
                    <span v-if="selectedSchedules.length" class="flex flex-row gap-8 items-center mx-2">
                        <span class="flex items-center gap-2">
                            <Button icon="fa fa-circle-xmark fa-lg" text aria-label="Edit Mode" style="height: 2rem; width: 2rem;" @click="deselect"/>
                            <p>
                                {{ selectedSchedules.length + ' selected' }}
                            </p>
                        </span>
                        <span class="flex gap-1 items-center">
                            <Button icon="fa fa-download" text aria-label="Download Selected" style="height: 2rem; width: 2rem;" @click="{}"/>
                            <Button icon="fa fa-trash" text aria-label="delete-selected" style="height: 2rem; width: 2rem;" @click="deleteSchedules"/>
                        </span>
                    </span>
                </template>
            </Toolbar>
            <DataTable :value="classData" dataKey="scheduleId"
                v-model:selection="selectedSchedules" scrollable style=" overflow: auto;"
                selectionMode="multiple" :metaKeySelection="metaKey"
                class="unselectable"
    >
        <template #empty> <div class="text-center">Nothing added.</div> </template>

        <ColumnGroup type="header">
            <Row>
                        <Column header="" :rowspan="2" />
                <Column header="Learning Strand" :rowspan="2" />
                <Column header="Teacher" :rowspan="2" />
                <Column header="Schedule" :colspan="4" />
            </Row>
            <Row>
                        <Column header="Days" />
                        <Column header="Start Time" />
                        <Column header="End Time" />
                        <Column header="Updated At" />
            </Row>
        </ColumnGroup>

                <Column :exportable="false" style="width:2rem">
                    <template #body="slotProps">
                        <Button icon="fa fa-pencil" text @click="editSchedule(slotProps.data)" />
                    </template>
                </Column>
        <Column field="name" />
        <Column field="volunteer">
            <template #body="slotProps">
                {{ slotProps.data.volunteer.fullname }}
            </template>
        </Column>
        <Column field="school_days">
            <template #body="slotProps">
                {{ slotProps.data.school_days.toString() }}
            </template>
        </Column>
                <Column field="start_time" />
                <Column field="end_time" />
                <Column field="updatedAt" header="Updated At" sortable style="width: 10rem;">
                    <template #body="slotProps">
                        {{ new Date(slotProps.data.updatedAt).toLocaleString() }}
            </template>
        </Column>
    </DataTable>
        </div>
    </div>
</template>

<style>
</style>