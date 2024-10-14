<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <v-card class="pa-10 card-size" elevation="2">
      <v-row justify="center" class="mb-6">
        <v-col cols="12" class="text-center">
          <v-icon size="56px" class="text-brown">mdi-account-circle</v-icon>
          <h2 class="text-brown">Register</h2>
        </v-col>
      </v-row>

      <v-form>
        <v-text-field
          label="Email"
          v-model="email"
          outlined
          dense
          class="mb-3"
        />
        <v-text-field
          label="Username"
          v-model="username"
          outlined
          dense
          class="mb-3"
        />
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          outlined
          dense
          class="mb-3"
        />
        <v-select
          :items="userGroups"
          label="User Group"
          v-model="userGroup"
          outlined
          dense
          class="mb-3"
        />
        <v-btn block color="brown" class="white--text mb-3" @click="register">
          Register
        </v-btn>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <span>Already have an account? </span>
        <router-link to="/login" class="text-decoration-none text-brown">Login</router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      userGroup: '',
      userGroups: ['STUDENT', 'STAFF', 'ADMIN']
    };
  },
  methods: {
    register() {
      const userData = {
        email: this.email,
        username: this.username,
        userGroup: this.userGroup,
        password: this.password,
      };
      axios.post('http://127.0.0.1:8000/api/register/', userData)
        .then(response => {
          alert('Registration successful');
          this.$router.push('/login');
        })
        .catch(error => {
          alert('Registration failed. Please try again.');
        });
    }
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.text-decoration-none {
  text-decoration: none;
}

.text-brown {
  color: #8B4513;
}

.v-btn {
  background-color: #8B4513 !important;
  color: white !important;
}

.v-card {
  border-radius: 12px;
  background-color: white;
}

.v-icon {
  color: #8B4513;
}

.card-size {
  width: 400px;
  max-width: 100%;
}
</style>
