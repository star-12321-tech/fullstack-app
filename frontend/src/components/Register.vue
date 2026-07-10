<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-4">
          <v-card-title class="justify-center">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register" ref="form">
              <v-text-field label="Username" v-model="username" outlined required></v-text-field>
              <v-text-field label="Password" v-model="password" type="password" outlined required></v-text-field>
              <v-btn color="primary" class="mt-4" type="submit" block>Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:3001/api/register', {
          username: this.username,
          password: this.password
        });
        alert('Registration successful');
        this.$router.push('/login');
      } catch (err) {
        alert('Registration failed');
      }
    }
  }
};
</script>