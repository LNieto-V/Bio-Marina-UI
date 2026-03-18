<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/app/stores/userStore'
import { ROL_LABELS, ROL_COLORS } from '@/shared/types/usuario'
import type { RolUsuario, Usuario } from '@/shared/types/usuario'

const userStore  = useUserStore()

onMounted(() => userStore.fetchUsers())

const ROLES: RolUsuario[] = ['admin', 'investigador', 'editor', 'consultor']

const handleChangeRole = async (user: Usuario, newRole: string) => {
  await userStore.changeRole(user.id, newRole as RolUsuario)
}

const handleToggle = async (user: Usuario) => {
  if (!user.activo || confirm(`¿Desactivar a ${user.nombre}?`)) {
    await userStore.toggleUserStatus(user.id)
  }
}

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('es-CO', { dateStyle: 'medium' }) : '—'
</script>

<template>
  <div class="overflow-x-auto">
    <!-- Loading skeleton -->
    <div v-if="userStore.loading" class="p-6 space-y-3">
      <div v-for="i in 5" :key="i" class="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
    </div>

    <table v-else class="w-full text-left whitespace-nowrap">
      <thead>
        <tr class="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
          <th class="px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Usuario</th>
          <th class="px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Institución</th>
          <th class="px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rol</th>
          <th class="px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Último acceso</th>
          <th class="px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
        <tr
          v-for="user in userStore.filteredUsers"
          :key="user.id"
          class="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
        >
          <!-- Avatar + name -->
          <td class="px-5 py-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0 text-white text-xs font-black shadow-sm">
                {{ user.nombre.split(' ').slice(0,2).map(w=>w[0]).join('') }}
              </div>
              <div class="min-w-0">
                <p class="text-sm font-bold text-slate-900 dark:text-white truncate">{{ user.nombre }}</p>
                <p class="text-[11px] text-slate-400 truncate">{{ user.email }}</p>
              </div>
            </div>
          </td>

          <!-- Institución -->
          <td class="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">{{ user.institucion ?? '—' }}</td>

          <!-- Rol selector -->
          <td class="px-5 py-4">
            <select
              :value="user.rol"
              @change="handleChangeRole(user, ($event.target as HTMLSelectElement).value)"
              :class="['px-2.5 py-1 rounded-lg text-[11px] font-black border-0 cursor-pointer outline-none appearance-none', ROL_COLORS[user.rol]]"
            >
              <option v-for="r in ROLES" :key="r" :value="r">{{ ROL_LABELS[r] }}</option>
            </select>
          </td>

          <!-- Último acceso -->
          <td class="px-5 py-4 text-[11px] text-slate-400">{{ formatDate(user.ultimoAcceso) }}</td>

          <!-- Status toggle -->
          <td class="px-5 py-4">
            <button
              @click="handleToggle(user)"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none',
                user.activo ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600',
              ]"
            >
              <span
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform',
                  user.activo ? 'translate-x-6' : 'translate-x-1',
                ]"
              />
            </button>
            <span :class="['ml-2 text-[10px] font-bold uppercase', user.activo ? 'text-green-600' : 'text-slate-400']">
              {{ user.activo ? 'Activo' : 'Inactivo' }}
            </span>
          </td>
        </tr>

        <!-- Empty -->
        <tr v-if="userStore.filteredUsers.length === 0">
          <td colspan="5" class="py-16 text-center">
            <span class="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700 mb-2 block">person_off</span>
            <p class="text-sm text-slate-400">No se encontraron usuarios</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
