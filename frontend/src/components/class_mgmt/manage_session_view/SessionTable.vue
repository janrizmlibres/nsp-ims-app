<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Badge from 'primevue/badge';
import { inject, provide, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { format } from 'date-fns';

// Custom
import AddSessionSection from './AddSessionSection.vue';
import EditSessionDialog from './EditSessionDialog.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useConfirm } from 'primevue/useconfirm';
import ProgressSpinner from 'primevue/progressspinner';
import { useUsersStore } from '@/stores/users';

const classLearningStrandStore = useClassLearningStrandStore()
const usersStore = useUsersStore()

const toast = useToast()
const router = useRouter()
const confirm = useConfirm()

const termStatus = inject('termStatus')
const term = inject('term')
const learningStrands = inject('learningStrands')
const classLevel = inject('classLevel')
const isFetching = ref(false)
const classLearningStrandId = ref()
const metaKey = ref(true)
const learningStrandInput = ref()
const selectedSessions = ref([])
const session = ref()
const editSessionDialogState = ref(false)
const sessionByMonths = ref()
const selectedRow = ref({}) 
const selectedMonth = ref()
const dt = ref()
const dtDiv = ref()

const cols = ref([
    {field: 'absent', header: 'Absent'},
    {field: 'present', header: 'Present'},
    {field: 'total', header: 'Total'},
])

provide('classLearningStrandId', classLearningStrandId)
provide('learningStrandInput', learningStrandInput)
provide('session', session)
provide('sessionByMonths', sessionByMonths)
provide('selectedMonth', selectedMonth)
provide('editSessionDialogState', editSessionDialogState)
provide('updateSessionTable', updateSessionTable)

watch(() => learningStrands.value, () => {
    learningStrandInput.value = null
    sessionByMonths.value = null
})

function updateSessionTable() {
    try {
        deselect()

        isFetching.value = true
        classLearningStrandId.value = learningStrandInput.value.id

        classLearningStrandStore.getAllSessions(learningStrandInput.value.id).then((sessions) => {
            sessionByMonths.value = (function() {
                let start = new Date(term.value.start_date)
                let end = new Date(term.value.end_date)
                let months = []

                while (start <= end) {
                    months[start.getMonth()] = {
                        id: start.getMonth()+1,
                        month: format(start, "MMMM yyyy"),
                        date: start.toLocaleDateString(),
                        sessions: [],
                        count: 0
                    }
                    
                    start.setMonth(start.getMonth() + 1);
                }

                return months
            })()

            sessions.reduce((months, obj) => {
                const month = new Date(obj.date).getMonth()
                
                sessionByMonths.value[month].sessions.push(obj);
                sessionByMonths.value[month].count += 1
            }, {});
        })

        isFetching.value = false
    } catch (error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered. Please refresh this page.',
            life: 3000
        })
    }
}

function editSession(data) {
    session.value = {... data}
    editSessionDialogState.value = true
}

