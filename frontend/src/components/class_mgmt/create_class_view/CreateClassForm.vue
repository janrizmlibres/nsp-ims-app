<script setup>
// Presets
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useToast } from 'primevue/usetoast';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

// stores
import { useClassStore } from '@/stores/class';
import { useUtilitiesStore } from '@/stores/utilities';
import { useVolunteerStore } from '@/stores/volunteer';

const emit = defineEmits(['addForm'])
const route = useRoute()
const toast = useToast()

const term = ref()
const schoolLevel = ref()

onMounted(async () => {
    try {
        await classStore.getClass(route.query.id)
        const classLevel = ref(classStore.classLevel)
        schoolLevel.value = classLevel.value.school_level
        term.value = classLevel.value.term.academic_year
    } catch (error) {
        console.log(error.response.data.message)
    }
})

const classStore = useClassStore()
const utilitiesStore = useUtilitiesStore()
const volunteerStore = useVolunteerStore()

const strandData = ref(null)
const strandScheduleData = ref([])

const strandTempData = ref({
    strand: null,
    volunteer: null
})

const strandScheduleTempData = ref({
    school_days: null,
    start_time: null,
    end_time: null
})

const strandDataTable = ref([])
const strandSchedDataTable = ref([])

const learningStrands = ref();
const volunteers = ref()

const days = ref([
    {name: "M", key: "1"},
    {name: "T", key: "2"},
    {name: "W", key: "3"},
    {name: "TH", key: "4"},
    {name: "F", key: "5"},
    {name: "S", key: "6"},
]);

function resetForm() {
    strandData.value = null
    strandScheduleData.value.length = 0

    strandTempData.value = {
        strand: null,
        volunteer: null
    }

    strandScheduleTempData.value = {
        school_days: null,
        start_time: null,
        end_time: null
    }

    strandDataTable.value.length = 0
    strandSchedDataTable.value.length = 0
}

function addForm() {
    if (strandData.value === null || strandScheduleData.value.length === 0) {
        toast.add({
            severity: 'error',
            summary: 'Incomplete Form',
            detail: "Please fill all necessary information",
            life: 3000
        })

        return
    }

    emit('addForm', strandData.value, strandScheduleData.value)
    resetForm()
    active.value = 0
}

function tempAddStrand(data, func) {
    if (Object.values(data).some(o => o === null)) {
        toast.add({
            severity: 'error',
            summary: 'Incomplete Form',
            detail: "Please fill all necessary information",
            life: 3000
        })

        return
    }

    strandData.value = data

    strandDataTable.value.push({
        name: data.strand.name,
        teacher: data.volunteer.fullname
    })
    func()
}

function tempAddSched(data) {
    if (Object.values(data).some(o => o === null)) {
        toast.add({
            severity: 'error',
            summary: 'Incomplete Form',
            detail: "Please fill all necessary information",
            life: 3000
        })

        return
    }

    strandScheduleData.value.push(data)

    const sched = {
        school_days: data.school_days.toString(),
        start_time: data.start_time.toLocaleTimeString(),
        end_time: data.end_time.toLocaleTimeString()
    }
    strandSchedDataTable.value.push(sched)
    
    strandScheduleTempData.value = {
        school_days: null,
        start_time: null,
        end_time: null
    }
}

function resetTemp(func) {
    strandData.value = null
    strandScheduleData.value.length = 0
    strandDataTable.value.length = 0
    strandSchedDataTable.value.length = 0
    func()
}

onMounted(async () => {
    await utilitiesStore.getLearningStrands()
    learningStrands.value = utilitiesStore.learningStrands

    await volunteerStore.getAllVolunteers()
    volunteers.value = volunteerStore.volunteers
})

const active = ref(0)

</script>

