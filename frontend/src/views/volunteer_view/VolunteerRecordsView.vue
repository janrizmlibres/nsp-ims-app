<template>
  <div>
    <h1>Teacher Records</h1>
    <div v-for="teacher in teachers" :key="teacher.id">
      <p>Name: {{ teacher.name }}</p>
      <p>Subject: {{ teacher.subject }}</p>
      <p>Email: {{ teacher.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teachers: [
        { id: 1, name: 'John Doe', subject: 'Math', email: 'johndoe@example.com' },
        { id: 2, name: 'Jane Smith', subject: 'English', email: 'janesmith@example.com' },
      ]
    };
  }
};
</script>