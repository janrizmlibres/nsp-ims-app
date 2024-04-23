<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import AddForm from '@/components/staff_view/AddForm.vue'

import { ref } from 'vue'
// import axios from 'axios'

const position = ref('')
const formData = ref({
  username: '',
  password: '',
  firstName: '',
  middleName: '',
  lastName: '',
  suffixName: '',
  email: '',
  contactNum: ''
})

function updateData(data) {
  formData.value = data
}

function submitData() {
  // fetch('https://vue-http-demo-85e9e.firebaseio.com/surveys.json')
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         }
  //       })
  //       .then((data) => {
  //         this.isLoading = false;
  //         const results = [];
  //         for (const id in data) {
  //           results.push({
  //             id: id,
  //             name: data[id].name,
  //             rating: data[id].rating,
  //           });
  //         }
  //         this.results = results;
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         this.isLoading = false;
  //         this.error = 'Failed to fetch data - please try again later.';
  //       });
}
</script>

<template>
  <ContentPane header="Staff Management / Add Record">
    <div class="flex flex-col gap-3 h-full mr-1">
      <div>
        <BaseCard :isNotPadded="true" class="py-2 px-6">
          <div class="flex gap-6 items-center">
            <div class="font-medium text-right">
              <span>Position</span>
            </div>
            <InputText class="h-10" type="text" v-model="position" />
          </div>
        </BaseCard>
      </div>

      <BaseCard class="grow">
        <AddForm :formDataProp="formData" @dataChanged="updateData" />
      </BaseCard>

      <div class="flex-none text-right">
        <div class="inline-block">
          <Button
            class="h-10 u-bg-green"
            label="Submit"
            icon="fa-solid fa-circle-check"
            @click="submitData"
          />
          <Button class="h-10 ml-2 u-bg-red" label="Cancel" icon="fa-solid fa-circle-xmark" />
        </div>
      </div>
    </div>
  </ContentPane>
</template>
