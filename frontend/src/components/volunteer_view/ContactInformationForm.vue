<script setup>
import InputText from 'primevue/inputtext'
import { ref, watch } from 'vue'

const emit = defineEmits(['dataChanged', 'update'])

const contactNumber = ref(null)
const email = ref(null)
const facebook = ref(null)

const handleDataChange = (newData) => {
  emit('dataChanged', newData);
};

watch([contactNumber, email, facebook], () => {
  const newData = {
    contactNumber: contactNumber.value,
    email: email.value,
    facebook: facebook.value
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
            <span>Contact Number</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="contactNumber"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Email Address</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="email"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Facebook</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="facebook"
          />
        </div>

      </div>
    </div>
  </div>
</template>
