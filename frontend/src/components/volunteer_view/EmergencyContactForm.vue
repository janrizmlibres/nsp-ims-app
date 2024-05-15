<script setup>
import InputText from 'primevue/inputtext'
import { ref, watch } from 'vue'

const emit = defineEmits(['dataChanged', 'update'])

const emergencyLastName = ref(null)
const emergencyFirstName = ref(null)
const emergencyMiddleName = ref(null)
const emergencySuffix = ref(null)
const emergencyContact = ref(null)
const emergencyRelationship = ref(null)

const handleDataChange = (newData) => {
  emit('dataChanged', newData);
};

watch([emergencyLastName, emergencyFirstName, emergencyMiddleName, emergencySuffix, emergencyContact, emergencyRelationship], () => {
  const newData = {
    emergencyLastName: emergencyLastName.value,
    emergencyFirstName: emergencyFirstName.value,
    emergencyMiddleName: emergencyMiddleName.value,
    emergencySuffix: emergencySuffix.value,
    emergencyContact: emergencyContact.value,
    emergencyRelationship: emergencyRelationship.value,
  };
  emit('update', newData);
  handleDataChange(newData);
})
</script>

<template>
  <div class="flex flex-col h-full">

    <div class="flex grow font-medium pt-10">
      <div class="basis-1/2 pr-16 pl-2">
        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>First Name</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="emergencyFirstName"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Middle Name</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="emergencyMiddleName"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Last Name</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="emergencyLastName"
          />
        </div>

        <div class="flex gap-10 mb-12 items-center">
          <div class="basis-32 text-right">
            <span>Suffix</span>
          </div>
          <InputText
            class="w-20 h-10"
            type="text"
            v-model="emergencySuffix"
          />
        </div>
      </div>

      <div class="basis-1/2 pr-16 pl-2">
        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Contact Number</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="emergencyContact"
          />
        </div>

        <div class="flex gap-3 mb-2 items-center">
          <div class="basis-32 text-right whitespace-nowrap">
            <span>Relationship with Emergency contact</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="emergencyRelationship"
          />
        </div>

      </div>
    </div>
  </div>
</template>