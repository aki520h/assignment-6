<template>
  <div class="py-5 container max-width-600">
    <router-link to="/" class="btn btn-link text-decoration-none mb-4 p-0">← Back to Gallery</router-link>
    
    <div class="card border-0 shadow-lg p-4 rounded-4">
      <div class="text-center mb-4">
        <h2 class="fw-bold">Add New Adventure</h2>
        <p class="text-muted">Fill in the details to add a new spot to your list</p>
      </div>

      <form @submit.prevent="handleCreate">
        <div class="mb-3">
          <label class="form-label small text-muted fw-bold">DESTINATION NAME</label>
          <input v-model="newItem.destination" type="text" class="form-control custom-input" placeholder="e.g. Bali" required>
        </div>

        <div class="mb-3">
          <label class="form-label small text-muted fw-bold">COUNTRY</label>
          <input v-model="newItem.country" type="text" class="form-control custom-input" placeholder="e.g. Indonesia" required>
        </div>

        <div class="mb-4">
          <label class="form-label small text-muted fw-bold">DESCRIPTION</label>
          <textarea v-model="newItem.description" rows="3" class="form-control custom-input" placeholder="What makes this place special?"></textarea>
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-primary btn-lg rounded-pill shadow">Add to My List</button>
        </div>
      </form>
    </div>
  </div>
</template>



<style scoped>
.custom-color-picker {
  height: 45px;
  border-radius: 10px;
  border: 2px solid #eee;
}
</style>






<script setup lang="ts">

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';


// Form Data
const newItem = ref({

  destination: '',
  country: '',
  description: '',
  color: '#4facfe',
  tags: ['New']

});



// Store Database Data
const adventures = ref([]);




// GET API
const fetchAdventures = async () => {

  try {

    const response = await axios.get(
      'https://assigment-6-be-2.onrender.com/api/adventures'
    );

    adventures.value = response.data.data;

    console.log(response.data);

  } catch (error) {

    console.log('GET API Error:', error);

  }

};




// POST API
const handleCreate = async () => {

  try {

    await axios.post(
      'https://assigment-6-be-2.onrender.com/adventures',
      newItem.value
    );
    router.push('/');
    alert('Adventure Added Successfully');

    // Refresh Data
   fetchAdventures();



    // Reset Form
    newItem.value = {

      destination: '',
      country: '',
      description: '',
      color: '#4facfe',
      tags: ['New']

    };
    router.push('/');

  } catch (error) {

    console.log('POST API Error:', error);

  }

};




// Auto Fetch
onMounted(() => {

  fetchAdventures();

});

</script>





<style scoped>

.card {
  border-radius: 15px;
}

</style>