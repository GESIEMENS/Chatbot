<template>
  <div class="dashboard-container">
    <!-- Top Bar (Fixed) -->
    <header class="top-bar">
      <div class="logo">
        <h1>USYD Virtual Policy Assistant</h1>
      </div>
      <div class="auth-links">
        <button class="auth-btn logout-btn" @click="handleLogout">Logout</button>
      </div>
    </header>

    <!-- Main Layout with Sidebar and Chat -->
    <div class="main-layout">
      <!-- Sidebar with additional "Chat History" -->
      <aside class="sidebar">
        <ul>
          <li @click="setActiveFeature('profile')">My Profile</li>
          <li @click="setActiveFeature('booking')">Booking Feature</li>
          <li @click="setActiveFeature('unitSelection')">Unit Selection Feature</li>
          <li>Chat History</li>
          <ul>
            <li>Chat 1</li>
            <li>Chat 2</li>
            <li>Chat 3</li>
          </ul>
        </ul>
      </aside>

      <!-- Chat Area with Recommended Questions -->
      <div class="main-content">
        <h2>Chat with Policy Assistant</h2>
        <div class="recommended-questions">
          <h3>Recommended Questions</h3>
          <ul>
            <li @click="askQuestion('What is the policy on late submissions?')">What is the policy on late submissions?</li>
            <li @click="askQuestion('How do I appeal a grade?')">How do I appeal a grade?</li>
            <li @click="askQuestion('What are the academic misconduct rules?')">What are the academic misconduct rules?</li>
            <li @click="askQuestion('How do I request a special consideration?')">How do I request a special consideration?</li>
          </ul>
        </div>

        <div class="chat-container">
          <div class="chat-messages">
            <div v-for="(message, index) in messages" :key="index" class="chat-message" :class="{ 'user-message': message.user }">
              <div class="message-bubble" :class="message.user ? 'user-bubble' : 'assistant-bubble'">
                <p>{{ message.text }}</p>
              </div>
            </div>
          </div>

          <!-- Chat Input (Voice and Send buttons) -->
          <div class="chat-input">
            <v-btn icon @click="startVoiceInput">
              <v-icon color="black">mdi-microphone</v-icon>
            </v-btn>
            <textarea v-model="userInput" placeholder="Type a message..." class="input-box"></textarea>
            <v-btn icon @click="sendMessage">
              <v-icon color="black">mdi-send</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // For Logout API

export default {
  data() {
    return {
      userInput: '',
      messages: [],
    };
  },
  methods: {
    setActiveFeature(feature) {
      if (feature === 'profile') {
        this.$router.push('/profile'); // Navigate to My Profile page
      } else if (feature === 'booking') {
        this.$router.push('/booking'); // Navigate to Booking Feature page
      } else if (feature === 'unitSelection') {
        this.$router.push('/unit-selection'); // Navigate to Unit Selection Feature page
      }
      console.log('Selected feature:', feature);
    },
    askQuestion(question) {
      this.userInput = question;
      this.sendMessage(); // Automatically send the question
    },
    sendMessage() {
      if (this.userInput.trim() === '') return;
      this.messages.push({ text: this.userInput, user: true });
      this.userInput = '';

      setTimeout(() => {
        this.messages.push({ text: 'This is a response from the Policy Assistant.', user: false });
      }, 1000);
    },
    startVoiceInput() {
      console.log('Voice input started');
    },
    handleLogout() {
      axios.post('http://127.0.0.1:8000/api/logout/')
        .then(() => {
          this.$router.push('/login'); // Redirect to login page after successful logout
        })
        .catch((error) => {
          console.error('Logout failed', error);
        });
    },
  },
};
</script>

<style scoped>
/* General layout styling */
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Top bar styling (Fixed) */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.logo h1 {
  font-size: 1.5rem;
}

.auth-links {
  display: flex;
  gap: 1rem;
}

.auth-btn {
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.logout-btn {
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 20px; /* Adding rounded corners */
  color: white;
}

.auth-btn:hover {
  text-decoration: underline;
}

/* Main layout styling */
.main-layout {
  display: flex;
  flex: 1;
  padding-top: 60px; /* Space for the fixed top bar */
}

.sidebar {
  width: 250px;
  background-color: #34495e;
  color: white;
  padding: 1rem;
  transition: width 0.3s;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 1rem 0;
  cursor: pointer;
  color: white;
}

.sidebar li:hover {
  background-color: #2c3e50;
}

/* Recommended Questions */
.recommended-questions {
  margin-bottom: 20px;
}

.recommended-questions ul {
  list-style-type: none;
  padding: 0;
}

.recommended-questions li {
  padding: 10px;
  cursor: pointer;
  background-color: #f3f4f6;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background-color 0.2s;
}

.recommended-questions li:hover {
  background-color: #e0e0e0;
}

/* Chat container styling */
.main-content {
  flex: 1;
  padding: 2rem;
  margin: auto;
  max-width: 60%;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 10px;
  overflow-y: auto;
  border-radius: 8px;
}

/* Chat messages styling */
.chat-messages {
  flex: 1;
  overflow-y: auto;
}

.chat-message {
  display: flex;
  margin-bottom: 10px;
  word-wrap: break-word;
}

.user-message {
  justify-content: flex-end;
}

.message-bubble {
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 60%;
  word-wrap: break-word;
}

.user-bubble {
  background-color: #007bff;
  color: white;
}

.assistant-bubble {
  background-color: #e0e0e0;
  color: black;
}

/* Chat input styling */
.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
}

.input-box {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 0 10px;
  resize: none;
  overflow-wrap: break-word;
}
</style>
