<template>
  <v-container>
    <v-row justify="space-between" align="center" class="mb-4">
      <v-col>
        <v-toolbar-title>Dashboard</v-toolbar-title>
      </v-col>
      <v-col class="text-right">
        <v-btn color="primary" @click="logout">Logout</v-btn>
      </v-col>
    </v-row>
    <todo-list></todo-list>
  </v-container>
</template>

<script>
import TodoList from './TodoList.vue';

export default {
  components: { TodoList },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>