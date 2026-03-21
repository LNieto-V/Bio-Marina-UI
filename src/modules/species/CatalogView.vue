<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AppHeader from '@/shared/components/AppHeader.vue'
import { useSpeciesStore } from '@/app/stores/speciesStore'
import { UICN_COLORS, UICN_LABELS, HABITAT_LABELS, type Especie, type Media } from '@/shared/types/especie'

const speciesStore = useSpeciesStore()

const isFiltersOpen = ref(false)

// Count active filters for mobile badge
const activeFilterCount = computed(() => {
  let count = 0
  if (speciesStore.filters.habitat) count++
  if (speciesStore.filters.uicn) count++
  if (speciesStore.filters.vedaTipo) count++
  return count
})

// ─── Inicialización ──────────────────────────────────────────
onMounted(() => {
  speciesStore.fetchSpecies()
})

// ─── Sincronización de Filtros ────────────────────────────────
const clearFilters = () => {
  speciesStore.clearFilters()
  isFiltersOpen.value = false // close on mobile after clear
}

const getImage = (especie: Especie) => {
  return especie.media?.find((m: Media) => m.esPrincipal)?.url
    || especie.media?.[0]?.url
    || `https://placehold.co/400x300/0b3c5b/white?text=${encodeURIComponent(especie.nombreCientifico)}`
}

// UI helpers
const habitatOpts = [
  { value: '', label: 'Todos los Hábitats' },
  { value: 'arrecife', label: 'Arrecife de Coral' },
  { value: 'pelagico', label: 'Pelágico' },
  { value: 'fondo', label: 'Fondo Marino' },
  { value: 'manglar', label: 'Manglar' },
  { value: 'estuario', label: 'Estuario' },
  { value: 'costero', label: 'Costero' },
]

const uicnOpts = [
  { value: '', label: 'Todos los Estados' },
  { value: 'CR', label: '🔴 En Peligro Crítico (CR)' },
  { value: 'EN', label: '🟠 En Peligro (EN)' },
  { value: 'VU', label: '🟡 Vulnerable (VU)' },
  { value: 'NT', label: '🟢 Casi Amenazado (NT)' },
  { value: 'LC', label: '✅ Preocupación Menor (LC)' },
  { value: 'DD', label: '⚪ Datos Insuficientes (DD)' },
]

const vedaOpts = [
  { value: '', label: 'Cualquier Veda' },
  { value: 'ninguna', label: 'Sin Veda' },
  { value: 'temporal', label: 'Veda Temporal' },
  { value: 'permanente', label: 'Veda Permanente' },
  { value: 'prohibida', label: 'Captura Prohibida' },
]
</script>

