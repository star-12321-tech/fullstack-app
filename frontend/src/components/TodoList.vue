<template>
  <v-container max-width="500">
    <v-card class="pa-4">
      <v-card-title class="text-h5 mb-4">Todo List</v-card-title>

      <!-- Input Field to Add Todo -->
      <v-row class="mb-4" align="center">
        <v-col cols="9">
          <v-text-field
            v-model="newTodo"
            label="New Todo"
            hide-details
            density="compact"
            @keyup.enter="addTodo"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-btn color="primary" block @click="addTodo">Add</v-btn>
        </v-col>
      </v-row>

      <!-- Todo List Items -->
      <v-list>
        <v-list-item v-for="todo in todos" :key="todo.id" class="px-0">
          <template v-slot:prepend>
            <v-checkbox-btn
              v-model="todo.completed"
              @change="updateTodo(todo)"
            ></v-checkbox-btn>
          </template>

          <v-text-field
            v-model="todo.title"
            hide-details
            density="compact"
            variant="underlined"
            :class="{ 'text-decoration-line-through text-grey': todo.completed }"
            @blur="updateTodo(todo)"
          ></v-text-field>

          <template v-slot:append>
            <v-btn
              icon="mdi-delete"
              variant="text"
              color="error"
              @click="deleteTodo(todo.id)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      todos: [],
      newTodo: ''
    };
  },
  methods: {
    async fetchTodos() {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3001/api/todos', {
        headers: { Authorization: token }
      });
      this.todos = res.data;
    },
    async addTodo() {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/api/todos',
        { title: this.newTodo },
        { headers: { Authorization: token } }
      );
      this.newTodo = '';
      this.fetchTodos();
    },
    async updateTodo(todo) {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3001/api/todos/${todo.id}`,
        { title: todo.title, completed: todo.completed },
        { headers: { Authorization: token } }
      );
    },
    async deleteTodo(id) {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/todos/${id}`, { headers: { Authorization: token } });
      this.fetchTodos();
    }
  },
  created() {
    this.fetchTodos();
  }
};
</script>