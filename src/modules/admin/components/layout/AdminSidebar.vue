<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'
import { useAdminPermissions } from '@/shared/composables/useAdminPermissions'
import { ROL_LABELS } from '@/shared/types/usuario'
import type { RolUsuario } from '@/shared/types/usuario'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const route  = useRoute()
const { currentUser, logout } = useAuth()
const { can, isAdmin } = useAdminPermissions()

const navLinks = computed(() => [
  {
    to:    '/admin/dashboard',
    name:  'admin-dashboard',
    icon:  'dashboard',
    label: 'Dashboard',
    show:  true,
  },
  {
    to:    '/admin/species',
    name:  'admin-species',
    icon:  'inventory_2',
    label: 'Inventario de Especies',
    show:  true,
  },
  {
    to:    '/admin/users',
    name:  'admin-users',
    icon:  'group',
    label: 'Gestión de Usuarios',
    show:  isAdmin.value,
  },
  {
    to:    '/admin/reports',
    name:  'admin-reports',
    icon:  'bar_chart',
    label: 'Reportes',
    show:  can('reports.generate'),
  },
])

const visibleLinks = computed(() => navLinks.value.filter(l => l.show))

const isActive = (name: string) => route.name === name || route.name?.toString().startsWith(name)

const roleLabel = computed(() => {
  const rol = currentUser.value?.rol as RolUsuario | undefined
  return rol ? ROL_LABELS[rol] : 'Visitante'
})

const userInitials = computed(() => {
  const name = currentUser.value?.nombre ?? ''
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
})
</script>

<template>
  <aside 
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shrink-0',
      props.isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
    ]"
  >
    <!-- Logo / Brand -->
    <div class="p-6 flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
          <span class="material-symbols-outlined text-white text-xl fill">waves</span>
        </div>
        <div class="min-w-0">
          <h1 class="font-black text-base text-slate-900 dark:text-white leading-tight">BioMarina</h1>
          <span class="text-[9px] text-slate-400 font-black uppercase tracking-widest">Admin Panel</span>
        </div>
      </div>
      <!-- Actions -->
      <div class="flex items-center gap-1">
        <button 
          @click="emit('close')" 
          class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
        <RouterLink
          to="/"
          title="Volver al sitio"
          class="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          <span class="material-symbols-outlined text-[18px]">open_in_new</span>
        </RouterLink>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      <p class="px-3 mb-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">Navegación</p>
      <RouterLink
        v-for="link in visibleLinks"
        :key="link.to"
        :to="link.to"
        @click="emit('close')"
        :class="[
          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150',
          isActive(link.name)
            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
        ]"
      >
        <span
          :class="['material-symbols-outlined text-[20px] shrink-0', isActive(link.name) ? 'fill' : '']"
        >{{ link.icon }}</span>
        <span class="truncate">{{ link.label }}</span>
        <span
          v-if="isActive(link.name)"
          class="ml-auto w-1.5 h-1.5 rounded-full bg-white/60"
        />
      </RouterLink>
    </nav>

    <!-- User Profile Footer -->
    <div class="p-3 border-t border-slate-100 dark:border-slate-800">
      <div class="flex items-center gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
        <!-- Avatar -->
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0 shadow-sm">
          <span class="text-white text-xs font-black">{{ userInitials }}</span>
        </div>
        <!-- Info -->
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold text-slate-900 dark:text-white truncate">
            {{ currentUser?.nombre ?? 'Visitante' }}
          </p>
          <p class="text-[10px] text-slate-400 uppercase font-black truncate">{{ roleLabel }}</p>
        </div>
        <!-- Logout -->
        <button
          @click="logout"
          title="Cerrar sesión"
          class="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <span class="material-symbols-outlined text-[18px]">logout</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.material-symbols-outlined       { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.material-symbols-outlined.fill  { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
