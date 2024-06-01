<script setup>
import Divider from 'primevue/divider';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import ContentPane from '@/components/UI/ContentPane.vue'

// stores
import { useClassStore } from '@/stores/class';
import { onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import { useUtilitiesStore } from '@/stores/utilities';
import Column from 'primevue/column';
import { useUsersStore } from '@/stores/users';
import { useConfirm } from 'primevue/useconfirm';
import SchedulesTable from '@/components/utilities_view/SchedulesTable.vue';
import { format } from 'date-fns';

const classStore = useClassStore()
const utilitiesStore = useUtilitiesStore()
const usersStore = useUsersStore()
const route = useRoute()
const toast = useToast()
const confirm = useConfirm()

const isFetching = ref(false)
const classLevel = ref()
const term = ref()
const classLearningStrands = ref()
const learningStrands = ref()
const available = ref()
const loadingAvailable = ref(true)
const loadingSelected = ref(true)

const availableSelection = ref([])
const addedSelection = ref([])
const availableDt = ref()
const selectedDt = ref()
const classData = ref([])

provide('classData', classData)
provide('term', term)
provide('classLevel', classLevel)
provide('classLearningStrands', classLearningStrands)
provide('updateScheduleTable', updateScheduleTable)

function updateTables() {
    loadingSelected.value = true
    loadingAvailable.value = true

    classStore.getAllLearningStrands(route.query.id).then((data) => {
        classLearningStrands.value = data
        loadingSelected.value = false

        utilitiesStore.getLearningStrands().then(() => {
            learningStrands.value = utilitiesStore.strands

            available.value = learningStrands.value.filter(obj => !classLearningStrands.value.find(o => o.code === obj.code));

            loadingAvailable.value = false
        })
    })
}

watch(() => route.query, (query) => {
    if (route.name === 'class-configuration') {
        try {
            classStore.getClass(query.id).then((data) => {
                classLevel.value = data
                term.value = data.term
            });
            updateTables()
        } catch(error) {
            console.log(error);
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: "Unexpected error encountered!",
                life: 3000
            })
        }
    }
}, {immediate: true})

function addLearningStrand() {
    let learningStrands = []

    for (const availableStrands of availableSelection.value) {
        const temp = {
            code: availableStrands.code,
            name: availableStrands.name,
            classLevelId: classLevel.value.id
        }

        learningStrands.push(temp)
    }

    classStore.addLearningStrands(learningStrands).then((message) => {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: message,
            life: 3000
        })

        try {
            availableSelection.value.forEach(async (availableStrand) => {
                await usersStore.addAudit(
                    `Added: ${availableStrand.code} to ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                ).then(deselectAvailable())
            })
        } catch(error) {
            console.log(error);
        }

        updateTables()
    })
}

function removeLearningStrands() {
    confirm.require({
        message: 'Do you really want to delete?',
        header: 'Delete Confirmation',
        accept: async () => {
            try {
                const learningStrandIds = addedSelection.value.map(addedStrand => addedStrand.id)
                await classStore.removeStrands({learningStrandIds: learningStrandIds}).then((message) => {
                    toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: message,
                        life: 3000
                    })

                    try {
                        addedSelection.value.forEach(async (addedStrand) => {
                            await usersStore.addAudit(
                                `Deleted: $${addedStrand.code} to ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                            ).then(deselectAdded())
                        })
                    } catch(error) {
                        console.log(error);
                    }

                    updateTables()
                    updateScheduleTable()
                })
            } catch(error) {
                console.log(error);
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Unexpected error encountered. Please refresh this page.',
                    life: 3000
                })
            }
        }
    })
}

function updateScheduleTable() {
    isFetching.value = true
    classData.value.length = 0

    classStore.getClassSchedules(route.query.id).then((data) => {
        for (const learningStrand of data) {
            for (const schedule of learningStrand.class_schedules) {
                const start_time = format(new Date("01/01/0001 " + schedule.start_time), "hh:mm aaa")
                const end_time = format(new Date("01/01/0001 " + schedule.end_time), "hh:mm aaa")

                classData.value.push({
                    id: learningStrand.id,
                    classLevelId: learningStrand.classLevelId,
                    scheduleId: schedule.id,
                    code: learningStrand.code,
                    name: learningStrand.name,
                    volunteer: schedule.volunteer,
                    school_days: schedule.days.split(','),
                    start_time: start_time,
                    end_time: end_time,
                    updatedAt: schedule.updatedAt
                })
            }
        }

        isFetching.value = false
    }).catch((error) => {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
        })

        isFetching.value = false
    })
}

