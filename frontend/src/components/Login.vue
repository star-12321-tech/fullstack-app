<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="12" class="pa-4">
          <v-card-title class="justify-center">
            <h2>Login</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login" ref="form">
              <v-text-field
                v-model="username"
                label="Username"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                outlined
                required
              ></v-text-field>
              <v-btn
                color="primary"
                class="mt-4"
                type="submit"
                block
              >
                Login
              </v-btn>
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
    async login() {
      try {
        const res = await axios.post('http://localhost:3001/api/login', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('token', res.data.token);
        this.$router.push('/dashboard');
      } catch (err) {
        alert('Invalid credentials');
      }
    }
  }
};
</script>

<style scoped>
/* Optional: add custom styles if needed */
</style>