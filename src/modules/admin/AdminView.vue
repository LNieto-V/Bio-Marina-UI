<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/shared/composables/useAuth'
import { useAdminStore } from '@/app/stores/adminStore'
import { UICN_COLORS, UICN_LABELS, type Especie, type Media } from '@/shared/types/especie'

// ─── Autenticación ──────────────────────────────────────────
const { currentUser, logout } = useAuth()

const adminStore = useAdminStore()

// ─── Mobile Sidebar State ─────────────────────────────────────────
const isSidebarOpen = ref(false)

// ─── Helpers ────────────────────────────────────────────────
const getBadgeClass = (uicn: string) => {
  return (UICN_COLORS[uicn as keyof typeof UICN_COLORS] || 'bg-slate-100 text-slate-600') + ' dark:bg-opacity-20 dark:text-opacity-90'
}

const getImageUrl = (item: Especie) => {
  return item.media?.find((m: Media) => m.esPrincipal)?.url 
    || item.media?.[0]?.url 
    || `https://placehold.co/100x100/0b3c5b/white?text=${encodeURIComponent(item.nombreCientifico)}`
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
    
    <!-- Mobile Sidebar Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z[40] lg:hidden"
        @click="isSidebarOpen = false"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-primary/10 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shrink-0',
        isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      ]"
    >
      <div class="p-5 lg:p-6 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="bg-primary text-white p-2 rounded-lg">
            <span class="material-symbols-outlined">waves</span>
          </div>
          <div>
            <h1 class="font-bold text-lg leading-tight text-primary dark:text-blue-400">BioMarina</h1>
            <p class="text-[10px] text-slate-500 uppercase tracking-widest font-black flex items-center gap-1">
              Admin Panel
            </p>
          </div>
        </div>
        <button 
          @click="isSidebarOpen = false" 
          class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
      
      <nav class="flex-1 px-4 space-y-1 overflow-y-auto">
        <a class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary dark:hover:text-blue-400 rounded-lg transition-colors cursor-pointer" @click="isSidebarOpen = false">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="font-bold text-sm">Dashboard</span>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 bg-primary text-white rounded-lg shadow-md cursor-pointer" @click="isSidebarOpen = false">
          <span class="material-symbols-outlined text-fill-1">inventory_2</span>
          <span class="font-bold text-sm">Inventario de Especies</span>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors cursor-pointer" @click="isSidebarOpen = false">
          <span class="material-symbols-outlined">description</span>
          <span class="font-bold text-sm">Bitácoras</span>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors cursor-pointer" @click="isSidebarOpen = false">
          <span class="material-symbols-outlined">groups</span>
          <span class="font-bold text-sm">Equipo de Investigación</span>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors cursor-pointer" @click="isSidebarOpen = false">
          <span class="material-symbols-outlined">bar_chart</span>
          <span class="font-bold text-sm">Reportes</span>
        </a>
      </nav>
      
      <div class="p-4 mt-auto border-t border-primary/10">
        <div class="flex items-center gap-3 p-2 bg-primary/5 dark:bg-slate-800/50 rounded-xl transition-colors hover:bg-primary/10 cursor-pointer group">
          <div class="size-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/10">
            <span class="material-symbols-outlined text-primary dark:text-blue-400">person</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-black text-slate-900 dark:text-slate-100 truncate">{{ currentUser?.nombre || 'Visitante' }}</p>
            <p class="text-[10px] text-slate-500 uppercase font-black truncate">{{ currentUser?.rol || 'Consultor' }}</p>
          </div>
          <button @click="logout" title="Cerrar sesión" class="material-symbols-outlined text-slate-400 text-lg hover:text-red-500 transition-colors">logout</button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-light dark:bg-background-dark">
      
      <!-- Top Nav -->
      <header class="sticky top-0 z-20 flex items-center gap-3 px-4 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-primary/10 transition-colors shrink-0">
        <!-- Mobile Toggle Menu -->
        <button 
          @click="isSidebarOpen = true"
          class="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
        >
          <span class="material-symbols-outlined text-[24px]">menu</span>
        </button>
        
        <div class="flex-1 max-w-xl">
          <div class="relative group">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              :value="adminStore.searchQuery"
              @input="(e: Event) => adminStore.setSearchQuery((e.target as HTMLInputElement).value)"
              class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-slate-400 text-slate-900 dark:text-slate-100 transition-all" 
              placeholder="Buscar especie..." 
              type="text"
            />
          </div>
        </div>
        
        <div class="flex items-center gap-1 sm:gap-4 shrink-0">
          <button class="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-primary/5 rounded-full transition-colors">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-2 right-2 size-2 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
          </button>
          <div class="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button class="p-2 hidden sm:block text-slate-500 dark:text-slate-400 hover:bg-primary/5 rounded-full transition-colors">
            <span class="material-symbols-outlined">help</span>
          </button>
        </div>
      </header>

      <div class="flex-1 p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 overflow-y-auto animate-in fade-in duration-500">
        <!-- Hero Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div class="space-y-1">
            <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-primary dark:text-blue-400">Gestión de Especies</h2>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Monitoreo de {{ adminStore.stats.totalEspecies }} especies registradas.</p>
          </div>
          <button class="flex justify-center items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95">
            <span class="material-symbols-outlined text-[20px]">add_circle</span>
            <span>Nueva Especie</span>
          </button>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div class="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-1 sm:gap-2 transition-all hover:scale-[1.02]">
            <span class="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">Total Biodiversidad</span>
            <div class="text-2xl sm:text-4xl font-black text-primary dark:text-blue-400">{{ adminStore.stats.totalEspecies }}</div>
            <p class="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase truncate">Especies catalogadas</p>
          </div>
          
          <div class="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-1 sm:gap-2 transition-all hover:scale-[1.02]">
            <span class="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">En Peligro (EN/CR)</span>
            <div class="text-2xl sm:text-4xl font-black text-red-600 dark:text-red-400">{{ adminStore.stats.enPeligro }}</div>
            <p class="text-[9px] sm:text-[10px] text-red-400 font-bold uppercase truncate">Requieren atención</p>
          </div>
          
          <div class="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-1 sm:gap-2 transition-all hover:scale-[1.02]">
            <span class="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">Salud de Datos</span>
            <div class="text-2xl sm:text-4xl font-black text-primary dark:text-blue-400">{{ adminStore.stats.completitudMedia }}%</div>
            <p class="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase truncate">Completitud promedio</p>
          </div>

          <div class="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-1 sm:gap-2 transition-all hover:scale-[1.02]">
            <span class="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">Protegidas</span>
            <div class="text-2xl sm:text-4xl font-black text-green-600 dark:text-green-400">{{ adminStore.stats.protegidas }}</div>
            <p class="text-[9px] sm:text-[10px] text-green-400 font-bold uppercase truncate">Bajo marco legal</p>
          </div>
        </div>

        <!-- Management Table -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden transition-colors flex flex-col min-w-0">
          <div class="p-4 sm:p-6 border-b border-primary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-1.5 sm:gap-3 overflow-x-auto w-full sm:w-auto scrollbar-hide shrink-0 pb-1 sm:pb-0">
              <button @click="adminStore.setStatus('todas')" :class="['px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-black border transition-all uppercase tracking-wider shrink-0', adminStore.selectedStatus === 'todas' ? 'bg-primary/10 text-primary border-primary/20' : 'text-slate-500 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800']">Todas</button>
              <button @click="adminStore.setStatus('borrador')" :class="['px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-black border transition-all uppercase tracking-wider shrink-0', adminStore.selectedStatus === 'borrador' ? 'bg-primary/10 text-primary border-primary/20' : 'text-slate-500 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800']">Borradores</button>
              <button @click="adminStore.setStatus('revision')" :class="['px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-black border transition-all uppercase tracking-wider shrink-0', adminStore.selectedStatus === 'revision' ? 'bg-primary/10 text-primary border-primary/20' : 'text-slate-500 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800']">En Revisión</button>
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <button class="flex-1 sm:flex-none justify-center items-center gap-2 px-3 py-2 sm:py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-black uppercase text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span class="material-symbols-outlined text-[18px]">filter_list</span>
                Filtrar
              </button>
              <button class="flex-1 sm:flex-none justify-center items-center gap-2 px-3 py-2 sm:py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-black uppercase text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span class="material-symbols-outlined text-[18px]">download</span>
                Exportar
              </button>
            </div>
          </div>
          
          <div class="overflow-x-auto w-full">
            <table class="w-full text-left whitespace-nowrap min-w-[700px]">
              <thead>
                <tr class="bg-slate-50/50 dark:bg-slate-800/50 border-b border-primary/5">
                  <th class="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Especie</th>
                  <th class="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado UICN</th>
                  <th class="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Completitud</th>
                  <th class="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ubicación Clave</th>
                  <th class="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-primary/5">
                <tr 
                  v-for="item in adminStore.paginatedSpecies" 
                  :key="item.id" 
                  class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                >
                  <td class="px-4 sm:px-6 py-3 sm:py-4">
                    <div class="flex items-center gap-3">
                      <div 
                        class="size-8 sm:size-10 rounded-lg bg-primary/10 bg-cover bg-center overflow-hidden shrink-0 border border-primary/5" 
                        :style="`background-image: url('${getImageUrl(item)}')`"
                      ></div>
                      <div>
                        <p class="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">{{ item.nombreCientifico }}</p>
                        <p class="text-[10px] sm:text-[11px] font-medium text-slate-500 uppercase">{{ item.nombreComun }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 sm:px-6 py-3 sm:py-4">
                    <span :class="`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wide shadow-sm ${getBadgeClass(item.conservacion.uicn)}`">
                      {{ UICN_LABELS[item.conservacion.uicn] }}
                    </span>
                  </td>
                  <td class="px-4 sm:px-6 py-3 sm:py-4 w-32 sm:w-48">
                    <div class="space-y-1 sm:space-y-1.5">
                      <div class="flex items-center justify-between text-[9px] font-black text-slate-500 uppercase">
                        <span>{{ item.completitud }}%</span>
                      </div>
                      <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          class="h-full rounded-full transition-all duration-1000" 
                          :class="item.completitud > 80 ? 'bg-green-500' : item.completitud > 50 ? 'bg-primary dark:bg-blue-500' : 'bg-red-500'"
                          :style="`width: ${item.completitud}%`"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 sm:px-6 py-3 sm:py-4">
                    <div class="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300">
                      <span class="material-symbols-outlined text-[16px] sm:text-lg text-primary dark:text-blue-400">location_on</span>
                      {{ item.zonas?.[0]?.nombre || 'Sin ubicación' }}
                    </div>
                  </td>
                  <td class="px-4 sm:px-6 py-3 sm:py-4 text-right">
                    <div class="flex justify-end gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <RouterLink :to="`/species/${item.id}`" class="p-1 sm:p-1.5 hover:bg-primary/10 rounded-lg text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors">
                        <span class="material-symbols-outlined text-[18px] sm:text-[20px]">visibility</span>
                      </RouterLink>
                      <button class="p-1 sm:p-1.5 hover:bg-primary/10 rounded-lg text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors">
                        <span class="material-symbols-outlined text-[18px] sm:text-[20px]">edit</span>
                      </button>
                      <button @click="adminStore.deleteSpecies(item.id)" class="p-1 sm:p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                        <span class="material-symbols-outlined text-[18px] sm:text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Paginación Mock -->
          <div class="p-4 sm:p-6 border-t border-primary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p class="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase text-center sm:text-left">Mostrando {{ adminStore.paginatedSpecies.length }} de {{ adminStore.filteredSpecies.length }} resultados</p>
            <div class="flex items-center justify-center gap-1 sm:gap-2">
              <button 
                @click="adminStore.setPage(adminStore.currentPage - 1)"
                :disabled="adminStore.currentPage === 1"
                class="p-1 sm:p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 disabled:opacity-30 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span class="material-symbols-outlined text-[16px] sm:text-[18px]">chevron_left</span>
              </button>
              
              <button v-for="p in adminStore.totalPages" :key="p" 
                @click="adminStore.setPage(p)"
                :class="['w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-[11px] font-black transition-all', p === adminStore.currentPage ? 'bg-primary text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800']"
              >{{ p }}</button>
              
              <button 
                @click="adminStore.setPage(adminStore.currentPage + 1)"
                :disabled="adminStore.currentPage === adminStore.totalPages"
                class="p-1 sm:p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 disabled:opacity-30 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span class="material-symbols-outlined text-[16px] sm:text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.text-fill-1 { font-variation-settings: 'FILL' 1; }
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
