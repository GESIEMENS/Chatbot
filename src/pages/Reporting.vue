<template>
    <div class="reporting-container">
      <div class="reporting-window">
        <!-- Sidebar -->
        <div class="sidebar">
            <ul>
            <li :class="{ active: activeTab === 'current' }" @click="setActiveTab('current')">Reporting</li>
          </ul>
        </div>
  
        <!-- Content area -->
        <div class="content">
          <div class="close-button">
            <button @click="goBackToDashboard">×</button>
          </div>
          <form>
            <div v-if="activeTab === 'current'">
            <h2> Reporting</h2>
                <div class="select-wrapper">
                <select v-model="newReport.option" id="userGroup" class="form-input" required>
                    <option value="" disabled>Select the report type</option>
                    <option value="Policies">Policies Report</option>
                    <option value="Bookings">Bookings Report</option>
                    <option value="User Questions">User Questions Report</option>
                    <option value="FAQ">FAQ Report</option>
                </select>
                <i class="fas fa-chevron-down select-arrow"></i> 
                </div>
          </div>    
            <button type="submit" class="submit-btn">Download</button>  
          </form>
        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 'current', // Default to 'Current Reporting' tab
        newReport: {
          option: '',
        },
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
  /* Container to center the reporting window */
  .reporting-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  /* Reporting window with fixed size */
  .reporting-window {
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

  .select-wrapper {
  position: relative;
}

.select-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; 
  color: #555; 
}

  </style>
  