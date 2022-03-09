import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';

const routes = [
  {
    path: '/',
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
