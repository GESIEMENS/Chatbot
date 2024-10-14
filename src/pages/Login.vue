<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <v-card class="pa-10" width="400" elevation="2">
      <!-- Welcome Message and Icon -->
      <v-row justify="center" class="mb-8">
        <v-col cols="12" class="text-center">
          <v-icon size="56px">mdi-account-circle</v-icon>
          <h2>Welcome Back</h2>
        </v-col>
      </v-row>

      <!-- Email Input Field -->
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="Email Address*"
        outlined
        class="mb-4"
        @keydown.enter="validateCredentials"
      ></v-text-field>

      <!-- Password Input Field -->
      <v-text-field
        v-model="password"
        type="password"
        label="Password*"
        outlined
        class="mb-4"
        :error-messages="passwordErrors"
        @keydown.enter="validateCredentials"
      ></v-text-field>

      <!-- Continue Button -->
      <v-btn block color="brown" class="white--text mb-2" @click="validateCredentials">
        Continue
      </v-btn>

      <!-- Skip Login Button for Development/Testing -->
      <v-btn block color="grey" class="white--text mb-6" @click="skipLogin">
        Skip Login (Dev)
      </v-btn>

      <!-- Sign-up Prompt -->
      <v-row justify="center" class="mt-4">
        <p>Don't have an account? <a href="#" @click="goToSignUp" class="text-decoration-none text-brown" style="cursor: pointer;">Sign Up</a></p>
      </v-row>

      <!-- Error Alert -->
      <v-alert v-if="loginError" type="error" dismissible class="mt-4">
        {{ loginError }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      emailErrors: [],
      passwordErrors: [],
      loginError: null,
    };
  },
  methods: {
    async validateCredentials() {
      this.emailErrors = [];
      this.passwordErrors = [];
      this.loginError = null;

      if (!this.email) {
        this.emailErrors.push('Please enter a valid email address.');
      }
      if (!this.password) {
        this.passwordErrors.push('Password cannot be empty.');
      }

      if (this.emailErrors.length === 0 && this.passwordErrors.length === 0) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/dj-rest-auth/login/', {
            username: this.email,
            password: this.password,
          });
          console.log('Login successful!', response.data);
          this.$router.push('/home'); 
        } catch (error) {
          if (error.response) {

            const errorData = error.response.data;
            if (errorData.non_field_errors) {
              this.loginError = errorData.non_field_errors[0]; 
            } else if (errorData.username) {
              this.emailErrors.push(errorData.username[0]); 
            } else if (errorData.password) {
              this.passwordErrors.push(errorData.password[0]); 
            } else {
              this.loginError = 'Login failed. Please try again.'; 
            }
          } else {
            this.loginError = 'Unable to connect to the server. Please try again later.';
          }
        }
      }
    },
    goToSignUp() {
      this.$router.push('/sign-up');
    },
    skipLogin() {
      this.$router.push('/home'); 
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
</style>
