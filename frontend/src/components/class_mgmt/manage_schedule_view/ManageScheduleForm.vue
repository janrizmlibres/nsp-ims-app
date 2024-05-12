<script setup>
// Presets
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import MultiSelect from 'primevue/multiselect';
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';

// stores
import { useVolunteerStore } from '@/stores/volunteer';
import { useTermStore } from '@/stores/term';
import { useClassStore } from '@/stores/class';

const toast = useToast()
const emit = defineEmits(['submit', 'chooseYear', 'chooseLevel'])
const props = defineProps(['state'])

const volunteerStore = useVolunteerStore()
const termStore = useTermStore()
const classStore = useClassStore()

const terms = ref([])
const classes = ref([])
const learningStrands = ref([]);
const volunteers = ref([])
const termInput = ref()
const classLevelInput = ref()
const learningStrandInput = ref()

onMounted(() => {
    try {
        volunteerStore.getAllVolunteers().then((data) => volunteers.value = data)
     termStore.getAllTerms().then((data) => terms.value = data)
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered.',
            life: 3000
        })
    }
})

const enableSchoolLevelDropdown = ref(false)
const disableSubmitButton = computed(() => {
    if(Object.values(formData.value).some(o => o === null) || Object.values(formData.value)[1].length === 0) return true
    else return false
})

const state = computed(() => props.state)
const active = ref(0)
const formData = ref({
    volunteer: null,
    school_days: null,
    start_time: null,
    end_time: null
})

const days = ref(["M", "T", "W", "TH", "F", "S"]);

function addSchedule() {
    emit('submit', learningStrandInput.value, formData.value)
    resetForm()
    active.value = 0
}

function resetForm() {
    learningStrandInput.value = null
    formData.value = {
        volunteer: null,
        school_days: null,
        start_time: null,
        end_time: null
    }
}

function updateState() {
    active.value = 0
    
    classStore.getAllLearningStrands(classLevelInput.value.id).then((strands) => learningStrands.value = strands)
    emit('chooseLevel', classLevelInput.value.id)
    resetForm()
}

function updateIO() {
    enableSchoolLevelDropdown.value = true; 
    classLevelInput.value = null
    termStore.getTerm(termInput.value.id).then((data) => classes.value = data.class_levels)
    emit('chooseYear', termInput.value)
}
</script>

<template>
    <div class="flex gap-12 bg-white rounded-md shadow-xl p-4 px-6 mb-2">
        <div class="flex flex-col gap-1">
            <label>Academic Year</label>
            <Dropdown v-model="termInput" :options="terms" optionLabel="academic_year" placeholder="Select an Academic Year" class="w-full md:w-[14rem]" @update:modelValue="updateIO" />
        </div>
        <div class="flex flex-col gap-1">
            <label>Class Level</label>
            <Dropdown v-model="classLevelInput" :options="classes" optionLabel="school_level" placeholder="Select a Level" :disabled="!enableSchoolLevelDropdown" class="w-full md:w-[14rem]" @update:modelValue="updateState" />
        </div>
    </div>

    <Panel v-if="!state" class="shadow-md mb-8">
        <template #header>
            <div class="flex items-center gap-2">
                <i class="fa fa-circle-info fa-xl"></i>
                <span class="u-txt-active font-semibold text-xl content-center">Action Required</span>
            </div>
        </template>
        <p class="m-0">
            Please fill necessary information in order to continue. Thank you!
        </p>
    </Panel>
    <div v-else-if="state && termInput.status" class="flex flex-col bg-white rounded-md shadow-xl p-8 mb-8">
        <div class="text-center text-xl font-semibold u-txt-active mb-8">Add a Schedule</div>
        <div class="grid xl:grid-flow-col lg:grid-flow-row gap-4 u-txt-active">
            <div class="flex flex-col gap-2">
                <label>Learning Strand</label>
                <Dropdown v-model="learningStrandInput" :options="learningStrands" optionLabel="learning_strand.name" placeholder="Select a Strand" class="w-full xl:w-[16rem]" />
            </div>
            <div class="flex flex-col gap-2">
                <label>Teacher</label>
                <Dropdown v-model="formData.volunteer" :options="volunteers" optionLabel="fullname" placeholder="Select a Teacher" class="w-full xl:max-w-[14rem]" />
            </div>
            <div class="flex flex-col gap-2">
                <label>Days</label>
                <MultiSelect v-model="formData.school_days" :options="days" placeholder="Select Days" :maxSelectedLabels="3" class="w-full xl:w-[12rem]" />
            </div>
            <div class="flex flex-col gap-2">
                <label>Start Time</label>
                <Calendar id="calendar-timeonly" v-model="formData.start_time" timeOnly hourFormat="12"  class="w-full xl:max-w-[16rem]" />
            </div>
            <div class="flex flex-col gap-2">
                <label>End Time</label>
                <Calendar id="calendar-timeonly" v-model="formData.end_time" timeOnly hourFormat="12" class="w-full xl:max-w-[16rem]" />
            </div>
            <div class="flex flex-col gap-2 justify-end">
                <label></label>
                <Button label="Add" icon="pi pi-arrow-right" iconPos="right" :disabled="disableSubmitButton" @click="addSchedule" />
            </div>
        </div>
    </div>
</template>

<style>
</style>