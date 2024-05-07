<script setup>
// Presets
import DataTable from 'primevue/datatable';
import ColumnGroup from 'primevue/columngroup';
import Column from 'primevue/column';
import Row from 'primevue/row';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import { onMounted, ref } from 'vue';

// Custom
import { useVolunteerStore } from '@/stores/volunteer';
import { useStrandStore } from '@/stores/strand';
import { useToast } from 'primevue/usetoast';
import { useClassStore } from '@/stores/class';

// stores
const volunteerStore = useVolunteerStore()
const strandStore = useStrandStore()
const classStore = useClassStore()

const toast = useToast()
const props = defineProps(['classData'])
const emit = defineEmits(['updateSchedule'])
const classData = ref(props.classData)

const volunteers = ref([])
onMounted(async () => {
    await volunteerStore.getAllVolunteers()
    volunteerStore.volunteers.forEach((data) => volunteers.value.push(data.fullname))
})

const customPt = {
    root: {
        class: ['flex flex-col h-full pt-2 justify-between overflow-auto mb-8']
    },
    column: {
        headercell: ({ context, props }) => ({
            class: [
                'font-medium',
                {
                'space-nowrap border-y bg-clip-padding': context.resizable
                // Resizable
                },
                // Color
                (props.sortable === '' || props.sortable) && context.sorted ? 'bg-white u-txt-active' : 'bg-white u-txt-active',
                {'hover:bg-surface-50': context.sorted}
            ]
        }),
            sorticon: ({ context }) => ({
                class: ['ml-2', context.sorted ? 'u-legend-txt-color dark:text-white/80' : 'u-txt-active dark:text-white/70']
        }),
            bodycell: {class: 'py-3 '}
    },
    bodyrow: ({ context, props }) => ({
        class: [
            { 'u-bg-pcolor text-surface-100 dark:bg-primary-400/30': context.selected },
            { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },
            { 'font-bold bg-surface-0 dark:bg-surface-800': props.frozenRow },
            // State
            { 'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-transparent': context.selectable },
            { 'hover:u-bg-pcolor hover:text-white': props.selectionMode && !context.selected },
            // Misc
            { 'cursor-pointer': props.selectionMode }
        ]
    })
}

const editingRows = ref([]);

const onRowEditSave = async (event) => {
    let { data, newData } = event;
    let days = ["M", "T", "W", "TH", "F", "S"]

    if ( JSON.stringify(data) !== JSON.stringify(newData) ) {
        if (!newData.school_days.split(',').every(val => days.includes(val))) {
            toast.add({
                severity: 'error',
                summary: 'Incorrect Days',
                detail: "Please input correct information.",
                life: 3000
            })

            return
        }
        
        if (newData.start_time instanceof Date) newData.start_time = to24hr(newData.start_time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
        else newData.start_time = to24hr(newData.start_time)

        if (newData.end_time instanceof Date) newData.end_time = to24hr(newData.end_time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
        else newData.end_time = to24hr(newData.end_time)

        try {
            await strandStore.updateTeacher(data.id, {teacher: newData.teacher})
            await strandStore.updateSchedule(data.scheduleId, {
                days: newData.school_days,
                start_time: newData.start_time,
                end_time: newData.end_time
            })
            await classStore.getAllStrands(data.classLevelId)
            
            emit('updateSchedule', classStore.strands)
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
                detail: error.response.data.message,
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
        <Column field="teacher">
            <template #editor="{ data, field }">
                <Dropdown v-model="data[field]" :options="volunteers" class="w-full md:w-[14rem]" />
            </template>
        </Column>
        <Column field="school_days">
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" autofocus />
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
        <Column :rowEditor="true" bodyStyle="text-align:center"></Column>
    </DataTable>
</template>

<style>
</style>