<script setup>
// Presets
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Badge from 'primevue/badge';
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

// Custom
import AddSessionSection from './AddSessionSection.vue';
import EditSessionDialog from './EditSessionDialog.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useConfirm } from 'primevue/useconfirm';

const classLearningStrandStore = useClassLearningStrandStore()

const props = defineProps(['learningStrands', 'termStatus'])
const toast = useToast()
const router = useRouter()
const confirm = useConfirm()

const cols = ref([
    {field: 'absent', header: 'Absent'},
    {field: 'present', header: 'Present'},
    {field: 'total', header: 'Total'},
])

const termStatus = computed(() => props.termStatus)
const isFetching = ref(false)
const allSessions = ref([])
const classLearningStrandId = ref()
const metaKey = ref(true)
const learningStrandInput = ref()
const selectedSessions = ref([])
const session = ref()
const editSessionDialog = ref(false)

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
            remarks: session.remarks,
            updatedAt: session.updatedAt
        })
        allSessions.value.push(temp.value)
    }
    
    isFetching.value = false
}

function editSession(data) {
    session.value = {... data}
    showEditSessionDialog()
}

function showEditSessionDialog() {
    editSessionDialog.value = !editSessionDialog.value
}

function updateSession(data) {
    updateSessionTable(data)
    showEditSessionDialog()
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

function deselect() {
    selectedSessions.value = []
}

async function deleteModules() {
    confirm.require({
        message: 'Do you really want to delete?',
        header: 'Delete Confirmation',
        accept: async () => {
            try {
                const sessionIds = selectedSessions.value.map(session => session.id)
                await classLearningStrandStore.deleteSessions({sessionIds: sessionIds})
                deselect()
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Session(s) deleted successfully!',
                    life: 3000
                })
            } catch(error) {
                console.log(error);
            }

            try {
                classLearningStrandStore.getAllSessions(learningStrandInput.value.id).then((data) => {
                    updateSessionTable(data)
                })
            } catch(error) {
                console.log(error);
            }
        }
    })
}

function viewSession() {
    router.push({ name: 'session-info', query: { id: selectedSessions.value[selectedSessions.value.length-1].id, status: termStatus } })
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
</script>

<template>
    <div class="flex h-full w-full">
        <div class="flex flex-col w-[17%] mr-10 p-2 gap-4" >
            <AddSessionSection :classLearningStrandId="classLearningStrandId" @onUpdate="updateSessionTable" />
        </div>
        <div class="w-[83%] flex flex-col h-full overflow-hidden shadow-xl">
            <Toolbar class="!p-2">
                <template #start>
                    <span v-if="selectedSessions.length" class="flex flex-row gap-8 items-center mx-2">
                        <span class="flex items-center gap-2">
                            <Button icon="fa fa-circle-xmark fa-lg" text aria-label="Edit Mode" style="height: 2rem; width: 2rem;" @click="deselect"/>
                            <p>
                                {{ selectedSessions.length + ' selected' }}
                            </p>
                        </span>
                        <span class="flex gap-1">
                            <Button icon="fa fa-download" text aria-label="Download Selected" style="height: 2rem; width: 2rem;" @click="{}"/>
                            <Button icon="fa fa-trash" text aria-label="Delete Selected" style="height: 2rem; width: 2rem;" @click="deleteModules"/>
                        </span>
                    </span>
                </template>
                <template #end>
                    <div class="flex flex-row gap-4 items-center">
                        <label class="font-semibold">Learning Strand:</label>
                        <Dropdown v-model="learningStrandInput" :options="props.learningStrands" optionLabel="learning_strand.name" placeholder="Select a Learning Strand" style="width: 20rem;" @update:modelValue="deselect" /> 
                    </div>
                </template>
            </Toolbar>
            <DataTable 
                :value="allSessions" dataKey="id"
                v-model:selection="selectedSessions" scrollable style=" overflow: auto;"
                selectionMode="multiple" :metaKeySelection="metaKey" @row-dblclick="viewSession"
                sortField="date" :sortOrder="1" removableSort class="unselectable"
            >
                <template #empty> <div class="text-center">No records found.</div> </template>

                <Column :exportable="false" style="width:2rem">
                    <template #body="slotProps">
                        <Button icon="fa fa-pencil" text @click="editSession(slotProps.data)" />
                    </template>
                </Column>
                <Column field="date" header="Session Date" sortable>
                    <template #body="slotProps">
                        {{ slotProps.data.date.toDateString() }}
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
                <template #footer>
                    
                </template>
            </DataTable>
        </div>
    </div>
    <EditSessionDialog :id="classLearningStrandId" :data="session" :state="editSessionDialog" @onUpdate="updateSession" @onUpdateDisplay="showEditSessionDialog" />
</template>

<style>
</style>