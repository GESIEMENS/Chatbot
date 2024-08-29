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
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="togglePasswordVisibility"
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
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      emailErrors: [],
      passwordErrors: [],
      showPassword: false
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    validateCredentials() {
      this.emailErrors = [];
      this.passwordErrors = [];
      if (this.email !== 'true@email') {
        this.emailErrors.push('Please enter a valid email address.');
      } else if (this.password !== 'true@password') {
        this.passwordErrors.push('Password error');
      } else {
        this.$router.push('/home'); // Navigate to the home page
      }
    },
    goToSignUp() {
      this.$router.push('/sign-up');
    },
    skipLogin() {
      this.$router.push('/home'); // Direct navigation for development/testing
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
  color: #8B4513; /* Adjust this color as needed */
}
</style>
