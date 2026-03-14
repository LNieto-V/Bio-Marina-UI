import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/AdvancedSearchView.vue'),
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('../views/CatalogView.vue'),
    },
    {
      path: '/species/:id',
      name: 'species-detail',
      component: () => import('../views/SpeciesDetailView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/InteractiveMapView.vue'),
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../views/ReportingView.vue'),
    },
  ],
})

export default router
