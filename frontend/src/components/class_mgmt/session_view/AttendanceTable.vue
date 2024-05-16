<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import { computed, ref, watch } from 'vue';
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

const props = defineProps(['modelValue'])
const emit = defineEmits(['onUpdate'])
const isFetching = ref(false)
const learners = ref([])
const noChanges = ref(true)
const startingData = []
const updatedData = new Set([])
const termStatus = computed(() => route.query.status)
const leave = ref(true)

watch(() => props.modelValue, (data) => {
    isFetching.value = true
    learners.value.length = 0
    startingData.length = 0

    for (const attendance of data) {

        const temp = {
            id: attendance.id,
            lastName: attendance.enrollment.student.lastName,
            firstName: attendance.enrollment.student.firstName,
            middleName: attendance.enrollment.student.middleName,
            status: attendance.status,
            remarks: attendance.remarks,
            updatedAt: new Date(attendance.updatedAt)
        }

        const len = learners.value.push(temp)
        startingData.push(structuredClone(temp))
        
        watch(learners.value[len - 1], (newData) => {
            updatedData.add(newData)
            leave.value = false
            noChanges.value = false
        })
    }
    
    isFetching.value = false
}, {immediate: true})

const statuses = ref([
    { label: 'Absent', value: 'Absent' },
    { label: 'Present', value: 'Present' }
]);

async function updateAttendances() {
    try {
        await classLearningStrandStore.updateAttendances({ updatedData: Array.from(updatedData) })
        classLearningStrandStore.getSession(route.query.id).then((data) => {
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
    learners.value = structuredClone(startingData)
    updatedData.clear()
    leave.value = true

    for (const datum of learners.value) {
        watch(datum, (newData) => {
        updatedData.add(newData)
        leave.value = false
        noChanges.value = false
        })
    }

    noChanges.value = true
}

const exportRef = ref()
function exportCSV() {
    exportRef.value.exportCSV()
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
        :value="learners" dataKey="id" 
        sortField="lastName" :sortOrder="1" removableSort
        showGridlines ref="exportRef"
        :paginator="learners.length > 10" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
        :pt="customPt" :ptOptions="{mergeProps:true}"
    >
        <template #empty> <div class="text-center">No records found.</div> </template>
        <template #loading> <div class="text-center">Loading class records. Please wait.</div> </template>

        <Column field="lastName" header="Last Name" frozen sortable />
        <Column field="firstName" header="First Name" frozen sortable />
        <Column field="middleName" header="Middle Name" />
        <Column field="status" header="Status" style="max-width: 10rem;" sortable>
            <template #body="slotProps">
                <div class="flex gap-4">
                    <div v-for="status in statuses" :key="status.value" class="flex align-items-center">
                        <RadioButton v-model="slotProps.data.status" :inputId="status.value" name="dynamic" :value="status.value" :disabled="termStatus === 'false'" />
                        <label :for="status.label" class="ml-2">{{ status.label }}</label>
                    </div>
                </div>
            </template>
        </Column>
        <Column field="remarks" header="Remarks" style="max-width: 10rem;">
            <template #body="slotProps">
                <InputText v-model="slotProps.data.remarks" autofocus :disabled="termStatus === 'false'" />
            </template>
        </Column>
        <Column field="updatedAt" header="Updated At" sortable>
            <template #body="slotProps">
                {{ slotProps.data.updatedAt.toLocaleString() }}
            </template>
        </Column>
        <template #paginatorstart>
        
        </template>
        <template #paginatorend>
            <Button type="button" icon="pi pi-download" @click="exportCSV" text />
        </template>
    </DataTable>
    <div v-if="termStatus === 'true'" class="flex justify-end gap-2 mt-4">
        <Button icon="fa fa-check" type="button" label="Update" :disabled="noChanges" @click="updateAttendances"></Button>
        <Button icon="fa fa-rotate-left" type="button" label="Reset" severity="danger" :disabled="noChanges" @click="resetData"></Button>
    </div>
</template>

<style>
</style>