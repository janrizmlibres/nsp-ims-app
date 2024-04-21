<template>
  <div class="flex">
    <div class="flex grow text-4xl">
      <img src="@/assets/logo.png" alt="Girl in a jacket" class="size-24" />
      <h1 class="mt-2">{{ header }}</h1>
    </div>

    <div class="flex gap-6">
      <a href="#">
        <font-awesome-icon icon="fa-solid fa-gear" />
        <span class="ml-1.5">Settings</span>
      </a>

      <a href="#">
        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
        <span class="ml-1.5">Logout</span>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps(['header'])
</script>
