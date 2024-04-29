<script setup>
import { useStaffsStore } from '@/stores/staffs'
const staffsStore = useStaffsStore()
</script>

<template>
  <div class="pl-8 pt-2 font-medium">
    <p>
      Record(s) count: <span class="u-txt-red"> {{ staffsStore.staffs.length }} </span>
    </p>
  </div>
</template>
