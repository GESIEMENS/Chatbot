<template>
    <div class="booking-container">
      <div class="booking-window">
        <!-- Sidebar -->
        <div class="sidebar">
          <ul>
            <li :class="{ active: activeTab === 'current' }" @click="setActiveTab('current')">Current Bookings</li>
            <li :class="{ active: activeTab === 'new' }" @click="setActiveTab('new')">New Booking</li>
            <li :class="{ active: activeTab === 'cancel' }" @click="setActiveTab('cancel')">Cancel Booking</li>
          </ul>
        </div>
  
        <!-- Content area -->
        <div class="content">
          <div class="close-button">
            <button @click="goBackToDashboard">×</button>
          </div>
  
          <div v-if="activeTab === 'current'">
            <h2>Current Bookings</h2>
            <p><strong>Booking 1:</strong> April 14, 2024 - 10:00 AM</p>
            <p><strong>Booking 2:</strong> May 3, 2024 - 2:00 PM</p>
          </div>
  
          <div v-if="activeTab === 'new'">
            <h2>New Booking</h2>
            <label for="date">Choose Date:</label>
            <input type="date" id="date" v-model="newBooking.date" />
            
            <label for="time">Choose Time:</label>
            <input type="time" id="time" v-model="newBooking.time" />
            
            <button class="booking-btn" @click="confirmBooking">Confirm Booking</button>
          </div>
  
          <div v-if="activeTab === 'cancel'">
            <h2>Cancel Booking</h2>
            <p>Select a booking to cancel:</p>
            <select v-model="selectedBookingToCancel">
              <option disabled value="">Please select</option>
              <option>April 14, 2024 - 10:00 AM</option>
              <option>May 3, 2024 - 2:00 PM</option>
            </select>
            <button class="delete-btn booking-btn" @click="cancelBooking">Cancel Booking</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 'current', // Default to 'Current Bookings' tab
        newBooking: {
          date: '',
          time: '',
        },
        selectedBookingToCancel: '',
      };
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
      },
      confirmBooking() {
        if (!this.newBooking.date || !this.newBooking.time) {
          alert('Please select both a date and a time for the booking.');
          return;
        }
        console.log('New booking confirmed:', this.newBooking);
        alert('New booking functionality is not yet implemented.');
      },
      cancelBooking() {
        if (!this.selectedBookingToCancel) {
          alert('Please select a booking to cancel.');
          return;
        }
        console.log('Booking cancelled:', this.selectedBookingToCancel);
        alert('Cancel booking functionality is not yet implemented.');
      },
      goBackToDashboard() {
        this.$router.push('/student-dashboard');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Container to center the booking window */
  .booking-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  /* Booking window with fixed size */
  .booking-window {
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
  
  .booking-btn {
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
  
  .booking-btn:hover {
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
  