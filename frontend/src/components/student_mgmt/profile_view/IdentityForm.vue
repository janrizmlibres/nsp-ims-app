<script setup>
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import BaseCard from '@/components/UI/BaseCard.vue'
import OverlayPanel from 'primevue/overlaypanel'
import Button from 'primevue/button'

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import FormParts from '@/util/student_form_parts'

const emit = defineEmits(['dataChanged'])
const props = defineProps({ identity: Object, isViewMode: Boolean })

const route = useRoute()

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
const photoUrl = ref(props.identity.photoUrl && `http://localhost:8080/${props.identity.photoUrl}`)

const isAvatarHovered = ref(false)
const isImgModalVisible = ref(false)

const suffixes = ref(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV'])
const categories = ref([
  'Out-of-School Youth',
  'Teenage Pregnancy',
  'Orphan',
  'Drug-Related',
  'Disabled'
])

watch(photoUrl, () => handleUpdate())

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
    photoUrl: photoUrl.value && uploader.value.files[0]
  }

  emit('dataChanged', FormParts.Identity, data)
}

function handleImage() {
  if (uploader.value.files.length !== 0) {
    URL.revokeObjectURL(photoUrl.value)
    photoUrl.value = URL.createObjectURL(uploader.value.files[0])
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
    <img :src="photoUrl" class="m-auto block w-5/6 max-w-3xl" />
  </div>

  <BaseCard isNotPadded="true" class="p-2 pl-4">
    <div class="flex gap-4 items-center">
      <div class="h-20 relative flex items-center">
        <div
          class="relative flex items-center hover:cursor-pointer hover:scale-105 transition-transform ease-out duration-300"
          @mouseenter="setAvatarHover(true)"
          @mouseleave="setAvatarHover(false)"
          @click="handleAvatar"
        >
          <Avatar
            :image="photoUrl"
            size="xlarge"
            :pt="{
              root: 'bg-white shadow-md border-2 rounded dark:bg-surface-700'
            }"
            :ptOptions="{ mergeProps: true }"
          />

          <div
            class="absolute w-full h-full flex items-center justify-center transition-opacity ease-in duration-300 bg-white shadow-md border-2 rounded"
            :class="{
              'opacity-0': isAvatarHovered || (photoUrl && !isAvatarHovered),
              'opacity-50': isAvatarHovered && photoUrl
            }"
          >
            <font-awesome-icon icon="fa-solid fa-user" size="lg" />
          </div>

          <div
            class="shadow-md border-2 rounded absolute opacity-0 w-full h-full flex items-center justify-center transition-opacity ease-in duration-300"
            :class="{ 'opacity-100': isAvatarHovered && !photoUrl }"
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
        <InputText
          class="h-10 col-span-2"
          type="text"
          v-model="name.lastName"
          v-tooltip.top="name.lastName ? 'Last Name' : ''"
          placeholder="Last Name"
          @update:modelValue="handleUpdate"
          :pt="{
            root: ({ context }) => {
              return { class: [{ '!opacity-100 !pointer-events-auto': context.disabled }] }
            }
          }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />
        <InputText
          class="h-10 col-span-2"
          type="text"
          v-model="name.firstName"
          v-tooltip.top="name.firstName ? 'First Name' : ''"
          placeholder="First Name"
          @update:modelValue="handleUpdate"
          :pt="{
            root: ({ context }) => {
              return { class: [{ '!opacity-100 !pointer-events-auto': context.disabled }] }
            }
          }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />
        <InputText
          class="h-10 col-span-2"
          type="text"
          v-model="name.middleName"
          v-tooltip.top="name.middleName ? 'Middle Name' : ''"
          placeholder="Middle Name"
          @update:modelValue="handleUpdate"
          :pt="{
            root: ({ context }) => ({
              class: [{ '!opacity-100 !pointer-events-auto': context.disabled }]
            })
          }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />
        <Dropdown
          class="h-10"
          v-model="selectedSuffix"
          v-tooltip.top="selectedSuffix ? 'Suffix' : ''"
          showClear
          :options="suffixes"
          placeholder="Suffix"
          @change="handleUpdate"
          :pt="{
            root: ({ props }) => ({
              class: { '!opacity-100 !pointer-events-auto': props.disabled }
            })
          }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />

        <InputText
          class="h-10 col-span-2"
          type="text"
          v-model="lrn"
          v-tooltip.bottom="lrn ? 'LRN' : ''"
          placeholder="LRN"
          @update:modelValue="handleUpdate"
          :pt="{
            root: ({ context }) => {
              return { class: [{ '!opacity-100 !pointer-events-auto': context.disabled }] }
            }
          }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />
        <Dropdown
          class="h-10 col-span-2"
          v-model="selectedCat"
          v-tooltip.bottom="selectedCat ? 'Category' : ''"
          :options="categories"
          placeholder="Category"
          @change="handleUpdate"
          :pt="{
            root: ({ props }) => ({
              class: { '!opacity-100 !pointer-events-auto': props.disabled }
            })
          }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />
      </div>
    </div>
  </BaseCard>
</template>
