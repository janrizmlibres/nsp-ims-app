<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const classLearningStrandStore = useClassLearningStrandStore()

const toast = useToast()
const router = useRouter()
const confirm = useConfirm()

const customPt = {
    column: {
        headercell: ({ context, props }) => ({
            class: [
                'u-txt-active',
                // Color
                (props.sortable === '' || props.sortable) && context.sorted ? 'bg-surface-200' : 'bg-surface-200'
            ]
        })
    }
}

const emit = defineEmits(['onUpdate'])
const props = defineProps(['modelValue', 'isNotActive', 'id'])
const isNotActive = computed(() => props.isNotActive)
const classLearningStrandId = computed(() => props.id)
const grades = ref([])
const noChanges = ref(true)

const startingData = []
const updatedData = new Set([])
const leave = ref(true)

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
            leave.value = false
            noChanges.value = false
        })
    }
})

async function updateGrades() {
    try {
        await classLearningStrandStore.updateGrades({ updatedData: Array.from(updatedData) })
        classLearningStrandStore.getAllGrades(classLearningStrandId.value).then((data) => {
            emit('onUpdate', data)
        })

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Updated Grades Successfully',
            life: 5000
        })

        leave.value = true
        noChanges.value = true
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
    grades.value = structuredClone(startingData)
    updatedData.clear()
    leave.value = true

    for (const grade of grades.value) {
        watch(grade, (newData) => {
            updatedData.add(newData)
            leave.value = false
            noChanges.value = false
        })
    }

    noChanges.value = true
}

onBeforeRouteLeave((to) => {
    if (leave.value) {
        return true
    }

    confirm.require({
        message: 'Do you really want to leave? you have unsaved changes!',
        header: 'Redirect Confirmation',
        accept: async () => {
            leave.value = true
            await router.push(to)
        }
    })

    return false
})
</script>

<template>
    <DataTable 
        :value="grades" dataKey="id" showGridlines
        sortField="lastName" :sortOrder="1" removableSort 
        :paginator="grades.length > 10" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
        :pt="customPt" :ptOptions="{mergeProps:true}"
    >
        <template #empty> <div class="text-center">No records found.</div> </template>

        <Column field="lastName" header="Last Name" frozen sortable />
        <Column field="firstName" header="First Name" frozen sortable />
        <Column field="middleName" header="Middle Name" />

        <Column field="first_quarter" header="Q1">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.grades.first_quarter" :disabled="isNotActive" :binary="true" />
            </template>
        </Column>
        <Column field="second_quarter" header="Q2">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.grades.second_quarter" :disabled="isNotActive" :binary="true" />
            </template>
        </Column>
        <Column field="third_quarter" header="Q3">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.grades.third_quarter" :disabled="isNotActive" :binary="true" />
            </template>
        </Column>
        <Column field="fourth_quarter" header="Q4">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.grades.fourth_quarter" :disabled="isNotActive" :binary="true" />
            </template>
        </Column>
        <Column field="remarks" header="Remarks">
            <template #body="slotProps">
                <InputText v-model="slotProps.data.grades.remarks" :disabled="isNotActive" autofocus />
            </template>
        </Column>
        <Column field="grades.updatedAt" header="Updated At" sortable>
            <template #body="slotProps">
                {{ new Date(slotProps.data.grades.updatedAt).toLocaleString() }}
            </template>
        </Column>
        <template #footer>
            <p>
                Record(s) count: <span class="u-txt-red"> {{ grades.length }} </span>
            </p>
        </template>
    </DataTable>
    <div v-if="!isNotActive" class="flex justify-end gap-2 mt-4">
        <Button icon="fa fa-check" type="button" label="Update" :disabled="noChanges" @click="updateGrades"></Button>
        <Button icon="fa fa-rotate-left" type="button" label="Reset" severity="danger" :disabled="noChanges" @click="resetData"></Button>
    </div>
</template>

<style>
</style>