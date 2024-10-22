import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import SignUp from '@/pages/SignUp.vue';
import GuestDashboard from '@/pages/GuestDashboard.vue';
import StudentDashboard from '@/pages/StudentDashboard.vue';
import WelcomePage from '@/pages/WelcomePage.vue';  
import MyProfile from '@/pages/MyProfile.vue';
import BookingPage from '@/pages/BookingPage.vue';
import UnitSelectionPage from '@/pages/UnitSelectionPage.vue';
import Dashboard from '@/pages/Dashboard.vue';
import AccountManagement from '@/pages/AccountManagement.vue';
import Policies from '@/pages/Policies.vue';
import Reporting from '@/pages/Reporting.vue';
import BookingManagement from '@/pages/BookingManagement.vue';

const routes = [
  {
    path: '/', 
    name: 'WelcomePage',
    component: WelcomePage,
  },
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
  {
    path: '/student-dashboard',
    component: Dashboard,
    props: { role: 'STUDENT' }
  },
  {
    path: '/admin-dashboard',
    component: Dashboard,
    props: { role: 'ADMIN' }
  },
  {
    path: '/staff-dashboard',
    component: Dashboard,
    props: { role: 'STAFF' }
  },
  {
    path: '/profile',
    name: 'MyProfile',
    component: MyProfile,
  },
  {
    path: '/booking',
    name: 'BookingPage',
    component: BookingPage,
  },
  {
    path: '/booking-management',
    name: 'BookingManagement',
    component: BookingManagement,
  },
  {
    path: '/unit-selection',
    name: 'UnitSelectionPage',
    component: UnitSelectionPage,
  }, 
  {
    path: '/account-management',
    name: 'AccountManagement',
    component: AccountManagement, 
  },   
  {
    path: '/policies',
    name: 'Policies',
    component: Policies, 
  },  
  {
    path: '/reporting',
    name: 'Reporting',
    component: Reporting, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
