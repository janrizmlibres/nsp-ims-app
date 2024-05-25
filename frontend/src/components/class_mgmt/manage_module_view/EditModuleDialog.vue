<script setup>
// Presets
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import { useToast } from 'primevue/usetoast';
import { computed, inject, ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm';

//  stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useUsersStore } from '@/stores/users';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

const toast = useToast()
const confirm = useConfirm()
const router = useRouter()

const classLearningStrandStore = useClassLearningStrandStore()
const usersStore = useUsersStore()

const editModuleDialogState = inject('editModuleDialogState')
const module = inject('module')
const term = inject('term')
const learningStrandInput = inject('learningStrandInput')
const classLevel = inject('classLevel')
const dates = ref([])
const disableUpdate = computed(() => dates.value ? (dates.value.length === 0 || dates.value[1] === null) : !dates.value)
const enableLeave = computed(() => dates.value ? dates.value.length === 0 : !dates.value)

const onSubmit = inject('updateModuleTable')

async function updateModule() {
    try {
        editModuleDialogState.value = false
        
        const range = ref([])
        for (let date of dates.value) {
            const offset = date.getTimezoneOffset()
            date = new Date(date.getTime() - (offset*60*1000))
            range.value.push(date)
        }

        await classLearningStrandStore.updateModule(module.value.id, {
            distribution_date: range.value[0],
            retrieval_date: range.value[1],
        }).then(async (message) => {
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: message,
                life: 3000
            })
            
            dates.value = []

            try {
                await usersStore.addAudit(
                    `Updated: ${module.value.title} date range from ${learningStrandInput.value.learning_strand.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                )
            } catch(error) {
                console.log(error);
            }

            onSubmit()
        })
    } catch(error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered.',
            life: 3000
        })
    }
};

async function cancel() {
    if (!enableLeave.value) {
        confirm.require({
            message: 'Do you really want to leave? you have unsaved changes!',
            header: 'Redirect Confirmation',
            accept: () => {
                dates.value = []
                editModuleDialogState.value = false
            }
        })
    } else {
        dates.value = []
        editModuleDialogState.value = false
    }
}

onBeforeRouteLeave(() => {
    if (enableLeave.value) {
        editModuleDialogState.value = false
        return true
    }

    confirm.require({
        message: 'Do you really want to leave? you have unsaved changes!',
        header: 'Redirect Confirmation',
        accept: () => {
            dates.value = []
            router.back()
        }
    })

    return false
})
</script>

<template>
    <Dialog v-model:visible="editModuleDialogState" modal header="Edit Module" :style="{ width: '20%' }" :closable="false" :draggable="false">
        <div class="flex flex-col gap-4 mb-4">
            <label>Distribution Date - Retrieval Date</label>
            <Calendar v-model="dates" id="calendar" showIcon showButtonBar iconDisplay="input" selectionMode="range" hideOnRangeSelection :manualInput="false" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" outlined rounded label="Update" :disabled="disableUpdate" @click="updateModule" />
            <Button type="button" outlined rounded label="Cancel" severity="danger" @click="cancel" />
        </div>
    </Dialog>
</template>