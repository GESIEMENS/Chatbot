<template>
  <v-container class="fill-height d-flex flex-column justify-space-between">
    <!-- Header with title and buttons -->
    <v-app-bar flat dense>
      <v-row class="fill-width">
        <v-col cols="auto">
          <h3 class="usyd-title">USYD Virtual Assistant</h3>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="d-flex align-center">
          <v-btn text color="black" class="small-btn" @click="goToLogin">Log In</v-btn>
          <v-btn text color="grey" class="small-btn ml-2" @click="goToSignUp">Sign Up</v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

  </v-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToSignUp() {
      this.$router.push('/sign-up');
    },
    sendMessage() {
      // Logic to send the message
      console.log("Message sent!");
    },
    recordVoice() {
      // Logic to start voice recording
      console.log("Recording voice...");
    }
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.usyd-title {
  font-weight: bold;
  font-size: 18px;
  margin-left: 16px;
}

.small-btn {
  font-size: 12px;
}

.v-icon {
  color: #333;
}

.even-box {
  height: 80px;  /* Reduced height to 2/3 */
  max-width: 800px;  /* Reduced width to 2/3 */
}

.smaller-box {
  min-width: 400px; /* Reduced button length */
}

.message-input {
  font-size: 14px;
  width: 100%; /* Ensure the input field stretches to full column width */
}

.v-text-field {
  width: 100%;
}

.v-btn {
  color: #000;
}

.v-btn .v-icon {
  font-size: 24px;
}

.v-row .v-col {
  margin-bottom: 10px; /* Add spacing between buttons to prevent overlap */
}
</style>
