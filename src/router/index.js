import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@components/Dashboard.vue';
import Login from '@components/Login.vue';

const routes = [
  {
    name: 'dashboard',
    path: '/',
    component: Dashboard,
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
