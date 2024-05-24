<script setup>
import ConfirmDialog from 'primevue/confirmdialog'
import Button from 'primevue/button'
</script>

<template>
  <ConfirmDialog group="user-headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div
        autofocus
        class="flex flex-col items-center p-5 bg-surface-0 dark:bg-surface-900 rounded-md"
        @keypress.enter="acceptCallback"
      >
        <div
          class="rounded-full bg-primarytext-white dark:text-surface-950 inline-flex justify-center items-center h-[6rem] w-[6rem] -mt-8"
        >
          <i class="text-5xl" :class="message.icon"></i>
        </div>
        <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
        <p class="mb-0">{{ message.message }}</p>
        <div class="flex items-center gap-2 mt-4">
          <Button :label="message.acceptLabel" @click="acceptCallback" class="w-[8rem]"></Button>
          <Button
            v-show="message.rejectLabel"
            :label="message.rejectLabel"
            outlined
            @click="rejectCallback"
            class="w-[8rem]"
          ></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>
