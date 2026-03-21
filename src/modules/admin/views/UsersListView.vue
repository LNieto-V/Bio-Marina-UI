<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/app/stores/userStore'
import { ROL_LABELS }  from '@/shared/types/usuario'
import type { RolUsuario } from '@/shared/types/usuario'
import UserTable from '../components/users/UserTable.vue'

const userStore = useUserStore()
onMounted(() => userStore.fetchUsers())

const ROLE_FILTERS: Array<{ key: RolUsuario | 'todos'; label: string }> = [
  { key: 'todos',        label: 'Todos' },
  { key: 'admin',        label: ROL_LABELS.admin },
  { key: 'investigador', label: ROL_LABELS.investigador },
  { key: 'editor',       label: ROL_LABELS.editor },
  { key: 'consultor',    label: ROL_LABELS.consultor },
]
</script>

<template>
  <div class="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Gestión de Usuarios</h2>
        <p class="text-xs sm:text-sm text-slate-400 mt-0.5">
          {{ userStore.totalUsuarios }} registrados · {{ userStore.totalActivos }} activos · {{ userStore.totalInactivos }} inactivos
        </p>
      </div>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div
        v-for="role in (['admin','investigador','editor','consultor'] as RolUsuario[])"
        :key="role"
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm"
      >
        <p class="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">{{ ROL_LABELS[role] }}</p>
        <p class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {{ userStore.users.filter(u => u.rol === role).length }}
        </p>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-col lg:flex-row lg:items-center gap-3">
      <!-- Search -->
      <div class="relative w-full lg:flex-1 min-w-0">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
        <input
          :value="userStore.searchQuery"
          @input="userStore.setSearch(($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Buscar por nombre o email..."
          class="w-full pl-9 pr-4 py-2.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder:text-slate-400 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <!-- Role filter tabs -->
      <div class="flex items-center overflow-x-auto bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-0.5 w-full lg:w-auto scrollbar-hide shrink-0">
        <div class="flex gap-0.5 w-max">
          <button
            v-for="f in ROLE_FILTERS"
            :key="f.key"
            @click="userStore.setRolFilter(f.key)"
            :class="[
              'px-3 sm:px-4 py-2 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap',
              userStore.selectedRol === f.key
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200',
            ]"
          >{{ f.label }}</button>
        </div>
      </div>
    </div>

    <!-- Table card -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-w-0">
      <div class="w-full overflow-x-auto">
        <UserTable class="min-w-[700px] w-full" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
