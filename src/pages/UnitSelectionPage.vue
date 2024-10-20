<template>
    <div class="unit-selection-container">
      <div class="unit-selection-window">
        <!-- Sidebar -->
        <div class="sidebar">
          <ul>
            <li :class="{ active: activeTab === 'current' }" @click="setActiveTab('current')">Current Units</li>
            <li :class="{ active: activeTab === 'add' }" @click="setActiveTab('add')">Add New Unit</li>
            <li :class="{ active: activeTab === 'remove' }" @click="setActiveTab('remove')">Remove Unit</li>
          </ul>
        </div>
  
        <!-- Content area -->
        <div class="content">
          <div class="close-button">
            <button @click="goBackToDashboard">×</button>
          </div>
  
          <div v-if="activeTab === 'current'">
            <h2>Current Units</h2>
            <p><strong>Unit 1:</strong> Introduction to Policy Studies</p>
            <p><strong>Unit 2:</strong> Advanced Legal Framework</p>
          </div>
  
          <div v-if="activeTab === 'add'">
            <h2>Add New Unit</h2>
            <label for="new-unit">Choose a Unit:</label>
            <select id="new-unit" v-model="newUnit">
              <option disabled value="">Select a unit</option>
              <option>Introduction to AI Ethics</option>
              <option>Policy and Technology</option>
              <option>Legal Foundations of Policy</option>
              <option>Global Policy Challenges</option>
            </select>
            <button class="unit-btn" @click="addUnit">Add Unit</button>
          </div>
  
          <div v-if="activeTab === 'remove'">
            <h2>Remove Unit</h2>
            <label for="remove-unit">Select a unit to remove:</label>
            <select id="remove-unit" v-model="unitToRemove">
              <option disabled value="">Select a unit</option>
              <option>Introduction to Policy Studies</option>
              <option>Advanced Legal Framework</option>
            </select>
            <button class="delete-btn unit-btn" @click="removeUnit">Remove Unit</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 'current', // Default to 'Current Units' tab
        newUnit: '', // Model for new unit selection
        unitToRemove: '', // Model for removing a unit
      };
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
      },
      addUnit() {
        if (!this.newUnit) {
          alert('Please select a unit to add.');
          return;
        }
        console.log('New unit added:', this.newUnit);
        alert('Add unit functionality is not yet implemented.');
      },
      removeUnit() {
        if (!this.unitToRemove) {
          alert('Please select a unit to remove.');
          return;
        }
        console.log('Unit removed:', this.unitToRemove);
        alert('Remove unit functionality is not yet implemented.');
      },
      goBackToDashboard() {
        this.$router.push('/student-dashboard');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Container to center the unit selection window */
  .unit-selection-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  /* Unit selection window with fixed size */
  .unit-selection-window {
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
  
  .unit-btn {
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
  
  .unit-btn:hover {
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
  