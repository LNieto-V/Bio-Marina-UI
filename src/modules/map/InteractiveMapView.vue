<script setup lang="ts">
import { ref, computed } from 'vue'
import { MOCK_ESPECIES } from '@/shared/services/mockData'
import { HABITAT_LABELS, UICN_COLORS, UICN_LABELS } from '@/shared/types/especie'

const isSidebarOpen = ref(true)
const selectedSpeciesId = ref<string | null>(null)

const layers = ref({
  speciesPoints: true,
  marineReserves: true,
  shippingLanes: false,
  seaTemp: false
})

// Simulación de posicionamiento en el mapa (Caribe Colombiano aprox)
// Mapeamos lon/lat a % de la imagen del mapa
const getPosition = (coords: [number, number]) => {
  const [lng, lat] = coords
  // Coordenadas aproximadas del Caribe Colombiano para el mock:
  // Lng: -82 a -71 -> X: 0% a 100%
  // Lat: 8 a 15 -> Y: 100% a 0%
  const x = ((lng + 82) / 11) * 100
  const y = 100 - ((lat - 8) / 7) * 100
  return { left: `${x}%`, top: `${y}%` }
}

const activeSpecies = computed(() => {
  return MOCK_ESPECIES.filter(e => e.zonas && e.zonas.length > 0)
})

const selectedSpecies = computed(() => {
  return MOCK_ESPECIES.find(e => e.id === selectedSpeciesId.value)
})

const getImageUrl = (item: any) => {
  return item.media?.find((m: any) => m.esPrincipal)?.url 
    || item.media?.[0]?.url 
    || `https://placehold.co/100x100/0b3c5b/white?text=${encodeURIComponent(item.nombreCientifico)}`
}
</script>

