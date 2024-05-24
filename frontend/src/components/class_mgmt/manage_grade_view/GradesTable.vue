<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { inject, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useClassStore } from '@/stores/class';
import { useStaffsStore } from '@/stores/staffs';

const classLearningStrandStore = useClassLearningStrandStore()
const classStore = useClassStore()
const staffsStore = useStaffsStore()

const toast = useToast()
const confirm = useConfirm()

const props = defineProps(['modelValue', 'disableEdit'])

const filters = inject('filters')
const classLearningStrandId = inject('classLearningStrandId')
const learningStrandInput = inject('learningStrandInput')
const classLevel = inject('classLevel')
const term = inject('term')
const termStatus = inject('termStatus')
const grades = ref([])
const startingData = []
const updatedData = new Set([])

const edit = ref(false)
const noChanges = ref(true)
const disableEdit = ref(props.disableEdit)
const disableSave = ref()

const onSubmit = inject('updateGradesData')

watch(() => JSON.stringify(grades.value), (data) => {
    disableSave.value = data === JSON.stringify(startingData)
}, {immediate: true})

watch(() => props.modelValue, (data) => {
    grades.value.length = 0
    startingData.length = 0

    for (const datum of data) {
        const temp = {
            id: datum.id,
            enrollmentId: datum.enrollment.id,
            classLearningStrandId: datum.classLearningStrandId,
            lastName: datum.enrollment.student.lastName,
            firstName: datum.enrollment.student.firstName,
            middleName: datum.enrollment.student.middleName,
            grades: {
                first_quarter: datum.first_quarter,
                second_quarter: datum.second_quarter,
                third_quarter: datum.third_quarter,
                fourth_quarter: datum.fourth_quarter,
                remarks: datum.remarks,
                updatedAt: datum.updatedAt
            }
        }

        const len = grades.value.push(temp)
        startingData.push(structuredClone(temp))
        
        watch(grades.value[len - 1], (newData) => {
            updatedData.add(newData)
            classStore.leave = disableSave.value
            noChanges.value = false
        })
    }
})

async function updateGrades() {
    try {
        await classLearningStrandStore.updateGrades({ updatedData: Array.from(updatedData) }).then(async (message) => {
            noChanges.value = true
            changeMode()

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: message,
                life: 5000
            })

            try {
                classLearningStrandStore.getAllGrades(classLearningStrandId.value).then((data) => {
                    onSubmit(data)
                })
            } catch (error) {
                console.log(error);
            }

            try {
                for (const grade of Array.from(updatedData)) {
                    await staffsStore.addAudit(
                        `Updated: Grade of ${grade.firstName} ${grade.lastName} in ${learningStrandInput.value.learning_strand.code} of ${classLevel.school_level}, SY ${term.academic_year}`
                    )
                }
            } catch(error) {
                console.log(error);
            }
        })
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
                grades.value = structuredClone(startingData)
                updatedData.clear()

                for (const grade of grades.value) {
                    watch(grade, (newData) => {
                        updatedData.add(newData)
                        classStore.leave = disableSave.value
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
    classStore.leave = disableSave.value
    edit.value = !edit.value
}
</script>

<template>
    <DataTable 
        :value="grades" dataKey="id" scrollable style="overflow: auto;"
        v-model:filters="filters"
        :globalFilterFields="['lastName', 'firstName', 'remarks']"
        sortField="lastName" :sortOrder="1" removableSort 
    >
        <template #empty> <div class="text-center">No records found.</div> </template>

        <Column field="lastName" header="Last Name" frozen sortable />
        <Column field="firstName" header="First Name" frozen sortable />
        <Column field="middleName" header="Middle Name" />

        <Column field="first_quarter" header="Q1">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.grades.first_quarter" :disabled="!edit" :binary="true" />
            </template>
        </Column>
        <Column field="second_quarter" header="Q2">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.grades.second_quarter" :disabled="!edit" :binary="true" />
            </template>
        </Column>
        <Column field="third_quarter" header="Q3">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.grades.third_quarter" :disabled="!edit" :binary="true" />
            </template>
        </Column>
        <Column field="fourth_quarter" header="Q4">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.grades.fourth_quarter" :disabled="!edit" :binary="true" />
            </template>
        </Column>
        <Column field="remarks" header="Remarks" style="width: 19rem;">
            <template #body="slotProps" v-if="!edit">
                {{ slotProps.data.grades.remarks }}
            </template>
            <template #body="slotProps" v-else>
                <Textarea v-model="slotProps.data.grades.remarks" rows="5" cols="30" />
            </template>
        </Column>
        <Column field="grades.updatedAt" header="Updated At" style="width: 10rem;" sortable>
            <template #body="slotProps">
                {{ new Date(slotProps.data.grades.updatedAt).toLocaleString() }}
            </template>
        </Column>
        <template #footer v-if="termStatus">
            <div class="flex flex-row justify-between items-center">
                <p>
                    Record(s) count: <span class="u-txt-red"> {{ grades.length }} </span>
                </p>
                <div v-if="edit" class="flex flex-row gap-4">
                    <Button icon="fa fa-check" label="Save" aria-label="Save Grades" iconClass="['mr-4']" size="small" rounded outlined :disabled="disableSave" @click="updateGrades"/>
                    <Button icon="fa fa-xmark" label="Discard" severity="danger" aria-label="Discard Changes" iconClass="['mr-4']" size="small" rounded outlined @click="resetData"/>
                </div>
                <Button v-else icon="fa fa-plus" label="Edit Grades" aria-label="Edit Grades" iconClass="['mr-4']" size="small" rounded outlined :disabled="disableEdit" @click="changeMode"/>
            </div>
        </template>
    </DataTable>
</template>

<style>
</style>