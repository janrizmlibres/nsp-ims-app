<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { format } from 'date-fns';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';

// Custom

// stores
import { useClassesStore } from '@/stores/classes';
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const classesStore = useClassesStore()
const classLearningStrandStore = useClassLearningStrandStore()

const props = defineProps(['learningStrands', 'termStatus'])
const toast = useToast()
const confirm = useConfirm()
const router = useRouter()

const cols = ref([
    {field: 'absent', header: 'Absent'},
    {field: 'present', header: 'Present'},
    {field: 'total', header: 'Total'},
])

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

const termStatus = computed(() => props.termStatus)
const isFetching = ref(false)
const allSessions = ref([])
const classLearningStrandId = ref()
const editingRows = ref([]);
const leave = ref(true)
const learningStrandInput = ref()

function updateSessionTable(sessions) {
    isFetching.value = true
    allSessions.value.length = 0
    
    for (const session of sessions) {
        let date = new Date(session.date)
        
        const temp = ref({
            id: session.id,
            date: date,
            absent: session.absent,
            present: session.present,
            total: session.total,
            remarks: session.remarks
        })
        allSessions.value.push(temp.value)
    }
    
    isFetching.value = false
}

watch(() => props.learningStrands, () => {
    learningStrandInput.value = null
    allSessions.value.length = 0
})

watch(() => learningStrandInput.value, (input) => {
    if (input) {
        isFetching.value = true
        classLearningStrandId.value = input.id
        try {
            classLearningStrandStore.getAllSessions(input.id).then((data) => {
                updateSessionTable(data)
            })

            isFetching.value = false
        } catch (error) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Unexpected error encountered. Please refresh this page.',
                life: 3000
            })
        }
    }
}, {immediate: false})

async function addSession() {
    const date = new Date()
    const offset = date.getTimezoneOffset()
    let newDate = format(new Date(date.getTime() - (offset*60*1000)), "yyyy-MM-dd");

    try {
        await classLearningStrandStore.addSession(classLearningStrandId.value, {date:newDate})
        classLearningStrandStore.getAllSessions(classLearningStrandId.value).then((data) => {
            updateSessionTable(data)
        })
        
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Session created successfully',
            life: 3000
        })
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail:"Session exists already!",
            life: 3000
        })
    }
}

watch(() =>  editingRows.value, (data) => {
    if (data.length === 0) leave.value = true
    else leave.value = false
})

const onRowEditSave = async (event) => {
    let { data, newData } = event;

    if (Object.values(data) != Object.values(newData)) {
        try {
            await classLearningStrandStore.updateSession(newData.id, {remarks: newData.remarks})
            classLearningStrandStore.getAllSessions(classLearningStrandId.value).then((data) => {
                updateSessionTable(data)
            })
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Session updated successfully',
                life: 3000
            })
        } catch(error) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail:"Unexpected error encountered.",
                life: 3000
            })
        }
    }
};

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
    <Dropdown v-model="learningStrandInput" :options="props.learningStrands" optionLabel="learning_strand.name" placeholder="Select a Strand" class="w-full mb-4" />
    <DataTable 
        :value="allSessions" dataKey="id" 
        :sortField="Object.keys(classesStore.data[0])[0]" :sortOrder="-1" removableSort 
        resizableColumns columnResizeMode="fit" showGridlines
        v-model:editingRows="editingRows" editMode="row" @row-edit-save="onRowEditSave"
        :paginator="allSessions.length > 10" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
        :ptOptions="{mergeProps:true}"
        :pt="customPt"
    >
        <template #empty> <div class="text-center">No records found.</div> </template>
        <template #loading> <div class="text-center">Loading class records. Please wait.</div> </template>

        <Column header="" class="u-txt-active text-center" style="width: 2rem">
            <template #body="slotProps">
                <RouterLink :to="{ name: 'session-info', query: { id: slotProps.data.id, status: termStatus } }">
                    <i class="fa fa-eye" />
                </RouterLink>
            </template>
        </Column>
        <Column field="date" header="Session Date" sortable>
            <template #body="slotProps">
                {{ slotProps.data.date.toDateString() }}
            </template>
        </Column>
        <Column v-for="col of cols" :key="col.field" :field="col.field" :header="col.header" />
        <Column field="remarks" header="Remarks" style="max-width: 10rem;">
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" autofocus />
            </template>
        </Column>
        <Column :rowEditor="true" bodyStyle="text-align:center"></Column>
        <template #footer v-if="termStatus && learningStrandInput"> 
            <Button icon="fa fa-plus" label="Add Session" text raised rounded aria-label="Submit" @click="addSession"/>
        </template>
    </DataTable>
</template>

<style>
</style>