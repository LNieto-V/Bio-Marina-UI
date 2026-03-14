import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../../modules/home/HomeView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../../modules/admin/AdminView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../../modules/species/AdvancedSearchView.vue'),
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('../../modules/species/CatalogView.vue'),
    },
    {
      path: '/species/:id',
      name: 'species-detail',
      component: () => import('../../modules/species/SpeciesDetailView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../../modules/auth/LoginView.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../../modules/map/InteractiveMapView.vue'),
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../../modules/reports/ReportingView.vue'),
    },
  ],
})

export default router
