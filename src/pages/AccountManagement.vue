<template>
    <div class="account-management-container">
      <div class="account-management-window">
        <!-- Sidebar -->
        <div class="sidebar">
          <ul>
            <li :class="{ active: activeTab === 'search' }" @click="setActiveTab('search')">Search Account</li>
            <li :class="{ active: activeTab === 'delete' }" @click="setActiveTab('delete')">Delete Account</li>
            <li :class="{ active: activeTab === 'update' }" @click="setActiveTab('update')">Update Account</li>
          </ul>
        </div>
  
        <!-- Content area -->
        <div class="content">
          <div class="close-button">
            <button @click="goBackToDashboard">×</button>
          </div>
  
          <!-- Search Account Tab -->
          <div v-if="activeTab === 'search'">
            <h2>Search Account</h2>
            <label for="searchQuery">Search by username, userGroup, email domain, or ID:</label>
            <input type="text" id="searchQuery" v-model="searchQuery" placeholder="Enter search term" />
            <button class="action-btn" @click="searchAccount">Search</button>
  
            <div v-if="noPermission" class="error-message">
              <p>You do not have permission to perform this action.</p>
            </div>
  
            <div v-if="searchResults.length > 0">
              <h3>Search Results:</h3>
              <ul>
                <li v-for="user in searchResults" :key="user.id">
                  {{ user.username }} - {{ user.email }} ({{ user.userGroup }}) | UniKey: {{ user.uniKey }}
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Delete Account Tab -->
          <div v-if="activeTab === 'delete'">
            <h2>Delete Account</h2>
            <p>Enter the ID of the account to delete:</p>
            <input type="number" v-model="accountIdToDelete" placeholder="Enter user ID" />
            <button class="delete-btn action-btn" @click="deleteAccount">Delete Account</button>
  
            <div v-if="deleteError" class="error-message">
              <p>{{ deleteError }}</p>
            </div>
            <div v-if="deleteSuccess" class="success-message">
              <p>User deleted successfully.</p>
            </div>
          </div>
  
          <!-- Update Account Tab -->
          <div v-if="activeTab === 'update'">
            <h2>Update Account</h2>
            <p>Search for an account to update:</p>
            <input type="text" v-model="accountToUpdate" placeholder="Enter username or email" />
            <button class="action-btn" @click="loadAccountDetails">Search Account</button>
  
            <div v-if="selectedAccount">
              <h3>Update Details for {{ selectedAccount.username }}</h3>
              <label for="newUsername">New Username:</label>
              <input type="text" id="newUsername" v-model="selectedAccount.username" />
              
              <label for="newEmail">New Email:</label>
              <input type="email" id="newEmail" v-model="selectedAccount.email" />
              
              <label for="newUserGroup">New User Group:</label>
              <select v-model="selectedAccount.userGroup">
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
                <option value="STUDENT">Student</option>
              </select>
              
              <button class="action-btn" @click="updateAccount">Update Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        activeTab: 'search', // Default to 'Search Account'
        searchQuery: '',
        searchResults: [],
        noPermission: false,
        accountIdToDelete: '',
        deleteError: '',
        deleteSuccess: false,
        accountToUpdate: '',
        selectedAccount: null,
      };
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
        this.resetDeleteState();
      },
      searchAccount() {
        const apiUrl = `http://127.0.0.1:8000/api/search-users/?search=${this.searchQuery}`;
        axios
          .get(apiUrl)
          .then((response) => {
            this.noPermission = false;
            this.searchResults = response.data;
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.noPermission = true; // Handle permission error
            } else {
              console.error('Search failed', error);
            }
          });
      },
      deleteAccount() {
        const deleteUrl = `http://127.0.0.1:8000/api/delete-user/${this.accountIdToDelete}/`;
        axios
          .delete(deleteUrl)
          .then(() => {
            this.deleteSuccess = true;
            this.deleteError = '';
          })
          .catch((error) => {
            this.deleteSuccess = false;
            if (error.response.status === 403) {
              this.deleteError = 'You do not have permission to perform this action.';
            } else if (error.response.status === 404) {
              this.deleteError = 'User not found.';
            } else {
              this.deleteError = 'An error occurred while trying to delete the user.';
            }
          });
      },
      loadAccountDetails() {
        // Implement API call to fetch account details
        console.log('Loading account details for:', this.accountToUpdate);
        // Placeholder account details
        this.selectedAccount = {
          username: 'johndoe',
          email: 'john@example.com',
          userGroup: 'Student',
        };
      },
      updateAccount() {
        // Implement API call to update the account
        console.log('Updating account:', this.selectedAccount);
      },
      resetDeleteState() {
        this.deleteError = '';
        this.deleteSuccess = false;
      },
      goBackToDashboard() {
        this.$router.push('/admin-dashboard'); // Adjust as per user role
      },
    },
  };
  </script>
  
  <style scoped>
  /* Container to center the window */
  .account-management-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  /* Window with fixed size */
  .account-management-window {
    display: flex;
    width: 800px;
    height: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    background-color: #f9f9f9;
  }
  
  /* Sidebar styling */
  .sidebar {
    width: 250px;
    background-color: #34495e;
    padding: 1rem;
    color: white;
    display: flex;
    flex-direction: column;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    padding: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .sidebar li.active,
  .sidebar li:hover {
    background-color: #2c3e50;
  }
  
  /* Content area styling */
  .content {
    flex: 1;
    padding: 2rem;
    background-color: #fff;
    position: relative;
  }
  
  h2 {
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }
  
  input,
  select {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  
  .action-btn {
    background-color: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    text-align: center;
    font-weight: bold;
  }
  
  .action-btn:hover {
    background-color: #0056b3;
  }
  
  .delete-btn {
    background-color: #dc3545;
  }
  
  .delete-btn:hover {
    background-color: #c82333;
  }
  
  /* Close button */
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .close-button button {
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .close-button button:hover {
    color: #dc3545;
  }
  
  .error-message {
    color: red;
  }
  
  .success-message {
    color: green;
  }
  </style>
  