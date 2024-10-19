<template>
  <div class="login-container">
    <div class="form-wrapper">
      <h1 class="login-title">Login to Your Account</h1>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input
            v-model="formData.username"
            type="text"
            id="username"
            class="form-input"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            class="form-input"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="submit-btn">Login</button>
      </form>

      <!-- Error message -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <!-- Signup link -->
      <div class="link-section">
        <p>Don't have an account?
          <router-link to="/signup" class="signup-text">Sign Up</router-link>
        </p>
        <p>
          <button @click="skipLogin" class="skip-btn-link">Continue as Guest</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login/", {
          username: this.formData.username,
          password: this.formData.password,
        });

        if (response.status === 200) {
          const userData = response.data;
          // Redirect based on login success
          this.$router.push('/dashboard');
        }
      } catch (error) {
        this.errorMessage = "Invalid login credentials. Please try again.";
        console.error(error);
      }
    },
    skipLogin() {
      // Redirect to guest dashboard
      this.$router.push('/guest-dashboard');
    },
  },
};
</script>

<style scoped>
/* General Layout */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8; /* Soft blue-grey background */
}

.form-wrapper {
  background-color: #ffffff; /* White card */
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Title */
.login-title {
  text-align: center;
  font-size: 1.8rem;
  color: #333; /* Dark text */
  margin-bottom: 20px;
}

/* Form Group */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-weight: 500;
  color: #555; /* Slightly muted label */
  margin-bottom: 8px;
  display: block;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #007bff; /* Blue highlight on focus */
  outline: none;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff; /* Primary blue */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

/* Links Section (Sign Up and Guest) */
.link-section {
  text-align: center;
  margin-top: 20px;
}

.signup-text {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.signup-text:hover {
  text-decoration: underline;
}

.skip-btn-link {
  background: none;
  border: none;
  color: #6c757d;
  text-decoration: underline;
  cursor: pointer;
}

.skip-btn-link:hover {
  color: #5a6268;
  text-decoration: underline;
}

/* Error Message */
.error-message {
  color: red;
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
}
</style>
