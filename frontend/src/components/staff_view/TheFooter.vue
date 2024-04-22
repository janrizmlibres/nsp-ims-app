<script setup>
defineProps(['staffCount'])
</script>

<template>
  <div class="pl-8 pt-2 font-medium">
    <p>
      Record(s) count: <span class="u-txt-red"> {{ staffCount }} </span>
    </p>
  </div>
</template>
