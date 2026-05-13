import { createRouter, createWebHistory } from 'vue-router';
import ListView from '../views/ListView.vue';
import DetailView from '../views/DetailView.vue';
import CreateView from '../views/CreateView.vue';

// Saare routes ek hi jagah define karein
const routes = [
  { 
    path: '/', 
    component: ListView 
  },
  { 
    path: '/details/:id', 
    component: DetailView, 
    props: true 
  },
  { 
    path: '/create', 
    component: CreateView 
  }
];

// Router ko routes define karne ke BAAD create karein
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;