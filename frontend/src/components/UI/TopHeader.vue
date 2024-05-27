<script setup>
import { useAuthStore } from '@/stores/auth.js'
import router from '@/router'
import { useConfirm } from 'primevue/useconfirm'
import Button from 'primevue/button'
import { useSidebarStore } from '@/stores/sidebar';
import Breadcrumb from 'primevue/breadcrumb';
import { computed, ref } from 'vue';

const props = defineProps(['breadcrumb'])

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()

const confirm = useConfirm()

const buttonPt = {
  root: ({ props }) => ({
    class: [
      'h-2 w-2 transition-all duration-500 ease-in-out u-txt-pcolor',
      // Colors
      {
        'text-surface-100':
          !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
        'bg-transparent':
          !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
        'border-none':
          !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
      },
      // States
      {
        'bg-transparent hover:bg-transparent hover:transform hover:scale-[1.10]':
          !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
      },
      { 'focus:u-ring-scolor': props.severity === null }
    ]
  })
}

const home = ref({route: true})

const items = computed(() => props.breadcrumb)

const confirmLogout = () => {
  confirm.require({
    group: 'authenticationError',
    message: ' Are you sure you want to logout?',
    header: 'Confirmation',
    acceptButton: 'Logout',
    rejectButton: 'Cancel',
    accept: () => {
      logout()
    },
    reject: () => {}
  })
}

async function logout() {
  await authStore.logout()
  await router.push({ name: 'login' })
}
</script>

<template>
  <div class="flex flex-row h-auto u-txt-active mb-6 p-2">
    <div class="flex flex-row grow justify-between items-center bg-white shadow-md rounded-2xl">
      <Breadcrumb :home="home" :model="items" class="border-none unselectable !rounded-2xl">
        <template #item="{ item, props }">
          <span v-if="item.route">
            <Button
              v-if="sidebarStore.isPinned"
              icon="fa fa-bars-staggered u-txt-active ring-transparent"
              type="button"
              @click="sidebarStore.changePinnedState()"
              :pt="buttonPt"
              :pt-options="{ mergeProps: true, mergeSections: true }"
            >
            </Button>
            <Button
              v-else
              icon="fa fa-bars u-txt-active ring-transparent"
              type="button"
              @click="sidebarStore.changePinnedState()"
              :pt="buttonPt"
              :pt-options="{ mergeProps: true, mergeSections: true }"
            ></Button>
            </span>
            <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                <span class="text-lg font-semibold">{{ item.label }}</span>
            </a>
        </template>
      </Breadcrumb>

      <a href="#" @click="confirmLogout" class="flex gap-3 items-center p-4 px-6 hover:u-txt-pcolor hover:transform hover:scale-[1.10] transition-all duration-500 ease-in-out">
        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
        <span class="font-semibold">Logout</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background: #F2F2F2;
}
</style>
