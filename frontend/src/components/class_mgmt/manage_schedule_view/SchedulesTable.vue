<script setup>
// Presets
import DataTable from 'primevue/datatable';
import ColumnGroup from 'primevue/columngroup';
import Column from 'primevue/column';
import Row from 'primevue/row';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import { inject, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import { format } from 'date-fns';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

// Custom
import AddScheduleSection from './AddScheduleSection.vue';
import EditScheduleDialog from './EditScheduleDialog.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useClassStore } from '@/stores/class';
import { useUsersStore } from '@/stores/users';

const classLearningStrandStore = useClassLearningStrandStore()
const classStore = useClassStore()
const usersStore = useUsersStore()

const toast = useToast()
const confirm = useConfirm()

const termStatus = inject('termStatus')
const term = inject('term')
const classLevel = inject('classLevel')
const classData = ref([])
const isFetching = ref(true)
const selectedSchedules = ref([])
const metaKey = ref(true)
const editScheduleDialogState = ref(false)
const schedule = ref()
const dt = ref()
const dtDiv = ref()

provide('schedule', schedule)
provide('editScheduleDialogState', editScheduleDialogState)
provide('updateScheduleTable', updateScheduleTable)

function updateScheduleTable(classId) {
    classData.value.length = 0

    classStore.getClassSchedules(classId).then((data) => {
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

watch(() => classLevel.value, (data) => {
    try {
        updateScheduleTable(data.id)
        
        isFetching.value = false
    } catch (error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered. Please refresh this page.',
            life: 3000
        })
    }
}, { immediate: true })

async function deleteSchedules() {
    confirm.require({
        message: 'Do you really want to delete?',
        header: 'Delete Confirmation',
        accept: async () => {
            try {
                const scheduleIds = selectedSchedules.value.map(schedule => schedule.scheduleId)
                console.log(selectedSchedules.value);
                await classLearningStrandStore.deleteSchedules({scheduleIds: scheduleIds}).then((message) => {
                    deselect()
                    toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: message,
                        life: 3000
                    })

                    try {
                        updateScheduleTable(classLevel.value.id)
                    } catch(error) {
                        console.log(error);
                    }

                    try {
                        selectedSchedules.value.forEach(async (schedule) => {
                            await usersStore.addAudit(
                                `Deleted: Schedule for ${schedule.name} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                            )
                        })
                    } catch(error) {
                        console.log(error);
                    }
                })
            } catch(error) {
                console.log(error);
            }
        }
    })
}

function editSchedule(data) {
    schedule.value = {... data}
    editScheduleDialogState.value = true
}


function deselect() {
    selectedSchedules.value = []
}

function onClickOutside(event) {
    if (dt.value && !dtDiv.value.contains(event.target)) deselect()
}

onMounted(() => {
    document.addEventListener('click', onClickOutside);
})

onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside);
})
</script>

<template>
    <div class="flex h-full w-full">
        <div v-if="termStatus" class="flex flex-col mr-10 p-2 gap-4" >
            <AddScheduleSection />
        </div>
        <div class="flex flex-col h-full w-full overflow-hidden shadow-xl" ref="dtDiv">
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
                class="unselectable" ref="dt"
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
    <EditScheduleDialog />
</template>

<style>
</style>