async function deleteModules() {
    confirm.require({
        message: 'Do you really want to delete?',
        header: 'Delete Confirmation',
        accept: async () => {
            try {
                const sessionIds = selectedSessions.value.map(session => session.id)
                await classLearningStrandStore.deleteSessions({sessionIds: sessionIds}).then((message) => {
                    toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: message,
                        life: 3000
                    })

                    try {
                        selectedSessions.value.forEach(async (session) => {
                            await usersStore.addAudit(
                                `Deleted: Session ${new Date(session.date).toDateString()} from ${learningStrandInput.value.learning_strand.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                            ).then(deselect())
                        })
                    } catch(error) {
                        console.log(error);
                    }

                    updateSessionTable()
                })
            } catch(error) {
                console.log(error);
            }
        }
    })
}

function viewSession() {
    router.push({ name: 'session-info', query: { id: selectedSessions.value[selectedSessions.value.length-1].id, status: termStatus.value } })
}

const getNumericLabel = (field) => {
    switch (field) {
        case 'absent':
            return 'danger';

        case 'present':
            return 'success';

        case 'total':
            return 'info';

        default:
            return null;
    }
}

function deselect() {
    selectedSessions.value = []
}

function onExpandRow(id) {
    if (id) {
        deselect()
        selectedRow.value = {}
        const checkProp = id in selectedRow.value
        if (checkProp) delete selectedRow.value[id]
        else selectedRow.value[id] = true
        selectedRow.value = { ...selectedRow.value }
    }
}

function onCollapseRow() {
    deselect()
    selectedRow.value = {}
}
</script>

<template>
    <div class="flex h-full w-full">
        <div v-if="termStatus" class="flex flex-col mr-10 p-2 gap-4" >
            <AddSessionSection />
        </div>
        <div class="flex flex-col h-full w-full overflow-hidden shadow-xl" ref="dtDiv">
            <Toolbar class="!p-2">
                <template #start>
                    <span v-if="selectedSessions.length" class="flex flex-row gap-8 items-center mx-2">
                        <span class="flex items-center gap-2">
                            <Button icon="fa fa-circle-xmark fa-lg" text aria-label="Edit Mode" style="height: 2rem; width: 2rem;" @click="deselect"/>
                            <p>
                                {{ selectedSessions.length + ' selected' }}
                            </p>
                        </span>
                        <span class="flex gap-1" v-if="termStatus">
                            <Button icon="fa fa-download" text aria-label="Download Selected" style="height: 2rem; width: 2rem;" @click="{}"/>
                            <Button icon="fa fa-trash" text aria-label="Delete Selected" style="height: 2rem; width: 2rem;" @click="deleteModules"/>
                        </span>
                    </span>
                </template>
                <template #end>
                    <div class="flex flex-row gap-4 items-center">
                        <label class="font-semibold">Learning Strand:</label>
                        <Dropdown v-model="learningStrandInput" :options="learningStrands" optionLabel="learning_strand.name" placeholder="Select a Learning Strand" style="width: 20rem;" @update:modelValue="updateSessionTable" /> 
                    </div>
                </template>
            </Toolbar>
            <DataTable v-model:expandedRows="selectedRow" :value="sessionByMonths" dataKey="id" :loading="isFetching"
                v-model:selection="selectedMonth" selectionMode="single" 
                @rowSelect="onExpandRow(selectedMonth ? selectedMonth.id : null)" @rowUnselect="onCollapseRow()"
                @row-expand="onExpandRow(selectedMonth ? selectedMonth.id : null)"
                scrollable style=" overflow: auto;"
            >
                <template #loading> <ProgressSpinner class="self-center" /> </template>
                <template #empty> <div class="text-center">No records found.</div> </template>

                <Column expander style="width: 5rem" />
                <Column field="id" header="Id" />
                <Column field="month" header="Month">
                    <template #body="slotProps">
                        <p v-if="slotProps.data">{{ slotProps.data.month }}</p>
                    </template>
                </Column>
                <Column field="count" header="Sessions">
                    <template #body="slotProps">
                        <Badge v-if="slotProps.data" :value="slotProps.data.count" :severity="slotProps.data.count === 0 ? 'danger': 'info'"></Badge>
                    </template>
                </Column>
                
                <template #expansion="slotProps">
                    <DataTable v-if="slotProps.data"
                        :value="slotProps.data.sessions" dataKey="id"
                        v-model:selection="selectedSessions"
                        selectionMode="multiple" :metaKeySelection="metaKey" @row-dblclick="viewSession" @blur="deselect()"
                        sortField="date" :sortOrder="1" removableSort class="unselectable" ref="dt"
                    >
                        <template #empty> <div class="text-center">No records found.</div> </template>

                        <Column :exportable="false" style="width:2rem">
                            <template #body="slotProps">
                                <Button v-if="termStatus" icon="fa fa-pencil" text @click="editSession(slotProps.data)" />
                            </template>
                        </Column>
                        <Column field="date" header="Session Date" sortable>
                            <template #body="slotProps">
                                {{ new Date(slotProps.data.date).toDateString() }}
                            </template>
                        </Column>
                        <Column v-for="col of cols" :key="col.field" :field="col.field" :header="col.header">
                            <template #body="{ data, field }">
                                <Badge :value="data[field]" :severity="getNumericLabel(col.field)"></Badge>
                            </template>
                        </Column>
                        <Column field="remarks" header="Remarks" style="width: 16rem;">
                            <template #body="slotProps">
                                {{ slotProps.data.remarks }}
                            </template>
                        </Column>
                        <Column field="updatedAt" header="Updated At" style="width: 10rem;" sortable>
                            <template #body="slotProps">
                                {{ new Date(slotProps.data.updatedAt).toLocaleString() }}
                            </template>
                        </Column>
                    </DataTable>
                </template>
            </DataTable>
        </div>
    </div>
    <EditSessionDialog />
</template>

<style>
</style>