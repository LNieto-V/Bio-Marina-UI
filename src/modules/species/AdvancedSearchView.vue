<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEspecies } from '@/shared/composables/index'
import type { FiltrosEspecie, TipoHabitat, EstadoUICN, ValorComercial } from '@/shared/types/especie'
import { UICN_COLORS, UICN_LABELS, HABITAT_LABELS } from '@/shared/types/especie'

// ─── Estado de Filtros ──────────────────────────────────────
const searchQuery = ref('')
const selectedHabitats = ref<TipoHabitat[]>([])
const selectedUICN = ref<EstadoUICN[]>([])
const selectedValue = ref<ValorComercial | ''>('')
const depthMin = ref('')
const depthMax = ref('')
const currentPage = ref(1)

const filtros = computed<FiltrosEspecie>(() => ({
  busqueda: searchQuery.value || undefined,
  habitat: selectedHabitats.value.length === 1 ? selectedHabitats.value[0] : undefined, // Simplificación mock: toma el primero
  uicn: selectedUICN.value.length === 1 ? selectedUICN.value[0] : undefined,
  valorComercial: selectedValue.value || undefined,
}))

const { 
  especies, 
  total, 
  totalPages, 
  loading 
} = useEspecies(filtros, currentPage, 6)

// ─── Helpers ────────────────────────────────────────────────
const habitatOptions: { id: TipoHabitat; label: string }[] = [
  { id: 'arrecife', label: 'Arrecife' },
  { id: 'pelagico', label: 'Pelágico' },
  { id: 'fondo', label: 'Fondo' },
  { id: 'manglar', label: 'Manglar' },
  { id: 'estuario', label: 'Estuario' },
  { id: 'costero', label: 'Costero' },
]

const uicnOptions: { id: EstadoUICN; label: string }[] = [
  { id: 'CR', label: 'En Peligro Crítico (CR)' },
  { id: 'EN', label: 'En Peligro (EN)' },
  { id: 'VU', label: 'Vulnerable (VU)' },
  { id: 'NT', label: 'Casi Amenazado (NT)' },
  { id: 'LC', label: 'Preocupación Menor (LC)' },
]

const clearFilters = () => {
  searchQuery.value = ''
  selectedHabitats.value = []
  selectedUICN.value = []
  selectedValue.value = ''
  depthMin.value = ''
  depthMax.value = ''
  currentPage.value = 1
}

const getImageUrl = (item: any) => {
  return item.media?.find((m: any) => m.esPrincipal)?.url 
    || item.media?.[0]?.url 
    || `https://placehold.co/400x300/0b3c5b/white?text=${encodeURIComponent(item.nombreCientifico)}`
}
</script>

