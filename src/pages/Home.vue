<template>
  <v-app>
    <!-- Top navigation bar -->
    <v-app-bar app color="#8B4513" dark>
      <!-- Buttons on the left side -->
      <v-btn icon @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn icon @click="createNewChat">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>

      <v-toolbar-title>USYD Policy Assistant</v-toolbar-title>

      <!-- Right side buttons -->
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="goToLogin">Login</v-btn>
      <v-btn color="secondary" @click="goToSignUp">Sign Up</v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" color="light-grey lighten-3" width="300">
      <!-- Sidebar main container -->
      <v-list>
        
        <!-- Functions section -->
        <v-subheader>Functions</v-subheader>
        <v-list-item @click="navigateTo('Calendar')">
          <v-list-item-title>Calendar</v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateTo('AccountManagement')">
          <v-list-item-title>Account Management</v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateTo('CheckPolicy')">
          <v-list-item-title>Check Policy</v-list-item-title>
        </v-list-item>

        <!-- Spacer to add space between sections -->
        <v-divider class="my-4"></v-divider>

        <!-- Chat History section -->
        <v-subheader>Chat History</v-subheader>
        <v-list-item-group v-model="chatHistoryIndex">
          <v-list-item v-for="(history, index) in chatHistory" :key="index" @click="navigateToChatHistory(history.id)">
            <v-list-item-content>
              <v-list-item-title>{{ history.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ history.subtitle }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

      </v-list>
    </v-navigation-drawer>


    <!-- Main content -->
    <v-main>
      <v-container class="fill-height d-flex flex-column align-center justify-center">
        <!-- Chat window -->
        <v-card class="chat-window" outlined>
          <v-card-title>Chat Window</v-card-title>
          <v-card-text>
            <v-container>
              <!-- Placeholder for chat messages -->
              <p>Welcome! Start chatting with our AI assistant.</p>
              <v-divider></v-divider>
              
              <!-- Display example user message on the right -->
              <div class="d-flex align-end justify-end mt-3">
                <v-chip class="user-message" color="blue lighten-4" style="white-space: normal;">
                  Hello, can you help me?
                </v-chip>
                <v-avatar size="40" class="ml-3">
                  <v-icon color="primary">mdi-account</v-icon>
                </v-avatar>
              </div>

              <!-- Display example bot message on the left -->
              <div class="d-flex align-start justify-start mt-3">
                <v-avatar size="40" class="mr-3">
                  <v-icon color="secondary">mdi-robot</v-icon>
                </v-avatar>
                <v-chip class="bot-message" color="green lighten-4" style="white-space: normal;">
                  Sure, ask me anything about the USYD Policy!
                </v-chip>
              </div>

            </v-container>
          </v-card-text>
        </v-card>


        <!-- Chat input styled like ChatGPT -->
        <v-container class="d-flex align-center" style="background-color: #f0f0f0; border-radius: 24px; padding: 10px; max-width: 800px; margin-top: 16px;">
          <!-- Left side microphone button -->
          <v-btn icon @click="startVoiceInput" style="margin-right: 8px;">
            <v-icon color="black">mdi-microphone</v-icon>
          </v-btn>

          <!-- User input field -->
          <v-text-field
            v-model="userInput"
            label="Message ChatBot"
            outlined
            dense
            hide-details
            style="flex-grow: 1; background-color: #f0f0f0; border-radius: 20px; border: none; box-shadow: none; color: black;"
          ></v-text-field>

          <!-- Right side send button -->
          <v-btn icon @click="sendMessage" style="margin-left: 8px;">
            <v-icon color="black">mdi-send</v-icon>
          </v-btn>
        </v-container>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false, // Controls the sidebar visibility
      chatHistory: [
        { title: "Conversation 1", subtitle: "Summary of conversation 1" },
        { title: "Conversation 2", subtitle: "Summary of conversation 2" },
      ],
      chatHistoryIndex: null, // For tracking selected history
      userInput: "", // Model for user input
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    createNewChat() {
      alert('New chat created!');
      // Logic for creating a new chat session
    },
    sendMessage() {
      if (this.userInput) {
        alert(`Sending message: ${this.userInput}`);
        this.userInput = ""; // Clear input after sending
      }
    },
    goToLogin() {
      this.$router.push({ name: 'Login' });
    },
    goToSignUp() {
      this.$router.push({ name: 'SignUp' });
    },
    startVoiceInput() {
      alert('Starting voice input...');
    },
  },
};
</script>

<style scoped>
.chat-window {
  width: 80%;
  max-width: 800px;
  height: 500px;
  overflow-y: auto;
}

.user-message,
.bot-message {
  max-width: 60%;
  white-space: normal; /* Ensure messages wrap */
}

.bot-message {
  background-color: #e6f4ea;
}

.user-message {
  background-color: #e3f2fd;
}
</style>