<template>
  <AppHeader />

  <main class="flex-1 flex flex-col font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
    
    <!-- Page Header -->
    <header class="bg-white dark:bg-slate-900 border-b border-primary/10 py-6 md:py-10 px-4 sm:px-6 lg:px-12 transition-colors">
      <div class="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="max-w-xl">
          <div class="flex items-center gap-2 mb-2 md:mb-3">
            <span class="material-symbols-outlined text-primary dark:text-blue-400 text-lg md:text-xl">menu_book</span>
            <span class="text-xs md:text-sm font-bold text-primary dark:text-blue-400 tracking-wider uppercase">Caribe Colombiano</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-black tracking-tight mb-2">Catálogo de Especies</h1>
          <p class="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
            <span class="font-bold text-primary dark:text-blue-400">{{ speciesStore.totalFiltered }}</span> especies registradas — Filtra por hábitat, estado UICN o búsqueda libre.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 w-full max-w-md relative group">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-xl">search</span>
          <input 
            v-model="speciesStore.filters.busqueda"
            @input="speciesStore.currentPage = 1"
            class="w-full text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary rounded-xl py-3 pl-12 pr-4 shadow-sm transition-all text-sm md:text-base" 
            placeholder="Nombre común, científico, familia..." 
            type="text"
          />
        </div>
      </div>
    </header>

    <div class="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-12 gap-6 lg:gap-10">
      
      <!-- Mobile Filter Toggle -->
      <div class="lg:hidden flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-primary/10 shadow-sm">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-slate-500">
            <span class="font-bold text-slate-900 dark:text-white">{{ speciesStore.totalFiltered }}</span> resultados
          </span>
        </div>
        <button 
          @click="isFiltersOpen = !isFiltersOpen"
          class="flex items-center gap-2 bg-primary/5 hover:bg-primary/10 dark:bg-white/5 dark:hover:bg-white/10 text-primary dark:text-blue-400 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
        >
          <span class="material-symbols-outlined text-[18px]">tune</span>
          Filtros
          <span v-if="activeFilterCount > 0" class="flex items-center justify-center w-5 h-5 bg-primary text-white rounded-full text-[10px] ml-1">
            {{ activeFilterCount }}
          </span>
        </button>
      </div>

      <!-- Sidebar Filtros (Collapsible on mobile, static on desktop) -->
      <aside 
        :class="[
          'w-full lg:w-72 shrink-0 space-y-6 lg:block overflow-hidden transition-all duration-300',
          isFiltersOpen ? 'max-h-[1000px] opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0 lg:max-h-none lg:opacity-100 lg:mb-6'
        ]"
      >
        <div class="bg-white dark:bg-slate-900 p-6 lg:p-0 rounded-2xl lg:rounded-none lg:bg-transparent lg:dark:bg-transparent border border-primary/10 lg:border-none shadow-sm lg:shadow-none space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-primary/10">
            <h2 class="text-lg font-bold flex items-center gap-2"><span class="material-symbols-outlined">tune</span> Filtros</h2>
            <button v-if="activeFilterCount > 0" @click="clearFilters" class="text-xs font-bold text-primary dark:text-blue-400 hover:underline">Limpiar todo</button>
          </div>

          <!-- Hábitat -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500">Tipo de Hábitat</h3>
            <div class="flex flex-col gap-2">
              <label v-for="opt in habitatOpts" :key="opt.value" 
                :class="['flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors', speciesStore.filters.habitat === opt.value ? 'bg-primary/10 text-primary dark:text-blue-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800']"
              >
                <input type="radio" v-model="speciesStore.filters.habitat" :value="opt.value" class="sr-only" @change="speciesStore.currentPage = 1" />
                <span class="w-2 h-2 rounded-full flex-shrink-0" :class="speciesStore.filters.habitat === opt.value ? 'bg-primary dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-600'"></span>
                <span class="text-sm font-medium">{{ opt.label }}</span>
              </label>
            </div>
          </div>

          <!-- Estado UICN -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500">Estado UICN</h3>
            <select v-model="speciesStore.filters.uicn" @change="speciesStore.currentPage = 1" class="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary">
              <option v-for="opt in uicnOpts" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>

          <!-- Veda -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500">Estado de Veda</h3>
            <select v-model="speciesStore.filters.vedaTipo" @change="speciesStore.currentPage = 1" class="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary">
              <option v-for="opt in vedaOpts" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
          
          <!-- Apply Filters Btn (Mobile Only) -->
          <button @click="isFiltersOpen = false" class="lg:hidden w-full mt-4 bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 text-sm">
            Ver Resultados
          </button>
        </div>
      </aside>

      <!-- Grid de Resultados -->
      <div class="flex-1 flex flex-col gap-6">
        
        <!-- Toolbar (Desktop only, mobile shows in toggle button area) -->
        <div class="hidden lg:flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-primary/10 shadow-sm transition-colors">
          <p class="text-sm font-medium text-slate-500">
            <span class="font-bold text-slate-900 dark:text-white">{{ speciesStore.totalFiltered }}</span> resultados
            <span v-if="speciesStore.filters.busqueda"> para "<em class="italic text-primary dark:text-blue-400">{{ speciesStore.filters.busqueda }}</em>"</span>
          </p>
        </div>

        <!-- Loading Skeleton -->
        <div v-if="speciesStore.loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div v-for="i in 9" :key="i" class="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-primary/10 animate-pulse">
            <div class="h-48 md:h-52 bg-slate-200 dark:bg-slate-800"></div>
            <div class="p-6 space-y-3">
              <div class="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              <div class="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2"></div>
              <div class="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full mt-4"></div>
            </div>
          </div>
        </div>

        <!-- Sin resultados -->
        <div v-else-if="!speciesStore.loading && speciesStore.paginatedSpecies.length === 0" class="flex flex-col items-center justify-center py-20 md:py-24 text-center gap-4 px-4 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <span class="material-symbols-outlined text-5xl md:text-6xl text-slate-300 dark:text-slate-700">search_off</span>
          <p class="text-lg md:text-xl font-bold text-slate-500">No se encontraron especies</p>
          <p class="text-xs md:text-sm text-slate-400 max-w-sm">Prueba con otros filtros o usa términos más generales de búsqueda.</p>
          <button @click="clearFilters" class="mt-4 px-6 md:px-8 py-2.5 md:py-3 bg-primary text-white font-bold rounded-xl text-sm md:text-base transition-all hover:bg-primary/90 shadow-md">Limpiar filtros</button>
        </div>

        <!-- Grid de Tarjetas -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          <RouterLink 
            v-for="especie in speciesStore.paginatedSpecies" 
            :key="especie.id" 
            :to="`/species/${especie.id}`"
            class="group bg-white dark:bg-slate-900 rounded-[20px] md:rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
          >
            <!-- Imagen -->
            <div class="h-48 md:h-52 w-full overflow-hidden relative bg-slate-100 dark:bg-slate-800">
              <img :src="getImage(especie)" :alt="especie.nombreComun" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy"/>
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Emoji + Estado -->
              <div class="absolute top-3 left-3 md:top-4 md:left-4 flex items-center gap-2">
                <span v-if="especie.emoji" class="text-2xl leading-none drop-shadow-md">{{ especie.emoji }}</span>
                <span :class="`px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider shadow-md ${UICN_COLORS[especie.conservacion.uicn]}`">
                  {{ UICN_LABELS[especie.conservacion.uicn] }}
                </span>
              </div>

              <!-- Veda badge -->
              <div v-if="especie.conservacion.vedaTipo && especie.conservacion.vedaTipo !== 'ninguna'" class="absolute top-3 right-3 md:top-4 md:right-4">
                <span class="px-2 py-1 bg-red-500 text-white rounded-md md:rounded text-[9px] md:text-[10px] font-black uppercase tracking-wider shadow-md">
                  🚫 Veda
                </span>
              </div>
            </div>

            <!-- Cuerpo de tarjeta -->
            <div class="p-5 md:p-6 flex-1 flex flex-col bg-white dark:bg-slate-900 transition-colors">
              <div class="mb-3 md:mb-4 flex flex-col gap-0.5">
                <h3 class="text-lg md:text-xl font-black text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors leading-tight">{{ especie.nombreComun }}</h3>
                <p class="text-xs md:text-sm italic font-medium text-primary/70 dark:text-blue-400/80">{{ especie.nombreCientifico }}</p>
              </div>

              <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 md:line-clamp-3 mb-4 leading-relaxed">{{ especie.descripcionGeneral }}</p>

              <!-- Métricas -->
              <div class="grid grid-cols-2 gap-1.5 md:gap-2 mb-4">
                <div class="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-1.5 md:p-2 rounded-lg border border-slate-100 dark:border-slate-700/50">
                  <span class="material-symbols-outlined text-[14px] md:text-[16px] text-primary dark:text-blue-400">waves</span>
                  <span class="truncate">{{ HABITAT_LABELS[especie.habitat.tipo] }}</span>
                </div>
                <div v-if="especie.habitat.profundidadMaxM" class="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-1.5 md:p-2 rounded-lg border border-slate-100 dark:border-slate-700/50">
                  <span class="material-symbols-outlined text-[14px] md:text-[16px] text-primary dark:text-blue-400">expand</span>
                  <span>0 – {{ especie.habitat.profundidadMaxM }}m</span>
                </div>
                <div v-if="especie.biologia.nivelTrofico" class="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-1.5 md:p-2 rounded-lg border border-slate-100 dark:border-slate-700/50">
                  <span class="material-symbols-outlined text-[14px] md:text-[16px] text-primary dark:text-blue-400">deployed_code</span>
                  <span>Trófico {{ especie.biologia.nivelTrofico }}</span>
                </div>
                <div v-if="especie.conservacion.protegida" class="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-1.5 md:p-2 rounded-lg border border-green-100 dark:border-green-900/30">
                  <span class="material-symbols-outlined text-[14px] md:text-[16px]">shield</span>
                  <span>Protegida</span>
                </div>
              </div>

              <!-- Footer -->
              <div class="mt-auto pt-3 md:pt-4 border-t border-primary/5 flex items-center justify-between">
                <div class="flex flex-wrap gap-1">
                  <span v-for="dieta in (especie.biologia.dieta ?? []).slice(0, 2)" :key="dieta" class="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                    {{ dieta }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <div :class="`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold ${especie.completitud >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`">
                    <span class="material-symbols-outlined text-[12px] md:text-[14px]">data_usage</span>
                    {{ especie.completitud }}%
                  </div>
                </div>
                </div>
              </div>
            </RouterLink>
        </div>

        <!-- Paginación -->
        <div v-if="speciesStore.totalPages > 1" class="flex items-center justify-center gap-1.5 md:gap-2 pt-8 md:pt-10 pb-6 md:pb-8">
          <button 
            @click="speciesStore.currentPage--"
            :disabled="speciesStore.currentPage === 1"
            class="flex w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-lg border border-primary/20 bg-white dark:bg-slate-900 text-slate-400 hover:bg-primary/5 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span class="material-symbols-outlined text-[20px] md:text-[24px]">chevron_left</span>
          </button>

          <button v-for="p in speciesStore.totalPages" :key="p" 
            @click="speciesStore.currentPage = p"
            :class="['flex w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-lg text-xs md:text-sm font-bold transition-colors', p === speciesStore.currentPage ? 'bg-primary text-white shadow-md' : 'border border-primary/20 bg-white dark:bg-slate-900 hover:bg-primary/5 dark:hover:bg-slate-800']"
          >{{ p }}</button>

          <button 
            @click="speciesStore.currentPage++"
            :disabled="speciesStore.currentPage === speciesStore.totalPages"
            class="flex w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-lg border border-primary/20 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-primary/5 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span class="material-symbols-outlined text-[20px] md:text-[24px]">chevron_right</span>
          </button>
        </div>

      </div>
    </div>
  </main>
</template>
