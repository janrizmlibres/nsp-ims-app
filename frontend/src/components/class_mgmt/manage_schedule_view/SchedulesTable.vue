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
};

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
    <DataTable 
        :value="classData" dataKey="scheduleId"
        v-model:editingRows="editingRows" editMode="row" @row-edit-save="onRowEditSave" 
        :ptOptions="{mergeProps:true}"
        :pt="customPt"
    >
        <template #empty> <div class="text-center">Nothing added.</div> </template>

        <ColumnGroup type="header">
            <Row>
                <Column header="Learning Strand" :rowspan="2" />
                <Column header="Teacher" :rowspan="2" />
                <Column header="Schedule" :colspan="4" />
            </Row>
            <Row>
                <Column header="Days" field="school_days"/>
                <Column header="Start Time" field="start_time"/>
                <Column header="End Time" field="end_time"/>
                <Column header="" />
            </Row>
        </ColumnGroup>
        <Column field="name" />
        <Column field="volunteer">
            <template #body="slotProps">
                {{ slotProps.data.volunteer.fullname }}
            </template>
            <template #editor="{ data, field }">
                <Dropdown v-model="data[field]" :options="volunteers" optionLabel="fullname" placeholder="data[field].fullname" class="w-full md:w-[14rem]" />
            </template>
        </Column>
        <Column field="school_days">
            <template #body="slotProps">
                {{ slotProps.data.school_days.toString() }}
            </template>
            <template #editor="{ data, field }">
                <MultiSelect v-model="data[field]" :options="days" placeholder="Select Days" :maxSelectedLabels="2" class="w-full xl:w-[14rem]" />
            </template>
        </Column>
        <Column field="start_time">
            <template #editor="{ data, field }">
                <Calendar id="calendar-timeonly" v-model="data[field]" timeOnly hourFormat="12" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" />
            </template>
        </Column>
        <Column field="end_time">
            <template #editor="{ data, field }">
                <Calendar id="calendar-timeonly" v-model="data[field]" timeOnly hourFormat="12" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" />
            </template>
        </Column>
        <Column :rowEditor="props.termStatus" bodyStyle="text-align:center"></Column>
    </DataTable>
</template>

<style>
</style>