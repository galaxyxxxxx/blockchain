import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@components/Dashboard.vue';
import Login from '@components/Login.vue';

const routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
