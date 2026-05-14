<template>
  <div class="py-5">

    <!-- Header -->
    <div class="header-section mb-5 text-center">
      <h1 class="display-5 fw-bold text-dark">
        Your Dream Vacations
      </h1>

      <p class="text-muted">
        Manage and explore your personalized travel bucket list
      </p>
    </div>



    <!-- Add Button -->
    <div class="text-center mb-4">

      <router-link
        to="/create"
        class="btn btn-success btn-lg rounded-pill px-5 shadow"
      >
        + Add New Destination
      </router-link>

    </div>



    <!-- Loading -->
    <div
      v-if="loading"
      class="text-center"
    >
      <h5>Loading...</h5>
    </div>



    <!-- No Data -->
    <div
      v-else-if="items.length === 0"
      class="text-center"
    >
      <h5>No Destinations Found</h5>
    </div>



    <!-- Cards -->
    <div
      v-else
      class="row g-4"
    >

      <div
        v-for="item in items"
        :key="item._id"
        class="col-md-6 col-lg-4"
      >

        <div class="card h-100 border-0 shadow-lg modern-card">

          
          <!-- Header Color -->
          <div
            class="card-header-gradient"
            :style="{ background: item.color }"
          ></div>



          <!-- Card Body -->
          <div class="card-body p-4">

            
            <!-- Country + Tags -->
            <div
              class="d-flex justify-content-between align-items-center mb-2"
            >

              <small
                class="text-uppercase fw-bold text-muted letter-spacing"
              >
                {{ item.country }}
              </small>


              <div class="tag-group">

                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="badge rounded-pill bg-light text-dark border me-1"
                >
                  {{ tag }}
                </span>

              </div>

            </div>



            <!-- Destination -->
            <h3 class="fw-bold mb-3">
              {{ item.destination }}
            </h3>



            <!-- Description -->
            <p class="text-secondary small mb-4 line-clamp">
              {{ item.description }}
            </p>



            <!-- Buttons -->
            <div class="d-flex justify-content-between border-top pt-4">

              
              <!-- Details -->
              <router-link
                :to="'/details/' + item._id"
                class="btn btn-gradient px-4"
                :style="{ background: item.color }"
              >
                View Details
              </router-link>



              <!-- Delete -->
              <button
                @click="handleDelete(item._id)"
                class="btn btn-outline-danger btn-sm rounded-circle"
              >
                ✕
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>





<script setup lang="ts">

import { ref, onMounted } from 'vue';
import axios from 'axios';




// API URL
const API_URL = import.meta.env.VITE_API_URL;




// Types
interface Adventure {

  _id: string;
  destination: string;
  country: string;
  description: string;
  color: string;
  tags: string[];

}




// State
const items = ref<Adventure[]>([]);

const loading = ref(false);



// GET API
const fetchAdventures = async () => {

  loading.value = true;

  try {

    const response = await axios.get(
      `https://assigment-6-be-2.onrender.com/adventures`
    );

    items.value = response.data.data;

  } catch (error) {

    console.log(
      'GET API Error:',
      error
    );

  } finally {

    loading.value = false;

  }

};




// DELETE API
const handleDelete = async (id: string) => {

  const confirmDelete = confirm(
    'Delete this memory?'
  );

  if (!confirmDelete) return;


  try {

    await axios.delete(
      `https://assigment-6-be-2.onrender.com/adventures/${id}`
    );


    // Refresh List
    fetchAdventures();

  } catch (error) {

    console.log(
      'DELETE API Error:',
      error
    );

  }

};




// Auto Fetch Data
onMounted(() => {

  fetchAdventures();

});

</script>





<style scoped>

.modern-card {
  transition: 0.3s ease;
  border-radius: 20px;
  overflow: hidden;
}

.modern-card:hover {
  transform: translateY(-5px);
}

.card-header-gradient {
  height: 10px;
}

.line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.letter-spacing {
  letter-spacing: 1px;
}

</style>