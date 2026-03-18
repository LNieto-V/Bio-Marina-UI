import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'

// ─── Public routes ──────────────────────────────────────────
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../../modules/home/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../../modules/auth/LoginView.vue'),
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
      path: '/map',
      name: 'map',
      component: () => import('../../modules/map/InteractiveMapView.vue'),
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../../modules/reports/ReportingView.vue'),
    },

    // ─── Admin (protected, nested) ──────────────────────────
    {
      path: '/admin',
      component: () => import('../../modules/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, roles: ['admin', 'investigador', 'editor'] },
      children: [
        {
          path: '',
          redirect: '/admin/dashboard',
        },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('../../modules/admin/views/DashboardView.vue'),
          meta: { title: 'Dashboard · BioMarina Admin' },
        },
        {
          path: 'species',
          name: 'admin-species',
          component: () => import('../../modules/admin/views/SpeciesListView.vue'),
          meta: { title: 'Especies · BioMarina Admin' },
        },
        {
          path: 'species/create',
          name: 'admin-species-create',
          component: () => import('../../modules/admin/views/SpeciesCreateView.vue'),
          meta: {
            title: 'Nueva Especie · BioMarina Admin',
            roles: ['admin', 'investigador'],
          },
        },
        {
          path: 'species/:id/edit',
          name: 'admin-species-edit',
          component: () => import('../../modules/admin/views/SpeciesEditView.vue'),
          meta: {
            title: 'Editar Especie · BioMarina Admin',
            roles: ['admin', 'investigador', 'editor'],
          },
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../../modules/admin/views/UsersListView.vue'),
          meta: {
            title: 'Usuarios · BioMarina Admin',
            roles: ['admin'],
          },
        },
        {
          path: 'reports',
          name: 'admin-reports',
          component: () => import('../../modules/admin/views/ReportsView.vue'),
          meta: { title: 'Reportes · BioMarina Admin' },
        },
      ],
    },

    // ─── Catch-all ──────────────────────────────────────────
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// ─── Global navigation guard ────────────────────────────────
router.beforeEach((to, _from, next) => {
  // Set document title
  if (to.meta.title) {
    document.title = to.meta.title as string
  } else {
    document.title = 'BioMarina — Catálogo de Especies Marinas'
  }

  const { isAuthenticated, currentUser } = useAuth()

  // Check authentication requirement
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  // Check role-level permissions for child routes
  const allowedRoles = to.meta.roles as string[] | undefined
  if (allowedRoles && currentUser.value) {
    if (!allowedRoles.includes(currentUser.value.rol)) {
      // Redirect to dashboard if authenticated but insufficient role
      return next({ name: 'admin-dashboard' })
    }
  }

  next()
})

export default router
