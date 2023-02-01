import { useAuthStore } from '@/stores/authStore';
import AddJobView from '@/views/AddJobView.vue';
import AllJobView from '@/views/AllJobView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ProfileView from '@/views/ProfileView.vue';
import StatsView from '@/views/StatsView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/stats',
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      title: 'Landing',
    },
    component: () => import('@/views/LandingView.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    meta: {
      title: 'Register/Login',
      requiresUnAuth: true,
    },
    component: () => import('@/views/AuthView.vue'),
  },
  {
    path: '/:notFound(.*)',
    component: NotFoundView,
    meta: {
      title: 'Not Found',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();
  document.title = to.meta.title ? `${to.meta.title} | Jobify` : 'Jobify';
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'landing' });
  } else if (to.meta.requiresUnAuth && authStore.isAuthenticated) {
    next({ name: 'home' });
  }
  next();
});
export default router;
