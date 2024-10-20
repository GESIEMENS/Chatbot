<template>
    <div class="welcome-container">
      <div class="popup">
        <h2>Welcome back</h2>
        <p>Log in or sign up to get smarter responses, upload files and images, and more.</p>
        <div class="popup-buttons">
          <button @click="navigateToLogin" class="popup-btn">Log in</button>
          <button @click="navigateToSignUp" class="popup-btn">Sign up</button>
          <button @click="stayLoggedOut" class="stay-logged-out">Continue as Guest</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateToLogin() {
        this.$router.push('/login'); // Navigates to the login page
      },
      navigateToSignUp() {
        this.$router.push('/signup'); // Navigates to the signup page
      },
      stayLoggedOut() {
        this.$router.push('/guest-dashboard'); // Redirect to guest dashboard
      },
    },
  };
  </script>
  
  <style scoped>
  .welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .popup {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    width: 300px;
  }
  
  .popup-buttons {
    margin-top: 20px;
  }
  
  .popup-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 20px;
    cursor: pointer;
    width: 100%;
  }
  
  .stay-logged-out {
    background-color: transparent;
    color: #007bff;
    border: none;
    cursor: pointer;
    margin-top: 10px;
  }
  </style>
  