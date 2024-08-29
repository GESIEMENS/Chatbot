import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import SignUp from '../pages/SignUp.vue';
import Home from '../pages/Home.vue'; // Import Home component

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/',
    redirect: '/login'  // Default to login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
