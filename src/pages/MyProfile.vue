<template>
    <div class="profile-container">
      <div class="profile-window">
        <!-- Sidebar -->
        <div class="sidebar">
          <ul>
            <li :class="{ active: activeTab === 'personal' }" @click="setActiveTab('personal')">Personal Information</li>
            <li :class="{ active: activeTab === 'password' }" @click="setActiveTab('password')">Change Password</li>
            <li :class="{ active: activeTab === 'delete' }" @click="setActiveTab('delete')">Delete Account</li>
          </ul>
        </div>
  
        <!-- Content area -->
        <div class="content">
          <div class="close-button">
            <button @click="goBackToDashboard">×</button>
          </div>
  
          <div v-if="activeTab === 'personal'">
            <h2>Personal Information</h2>
            <p><strong>Username:</strong> {{ userInfo.username }}</p>
            <p><strong>Email:</strong> {{ userInfo.email }}</p>
            <p><strong>User Group:</strong> {{ userInfo.userGroup }}</p>
          </div>
  
          <div v-if="activeTab === 'password'">
            <h2>Change Password</h2>
            <input type="password" v-model="passwordData.oldPassword" placeholder="Current Password" />
            <input type="password" v-model="passwordData.newPassword" placeholder="New Password" />
            <input type="password" v-model="passwordData.confirmPassword" placeholder="Confirm New Password" />
            <button class="profile-btn" @click="changePassword">Change Password</button>
          </div>
  
          <div v-if="activeTab === 'delete'">
            <h2>Delete Account</h2>
            <p>If you delete your account, all of your data will be lost. This action cannot be undone.</p>
            <button class="delete-btn profile-btn" @click="deleteAccount">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 'personal', // Default tab
        userInfo: {
          username: 'JohnDoe', // Placeholder user data
          email: 'john@example.com',
          userGroup: 'Student',
        },
        passwordData: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
      };
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
      },
      changePassword() {
        if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
          alert("Passwords don't match!");
          return;
        }
        // API call to change password
        console.log('Password changed:', this.passwordData);
        alert('Password change functionality is not yet implemented.');
      },
      deleteAccount() {
        const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmation) {
          // API call to delete account
          console.log('Account deleted');
          alert('Delete account functionality is not yet implemented.');
        }
      },
      goBackToDashboard() {
        this.$router.push('/student-dashboard');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Container to center the profile window */
  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  /* Profile window with fixed size */
  .profile-window {
    display: flex;
    width: 800px; /* Fixed width */
    height: 500px; /* Fixed height */
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
  
  input {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  
  .profile-btn {
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
  
  .profile-btn:hover {
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
  </style>
  