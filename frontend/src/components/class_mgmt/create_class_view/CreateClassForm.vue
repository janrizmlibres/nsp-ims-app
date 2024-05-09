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
import Panel from 'primevue/panel';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue';

// stores
import { useVolunteerStore } from '@/stores/volunteer';
import { useTermStore } from '@/stores/term';
import { useClassStore } from '@/stores/class';

const emit = defineEmits(['submit', 'chooseLevel'])
const toast = useToast()

const volunteerStore = useVolunteerStore()
const termStore = useTermStore()
const classStore = useClassStore()

const term = ref()
const classes = ref()
const learningStrands = ref([]);
const volunteers = ref([])
const classLevelInput = ref()

onMounted(() => {
    volunteerStore.getAllVolunteers().then((data) => data.forEach((data) => volunteers.value = data))
})

watch(() => termStore.activeTerm, (data) => {
    term.value = data.academic_year
    classes.value = data.class_levels
})

watch(() => classLevelInput, (data) => {
    classStore.getAllStrands(data.id).then((strands) => learningStrands.value = strands)
})

const state = ref(null)
const active = ref(0)
const learningStrandInput = ref()
const scheduleData = ref([])
const strandDataTable = ref([])
const scheduleDataTable = ref([])

const scheduleInputData = ref({
    volunteer: null,
    school_days: null,
    start_time: null,
    end_time: null
})

const days = ref([
    {name: "M", key: "1"},
    {name: "T", key: "2"},
    {name: "W", key: "3"},
    {name: "TH", key: "4"},
    {name: "F", key: "5"},
    {name: "S", key: "6"},
]);

function tempAddStrand(next) {
    if (!learningStrandInput.value || !scheduleInputData.value.volunteer) {
        toast.add({
            severity: 'error',
            summary: 'Incomplete Form',
            detail: "Please fill all necessary information",
            life: 3000
        })

        return
    }

    strandDataTable.value.push({
        name: learningStrandInput.value.strand.name,
        teacher: scheduleInputData.value.volunteer
    })

    next()
}

function tempAddSchedule() {
    if (Object.values(scheduleInputData.value).some(o => o === null)) {
        toast.add({
            severity: 'error',
            summary: 'Incomplete Form',
            detail: "Please fill all necessary information",
            life: 3000
        })

        return
    }
    
    scheduleData.value.push(scheduleInputData.value)
    scheduleDataTable.value.push(scheduleInputData.value)
    
    scheduleInputData.value = {
        volunteer: null,
        school_days: null,
        start_time: null,
        end_time: null
    }
}

function resetTemp(func) {
    learningStrandInput.value = null
    scheduleData.value.length = 0
    strandDataTable.value.length = 0
    scheduleDataTable.value.length = 0

    func()
}

function addSchedule() {
    emit('submit', learningStrandInput.value, scheduleData.value)
    resetForm()
    active.value = 0
}

function resetForm() {
    learningStrandInput.value = null
    scheduleData.value.length = 0
    scheduleInputData.value = {
        volunteer: null,
        school_days: null,
        start_time: null,
        end_time: null
    }
    strandDataTable.value.length = 0
    scheduleDataTable.value.length = 0
}

async function updateState() {
    active.value = 0
    state.value = true
    
    emit('chooseLevel',  classLevelInput.value.id)
    resetForm()
}

const customPt = {
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
}
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
                <Dropdown v-model="classLevelInput" :options="classes" optionLabel="school_level" placeholder="Select a Level" class="w-full md:w-[14rem]" @update:modelValue="updateState" />
            </span>
        </div>
    </div>

    <Panel v-if="state == null" class="shadow-md mb-8">
        <template #header>
            <div class="flex items-center gap-2">
                <i class="fa fa-circle-info fa-xl"></i>
                <span class="u-txt-active font-semibold text-xl content-center">Action Required</span>
            </div>
        </template>
        <p class="m-0">
            Please choose a class level in order to continue. Thank you!
        </p>
    </Panel>
    <div v-else class="flex flex-row gap-4 h-[27rem]">
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
                            <div class="text-center mt-3 mb-3 text-xl font-semibold u-txt-active">Fill Necessary Information</div>
                            <div class="flex flex-col justify-center mx-auto">
                                <div class="flex flex-col mb-4">
                                    <span class="mr-3 u-txt-active">Learning Strand</span>
                                    <span class="relative">
                                        <Dropdown v-model="learningStrandInput" :options="learningStrands" optionLabel="name" placeholder="Select a Strand" class="w-full md:w-[14rem]" />
                                    </span>
                                </div>

                                <div class="flex flex-col">
                                    <span class="mr-3 u-txt-active">Teacher</span>
                                    <span class="relative">
                                        <Dropdown v-model="scheduleInputData.volunteer" :options="volunteers" optionLabel="fullname" placeholder="Select a Teacher" class="w-full md:w-[14rem]" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex pt-8 justify-end bg-transparent">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="tempAddStrand(nextCallback)" />
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
                                        <Checkbox v-model="scheduleInputData.school_days" :inputId="day.key" name="day" :value="day.name" class="mr-2"/>
                                        <label :for="day.key">{{ day.name }}</label>
                                    </div>
                                </div>
                            </div>

                            <div class="flex lg:flex-row md:flex-col gap-14 mb-4">
                                <div>
                                    <span class="mr-3 u-txt-active">Start Time</span>
                                    <div>
                                        <Calendar id="calendar-timeonly" v-model="scheduleInputData.start_time" timeOnly hourFormat="12" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" />
                                    </div>
                                </div>
                                <div>
                                    <span class="mr-3 u-txt-active">End Time</span>
                                    <div>
                                        <Calendar id="calendar-timeonly" v-model="scheduleInputData.end_time" timeOnly hourFormat="12" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex pt-12 justify-between bg-transparent">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="resetTemp(prevCallback)" />
                            <Button icon="fa fa-plus" label="Add Schedule" class="col-start-2 inset-y-0 right-0 self-end" @click="tempAddSchedule" />
                            <Button label="Submit" icon="pi pi-arrow-right" iconPos="right" :disabled="scheduleData.value.length === 0" @click="addSchedule" />
                        </div>
                    </template>
                </StepperPanel>
            </Stepper>
        </div>
        <div class="flex-1 flex flex-col bg-white rounded-md shadow-xl p-8 pb-4 mb-8">
            <DataTable :value="strandDataTable"
                :ptOptions="{mergeProps:true}"
                :pt="customPt"
            >
                <template #empty> <div class="text-center">Nothing added.</div> </template>
                <Column field="name" header="Learning Strand" />
                <Column field="teacher" header="Teacher" />
            </DataTable>
            <DataTable :value="scheduleDataTable"
                :ptOptions="{mergeProps:true}"
                :pt="customPt"
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