<template>
<div class="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
  
  <!-- Top Navigation Bar -->
  <header class="sticky top-0 z-50 flex items-center justify-between border-b border-primary/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-3 lg:px-20 transition-colors">
    <RouterLink to="/" class="flex items-center gap-3">
      <div class="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
        <span class="material-symbols-outlined">waves</span>
      </div>
      <h2 class="text-xl font-black tracking-tight text-primary dark:text-blue-400">BioMarina</h2>
    </RouterLink>
    
    <nav class="hidden md:flex items-center gap-8">
      <RouterLink to="/catalog" class="text-sm font-bold hover:text-primary dark:hover:text-blue-400 transition-colors">Catálogo</RouterLink>
      <RouterLink to="/map" class="text-sm font-bold hover:text-primary dark:hover:text-blue-400 transition-colors">Mapa Pro</RouterLink>
      <RouterLink to="/admin" class="text-sm font-bold hover:text-primary dark:hover:text-blue-400 transition-colors">Consola</RouterLink>
      <RouterLink to="/reports" class="text-sm font-bold hover:text-primary dark:hover:text-blue-400 transition-colors">Reportes</RouterLink>
    </nav>
    
    <div class="flex items-center gap-4">
      <button class="p-2 rounded-full hover:bg-primary/10 transition-colors">
        <span class="material-symbols-outlined text-primary dark:text-slate-300">notifications</span>
      </button>
      <div class="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
      <RouterLink to="/login" class="flex items-center gap-3 pl-2 group">
        <div class="size-9 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 transition-colors group-hover:border-primary">
          <img alt="User" class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD03vop9lv8U6gWbO1zlPahVwcgEKaoZaIIR2G5fS3DJDxP9NO38Y9hsfcdX69oUUEuckf96luT8BNdF8PQho2EL0y7cyadXo4L9YbamXbxzYMKp7sWWz73pWKYmRvmHADarAWOXB4OC6Vn8qg8wCjybM1Z_WL3-v-dnMl-pZ4kkOeF53Ah2A_3-LmtTo2_3Q_v6u9KSj_Ex3FNQZFB8lGhGRs_Dp-u3xUJVvgK6kJtZGCAMU4RN1kvkAQREaVTnGkRBbxUMPh2hItG"/>
        </div>
      </RouterLink>
    </div>
  </header>

  <main class="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-10 p-6 lg:flex-row lg:px-20 lg:py-12">
    
    <!-- Left Sidebar Filters -->
    <aside class="w-full shrink-0 lg:w-72">
      <div class="sticky top-24 flex flex-col gap-8 rounded-2xl border border-primary/10 bg-white dark:bg-slate-900 p-8 shadow-sm transition-colors duration-300">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-black flex items-center gap-2"><span class="material-symbols-outlined">tune</span> Filtros</h3>
          <button @click="clearFilters" class="text-xs font-black text-primary dark:text-blue-400 hover:underline uppercase tracking-tight">Limpiar</button>
        </div>
        
        <!-- Habitat Filter -->
        <div class="space-y-4">
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-500">Tipo de Hábitat</p>
          <div class="flex flex-wrap gap-2">
            <label 
              v-for="opt in habitatOptions" 
              :key="opt.id"
              class="group relative flex cursor-pointer items-center justify-center rounded-xl border border-primary/20 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-xs font-bold transition-all hover:border-primary hover:text-primary has-[:checked]:bg-primary has-[:checked]:text-white dark:border-slate-700"
            >
              <input v-model="selectedHabitats" type="checkbox" :value="opt.id" class="peer sr-only"/>
              <span class="transition-colors">{{ opt.label }}</span>
            </label>
          </div>
        </div>

        <!-- IUCN Status Filter -->
        <div class="space-y-4">
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-500">Estado de Amenaza (UICN)</p>
          <div class="space-y-2">
            <label 
              v-for="opt in uicnOptions" 
              :key="opt.id"
              class="flex items-center gap-3 rounded-xl border border-transparent p-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group"
            >
              <input v-model="selectedUICN" type="checkbox" :value="opt.id" class="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-transparent"/>
              <span class="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{{ opt.label }}</span>
            </label>
          </div>
        </div>

        <!-- Commercial Value -->
        <div class="space-y-4">
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-500">Valor Comercial</p>
          <select v-model="selectedValue" class="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold focus:border-primary focus:ring-primary text-slate-900 dark:text-white px-4 py-2.5">
            <option value="">Cualquier valor</option>
            <option value="muy alto">Muy Alto</option>
            <option value="alto">Alto</option>
            <option value="medio">Medio</option>
            <option value="bajo">Bajo</option>
            <option value="ninguno">Ninguno</option>
          </select>
        </div>

        <!-- Depth Range -->
        <div class="space-y-4">
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-500">Rango de Profundidad (m)</p>
          <div class="flex items-center gap-3">
            <input v-model="depthMin" type="text" placeholder="Min" class="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center text-xs font-bold focus:ring-primary text-slate-900 dark:text-white px-3 py-2.5 h-10"/>
            <span class="text-slate-400 text-xs">a</span>
            <input v-model="depthMax" type="text" placeholder="Max" class="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center text-xs font-bold focus:ring-primary text-slate-900 dark:text-white px-3 py-2.5 h-10"/>
          </div>
        </div>

        <button @click="currentPage = 1" class="w-full rounded-xl bg-primary text-white py-3.5 text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
          Aplicar Filtros
        </button>
      </div>
    </aside>

    <!-- Main Content: Search Results -->
    <div class="flex-1 space-y-8">
      
      <!-- Search Bar Container -->
      <div class="flex flex-col gap-6">
        <div>
          <h1 class="text-4xl font-black tracking-tight text-primary dark:text-white transition-colors mb-2">Búsqueda Avanzada</h1>
          <p class="text-slate-500 dark:text-slate-400 font-medium">Localiza especies, bitácoras científicas y alertas de conservación en tiempo real.</p>
        </div>

        <div class="relative flex h-16 w-full items-center group">
          <span class="material-symbols-outlined absolute left-5 text-slate-400 group-focus-within:text-primary transition-colors text-[24px]">search</span>
          <input 
            v-model="searchQuery"
            @input="currentPage = 1"
            type="text" 
            placeholder="Científico, común, familia, género..." 
            class="h-full w-full rounded-2xl border border-primary/10 bg-white dark:bg-slate-900 dark:border-slate-800 pl-14 pr-40 text-lg font-bold shadow-sm focus:border-primary focus:ring-primary transition-colors placeholder:text-slate-300 text-slate-900 dark:text-white"
          />
          <div class="absolute right-3 flex items-center gap-2">
            <button class="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-black text-white transition-all hover:opacity-95 shadow-md">
              Buscar
            </button>
          </div>
        </div>
      </div>

      <!-- Results Header -->
      <div class="flex items-center justify-between border-b border-primary/10 pb-6 transition-colors">
        <p class="text-sm font-bold text-slate-500">
          Encontrados: <span class="text-primary dark:text-blue-400 font-black">{{ total }}</span> registros
          <span v-if="searchQuery" class="ml-1 text-slate-400">para "<em class="italic text-slate-900 dark:text-slate-200 font-bold group-hover:text-primary">{{ searchQuery }}</em>"</span>
        </p>
        <div class="flex items-center gap-3">
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">ORDENAR POR:</span>
          <select class="border-none bg-transparent text-xs font-black text-primary dark:text-blue-400 focus:ring-0 cursor-pointer uppercase tracking-tight">
            <option>Relevancia</option>
            <option>Nombre Científico (A-Z)</option>
            <option>Estado de Amenaza</option>
            <option>Última Actualización</option>
          </select>
        </div>
      </div>

      <!-- Results List -->
      <div v-if="loading" class="grid gap-6 animate-pulse">
        <div v-for="i in 3" :key="i" class="h-48 bg-white dark:bg-slate-900 rounded-2xl border border-primary/10"></div>
      </div>
      
      <div v-else-if="especies.length === 0" class="flex flex-col items-center justify-center py-20 text-center gap-4">
        <span class="material-symbols-outlined text-6xl text-slate-300">search_off</span>
        <p class="text-xl font-black text-slate-400">No se hallaron coincidencias</p>
        <button @click="clearFilters" class="text-sm font-bold text-primary dark:text-blue-400 hover:underline">Restablecer búsqueda</button>
      </div>

      <div v-else class="grid gap-6">
        <RouterLink 
          v-for="item in especies" 
          :key="item.id"
          :to="`/species/${item.id}`"
          class="group flex flex-col gap-6 rounded-2xl border border-primary/10 bg-white dark:bg-slate-900 p-6 transition-all hover:border-primary/30 hover:shadow-xl md:flex-row hover:-translate-y-1"
        >
          <div class="h-44 w-full shrink-0 overflow-hidden rounded-xl md:h-auto md:w-64 bg-slate-100 dark:bg-slate-800">
            <img :alt="item.nombreComun" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" :src="getImageUrl(item)" loading="lazy"/>
          </div>
          
          <div class="flex flex-1 flex-col justify-between py-1">
            <div class="space-y-2">
              <div class="flex items-start justify-between">
                <div>
                  <h4 class="text-2xl font-black text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors leading-tight">{{ item.nombreComun }}</h4>
                  <p class="text-sm font-bold italic text-primary/70 dark:text-blue-400/80">{{ item.nombreCientifico }}</p>
                </div>
                <span :class="`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider shadow-sm ${UICN_COLORS[item.conservacion.uicn]}`">
                  {{ UICN_LABELS[item.conservacion.uicn] }}
                </span>
              </div>
              <p class="mt-3 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                {{ item.descripcionGeneral }}
              </p>
            </div>
            
            <div class="mt-6 flex flex-wrap gap-5 text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary dark:text-blue-400 text-[20px]">waves</span>
                <span>{{ HABITAT_LABELS[item.habitat.tipo] }}</span>
              </div>
              <div v-if="item.habitat.profundidadMaxM" class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary dark:text-blue-400 text-[20px]">expand</span>
                <span>{{ item.habitat.profundidadMinM || 0 }} – {{ item.habitat.profundidadMaxM }} m</span>
              </div>
              <div v-if="item.pesca?.valorComercial" class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary dark:text-blue-400 text-[20px]">payments</span>
                <span>Valor: {{ item.pesca.valorComercial }}</span>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 pt-12 pb-6">
        <button 
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="flex size-11 items-center justify-center rounded-xl border border-primary/10 bg-white hover:bg-primary/5 dark:bg-slate-900 dark:border-slate-800 disabled:opacity-30 transition-all font-black text-slate-400"
        >
          <span class="material-symbols-outlined">chevron_left</span>
        </button>

        <button 
          v-for="p in totalPages" 
          :key="p" 
          @click="currentPage = p"
          :class="['flex size-11 items-center justify-center rounded-xl text-xs font-black transition-all shadow-sm', p === currentPage ? 'bg-primary text-white shadow-primary/20 scale-110' : 'border border-primary/10 bg-white dark:bg-slate-900 hover:bg-primary/5 dark:border-slate-800']"
        >{{ p }}</button>

        <button 
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="flex size-11 items-center justify-center rounded-xl border border-primary/10 bg-white hover:bg-primary/5 dark:bg-slate-900 dark:border-slate-800 disabled:opacity-30 transition-all font-black text-slate-600 dark:text-slate-300"
        >
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      
    </div>
  </main>

  <!-- Minimal Footer -->
  <footer class="mt-auto border-t border-primary/10 bg-white dark:bg-slate-900 px-6 py-12 lg:px-20 transition-colors">
    <div class="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-8 md:flex-row">
      <div class="flex items-center gap-3">
        <div class="flex size-9 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined text-[20px]">waves</span>
        </div>
        <div class="flex flex-col">
          <p class="text-sm font-black text-primary dark:text-blue-400 uppercase tracking-tighter leading-none">BioMarina</p>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Species Database © 2024</p>
        </div>
      </div>
      
      <div class="flex gap-10 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Documentos</a>
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">API</a>
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Privacidad</a>
      </div>
      
      <div class="flex gap-5">
        <span class="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary dark:hover:text-white transition-colors text-[22px]">language</span>
        <span class="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary dark:hover:text-white transition-colors text-[22px]">database</span>
        <span class="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary dark:hover:text-white transition-colors text-[22px]">hub</span>
      </div>
    </div>
  </footer>
</div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>
