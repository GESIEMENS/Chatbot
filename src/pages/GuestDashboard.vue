<template>
    <div class="dashboard-container">
      <!-- Top Bar (Fixed) -->
      <header class="top-bar">
        <div class="logo">
          <h1>USYD Virtual Assistant</h1>
        </div>
        <div class="auth-links">
          <router-link to="/login" class="auth-btn">Login</router-link>
          <router-link to="/signup" class="auth-btn">Sign Up</router-link>
        </div>
      </header>
  
      <!-- Main Layout with Sidebar and Chat -->
      <div class="main-layout">
        <!-- Sidebar (Fixed, no collapse) -->
        <aside class="sidebar">
          <ul>
            <li @click="setActiveFeature('policy')">Policy Feature</li>
            <li @click="setActiveFeature('booking')">Booking Feature</li>
            <li @click="setActiveFeature('calendar')">View Calendar</li>
            <li @click="setActiveFeature('unitSelection')">Unit Selection</li>
          </ul>
        </aside>
  
        <!-- Chat Area -->
        <div class="main-content">
          <h2>Chat with Policy Assistant</h2>
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
  export default {
    data() {
      return {
        userInput: '',
        messages: [],
      };
    },
    methods: {
      setActiveFeature(feature) {
        console.log('Selected feature:', feature);
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
    text-decoration: none;
    font-weight: bold;
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
    height: 70vh;
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
    word-wrap: break-word; /* Ensure long text wraps within the message bubble */
  }
  
  .user-message {
    justify-content: flex-end;
  }
  
  .message-bubble {
    padding: 10px 15px;
    border-radius: 20px;
    max-width: 60%;
    word-wrap: break-word; /* Ensure text wraps when it exceeds the bubble width */
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
    resize: none; /* Disable resizing for better UX */
    overflow-wrap: break-word; /* Automatically wrap long lines */
  }
  </style>
  