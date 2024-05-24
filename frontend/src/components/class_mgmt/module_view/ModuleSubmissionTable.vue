<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { inject, ref, watch } from 'vue';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const classLearningStrandStore = useClassLearningStrandStore()

const route = useRoute()
const toast = useToast()
const confirm = useConfirm()
const router = useRouter()

const props = defineProps(['modelValue', 'disableEdit'])

const filters = inject('filters')
const learners = ref([])
const noChanges = ref(true)
const startingData = []
const updatedData = new Set([])
const edit = ref(false)
const disableEdit = ref(props.disableEdit)
const disableSave = ref()

const statuses = ref([
    { label: 'Graded', value: 'Graded' },
    { label: 'Submitted', value: 'Submitted' },
    { label: 'No Submission', value: 'No Submission' }
]);

const onEdit = inject('updateModuleSubmissionTable')

watch(() => JSON.stringify(learners.value), (data) => {
    disableSave.value = data === JSON.stringify(startingData)
}, {immediate: true})

watch(() => props.modelValue, (data) => {
    learners.value.length = 0
    startingData.length = 0

    for (const moduleSubmission of data) {
        if (moduleSubmission.date_submitted !== null) {
            moduleSubmission.date_submitted = new Date(moduleSubmission.date_submitted)
        }

        const temp = {
            id: moduleSubmission.id,
            lastName: moduleSubmission.enrollment.student.lastName,
            firstName: moduleSubmission.enrollment.student.firstName,
            middleName: moduleSubmission.enrollment.student.middleName,
            status: moduleSubmission.status,
            date_submitted: moduleSubmission.date_submitted,
            score: moduleSubmission.score,
            remarks: moduleSubmission.remarks,
            updatedAt: new Date(moduleSubmission.updatedAt)
        }

        const len = learners.value.push(temp)
        startingData.push(structuredClone(temp))
        
        watch(learners.value[len - 1], (newData) => {
            updatedData.add(newData)
            noChanges.value = false
        })
    }
}, {immediate: true})

const getStatusLabel = (status) => {
    switch (status) {
        case 'Graded':
            return 'success';

        case 'Submitted':
            return 'warning';

        case 'No Submission':
            return 'danger';

        default:
            return null;
    }
};

async function updateSubmissions() {
    try {
        await classLearningStrandStore.updateModuleSubmissions({ updatedData: Array.from(updatedData) })
        classLearningStrandStore.getModule(route.query.id).then((data) => {
            onEdit(data)
        })

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Updated Module Submissions Successfully',
            life: 5000
        })

        noChanges.value = true
        changeMode()
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
        })
    }
}

function resetData() {
    if (!disableSave.value) {
        confirm.require({
            message: 'Do you really want to discard the unsaved changes?',
            header: 'Redirect Confirmation',
            accept: async () => {
                learners.value = structuredClone(startingData)
                updatedData.clear()

                for (const datum of learners.value) {
                    watch(datum, (newData) => {
                        updatedData.add(newData)
                        noChanges.value = false
                    })
                }

                noChanges.value = true
                changeMode()
            }
        })
    } else changeMode()
}

function changeMode() {
    edit.value = !edit.value
}

onBeforeRouteLeave((to) => {
    if (disableSave.value) {
        return true
    }

    confirm.require({
        message: 'Do you really want to leave? you have unsaved changes!',
        header: 'Redirect Confirmation',
        accept: async () => {
            disableSave.value = true
            await router.push(to)
        }
    })

    return false
})
</script>

<template>
    <div class="flex flex-col h-full w-full">
        <DataTable 
            :value="learners" dataKey="id" scrollable style=" overflow: auto;"
            sortField="lastName" :sortOrder="1" removableSort
            v-model:filters="filters" filterDisplay="menu"
            :globalFilterFields="['lastName', 'firstName', 'status', 'remarks']"
        >
            <template #empty> <div class="text-center">No records found.</div> </template>

            <Column field="lastName" header="Last Name" frozen sortable />
            <Column field="firstName" header="First Name" frozen sortable />
            <Column field="middleName" header="Middle Name" />
            <Column field="status" header="Status" style="width: 14rem;" >
                <template #body="slotProps" v-if="!edit">
                    <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                </template>
                <template #body="slotProps" v-else>
                    <Dropdown v-model="slotProps.data.status" :options="statuses" optionLabel="label" optionValue="value" :placeholder="slotProps.data.status">
                        <template #value="slotProps">
                            <Tag :value="slotProps.placeholder" :severity="getStatusLabel(slotProps.placeholder)" />
                        </template>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                        </template>
                    </Dropdown>
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="statuses" optionLabel="label" optionValue="value"  placeholder="Select One" class="p-column-filter" showClear>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.label" :severity="getStatusLabel(slotProps.option.value)" />
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column field="date_submitted" header="Submission Date" style="width: 14rem;" sortable>
                <template #body="slotProps" v-if="!edit">
                    <p v-if="slotProps.data.date_submitted">
                        {{ slotProps.data.date_submitted.toDateString() }}
                    </p>
                </template>
                <template #body="slotProps" v-else>
                    <Calendar v-model="slotProps.data.date_submitted" id="calendar" showIcon iconDisplay="input" showButtonBar inputClass="w-48">
                        <template #value="slotProps">
                            {{ slotProps.data.date_submitted.toDateString() }}
                        </template>
                    </Calendar>
                </template>
            </Column>
            <Column field="score" header="Score" style="width: 8rem;" sortable>
                <template #body="slotProps" v-if="!edit">
                    {{ slotProps.data.score }}
                </template>
                <template #body="slotProps" v-else>
                    <InputNumber v-model="slotProps.data.score" inputId="score" inputClass="w-16" :allowEmpty="false" />
                </template>
            </Column>
            <Column field="remarks" header="Remarks" style="width: 20rem;">
                <template #body="slotProps" v-if="!edit">
                    {{ slotProps.data.remarks }}
                </template>
                <template #body="slotProps" v-else>
                    <Textarea v-model="slotProps.data.remarks" rows="5" cols="30" />
                </template>
            </Column>
            <Column field="updatedAt" header="Updated At" style="width: 10rem;" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.updatedAt.toLocaleString() }}
                </template>
            </Column>
            <template #footer v-if="route.query.status === 'true'">
                <div class="flex flex-row justify-end items-center">
                    <div v-if="edit" class="flex flex-row gap-4">
                        <Button icon="fa fa-check" label="Save" aria-label="Save Grades" iconClass="['mr-4']" size="small" rounded outlined :disabled="disableSave" @click="updateSubmissions"/>
                        <Button icon="fa fa-xmark" label="Discard" severity="danger" aria-label="Discard Changes" iconClass="['mr-4']" size="small" rounded outlined @click="resetData"/>
                    </div>
                    <Button v-else icon="fa fa-pencil" label="Edit Submissions" aria-label="Edit Grades" iconClass="['mr-4']" size="small" rounded outlined :disabled="disableEdit" @click="changeMode"/>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<style>
</style>