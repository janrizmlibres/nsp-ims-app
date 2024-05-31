<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Badge from 'primevue/badge';
import { inject, provide, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { format } from 'date-fns';

// Custom
import AddSessionPanel from './AddSessionPanel.vue';
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

const term = inject('term')
const classLevel = inject('classLevel')
const learningStrand = inject('learningStrand')

const isFetching = ref(false)
const metaKey = ref(true)
const selectedSessions = ref([])
const session = ref()
const editSessionDialogState = ref(false)
const sessionByMonths = ref()
const selectedRow = ref({}) 
const selectedMonth = ref()
const op = ref()
const cols = ref([
    {field: 'absent', header: 'Absent'},
    {field: 'present', header: 'Present'},
    {field: 'total', header: 'Total'},
])

provide('op', op)
provide('learningStrand', learningStrand)
provide('session', session)
provide('sessionByMonths', sessionByMonths)
provide('selectedMonth', selectedMonth)
provide('editSessionDialogState', editSessionDialogState)
provide('updateSessionTable', updateSessionTable)

watch(() => learningStrand.value, () => updateSessionTable(), {immediate: false})

function updateSessionTable() {
    isFetching.value = true

    deselect()

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

    classLearningStrandStore.getAllSessions(learningStrand.value.id).then((sessions) => {
        sessions.reduce((months, obj) => {
            const month = new Date(obj.date).getMonth()
            
            sessionByMonths.value[month].sessions.push(obj);
            sessionByMonths.value[month].count += 1
        }, {});

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
                                `Deleted: Session ${new Date(session.date).toDateString()} from ${learningStrand.value.learning_strand.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
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
    router.push({ name: 'session-info', query: { id: selectedSessions.value[selectedSessions.value.length-1].id }})
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

const toggle = (event) => {
    op.value.toggle(event);
}
</script>

<template>
    <div class="flex h-full w-full">
        <div class="flex flex-col h-full w-full overflow-hidden shadow-xl">
            <Toolbar class="!p-2 h-[4.35rem]">
                <template #start>
                    <span v-if="selectedSessions.length" class="flex flex-row gap-8 items-center mx-2">
                        <span class="flex items-center gap-2">
                            <Button icon="fa fa-circle-xmark fa-lg" text aria-label="Edit Mode" style="height: 2rem; width: 2rem;" @click="deselect"/>
                            <p>
                                {{ selectedSessions.length + ' selected' }}
                            </p>
                        </span>
                        <span class="flex gap-1" >
                            <!-- <Button icon="fa fa-download" text aria-label="Download Selected" style="height: 2rem; width: 2rem;" @click="{}"/> -->
                            <Button icon="fa fa-trash" text aria-label="Delete Selected" style="height: 2rem; width: 2rem;" @click="deleteModules"/>
                        </span>
                    </span>
                </template>
                <template #end>
                    <Button text icon="fa fa-plus" label="Add Session" aria-label="add-session" style="height: 2rem;" class="!rounded-full mr-2 gap-2" @click="toggle"/>
                    <AddSessionPanel />
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
                        sortField="date" :sortOrder="1" removableSort class="unselectable"
                        paginator :rows="7"
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    >
                        <template #empty> <div class="text-center">No records found.</div> </template>

                        <Column :exportable="false" selectionMode="multiple" headerStyle="width: 3rem"></Column>
                        <Column :exportable="false" style="width:2rem">
                            <template #body="slotProps">
                                <Button icon="fa fa-pencil" text :class="[{'u-txt-pcolor hover:u-bg-pcolor hover:text-white': !selectedSessions.length}, {'text-white hover:u-bg-scolor': selectedSessions.length}]" @click="editSession(slotProps.data)" />
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