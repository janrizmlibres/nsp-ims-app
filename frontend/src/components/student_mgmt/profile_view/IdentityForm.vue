<script setup>
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Dropdown from 'primevue/dropdown'
import BaseCard from '@/components/UI/BaseCard.vue'
import OverlayPanel from 'primevue/overlaypanel'
import Button from 'primevue/button'

import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import ValidateField from '../ValidateField.vue'

import { FormParts, floatLabelPt } from '@/util/student_utils'
import { useUtilitiesStore } from '@/stores/utilities'

const emit = defineEmits(['dataChanged'])
const props = defineProps({ identity: Object, isViewMode: Boolean })

const route = useRoute()
const utilitiesStore = useUtilitiesStore()

const op = ref()
const uploader = ref(null)

const name = ref({
  lastName: props.identity.lastName,
  firstName: props.identity.firstName,
  middleName: props.identity.middleName
})

const lrn = ref(props.identity.lrn)
const selectedSuffix = ref(props.identity.suffixName)
const selectedCat = ref(props.identity.category)
const photoUrl = ref(props.identity.photoUrl)

const isAvatarHovered = ref(false)
const isImgModalVisible = ref(false)

const suffixes = ref(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV'])
const categories = computed(() => utilitiesStore.categories.map((cat) => cat.category_name))
const photoDisplay = ref(photoUrl.value && `http://localhost:8080/${photoUrl.value}`)

watch(photoDisplay, () => handleUpdate())

function setAvatarHover(value) {
  if (route.meta.isViewMode && !photoUrl.value) return
  isAvatarHovered.value = value
}

function handleAvatar(event) {
  if (route.meta.isViewMode && !photoUrl.value) return

  if (photoUrl.value && !route.meta.isViewMode) {
    op.value.toggle(event)
  } else if (photoUrl.value && route.meta.isViewMode) {
    setImageModal(true)
  } else {
    uploader.value.click()
  }
}

function handleUpdate() {
  const data = {
    ...name.value,
    lrn: lrn.value,
    suffixName: selectedSuffix.value,
    category: selectedCat.value,
    photoUrl: photoUrl
  }

  emit('dataChanged', FormParts.Identity, data)
}

function handleImage() {
  if (uploader.value.files.length !== 0) {
    URL.revokeObjectURL(photoDisplay.value)
    photoDisplay.value = URL.createObjectURL(uploader.value.files[0])
    photoUrl.value = uploader.value.files[0]
    setAvatarHover(false)
  }
}

function showImageModal(event) {
  op.value.toggle(event)
  setImageModal(true)
}

function setImageModal(value) {
  isImgModalVisible.value = value
}

onMounted(async () => {
  try {
    await utilitiesStore.getCategories()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <!-- Profile Photo Modal -->
  <div
    class="fixed flex items-center z-50 top-0 left-0 w-full h-full overflow-auto bg-black/90"
    :class="isImgModalVisible ? 'block' : 'hidden'"
  >
    <span
      class="absolute top-3.5 right-9 text-5xl font-bold duration-300 text-[#f1f1f1] hover:no-underline hover:cursor-pointer hover:text-[#bbb]"
      @click="setImageModal(false)"
      >&times;</span
    >
    <img :src="photoDisplay" class="m-auto block w-5/6 max-w-3xl" />
  </div>

  <BaseCard :isNotPadded="true" class="px-8">
    <div class="flex gap-8 items-center">
      <div class="h-20 relative flex items-center">
        <div
          class="relative flex items-center hover:cursor-pointer hover:scale-105 transition-transform ease-out duration-300"
          @mouseenter="setAvatarHover(true)"
          @mouseleave="setAvatarHover(false)"
          @click="handleAvatar"
        >
          <Avatar
            :image="photoDisplay"
            :pt="{
              root: 'w-32 h-32 bg-white shadow-md border-2 rounded dark:bg-surface-700'
            }"
            :ptOptions="{ mergeProps: true }"
          />

          <div
            class="absolute w-full h-full flex items-center justify-center transition-opacity ease-in duration-300 bg-white shadow-md border-2 rounded"
            :class="{
              'opacity-0': isAvatarHovered || (photoDisplay && !isAvatarHovered),
              'opacity-50': isAvatarHovered && photoDisplay
            }"
          >
            <font-awesome-icon icon="fa-solid fa-user" size="lg" />
          </div>

          <div
            class="shadow-md border-2 rounded absolute opacity-0 w-full h-full flex items-center justify-center transition-opacity ease-in duration-300"
            :class="{ 'opacity-100': isAvatarHovered && !photoDisplay }"
          >
            <font-awesome-icon icon="fa-solid fa-upload" size="lg" />
          </div>

          <input
            type="file"
            ref="uploader"
            accept="image/png, image/jpeg"
            name="avatar"
            class="hidden"
            @change="handleImage"
          />

          <OverlayPanel ref="op">
            <div class="flex gap-2">
              <Button label="Preview" class="h-8" size="small" outlined @click="showImageModal" />
              <Button label="Upload" class="h-8" size="small" outlined @click="uploader.click()" />
            </div>
          </OverlayPanel>
        </div>
      </div>

      <div class="grid grid-cols-7 w-full gap-2">
        <FloatLabel class="col-span-2 mt-8" :pt="floatLabelPt">
          <ValidateField v-slot="slotProps">
            <InputText
              id="last-name"
              class="w-full"
              type="text"
              v-model="name.lastName"
              required
              @update:modelValue="
                () => {
                  handleUpdate()
                  slotProps.inputEntered(name.lastName)
                }
              "
              :pt="{
                root: ({ context }) => {
                  return { class: [{ '!opacity-100': context.disabled }] }
                }
              }"
              :ptOptions="{ mergeProps: true }"
              :disabled="isViewMode"
              :invalid="slotProps.isInvalid"
            />
          </ValidateField>

          <label for="last-name">Last Name <span class="text-red-500 text-xl">*</span></label>
        </FloatLabel>

        <FloatLabel class="col-span-2 mt-8" :pt="floatLabelPt">
          <ValidateField v-slot="slotProps">
            <InputText
              class="w-full"
              id="first-name"
              type="text"
              v-model="name.firstName"
              required
              @update:modelValue="
                () => {
                  handleUpdate()
                  slotProps.inputEntered(name.firstName)
                }
              "
              :pt="{
                root: ({ context }) => {
                  return { class: [{ '!opacity-100': context.disabled }] }
                }
              }"
              :ptOptions="{ mergeProps: true }"
              :disabled="isViewMode"
              :invalid="slotProps.isInvalid"
            />
          </ValidateField>
          <label for="first-name">First Name <span class="text-red-500 text-xl">*</span></label>
        </FloatLabel>

        <FloatLabel class="col-span-2 mt-8" :pt="floatLabelPt">
          <InputText
            class="w-full"
            id="middle-name"
            type="text"
            v-model="name.middleName"
            @update:modelValue="handleUpdate"
            :pt="{
              root: ({ context }) => ({
                class: [{ '!opacity-100': context.disabled }]
              })
            }"
            :ptOptions="{ mergeProps: true }"
            :disabled="isViewMode"
          />
          <label for="middle-name">Middle Name</label>
        </FloatLabel>

        <FloatLabel class="mt-8" :pt="floatLabelPt">
          <Dropdown
            class="w-full"
            id="suffix"
            v-model="selectedSuffix"
            showClear
            :options="suffixes"
            @change="handleUpdate"
            :pt="{
              root: ({ props }) => ({
                class: { '!opacity-100': props.disabled }
              })
            }"
            :ptOptions="{ mergeProps: true }"
            :disabled="isViewMode"
          />
          <label for="suffix">Suffix</label>
        </FloatLabel>

        <FloatLabel class="col-span-2 mt-5 mb-3" :pt="floatLabelPt">
          <InputText
            class="w-full"
            id="lrn"
            type="text"
            v-model="lrn"
            @update:modelValue="handleUpdate"
            :pt="{
              root: ({ context }) => {
                return { class: [{ '!opacity-100': context.disabled }] }
              }
            }"
            :ptOptions="{ mergeProps: true }"
            :disabled="isViewMode"
          />
          <label for="lrn">LRN</label>
        </FloatLabel>

        <FloatLabel class="col-span-2 mt-5 mb-3" :pt="floatLabelPt">
          <Dropdown
            class="w-full"
            id="category"
            v-model="selectedCat"
            :options="categories"
            @change="handleUpdate"
            :pt="{
              root: ({ props }) => ({
                class: { '!opacity-100': props.disabled }
              })
            }"
            :ptOptions="{ mergeProps: true }"
            :disabled="isViewMode"
          />
          <label for="category">Category <span class="text-red-500 text-xl">*</span></label>
        </FloatLabel>
      </div>
    </div>
  </BaseCard>
</template>
