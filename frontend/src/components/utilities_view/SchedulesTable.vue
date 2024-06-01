<script setup>
// Presets
import DataTable from 'primevue/datatable';
import ColumnGroup from 'primevue/columngroup';
import Column from 'primevue/column';
import Row from 'primevue/row';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import { inject, provide, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

// Custom
import AddSchedulePanel from './AddSchedulePanel.vue';
import EditScheduleDialog from './EditScheduleDialog.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useUsersStore } from '@/stores/users';

const classLearningStrandStore = useClassLearningStrandStore()
const usersStore = useUsersStore()

const toast = useToast()
const confirm = useConfirm()

const term = inject('term')
const classLevel = inject('classLevel')
const classData = inject('classData')
const selectedSchedules = ref([])
const metaKey = ref(true)
const editScheduleDialogState = ref(false)
const schedule = ref()
const dt = ref()
const dtDiv = ref()
const op = ref()

const updateScheduleTable = inject('updateScheduleTable')

provide('op', op)
provide('schedule', schedule)
provide('editScheduleDialogState', editScheduleDialogState)

updateScheduleTable()

async function deleteSchedules() {
    confirm.require({
        message: 'Do you really want to delete?',
        header: 'Delete Confirmation',
        accept: async () => {
            try {
                const scheduleIds = selectedSchedules.value.map(schedule => schedule.scheduleId)
                await classLearningStrandStore.deleteSchedules({scheduleIds: scheduleIds}).then((message) => {
                    toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: message,
                        life: 3000
                    })

                    try {
                        selectedSchedules.value.forEach(async (schedule) => {
                            await usersStore.addAudit(
                                `Deleted: Schedule for ${schedule.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                            ).then(deselect())
                        })
                    } catch(error) {
                        console.log(error);
                    }

                    updateScheduleTable()
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

const toggle = (event) => {
    op.value.toggle(event);
}
</script>

<template>
    <div class="flex h-full w-full">
        <div class="flex flex-col h-full w-full overflow-hidden" ref="dtDiv">
            <Toolbar class="!p-2 h-16 border-x-0 rounded-none">
                <template #start>
                    <span v-if="selectedSchedules.length" class="flex flex-row gap-8 items-center mx-2">
                        <span class="flex items-center gap-2">
                            <Button icon="fa fa-circle-xmark fa-lg" text aria-label="Edit Mode" style="height: 2rem; width: 2rem;" @click="deselect"/>
                            <p>
                                {{ selectedSchedules.length + ' selected' }}
                            </p>
                        </span>
                        <span class="flex gap-1 items-center">
                            <Button icon="fa fa-trash" text aria-label="delete-selected" style="height: 2rem; width: 2rem;" @click="deleteSchedules"/>
                        </span>
                    </span>
                </template>
                <template #end>
                    <Button text icon="fa fa-plus" label="Add Schedule" aria-label="add-schedule" style="height: 2rem;" class="!rounded-full mr-2 gap-2" @click="toggle"/>
                    <AddSchedulePanel />
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
                        <Button icon="fa fa-pencil" text @click="editSchedule(slotProps.data)" :class="[{'u-txt-pcolor hover:u-bg-pcolor hover:text-white': !selectedSchedules.length}, {'text-white hover:u-bg-scolor': selectedSchedules.length}]" />
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