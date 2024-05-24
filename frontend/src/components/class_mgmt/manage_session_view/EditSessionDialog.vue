<script setup>
// Presets
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import { useToast } from 'primevue/usetoast';
import { computed, inject, toRaw } from 'vue';
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

const editSessionDialogState = inject('editSessionDialogState')
const session = inject('session')
const learningStrandInput = inject('learningStrandInput')
const term = inject('term')
const classLevel = inject('classLevel')
const startingData = computed(() => structuredClone(toRaw(session.value)))
const classLearningStrandId = inject('classLearningStrandId')
const disableUpdate = computed(() => JSON.stringify(session.value) === JSON.stringify(startingData.value))
const onSubmit = inject('updateSessionTable')

async function updateSession() {
    try {
        await classLearningStrandStore.updateSession(session.value.id, {remarks: session.value.remarks}).then(async (message) => {
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: message,
                life: 3000
            })

            try {
                await usersStore.addAudit(
                    `Updated: Remarks of session ${new Date(session.value.date).toDateString()} of ${learningStrandInput.value.learning_strand.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                )
            } catch(error) {
                console.log(error);
            }

            try {
                classLearningStrandStore.getAllSessions(classLearningStrandId.value).then((data) => {
                    onSubmit(data)
                    editSessionDialogState.value = false
                })
            } catch(error) {
                console.log(error);
            }
        })
    } catch(error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail:"Unexpected error encountered.",
            life: 3000
        })
    }
};

async function cancel() {
    if(!disableUpdate.value) {
        confirm.require({
            message: 'Do you really want to leave? you have unsaved changes!',
            header: 'Redirect Confirmation',
            accept: () => {
                editSessionDialogState.value = false
            }
        })
    } else editSessionDialogState.value = false
}

onBeforeRouteLeave(() => {
    if (JSON.stringify(session.value) === JSON.stringify(startingData.value)) {
        editSessionDialogState.value = false
        return true
    }

    confirm.require({
        message: 'Do you really want to leave? you have unsaved changes!',
        header: 'Redirect Confirmation',
        accept: () => {
            session.value = structuredClone(toRaw(session.value))
            router.back()
        }
    })

    return false
})
</script>

<template>
    <Dialog v-model:visible="editSessionDialogState" modal header="Edit Session" :style="{ width: '20rem' }" :closable="false">
        <div class="flex flex-col gap-4 mb-4">
            <label>Remarks</label>
            <Textarea v-model="session.remarks" rows="5" cols="30" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Update" outlined rounded :disabled="disableUpdate" @click="updateSession"></Button>
            <Button type="button" label="Cancel" outlined rounded severity="danger" @click="cancel"></Button>
        </div>
    </Dialog>
</template>