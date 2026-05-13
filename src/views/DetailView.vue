<template>
  <div class="py-5 container max-width-600">

    <!-- Back Button -->
    <router-link
      to="/"
      class="btn btn-link text-decoration-none mb-4 p-0"
    >
      ← Back to Gallery
    </router-link>



    <!-- Card -->
    <div class="card border-0 shadow-lg p-4 rounded-4">

      <h2 class="fw-bold mb-4">
        Edit Destination
      </h2>



      <!-- Loading -->
      <div v-if="loading" class="text-center">
        <h5>Loading...</h5>
      </div>



      <!-- Form -->
      <form
        v-if="item"
        @submit.prevent="handleUpdate"
      >

        
        <!-- Destination -->
        <div class="mb-3">

          <label class="form-label small text-muted fw-bold">
            DESTINATION NAME
          </label>

          <input
            v-model="item.destination"
            type="text"
            class="form-control form-control-lg custom-input"
            required
          >

        </div>



        <!-- Country -->
        <div class="mb-3">

          <label class="form-label small text-muted fw-bold">
            COUNTRY
          </label>

          <input
            v-model="item.country"
            type="text"
            class="form-control form-control-lg custom-input"
            required
          >

        </div>



        <!-- Description -->
        <div class="mb-4">

          <label class="form-label small text-muted fw-bold">
            DESCRIPTION
          </label>

          <textarea
            v-model="item.description"
            rows="4"
            class="form-control custom-input"
          ></textarea>

        </div>



        <!-- Submit -->
        <div class="d-grid">

          <button
            type="submit"
            class="btn btn-primary btn-lg rounded-pill shadow"
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>

  </div>
</template>





<script setup lang="ts">

import { ref, onMounted } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import axios from 'axios';




// API URL
const API_URL = import.meta.env.VITE_API_URL;




// Router
const route = useRoute();

const router = useRouter();




// Loading State
const loading = ref(false);




// Adventure Type
interface Adventure {

  _id: string;

  destination: string;

  country: string;

  description: string;

  color: string;

  tags: string[];

}




// Item State
const item = ref<Adventure | null>(null);


// GET SINGLE DATA
const fetchAdventure = async () => {

  loading.value = true;

  try {

    const response = await axios.get(
      `${API_URL}/adventures`
    );



    // Find Item by ID
    const foundItem = response.data.data.find(

      (adventure: Adventure) =>
        adventure._id === route.params.id

    );



    item.value = foundItem;

  } catch (error) {

    console.log(
      'GET Adventure Error:',
      error
    );

  } finally {

    loading.value = false;

  }

};




// UPDATE API
const handleUpdate = async () => {

  try {

    await axios.put(

      `${API_URL}/adventures/${item.value?._id}`,

      item.value

    );



    alert(
      'Destination updated successfully!'
    );



    // Redirect Home
    router.push('/');

  } catch (error) {

    console.log(
      'UPDATE API Error:',
      error
    );

  }

};




// Auto Fetch
onMounted(() => {

  fetchAdventure();

});

</script>





<style scoped>

.custom-input {
  border-radius: 12px;
}

</style>