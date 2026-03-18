<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/app/stores/adminStore'

const route      = useRoute()
const adminStore = useAdminStore()

const notificationsOpen = ref(false)

const pageTitle = computed(() => {
  const map: Record<string, string> = {
    'admin-dashboard':      'Dashboard',
    'admin-species':        'Inventario de Especies',
    'admin-species-create': 'Nueva Especie',
    'admin-species-edit':   'Editar Especie',
    'admin-users':          'Gestión de Usuarios',
    'admin-reports':        'Reportes',
  }
  return map[route.name as string] ?? 'Admin Panel'
})

import { computed } from 'vue'
</script>

<template>
  <header class="sticky top-0 z-30 flex items-center gap-4 px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
    <!-- Page Title -->
    <div class="flex-1 min-w-0">
      <h2 class="text-sm font-black text-slate-900 dark:text-white truncate">{{ pageTitle }}</h2>
      <p class="text-[10px] text-slate-400 font-medium">
        BioMarina · Panel de Administración
      </p>
    </div>

    <!-- Global species search (only on species-related pages) -->
    <div
      v-if="route.name === 'admin-species'"
      class="hidden md:block flex-1 max-w-sm"
    >
      <div class="relative group">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] group-focus-within:text-blue-600 transition-colors">
          search
        </span>
        <input
          :value="adminStore.searchQuery"
          @input="(e: Event) => adminStore.setSearchQuery((e.target as HTMLInputElement).value)"
          type="text"
          placeholder="Buscar especie..."
          class="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm placeholder:text-slate-400 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
        />
      </div>
    </div>

    <!-- Action Bar -->
    <div class="flex items-center gap-1">
      <!-- Notifications -->
      <button
        @click="notificationsOpen = !notificationsOpen"
        class="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <span class="material-symbols-outlined text-[20px]">notifications</span>
        <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
      </button>

      <!-- Help -->
      <button class="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        <span class="material-symbols-outlined text-[20px]">help</span>
      </button>

      <div class="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

      <!-- Dark mode (cosmetic for now) -->
      <button class="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        <span class="material-symbols-outlined text-[20px]">dark_mode</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
