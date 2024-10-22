<template>
    <div class="policies-container">
      <div class="policies-window">
        <!-- Sidebar -->
        <div class="sidebar">
          <ul>
            <li :class="{ active: activeTab === 'search' }" @click="setActiveTab('search')">Search Policies</li>
            <li :class="{ active: activeTab === 'new' }" @click="setActiveTab('new')">New Policy</li>
          </ul>
        </div>
  
        <!-- Content area -->
        <div class="content">
          <div class="close-button">
            <button @click="goBackToDashboard">×</button>
          </div>
  
          <div v-if="activeTab === 'search'">
            <h2>Search Policies</h2>
              <table border="1" cellpadding="10" cellspacing="0">
                <thead>
                  <tr>
                    <th>Policy Name</th>
                    <th>Policy Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tableData in paginatedData" :key="index">
                    <td>{{ tableData.policyName }}</td>
                    <td>{{ tableData.policyCategory }}</td>
                    <td>
                      <div class="action">
                        <ul>
                          <li :class="{ active: activeTab === 'detail' }"  @click="setActiveTab('detail')">Detail</li> 
                          <li :class="{ active: activeTab === 'detail' }"  @click="setActiveTab('update')">Update</li>
                          <li :class="{ active: activeTab === 'detail' }"  @click="deletePolicy">Delete</li>
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
            <h2>Policy Detail</h2>
            <table border="1" cellpadding="10" cellspacing="0">
                  <tr>
                    <td>Policy Name</td>
                    <td>Sumarto</td>
                  </tr>
                  <tr>
                    <td>Policy Category</td>
                    <td>Health and Safety</td>
                  </tr>
                  <tr>
                    <td>Created By</td>
                    <td>Sumarto</td>
                  </tr>
                  <tr>
                    <td>Created Date</td>
                    <td>September 14, 2024 10:00 AM</td>
                  </tr>
                  <tr>
                    <td>Updated By</td>
                    <td>Sumarto</td>
                  </tr>
                  <tr>
                    <td>Created Date</td>
                    <td>October 14, 2024 10:00 AM</td>
                  </tr>
                  <tr>
                    <td>File</td>
                    <td><button class="download-btn" @click="downloadFilePolicy">Download</button></td>
                  </tr>
            </table>
            <button class="update-btn" @click="updatePolicy">Update</button>
            <button class="delete-btn" @click="deletePolicy">Delete</button>
          </div>

          <div v-if="activeTab === 'update'">
            <h2>Policy Update</h2>
            <label for="name">Policy Name:</label>
            <input type="text" id="date" v-model="selectedPolicy.name" />
            
            <label for="category">Policy Category:</label>
            <div class="select-wrapper">
              <select id="idCategory" required>
                <option value="" disabled>Select category</option>
                <option value="Finance">Finance</option>
                <option value="Health" selected>Health and Safety</option>
                <option value="HR">Human Resources</option>
              </select>
              <i class="fas fa-chevron-down select-arrow"></i> 
            </div>

            <label for="file">File: {{ selectedPolicy.file }} </label>
            <input type="file" @change="onFileChange" />

            <!-- Display selected file details (optional) -->
            <div v-if="selectedFile">
              <p><strong>Selected File:</strong> {{ selectedFile.name }}</p>
              <p><strong>Size:</strong> {{ selectedFile.size }} bytes</p>
            </div>
            
            <!-- Upload Button -->
            <button class="upload-btn" @click="uploadFile" :disabled="!selectedFile">Submit</button>
          </div>
  
          <div v-if="activeTab === 'new'">
            <h2>New Policy</h2>
            <label for="name">Policy Name:</label>
            <input type="text" id="date" v-model="newPolicy.name" />
            
            <label for="category">Policy Category:</label>
            <div class="select-wrapper">
              <select id="idCategory" required>
                <option value="" disabled>Select category</option>
                <option value="Finance">Finance</option>
                <option value="Health">Health and Safety</option>
                <option value="HR">Human Resources</option>
              </select>
              <i class="fas fa-chevron-down select-arrow"></i> 
            </div>

            <label for="file">Upload File:</label>
            <input type="file" @change="onFileChange" />

            <!-- Display selected file details (optional) -->
            <div v-if="selectedFile">
              <p><strong>Selected File:</strong> {{ selectedFile.name }}</p>
              <p><strong>Size:</strong> {{ selectedFile.size }} bytes</p>
            </div>
            
            <!-- Upload Button -->
            <button class="upload-btn" @click="uploadFile" :disabled="!selectedFile">Submit</button>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 'search', // Default to 'Search Bookings' tab
        newPolicy: {
          name: '',
          category: '',
          linkfile: ''
        },
        selectedPolicy: {
          name: 'selected Policy Name',
          category: '',
          linkfile: 'fileName.pdf'
        },
        selectedBookingToCancel: '',
        tableData: [
          { policyName: "Policy1", policyCategory: "Study" },
          { policyName: "Policy2", policyCategory: "Health" },
          { policyName: "Policy3", policyCategory: "Class" },
          { policyName: "Policy4", policyCategory: "Study" },
          { policyName: "Policy5", policyCategory: "Study" },
          { policyName: "Policy6", policyCategory: "Study" },
          { policyName: "Policy7", policyCategory: "Study" },
          { policyName: "Policy8", policyCategory: "Study" },
        ],
        currentPage: 1,
        itemsPerPage: 4,
        selectedFile: null // To store the selected file
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
      confirmPolicy() {
        console.log('New policy saved:', this.newPolicy);
        alert('New policy functionality is not yet implemented.');
      },
      goBackToDashboard() {
        this.$router.push('/student-dashboard');
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
      updatePolicy() {
        console.log('Policy is updated');
        alert('This functionality is not yet implemented.');
      },
      deletePolicy() {
        console.log('Policy is deleted');
        alert('This functionality is not yet implemented.');
      },
      downloadFilePolicy() {
        console.log('Policy File is downloaded');
        alert('This functionality is not yet implemented.');
      },
      
      // Handle the file change event
      onFileChange(event) {
        const file = event.target.files[0]; // Get the first selected file
        this.selectedFile = file; // Store the file in the component's state
      },

      // Method to handle the file upload
      uploadFile() {
      if (!this.selectedFile) return;

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // Simulate a file upload using fetch (replace URL with actual upload endpoint)
      fetch('https://example.com/upload', {
        method: 'POST',
        body: formData
      })      
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded successfully:', data);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
     }
    }
  };
  </script>
  
  <style scoped>
  /* Container to center the booking window */
  .policies-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  /* Booking window with fixed size */
  .policies-window {
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
  select {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  
  .upload-btn {
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

  .pagination {
    margin-top: 10px;
  }

  .paged {
    margin: 5px;
    color: #007bff;
    text-decoration: underline;
    font-size: small;
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

  .update-btn {
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

  .delete-btn {
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

  .download-btn {
    text-decoration: underline;
    color: rgb(0, 116, 249);
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    font-weight: bold;
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
  