<template>
    <div class="booking-container">
      <div class="booking-window">
        <!-- Sidebar -->
        <div class="sidebar">
          <ul>
            <!-- Booking Management (only visible for Admin and Staff) -->
            <li :class="{ active: activeTab === 'manage' }"  @click="setActiveTab('manage')">Manage Booking</li>
          </ul>
        </div>
  
        <!-- Content area -->
        <div class="content">
          <div class="close-button">
            <button @click="goBackToDashboard">×</button>
          </div>
  
          <div v-if="activeTab === 'manage'">
            <h2>Booking Request</h2>
            <table border="1" cellpadding="10" cellspacing="0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tableData in paginatedData" :key="index">
                  <td>{{ tableData.name }}</td>
                  <td>{{ tableData.date }}</td>
                  <td>{{ tableData.starttime }} - {{ tableData.endtime }}</td>
                  <td>
                    <div class="action">
                      <ul>
                        <li :class="{ active: activeTab === 'detail' }"  @click="setActiveTab('detail')">Detail</li> 
                        <li :class="{ active: activeTab === 'detail' }"  @click="acceptBooking">Accept</li>
                        <li :class="{ active: activeTab === 'detail' }"  @click="rejectBooking">Reject</li>
                      </ul>
                  </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination">
              <button class="paged" @click="prevPage" :disabled="currentpage === 1">Previous</button>
              <span>Page {{ currentPage }} of {{ totalPages }}</span>
              <button class="paged" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
            </div>
          </div>


          <div v-if="activeTab === 'detail'">
            <h2>Detail Booking</h2>
            <p><strong>Name:</strong> Sumarto</p>
            <p><strong>Date:</strong> December 14, 2024</p>
            <p><strong>Start Time:</strong> 09:00 AM</p>
            <p><strong>End Time:</strong> 10:00 AM</p>
            <p><strong>Question:</strong> How do I change my major?</p>

            <button class="accept-btn" @click="acceptBooking">Accept</button>
            <button class="reject-btn" @click="rejectBooking">Reject</button>
          </div>

        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 'manage', // Default to 'Current Bookings' tab
        tableData: [
          { name: "Sumarto", date: "December 14, 2024", starttime: "09:00 AM", endtime: "10:00 AM", action: "" },
          { name: "Chloe", date: "November 14, 2024", starttime: "09:00 AM", endtime: "10:00 AM", action: "" },
          { name: "Abigael", date: "April 14, 2024", starttime: "09:00 AM", endtime: "10:00 AM", action: "" },
          { name: "Hongyi", date: "April 14, 2024", starttime: "09:00 AM", endtime: "10:00 AM", action: "" },
          { name: "David", date: "April 14, 2024", starttime: "09:00 AM", endtime: "10:00 AM", action: "" },
          { name: "Alif", date: "April 14, 2024", starttime: "09:00 AM", endtime: "10:00 AM", action: "" },
          { name: "Boni", date: "April 14, 2024", starttime: "09:00 AM", endtime: "10:00 AM", action: "" }
        ],
        currentPage: 1,
        itemsPerPage: 4
      };
    },

    computed: {
      totalPages(){
        return Math.ceil(this.tableData.length / this.itemsPerPage);
      },    

    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.tableData.slice(start, end);
      }
    },

    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
      },
      goBackToDashboard() {
        this.$router.push('/student-dashboard');
      },
      acceptBooking() {
        console.log('Booking is accepted');
        alert('This functionality is not yet implemented.');
      },
      rejectBooking() {
        console.log('Booking is rejected');
        alert('This functionality is not yet implemented.');
      },
      prevPage(){
        if (this.currentPage > 1){
          this.currentPage--;
        }
      },
      nextPage(){
        if (this.currentPage < this.totalPages){
          this.currentPage++;
        }
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
    overflow-y: scroll;
  }
  
  h2 {
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }
  
  input,
  select, textarea {
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

  .accept-btn {
    background-color: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 40%;
    text-align: center;
    font-weight: bold;
    margin-top: 10px;
    margin-right: 10px;
  }

  .reject-btn {
    background-color: #ff0000;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 40%;
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

    /* Table style */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size:small;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .action ul {
    list-style: none;
    padding: 0;
  }

  .action li {
    cursor: pointer;
    color: #007bff;
    text-decoration: underline;
    text-decoration-color: #007bff;
  }

  .pagination {
    margin-top: 10px;
  }

  .paged {
    margin: 5px;
    color: #007bff;
    text-decoration: underline;
    font-size: small;
  }

  </style>
  