<template>
  <div class="h-screen w-full flex flex-col font-display bg-slate-900 text-white overflow-hidden transition-colors duration-300">
    
    <!-- Top Navigation Toolbar -->
    <header class="flex-none h-16 bg-white/10 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/20 dark:border-slate-800 flex items-center justify-between px-6 z-40 transition-colors">
      <div class="flex items-center gap-4">
        <RouterLink to="/" class="flex items-center justify-center w-10 h-10 bg-primary rounded-lg text-white hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined">waves</span>
        </RouterLink>
        <div class="hidden sm:block">
          <h1 class="text-xl font-black tracking-tight text-white dark:text-blue-400">BioMarina</h1>
          <p class="text-[10px] text-white/60 dark:text-slate-400 font-black uppercase tracking-widest">Interactive Conservation Map</p>
        </div>
      </div>

      <!-- Quick Tools -->
      <div class="hidden md:flex items-center gap-2 bg-black/20 dark:bg-slate-800 rounded-lg p-1 border border-white/10 dark:border-slate-700">
        <button class="w-10 h-10 rounded text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all bg-white/10">
          <span class="material-symbols-outlined text-[20px]">ads_click</span>
        </button>
        <button class="w-10 h-10 rounded text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all">
          <span class="material-symbols-outlined text-[20px]">straighten</span>
        </button>
        <button class="w-10 h-10 rounded text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all">
          <span class="material-symbols-outlined text-[20px]">draw</span>
        </button>
        <div class="w-px h-6 bg-white/20 mx-1"></div>
        <button class="w-10 h-10 rounded text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all">
          <span class="material-symbols-outlined text-[20px]">my_location</span>
        </button>
      </div>

      <div class="flex items-center gap-4">
        <button class="flex items-center gap-2 bg-white/10 dark:bg-slate-800 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all">
          <span class="material-symbols-outlined text-[18px]">download</span> Exportar Capas
        </button>
      </div>
    </header>

    <!-- Main Map Area -->
    <main class="flex-1 relative flex overflow-hidden">
      
      <!-- FAKE MAP BACKGROUND -->
      <div class="absolute inset-0 z-0 bg-slate-900 bg-cover bg-center overflow-hidden" 
           style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/e/e0/Caribbean_Sea_relief_location_map.jpg'); filter: brightness(0.4) contrast(1.2) saturate(0.8);">
        
        <!-- Puntos de Especies -->
        <template v-if="layers.speciesPoints">
          <template v-for="esp in activeSpecies" :key="esp.id">
            <template v-for="(zona, zIdx) in (esp.zonas || [])" :key="zIdx">
              <div 
                v-if="zona.punto"
                class="absolute cursor-pointer group z-10"
                :style="getPosition(zona.punto.coordinates)"
                @click="selectedSpeciesId = esp.id"
              >
                <div class="relative flex items-center justify-center">
                  <div class="absolute inset-0 w-8 h-8 -ml-4 -mt-4 rounded-full bg-primary/20 animate-ping"></div>
                  <div :class="['w-4 h-4 rounded-full border-2 border-white shadow-xl transition-all group-hover:scale-150', selectedSpeciesId === esp.id ? 'bg-blue-400 scale-125' : 'bg-primary']"></div>
                  
                  <!-- Tooltip on hover -->
                  <div class="absolute top-1/2 left-full ml-3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-[10px] font-black uppercase pointer-events-none">
                    <span class="text-blue-400">{{ esp.nombreCientifico }}</span>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </template>

        <!-- Marine Reserve Polygon (Static SVG overlay example) -->
        <svg v-if="layers.marineReserves" class="absolute inset-0 w-full h-full pointer-events-none opacity-40">
           <path d="M 500,300 Q 550,280 600,350 T 650,450 Q 600,500 500,480 Z" fill="rgba(34, 197, 94, 0.2)" stroke="rgba(34, 197, 94, 0.5)" stroke-width="2" />
           <text x="560" y="380" fill="#4ade80" font-size="12" font-weight="bold" class="uppercase">Area Protegida Tayrona</text>
        </svg>
      </div>

      <!-- Detail Card (Bottom right) -->
      <Transition 
        enter-active-class="transform transition duration-300 ease-out"
        enter-from-class="translate-y-full opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transform transition duration-200 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-full opacity-0"
      >
        <div v-if="selectedSpecies" class="absolute bottom-10 right-10 w-96 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden z-30 shadow-2xl">
          <div class="h-40 w-full bg-slate-800">
             <img :src="getImageUrl(selectedSpecies)" class="w-full h-full object-cover"/>
             <button @click="selectedSpeciesId = null" class="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full hover:bg-black/80 transition-colors">
                <span class="material-symbols-outlined text-[18px]">close</span>
             </button>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">{{ selectedSpecies.emoji || '🐟' }}</span>
              <span :class="`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${UICN_COLORS[selectedSpecies.conservacion.uicn]}`">
                 {{ UICN_LABELS[selectedSpecies.conservacion.uicn] }}
              </span>
            </div>
            <h3 class="text-xl font-black">{{ selectedSpecies.nombreComun }}</h3>
            <p class="text-sm italic text-blue-400 mb-4">{{ selectedSpecies.nombreCientifico }}</p>
            
            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="bg-white/5 rounded-lg p-2.5">
                <p class="text-[9px] font-black text-white/40 uppercase mb-1">Hábitat</p>
                <p class="text-xs font-bold">{{ HABITAT_LABELS[selectedSpecies.habitat.tipo] }}</p>
              </div>
              <div class="bg-white/5 rounded-lg p-2.5">
                <p class="text-[9px] font-black text-white/40 uppercase mb-1">Profundidad</p>
                <p class="text-xs font-bold">{{ selectedSpecies.habitat.profundidadMinM || 0 }} – {{ selectedSpecies.habitat.profundidadMaxM }}m</p>
              </div>
            </div>

            <RouterLink :to="`/species/${selectedSpecies.id}`" class="block w-full text-center bg-primary text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Ver Ficha de Investigación
            </RouterLink>
          </div>
        </div>
      </Transition>

      <!-- Left Control Panel -->
      <aside 
        :class="['absolute top-6 bottom-6 left-6 w-80 bg-black/60 dark:bg-slate-900/80 backdrop-blur-xl border border-white/10 dark:border-slate-700 rounded-2xl flex flex-col z-20 transition-all duration-300 overflow-hidden', !isSidebarOpen && '-translate-x-[120%]']"
      >
        <div class="p-6 border-b border-white/10 bg-white/5">
          <h2 class="font-black text-lg tracking-tight flex items-center gap-2">
            <span class="material-symbols-outlined text-primary dark:text-blue-400">layers</span> Capas Biológicas
          </h2>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          <!-- Category: Biodiversity -->
          <div>
            <h3 class="text-[10px] uppercase font-black tracking-widest text-white/40 mb-4">Biodiversidad</h3>
            <div class="space-y-3">
              <label class="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
                <input v-model="layers.speciesPoints" type="checkbox" class="w-4 h-4 rounded border-white/20 bg-black/50 checked:bg-primary checked:border-primary focus:ring-0"/>
                <span class="text-xs font-black uppercase tracking-wide group-hover:text-white text-white/70">Avistamientos de Especies</span>
                <div class="ml-auto w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(11,60,91,0.6)]"></div>
              </label>
              <label class="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group opacity-50">
                <input type="checkbox" disabled class="w-4 h-4 rounded border-white/20 bg-black/50 focus:ring-0"/>
                <span class="text-xs font-black uppercase tracking-wide text-white/50">Rutas de Migración</span>
                <div class="ml-auto w-3 h-3 rounded-full bg-orange-500"></div>
              </label>
            </div>
          </div>

          <!-- Category: Environment -->
          <div>
            <h3 class="text-[10px] uppercase font-black tracking-widest text-white/40 mb-4">Entorno Oceánico</h3>
            <div class="space-y-3">
              <label class="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
                <div class="flex items-center gap-3">
                  <input v-model="layers.seaTemp" type="checkbox" class="w-4 h-4 rounded border-white/20 bg-black/50 focus:ring-0"/>
                  <span class="text-xs font-black uppercase tracking-wide group-hover:text-white text-white/70">Temperatura Superficial</span>
                </div>
              </label>
              <label class="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
                <div class="flex items-center gap-3">
                  <input v-model="layers.marineReserves" type="checkbox" class="w-4 h-4 rounded border-white/20 bg-black/50 checked:bg-green-500 focus:ring-0"/>
                  <span class="text-xs font-black uppercase tracking-wide group-hover:text-white text-white/70">Reservas Marinas (MPA)</span>
                </div>
                <div class="w-4 h-3 rounded border border-green-500 bg-green-500/20"></div>
              </label>
            </div>
          </div>

          <!-- Category: Anthropogenic -->
          <div>
            <h3 class="text-[10px] uppercase font-black tracking-widest text-white/40 mb-4">Actividad Humana</h3>
            <div class="space-y-3">
              <label class="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
                <input v-model="layers.shippingLanes" type="checkbox" class="w-4 h-4 rounded border-white/20 bg-black/50 checked:bg-red-500 checked:border-red-500 focus:ring-0"/>
                <span class="text-xs font-black uppercase tracking-wide group-hover:text-white text-white/70">Rutas de Navegación</span>
                <div class="ml-auto w-4 h-0.5 bg-red-400"></div>
              </label>
            </div>
          </div>

        </div>

        <div class="p-6 border-t border-white/10 bg-black/40">
          <p class="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Estilo del Mapa</p>
          <select class="w-full bg-white/10 border-white/20 text-xs font-black uppercase py-2.5 rounded-xl text-white focus:ring-primary focus:border-primary transition-all">
            <option>Relieve Marino</option>
            <option>Batimetría Escolar</option>
            <option>Satélite de Conservación</option>
            <option>Mapa de Calor Térmico</option>
          </select>
        </div>
      </aside>

      <!-- Toggle Sidebar Button -->
      <button 
        @click="isSidebarOpen = !isSidebarOpen"
        :class="['absolute top-6 bg-black/60 dark:bg-slate-900/80 backdrop-blur-md border border-white/10 dark:border-slate-800 w-10 h-10 rounded-xl flex items-center justify-center text-white z-20 hover:bg-black transition-all duration-300', isSidebarOpen ? 'left-[360px]' : 'left-6']"
        title="Toggle Layers Panel"
      >
        <span class="material-symbols-outlined text-[20px]">{{ isSidebarOpen ? 'chevron_left' : 'format_list_bulleted' }}</span>
      </button>

      <!-- Zoom / Navigation Controls -->
      <div class="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
        <div class="bg-black/60 dark:bg-slate-900/80 backdrop-blur-md border border-white/10 dark:border-slate-800 rounded-xl flex flex-col overflow-hidden shadow-2xl">
          <button class="w-10 h-10 text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined text-[20px]">add</span>
          </button>
          <div class="w-full h-px bg-white/10"></div>
          <button class="w-10 h-10 text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined text-[20px]">remove</span>
          </button>
        </div>
        <button class="w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-white shadow-2xl hover:bg-primary transition-colors">
           <span class="material-symbols-outlined text-[18px]">near_me</span>
        </button>
      </div>

    </main>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.4); }
</style>