<template>
    <div class="flex gap-4 bg-white rounded-md shadow-xl p-2 px-4 mb-2">
        <div>
            <span class="mr-3 u-txt-active">School Year</span>
            <span class="relative">
                <InputText disabled :placeholder="term" />
            </span>
        </div>
        <div>
            <span class="mr-3 u-txt-active">School Level</span>
            <span class="relative">
                <InputText disabled :placeholder="schoolLevel" />
            </span>
        </div>
    </div>

    <div class="flex flex-row gap-4 h-[30rem]">
        <div class="flex-1 flex flex-col bg-white rounded-md shadow-xl p-8 pb-4 mb-8">
            <Stepper v-model:activeStep="active" linear>
                <StepperPanel>
                    <template #header="{ index, clickCallback }">
                        <button class="bg-transparent border-none inline-flex flex-column gap-2" @click="clickCallback">
                            <span :class="['border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center', { 'bg-primary border-primary': index <= active, 'surface-border': index > active }]">
                                <i class="pi pi-book" />
                            </span>
                        </button>
                    </template>
                    <template #content="{ nextCallback }">
                        <div class="flex flex-col gap-2">
                            <div class="text-center mt-3 mb-3 text-xl font-semibold u-txt-active">Add a Learning Strand</div>
                            <div class="flex flex-col justify-center mx-auto">
                                <div class="flex flex-col mb-4">
                                    <span class="mr-3 u-txt-active">Learning Strand</span>
                                    <span class="relative">
                                        <Dropdown v-model="strandTempData.strand" :options="learningStrands" optionLabel="name" placeholder="Select a Strand" class="w-full md:w-[14rem]" />
                                    </span>
                                </div>

                                <div class="flex flex-col">
                                    <span class="mr-3 u-txt-active">Teacher</span>
                                    <span class="relative">
                                        <Dropdown v-model="strandTempData.volunteer" :options="volunteers" optionLabel="fullname" placeholder="Select a Teacher" class="w-full md:w-[14rem]" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex pt-8 justify-end">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="tempAddStrand(strandTempData, nextCallback)" />
                        </div>
                    </template>
                </StepperPanel>
                <StepperPanel>
                    <template #header="{ index, clickCallback }">
                        <button class="bg-transparent border-none inline-flex flex-column gap-2" @click="clickCallback">
                            <span :class="['border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center', { 'bg-primary border-primary': index <= active, 'surface-border': index > active }]">
                                <i class="pi pi-id-card" />
                            </span>
                        </button>
                    </template>
                    <template #content="{ prevCallback }">
                        <div class="flex flex-col justify-center">
                            <div class="grid grid-flow-col mt-3 mb-8">
                                <span class="mr-3 u-txt-active">School Days</span>
                                <div class="grid grid-cols-3 card gap-3">
                                    <div v-for="day of days" :key="day.key" class="flex items-center">
                                        <Checkbox v-model="strandScheduleTempData.school_days" :inputId="day.key" name="day" :value="day.name" class="mr-2"/>
                                        <label :for="day.key">{{ day.name }}</label>
                                    </div>
                                </div>
                            </div>

                            <div class="flex lg:flex-row md:flex-col gap-14 mb-4">
                                <div>
                                    <span class="mr-3 u-txt-active">Start Time</span>
                                    <div>
                                        <Calendar id="calendar-timeonly" v-model="strandScheduleTempData.start_time" timeOnly hourFormat="12" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" />
                                    </div>
                                </div>
                                <div>
                                    <span class="mr-3 u-txt-active">End Time</span>
                                    <div>
                                        <Calendar id="calendar-timeonly" v-model="strandScheduleTempData.end_time" timeOnly hourFormat="12" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex pt-12 justify-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="resetTemp(prevCallback)" />
                            <Button icon="fa fa-plus" label="Add Schedule" class="col-start-2 inset-y-0 right-0 self-end" @click="tempAddSched(strandScheduleTempData)" />
                            <Button label="Submit" icon="pi pi-arrow-right" iconPos="right" @click="addForm" />
                        </div>
                    </template>
                </StepperPanel>
            </Stepper>
        </div>
        <div class="flex-1 flex flex-col bg-white rounded-md shadow-xl p-8 pb-4 mb-8">
            <DataTable :value="strandDataTable"
                :ptOptions="{mergeProps:true}"
                :pt="{
                    root: {
                        class: ['flex flex-col pt-2 justify-between overflow-auto mb-8']
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
                }"
            >
                <template #empty> <div class="text-center">Nothing added.</div> </template>
                <Column field="name" header="Learning Strand" />
                <Column field="teacher" header="Teacher" />
            </DataTable>
            <DataTable :value="strandSchedDataTable"
                :ptOptions="{mergeProps:true}"
                :pt="{
                    root: {
                        class: ['flex flex-col pt-2 justify-between overflow-auto']
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
                }"
            >
                <template #empty> <div class="text-center">Nothing added.</div> </template>
                <Column header="Days" field="school_days"/>
                <Column header="Start Time" field="start_time"/>
                <Column header="End Time" field="end_time"/>
            </DataTable>
        </div>
    </div>
    
</template>

<style>
</style>