<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDashboard, useEspecies } from '@/shared/composables/index'
import { useAuth } from '@/shared/composables/useAuth'
import { UICN_COLORS, UICN_LABELS } from '@/shared/types/especie'

// ─── Autenticación ──────────────────────────────────────────
const { currentUser, logout } = useAuth()

// ─── Estadísticas ───────────────────────────────────────────
const { stats, loading: statsLoading } = useDashboard()

// ─── Lista de Especies (Tabla) ──────────────────────────────
const searchQuery = ref('')
const currentPage = ref(1)
const limite = ref(10)

const filtros = computed(() => ({
  busqueda: searchQuery.value || undefined,
}))

const { 
  especies, 
  total, 
  totalPages, 
  loading: speciesLoading 
} = useEspecies(filtros, currentPage, limite.value)

// ─── Helpers ────────────────────────────────────────────────
const getBadgeClass = (uicn: string) => {
  return (UICN_COLORS[uicn as keyof typeof UICN_COLORS] || 'bg-slate-100 text-slate-600') + ' dark:bg-opacity-20 dark:text-opacity-90'
}

const getImageUrl = (item: any) => {
  return (item.media as any[])?.find((m: any) => m.esPrincipal)?.url 
    || (item.media as any[])?.[0]?.url 
    || `https://placehold.co/100x100/0b3c5b/white?text=${encodeURIComponent(item.nombreCientifico)}`
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
    
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-slate-900 border-r border-primary/10 flex flex-col shrink-0 transition-colors">
      <div class="p-6 flex items-center gap-3">
        <div class="bg-primary text-white p-2 rounded-lg">
          <span class="material-symbols-outlined">waves</span>
        </div>
        <div>
          <h1 class="font-bold text-lg leading-tight text-primary dark:text-blue-400">BioMarina</h1>
          <p class="text-[10px] text-slate-500 uppercase tracking-widest font-black flex items-center gap-1">
            Admin Panel
            <RouterLink to="/" class="material-symbols-outlined text-xs hover:text-primary transition-colors" title="Back to Main App">open_in_new</RouterLink>
          </p>
        </div>
      </div>
      
      <nav class="flex-1 px-4 space-y-1">
        <a class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary dark:hover:text-blue-400 rounded-lg transition-colors cursor-pointer">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="font-bold text-sm">Dashboard</span>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 bg-primary text-white rounded-lg shadow-md cursor-pointer">
          <span class="material-symbols-outlined text-fill-1">inventory_2</span>
          <span class="font-bold text-sm">Inventario de Especies</span>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors cursor-pointer">
          <span class="material-symbols-outlined">description</span>
          <span class="font-bold text-sm">Bitácoras</span>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors cursor-pointer">
          <span class="material-symbols-outlined">groups</span>
          <span class="font-bold text-sm">Equipo de Investigación</span>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors cursor-pointer">
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
    <main class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark scroll-smooth">
      
      <!-- Top Nav -->
      <header class="sticky top-0 z-20 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-primary/10 transition-colors">
        <div class="flex-1 max-w-xl">
          <div class="relative group">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              v-model="searchQuery"
              @input="currentPage = 1"
              class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-slate-400 text-slate-900 dark:text-slate-100 transition-all" 
              placeholder="Buscar especie por nombre o familia..." 
              type="text"
            />
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <button class="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-primary/5 rounded-full transition-colors">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-2 right-2 size-2 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
          </button>
          <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button class="p-2 text-slate-500 dark:text-slate-400 hover:bg-primary/5 rounded-full transition-colors">
            <span class="material-symbols-outlined">help</span>
          </button>
        </div>
      </header>

      <div class="p-8 space-y-8 animate-in fade-in duration-500">
        <!-- Hero Header -->
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div class="space-y-1">
            <h2 class="text-3xl font-black tracking-tight text-primary dark:text-blue-400">Gestión de Especies</h2>
            <p class="text-slate-500 dark:text-slate-400 font-medium">Monitoreo de {{ stats?.totalEspecies || '...' }} especies registradas en la base de datos.</p>
          </div>
          <button class="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95">
            <span class="material-symbols-outlined text-[20px]">add_circle</span>
            <span>Nueva Especie</span>
          </button>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-2 transition-all hover:scale-[1.02]">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Biodiversidad</span>
            <div v-if="statsLoading" class="h-10 w-20 bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
            <div v-else class="text-4xl font-black text-primary dark:text-blue-400">{{ stats?.totalEspecies || 0 }}</div>
            <p class="text-[10px] text-slate-400 font-bold uppercase">Especies catalogadas</p>
          </div>
          
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-2 transition-all hover:scale-[1.02]">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">En Peligro (EN/CR)</span>
            <div v-if="statsLoading" class="h-10 w-20 bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
            <div v-else class="text-4xl font-black text-red-600 dark:text-red-400">{{ (stats?.enPeligro || 0) + (stats?.porUICN?.find(u => u.uicn === 'CR')?.total || 0) }}</div>
            <p class="text-[10px] text-red-400 font-bold uppercase">Requieren atención</p>
          </div>
          
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-2 transition-all hover:scale-[1.02]">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Salud de Datos</span>
            <div v-if="statsLoading" class="h-10 w-20 bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
            <div v-else class="text-4xl font-black text-primary dark:text-blue-400">{{ stats?.completitudMedia || 0 }}%</div>
            <p class="text-[10px] text-slate-400 font-bold uppercase">Completitud promedio</p>
          </div>

          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-2 transition-all hover:scale-[1.02]">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protegidas</span>
            <div v-if="statsLoading" class="h-10 w-20 bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
            <div v-else class="text-4xl font-black text-green-600 dark:text-green-400">{{ stats?.protegidas || 0 }}</div>
            <p class="text-[10px] text-green-400 font-bold uppercase">Bajo marco legal</p>
          </div>
        </div>

        <!-- Management Table -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden transition-colors">
          <div class="p-6 border-b border-primary/10 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <button class="bg-primary/10 text-primary dark:text-blue-400 px-4 py-1.5 rounded-lg text-xs font-black border border-primary/20">Todas</button>
              <button class="text-slate-500 dark:text-slate-400 px-4 py-1.5 rounded-lg text-xs font-black hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider">Pendientes</button>
              <button class="text-slate-500 dark:text-slate-400 px-4 py-1.5 rounded-lg text-xs font-black hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider">En Revisión</button>
            </div>
            <div class="flex items-center gap-2">
              <button class="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-black uppercase text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span class="material-symbols-outlined text-[18px]">filter_list</span>
                Filtrar
              </button>
              <button class="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-black uppercase text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span class="material-symbols-outlined text-[18px]">download</span>
                Exportar
              </button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left whitespace-nowrap">
              <thead>
                <tr class="bg-slate-50/50 dark:bg-slate-800/50 border-b border-primary/5">
                  <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Especie</th>
                  <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado UICN</th>
                  <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Completitud</th>
                  <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ubicación Clave</th>
                  <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-primary/5">
                <tr v-if="speciesLoading" v-for="i in 5" :key="i" class="animate-pulse">
                  <td class="px-6 py-4"><div class="h-10 w-40 bg-slate-100 dark:bg-slate-800 rounded"></div></td>
                  <td class="px-6 py-4"><div class="h-6 w-20 bg-slate-100 dark:bg-slate-800 rounded-full"></div></td>
                  <td class="px-6 py-4"><div class="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded"></div></td>
                  <td class="px-6 py-4"><div class="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded"></div></td>
                  <td class="px-6 py-4"></td>
                </tr>
                <tr 
                  v-else
                  v-for="item in especies" 
                  :key="item.id" 
                  class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                >
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div 
                        class="size-10 rounded-lg bg-primary/10 bg-cover bg-center overflow-hidden shrink-0 border border-primary/5" 
                        :style="`background-image: url('${getImageUrl(item)}')`"
                      ></div>
                      <div>
                        <p class="font-bold text-sm text-slate-900 dark:text-slate-100">{{ item.nombreCientifico }}</p>
                        <p class="text-[11px] font-medium text-slate-500 uppercase">{{ item.nombreComun }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span :class="`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide shadow-sm ${getBadgeClass(item.conservacion.uicn)}`">
                      {{ UICN_LABELS[item.conservacion.uicn] }}
                    </span>
                  </td>
                  <td class="px-6 py-4 w-48">
                    <div class="space-y-1.5">
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
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                      <span class="material-symbols-outlined text-lg text-primary dark:text-blue-400">location_on</span>
                      {{ item.zonas?.[0]?.nombre || 'Sin ubicación' }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <RouterLink :to="`/species/${item.id}`" class="p-1.5 hover:bg-primary/10 rounded-lg text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors">
                        <span class="material-symbols-outlined text-[20px]">visibility</span>
                      </RouterLink>
                      <button class="p-1.5 hover:bg-primary/10 rounded-lg text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors">
                        <span class="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button class="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                        <span class="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Paginación Mock -->
          <div class="p-6 border-t border-primary/10 flex items-center justify-between">
            <p class="text-[11px] font-bold text-slate-500 uppercase">Mostrando {{ especies.length }} de {{ total }} resultados</p>
            <div class="flex items-center gap-2">
              <button 
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 disabled:opacity-30 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span class="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              
              <button v-for="p in totalPages" :key="p" 
                @click="currentPage = p"
                :class="['w-8 h-8 rounded-lg text-[11px] font-black transition-all', p === currentPage ? 'bg-primary text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800']"
              >{{ p }}</button>
              
              <button 
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 disabled:opacity-30 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span class="material-symbols-outlined text-[18px]">chevron_right</span>
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
</style>
