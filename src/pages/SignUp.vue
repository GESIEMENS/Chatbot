<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <v-card class="pa-10" width="400" elevation="2">
      <!-- Top icon -->
      <v-row justify="center" class="mb-8">
        <v-icon size="56px">mdi-account-circle</v-icon>
      </v-row>

      <!-- Create Account message -->
      <v-row justify="center" class="mb-8">
        <h2 class="text-center">Create An Account</h2>
      </v-row>

      <!-- Email input field -->
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="Email Address*"
        outlined
        class="mb-4"
        color="brown"
      ></v-text-field>

      <!-- Password input field -->
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        label="Password*"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="togglePasswordVisibility"
        outlined
        class="mb-4"
        color="brown"
      ></v-text-field>

      <!-- Continue button -->
      <v-btn block color="brown" class="white--text mb-6" @click="validateCredentials">
        Continue
      </v-btn>

      <!-- Log In prompt -->
      <v-row justify="center" class="mt-4">
        <p>Already have an account? <a @click="goToLogin" class="text-decoration-none text-brown" style="cursor: pointer;">Log In</a></p>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'SignUp',
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
    validateCredentials() {
      this.emailErrors = [];
      this.passwordErrors = [];
      if (this.email !== 'true@email') {
        this.emailErrors.push('Please enter a valid email address.');
      } else if (this.password !== 'true@password') {
        this.passwordErrors.push('Password error');
      } else {
        this.$router.push('/home'); // Navigate to the home page if both are correct
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.text-center {
  font-weight: bold;
  font-size: 24px;
}

.text-brown {
  color: #8B4513;
}

.text-decoration-none {
  text-decoration: none;
  cursor: pointer; /* Ensures cursor changes to pointer on hover over text */
}
</style>
