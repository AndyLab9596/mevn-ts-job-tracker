import AddJobView from '@/views/AddJobView.vue';
import AllJobView from '@/views/AllJobView.vue';
import ProfileView from '@/views/ProfileView.vue';
import StatsView from '@/views/StatsView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/stats',
      children: [
        {
          path: 'stats',
          component: StatsView,
          name: 'stats',
        },
        {
          path: 'all-jobs',
          component: AllJobView,
          name: 'all-jobs',
        },
        {
          path: 'add-job',
          component: AddJobView,
          name: 'add-job',
        },
        {
          path: 'profile',
          component: ProfileView,
          name: 'profile',
        },
      ],
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('@/views/LandingView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
    },
  ],
});

export default router;