function deselectAvailable() {
    availableSelection.value = []
}

function deselectAdded() {
    addedSelection.value = []
}

function onClickOutside(event) {
    if (availableDt.value && !availableDt.value.$el.contains(event.target)) deselectAvailable()
    if (selectedDt.value && !selectedDt.value.$el.contains(event.target)) deselectAdded()
}

onMounted(() => {
    document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside)
})
</script>

<template>
    <ContentPane :breadcrumb="[{label: 'Management'}, {label: `S.Y ${term ? term.academic_year : ''}`}, {label: classLevel ? classLevel.school_level : ''}]">
        <div class="h-full overflow-y-auto">
            <div class="mb-20">
                <div class="flex flex-row gap-4 items-center px-4">
                    <i class="fa-solid fa-bookmark fa-2xl u-txt-active"></i>
                    <span class="font-semibold text-3xl u-txt-active">Learning Strands</span>
                </div>
                <Divider class="before:border-t before:border-surface-400"/>
                <Card class="h-full !rounded-2xl overflow-hidden"
                    :pt="{content: {class:['!py-0']}}" :ptOptions="{mergeProps: true}">
                    <template #content>
                        <DataTable
                            :value="available"
                            :loading="loadingAvailable"
                            dataKey="id"
                            v-model:selection="availableSelection"
                            selectionMode="multiple"
                            ref="availableDt"
                        >
                            <template #loading><ProgressSpinner class="flex justify-center" /></template>
                            <template #empty><div class="text-center">No available learnings strands.</div></template>
                            <template #header>
                                <div class="flex flex-row gap-4 items-center">
                                    <div class="flex flex-row gap-2 items-center">
                                        <i class="fa fa-boxes-stacked" />
                                        <span class="text-lg font-semibold u-txt-active">Available</span>
                                    </div>
                                    <Button v-if="availableSelection.length" icon="fa fa-plus" text aria-label="add-selected" style="height: 1.5rem" label="Add Selection" @click="addLearningStrand"/>
                                </div>
                            </template>
                            
                            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                            <Column header="Code" field="code" />
                            <Column header="Learning Strand Name" field="name" />
                        </DataTable>
                        <Divider class="before:border-t before:border-surface-400"/>
                        <DataTable
                            :value="classLearningStrands"
                            :loading="loadingSelected"
                            dataKey="id"
                            v-model:selection="addedSelection"
                            selectionMode="multiple"
                            ref="selectedDt"
                        >
                            <template #loading><ProgressSpinner class="flex justify-center" /></template>
                            <template #empty><div class="text-center">Nothing added.</div></template>
                            <template #header>
                                <div class="flex flex-row gap-4 items-center">
                                    <div class="flex flex-row gap-2 items-center">
                                        <i class="fa fa-boxes-stacked" />
                                        <span class="text-lg font-semibold u-txt-active">Added</span>
                                    </div>
                                    <Button v-if="addedSelection.length" icon="fa fa-minus" text aria-label="remove-selected" style="height: 1.5rem" label="Remove Selection" @click="removeLearningStrands"/>
                                </div>
                            </template>
                            
                            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                            <Column header="Code" field="code" />
                            <Column header="Learning Strand Name" field="name" />
                        </DataTable>
                    </template>
                </Card>
            </div>
            <div class="h-full">
                <div class="flex flex-row gap-4 items-center px-4">
                    <i class="fa-solid fa-calendar-week fa-2xl u-txt-active"></i>
                    <span class="font-semibold text-3xl u-txt-active">Class Schedules</span>
                </div>
                <Divider class="before:border-t before:border-surface-400"/>
                <Card class="h-full !rounded-2xl overflow-hidden"
                    :pt="{content: {class:['!py-0']}}" :ptOptions="{mergeProps: true}">

                    <template #content>
                        <SchedulesTable />
                    </template>
                </Card>
            </div>
        </div>
    </ContentPane>
</template>