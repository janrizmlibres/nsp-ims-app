<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Password from 'primevue/password'
import Divider from 'primevue/divider'
import Checkbox from 'primevue/checkbox'

import { computed, ref } from 'vue'

const props = defineProps({ formDataProp: Object, isEditView: Boolean })
const formData = props.formDataProp

const suffixes = ref(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV'])
const confirmPassInvalid = computed(() => formData.password !== formData.confirmPass)
</script>

<template>
  <div class="flex flex-col h-full">
    <div>
      <div>
        <h3 class="font-medium u-txt-pcolor text-lg">General Information</h3>
      </div>
    </div>

    <div class="h-[0.035rem] u-bg-active mt-3"></div>

    <div class="flex grow font-medium pt-10">
      <div class="basis-1/2 pr-16 pl-2">
        <div class="flex mb-2 gap-10 items-center">
          <div class="flex gap-2 items-center basis-32 justify-end text-right">
            <div>First Name</div>
            <div class="text-red-500 text-xl">*</div>
          </div>

          <InputText
            class="grow h-10"
            type="text"
            v-model="formData.firstName"
            required
            @update:modelValue="$emit('dataChanged', formData)"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Middle Name</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="formData.middleName"
            @update:modelValue="$emit('dataChanged', formData)"
          />
        </div>

        <div class="flex mb-2 gap-10 items-center">
          <div class="flex gap-2 items-center basis-32 justify-end text-right">
            <div>Last Name</div>
            <div class="text-red-500 text-xl">*</div>
          </div>

          <InputText
            class="grow h-10"
            type="text"
            v-model="formData.lastName"
            required
            @update:modelValue="$emit('dataChanged', formData)"
          />
        </div>

        <div class="flex gap-10 mb-12 items-center">
          <div class="basis-32 text-right">
            <span>Suffix</span>
          </div>

          <Dropdown
            class="w-36 h-10"
            v-model="formData.suffixName"
            showClear
            :options="suffixes"
            @change="$emit('dataChanged', formData)"
          />
        </div>

        <div v-show="isEditView" class="flex mb-2 gap-10 items-center">
          <div class="basis-32 text-right">
            Password <span class="text-red-500 text-xl">*</span>
          </div>

          <Password
            v-model="formData.password"
            toggleMask
            class="grow h-10"
            required
            @change="$emit('dataChanged', formData)"
          >
            <template #header>
              <h6 class="font-medium m-0 mb-2 text-base">Pick a password</h6>
            </template>
            <template #footer>
              <Divider />
              <p class="mt-2 p-0 mb-2">Suggestions</p>
              <ul class="p-0 pl-2 m-0 ml-2 list-disc leading-6" style="line-height: 1.5">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
              </ul>
            </template>
          </Password>
        </div>

        <div v-show="isEditView" class="flex gap-10 items-center">
          <div class="flex gap-2 items-center basis-32 justify-end text-right">
            <div>Confirm Password</div>
            <div class="text-red-500 text-xl">*</div>
          </div>

          <Password
            class="grow h-10"
            v-model="formData.confirmPass"
            required
            :feedback="false"
            toggleMask
            :invalid="confirmPassInvalid"
          />
        </div>
      </div>

      <div class="basis-1/2 pr-16 pl-2">
        <div class="flex mb-2 gap-10 items-center">
          <div class="flex gap-2 items-center basis-32 justify-end text-right">
            <div>Contact Number</div>
            <div class="text-red-500 text-xl">*</div>
          </div>

          <InputText
            class="grow h-10"
            type="text"
            v-model="formData.contactNum"
            required
            @update:modelValue="$emit('dataChanged', formData)"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Email Address</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="formData.email"
            @update:modelValue="$emit('dataChanged', formData)"
          />
        </div>

        <div class="flex mb-12 gap-10 items-center">
          <div class="flex gap-2 items-center basis-32 justify-end text-right">
            <div>Position</div>
            <div class="text-red-500 text-xl">*</div>
          </div>

          <InputText
            class="grow h-10"
            type="text"
            v-model="formData.position"
            required
            @update:modelValue="$emit('dataChanged', formData)"
          />
        </div>

        <div class="flex gap-10 items-center">
          <div class="basis-32 text-right">Sub-Admin</div>

          <Checkbox
            v-model="formData.isSubAdmin"
            :binary="true"
            @change="$emit('dataChanged', formData)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
