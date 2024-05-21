<script setup>
// Presets
import { useRoute } from 'vue-router'
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue'
import EnrolledGradeView from '@/views/enrollment/EnrolledGradeView.vue'
import EnrolledModuleView from '@/views/enrollment/EnrolledModuleView.vue'
import EnrolledAttendanceView from '@/views/enrollment/EnrolledAttendanceView.vue'

const route = useRoute()
</script>

<template>
  <ContentPane header="Enrolled View" :subheader="route.query.studentFullName">
    <TabView class="p-2 bg-white shadow-xl rounded-md">
      <TabPanel>
        <template #header>
          <div class="flex items-center gap-2">
            <i class="fa fa-note-sticky" />
            <span class="u-txt-active">Modules</span>
          </div>
        </template>
        <EnrolledModuleView :schoolLevelId="route.query.schoolLevelId" :enrollmentId="route.query.enrollmentId" />
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="flex items-center gap-2">
            <i class="fa fa-star" />
            <span class="u-txt-active">Grades</span>
          </div>
        </template>
        <EnrolledGradeView :schoolLevelId="route.query.schoolLevelId" :enrollmentId="route.query.enrollmentId" />
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="flex items-center gap-2">
            <i class="fa fa-calendar-days" />
            <span class="u-txt-active">Attendance</span>
          </div>
        </template>
        <EnrolledAttendanceView :schoolLevelId="route.query.schoolLevelId" :enrollmentId="route.query.enrollmentId" />
      </TabPanel>
    </TabView>
  </ContentPane>
</template>