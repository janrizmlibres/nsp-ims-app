<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-100 rounded-lg shadow-md p-4">
          <h3 class="text-xl font-medium mb-2">Metrics</h3>
          <ul class="list-disc space-y-2">
            <li>Total Users: 100</li>
            <li>Active Users Today: 25</li>
            <li>New Users This Week: 12</li>
          </ul>
        </div>
        <div class="bg-gray-100 rounded-lg shadow-md p-4">
          <h3 class="text-xl font-medium mb-2">Recent Activity</h3>
          <ul class="list-disc space-y-2">
            <li>John Doe signed up.</li>
            <li>Jane Doe made a purchase.</li>
            <li>A new blog post was published.</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DashboardView'
  }
  </script>
  
  <style scoped>
  /* Add any additional styles specific to this component here */
  </style>  