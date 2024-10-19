import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import SignUp from '@/pages/SignUp.vue';
import Home from '../pages/Home.vue'; 
import GuestDashboard from '@/pages/GuestDashboard.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',  
    name: 'SignUp',
    component: SignUp, 
  },
  {
    path: '/guest-dashboard',  
    name: 'GuestDashboard',
    component: GuestDashboard,  
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;