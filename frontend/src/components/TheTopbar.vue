<script setup>
import Breadcrumb from 'primevue/breadcrumb'

import { ref } from 'vue'

const home = ref({
  label: 'Dashboard',
  icon: 'fa fa-home',
  route: '/'
})
</script>

<template>
  <div class="flex justify-content-center w-full mt-4">
    <Breadcrumb
      :home="home"
      :model="items"
      :pt="{
        root: {
          class: [
            'rounded-xl',
            'w-full py-6',
            'bg-transparent dark:bg-surface-700',
            'border-none border-surface-200 dark:border-surface-700',
            'overflow-x-auto',
            'text-3xl'
          ]
        },
        menu: {
          class: ['flex items-center flex-nowrap', 'm-0 p-0 list-none leading-none u-txt-active']
        },
        action: {
          class: [
            'flex items-center',
            'rounded-md',
            'text-surface-600 dark:text-white/70',
            'focus-visible:outline-none focus-visible:outline-offset-0',
            'focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50',
            'transition-shadow duration-200',
            'text-decoration-none'
          ]
        },
        icon: {
          class: 'text-surface-600 dark:text-white/70'
        },
        separator: {
          class: ['flex items-center', ' mx-4', 'u-txt-active dark:text-white/70']
        }
      }"
    >
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color mr-4']" />
            <span class="u-txt-link dark:text-primary-400 font-semibold">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="[item.icon, 'text-color mr-4']" />
          <span class="u-txt-active dark:text-surface-0/80">{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
  </div>
</template>
