<template>
  <v-app>
    <!-- Top navigation bar -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>ChatGPT-Like Frontend</v-toolbar-title>
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <v-container class="fill-height d-flex flex-column align-center justify-center">
        <!-- Chat window (mockup) -->
        <v-card class="chat-window" outlined>
          <v-card-title>Chat Window</v-card-title>
          <v-card-text>
            <v-container>
              <!-- Placeholder for chat messages -->
              <p>Welcome! Start chatting with our AI assistant.</p>
              <v-divider></v-divider>
              <!-- Display example user message -->
              <div class="d-flex align-end justify-start">
                <v-avatar size="40" class="mr-3">
                  <v-icon color="primary">mdi-account</v-icon>
                </v-avatar>
                <v-chip class="user-message" color="blue lighten-4">Hello, can you help me?</v-chip>
              </div>
              <!-- Display example bot message -->
              <div class="d-flex align-start justify-start mt-3">
                <v-avatar size="40" class="mr-3">
                  <v-icon color="secondary">mdi-robot</v-icon>
                </v-avatar>
                <v-chip class="bot-message" color="green lighten-4">Sure, ask me anything!</v-chip>
              </div>
            </v-container>
          </v-card-text>
        </v-card>

        <!-- Chat input and button -->
        <v-card class="mt-4" outlined>
          <v-card-text>
            <v-container class="d-flex align-center">
              <v-text-field
                v-model="userInput"
                label="Type your message"
                outlined
                dense
                class="flex-grow-1"
              ></v-text-field>
              <v-btn @click="sendMessage" color="primary" class="ml-3">Send</v-btn>
            </v-container>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      userInput: "", // Model for user input
    };
  },
  methods: {
    sendMessage() {
      // Function to handle sending a message
      if (this.userInput) {
        alert(`Sending message: ${this.userInput}`);
        this.userInput = ""; // Clear input after sending
      }
    },
  },
};
</script>

<style scoped>
.chat-window {
  width: 100%;
  max-width: 600px;
  height: 400px;
  overflow-y: auto;
}

.user-message,
.bot-message {
  max-width: 60%;
}

.bot-message {
  background-color: #e6f4ea;
}

.user-message {
  background-color: #e3f2fd;
}
</style>
