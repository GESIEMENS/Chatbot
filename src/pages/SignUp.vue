<template>
  <div class="signup-container">
    <div class="form-wrapper">
      <h1 class="signup-title">Create Your Account</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="formData.email"
            type="email"
            id="email"
            class="form-input"
            placeholder="Enter your email"
            required
          />
        </div>

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
          <label for="password">Password</label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            class="form-input"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="form-group">
          <label for="userGroup">User Group</label>
          <select v-model="formData.userGroup" id="userGroup" class="form-input" required>
            <option value="ADMIN">Admin</option>
            <option value="STAFF">Staff</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>

        <button type="submit" class="submit-btn">Sign Up</button>
      </form>

      <!-- Add login link below the form -->
      <div class="login-link">
        <p>Already have an account?
          <router-link to="/login" class="login-text">Login</router-link>
        </p>
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        email: "",
        username: "",
        password: "",
        userGroup: "STUDENT", // Default value
      },
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/register/", {
          email: this.formData.email,
          username: this.formData.username,
          password: this.formData.password,
          userGroup: this.formData.userGroup,
        });

        if (response.status === 201) {
          // Success handling (e.g., redirect or success message)
          console.log("User registered successfully");
        }
      } catch (error) {
        this.errorMessage = "Failed to register. Please try again.";
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* General Layout */
.signup-container {
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
.signup-title {
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

/* Login link below the form */
.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-text {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.login-text:hover {
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
