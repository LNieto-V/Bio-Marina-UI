<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { ref } from 'vue'
import { 
  LMap, 
  LTileLayer, 
  LMarker, 
  LTooltip,
} from '@vue-leaflet/vue-leaflet'
import { useMapStore } from '@/app/stores/mapStore'
import { HABITAT_LABELS, UICN_COLORS, UICN_LABELS, type Especie, type Media } from '@/shared/types/especie'

const mapStore = useMapStore()

const tileProviders = [
  {
    name: 'Relieve Marino',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  },
  {
    name: 'Satélite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
  {
    name: 'Oscuro',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }
]

const activeTileProvider = ref(tileProviders[0]!)

const getImageUrl = (item: Especie) => {
  return item.media?.find((m: Media) => m.esPrincipal)?.url 
    || item.media?.[0]?.url 
    || `https://placehold.co/100x100/0b3c5b/white?text=${encodeURIComponent(item.nombreCientifico)}`
}
</script>

<template>
  <div class="h-screen w-full flex flex-col font-display bg-slate-900 text-white overflow-hidden transition-colors duration-300">
    
    <!-- Top Navigation Toolbar -->
    <header class="flex-none h-16 bg-white/10 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/20 dark:border-slate-800 flex items-center justify-between px-6 z-[1000] shadow-xl">
      <div class="flex items-center gap-4">
        <RouterLink to="/" class="flex items-center justify-center w-10 h-10 bg-primary rounded-lg text-white hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined">waves</span>
        </RouterLink>
        <div class="hidden sm:block">
          <h1 class="text-xl font-black tracking-tight text-white dark:text-blue-400 leading-none mb-1">BioMarina</h1>
          <p class="text-[10px] text-white/50 dark:text-slate-500 font-bold uppercase tracking-[0.2em]">Sistemas de Información Geográfica</p>
        </div>
      </div>

      <!-- Quick Tools -->
      <div class="hidden md:flex items-center gap-2 bg-black/30 dark:bg-slate-800/80 rounded-xl p-1.5 border border-white/10 dark:border-slate-700/50">
        <button v-for="icon in ['ads_click', 'straighten', 'draw']" :key="icon" 
                class="w-9 h-9 rounded-lg text-white/40 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all">
          <span class="material-symbols-outlined text-[19px]">{{ icon }}</span>
        </button>
        <div class="w-px h-5 bg-white/10 mx-1"></div>
        <button class="w-9 h-9 rounded-lg text-white/40 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all">
          <span class="material-symbols-outlined text-[19px]">my_location</span>
        </button>
      </div>

      <div class="flex items-center gap-3">
        <button class="hidden lg:flex items-center gap-2 bg-white/5 dark:bg-slate-800/50 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
          <span class="material-symbols-outlined text-[16px]">download</span> Exportar
        </button>
        <div class="w-px h-8 bg-white/10 mx-1 hidden lg:block"></div>
        <button class="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/5">
          <span class="material-symbols-outlined">person</span>
        </button>
      </div>
    </header>

    <!-- Main Map Area -->
    <main class="flex-1 relative flex overflow-hidden">
      
      <!-- REAL LEAFLET MAP -->
      <div class="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
        <l-map
          ref="map"
          v-model:zoom="mapStore.zoom"
          v-model:center="mapStore.center"
          :use-global-leaflet="false"
          class="h-full w-full"
        >
          <l-tile-layer
            :url="activeTileProvider.url"
            :attribution="activeTileProvider.attribution"
            layer-type="base"
            name="OpenStreetMap"
          />

          <!-- Markers for species -->
          <template v-if="mapStore.activeLayers.includes('species-markers')">
            <l-marker
              v-for="esp in mapStore.speciesOnMap"
              :key="esp.id"
              :lat-lng="esp.position"
              @click="mapStore.selectSpecies(esp.id)"
            >
              <l-tooltip :options="{ permanent: false, direction: 'top' }">
                <div class="text-[10px] font-black uppercase tracking-wider py-0.5">
                  {{ esp.nombreCientifico }}
                </div>
              </l-tooltip>
            </l-marker>
          </template>

          <!-- Custom Controls (Top Right: Map Layers & Zoom are handled separately for better UI) -->
        </l-map>
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
        <div v-if="mapStore.selectedSpeciesData" class="absolute bottom-6 right-6 w-96 bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden z-[2000] shadow-2xl">
          <div class="h-44 w-full relative">
             <img :src="getImageUrl(mapStore.selectedSpeciesData)" class="w-full h-full object-cover"/>
             <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
             <button @click="mapStore.selectSpecies(null)" class="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-xl hover:bg-black/60 transition-colors border border-white/10">
                <span class="material-symbols-outlined text-[20px] text-white">close</span>
             </button>
          </div>
          <div class="p-6 relative">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-2xl drop-shadow-lg">{{ mapStore.selectedSpeciesData.emoji || '🐟' }}</span>
              <span :class="`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/10 ${UICN_COLORS[mapStore.selectedSpeciesData.conservacion.uicn]}`">
                 {{ UICN_LABELS[mapStore.selectedSpeciesData.conservacion.uicn] }}
              </span>
            </div>
            <h3 class="text-2xl font-black mb-1">{{ mapStore.selectedSpeciesData.nombreComun }}</h3>
            <p class="text-sm italic text-blue-400 font-bold mb-5 tracking-wide">{{ mapStore.selectedSpeciesData.nombreCientifico }}</p>
            
            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="bg-white/5 dark:bg-slate-800/50 rounded-xl p-3 border border-white/5">
                <p class="text-[9px] font-black text-white/30 uppercase mb-1 tracking-tighter">Hábitat Principal</p>
                <p class="text-xs font-black">{{ HABITAT_LABELS[mapStore.selectedSpeciesData.habitat.tipo] }}</p>
              </div>
              <div class="bg-white/5 dark:bg-slate-800/50 rounded-xl p-3 border border-white/5">
                <p class="text-[9px] font-black text-white/30 uppercase mb-1 tracking-tighter">Rango Profundidad</p>
                <p class="text-xs font-black">{{ mapStore.selectedSpeciesData.habitat.profundidadMinM || 0 }} – {{ mapStore.selectedSpeciesData.habitat.profundidadMaxM }}m</p>
              </div>
            </div>

            <RouterLink :to="`/species/${mapStore.selectedSpeciesId}`" class="block w-full text-center bg-primary text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 border border-white/10 active:scale-[0.98]">
              Analizar Datos Científicos
            </RouterLink>
          </div>
        </div>
      </Transition>

      <!-- Left Control Panel -->
      <aside 
        :class="['absolute top-6 bottom-6 left-6 w-85 bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/10 dark:border-slate-800 rounded-3xl flex flex-col z-[2000] transition-all duration-500 shadow-2xl overflow-hidden', !mapStore.isSidebarOpen && '-translate-x-[115%]']"
      >
        <div class="p-8 border-b border-white/5 bg-gradient-to-br from-white/5 to-transparent">
          <h2 class="font-black text-xl tracking-tight flex items-center gap-3">
            <span class="material-symbols-outlined text-primary dark:text-blue-400 bg-primary/10 p-2 rounded-xl">map</span> 
            Capas Geográficas
          </h2>
          <p class="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Gestión de datos espaciales</p>
        </div>
        
        <div class="flex-1 overflow-y-auto p-8 space-y-9 custom-scrollbar">
          
          <!-- Category: Biodiversity -->
          <div>
            <h3 class="text-[9px] uppercase font-black tracking-widest text-primary/60 mb-5 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-primary/60"></span> Biodiversidad
            </h3>
            <div class="space-y-4">
              <label class="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl cursor-pointer transition-all border border-white/5 hover:border-white/10 group">
                <div class="relative flex items-center">
                  <input type="checkbox" :checked="mapStore.activeLayers.includes('species-markers')" @change="mapStore.toggleLayer('species-markers')" class="w-5 h-5 rounded-lg border-white/10 bg-black/40 text-primary focus:ring-offset-slate-900 focus:ring-primary"/>
                </div>
                <div class="flex flex-col">
                  <span class="text-[11px] font-black uppercase tracking-wider text-white/80 group-hover:text-white">Avistamientos</span>
                  <span class="text-[9px] font-bold text-white/30 uppercase mt-0.5">Base de datos BioMarina</span>
                </div>
                <div class="ml-auto w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_rgba(11,60,91,0.8)]"></div>
              </label>
            </div>
          </div>

          <!-- Category: Environment -->
          <div>
            <h3 class="text-[9px] uppercase font-black tracking-widest text-green-400/60 mb-5 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-green-400/60"></span> Conservación
            </h3>
            <div class="space-y-4">
              <label class="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl cursor-pointer transition-all border border-white/5 hover:border-white/10 group">
                <input type="checkbox" :checked="mapStore.activeLayers.includes('conservation-zones')" @change="mapStore.toggleLayer('conservation-zones')" class="w-5 h-5 rounded-lg border-white/10 bg-black/40 text-green-500 focus:ring-offset-slate-900 focus:ring-green-500"/>
                <div class="flex flex-col">
                  <span class="text-[11px] font-black uppercase tracking-wider text-white/80 group-hover:text-white">Zonas Protegidas</span>
                  <span class="text-[9px] font-bold text-white/30 uppercase mt-0.5">Áreas Marinas (MPA)</span>
                </div>
                <div class="ml-auto w-4 h-3 rounded bg-green-500/30 border border-green-500/50"></div>
              </label>
            </div>
          </div>

        </div>

        <div class="p-8 border-t border-white/5 bg-black/20">
          <p class="text-[9px] font-black uppercase tracking-widest text-white/30 mb-4">Motor de Renderizado</p>
          <div class="grid grid-cols-1 gap-2">
            <button v-for="provider in tileProviders" :key="provider.name" 
                    @click="activeTileProvider = provider"
                    :class="['px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border', activeTileProvider.name === provider.name ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10']">
              {{ provider.name }}
            </button>
          </div>
        </div>
      </aside>

      <!-- Toggle Sidebar Button -->
      <button 
        @click="mapStore.isSidebarOpen = !mapStore.isSidebarOpen"
        :class="['absolute top-22 bg-slate-900/90 backdrop-blur-xl border border-white/10 w-12 h-12 rounded-2xl flex items-center justify-center text-white z-[2000] hover:bg-black transition-all duration-500 shadow-2xl overflow-hidden', mapStore.isSidebarOpen ? 'left-[360px]' : 'left-6']"
      >
        <span class="material-symbols-outlined text-[24px]">{{ mapStore.isSidebarOpen ? 'chevron_left' : 'layers' }}</span>
        <div v-if="!mapStore.isSidebarOpen" class="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-slate-900"></div>
      </button>

      <!-- Zoom / Navigation Controls -->
      <div class="absolute bottom-6 right-6 flex flex-col gap-3 z-[2000]">
        <div class="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
          <button @click="mapStore.setZoom(mapStore.zoom + 1)" class="w-12 h-12 text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all">
            <span class="material-symbols-outlined text-[24px]">add</span>
          </button>
          <div class="w-8 h-px bg-white/5 mx-auto"></div>
          <button @click="mapStore.setZoom(mapStore.zoom - 1)" class="w-12 h-12 text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all">
            <span class="material-symbols-outlined text-[24px]">remove</span>
          </button>
        </div>
        <button @click="mapStore.setCenter([11.24, -74.21]); mapStore.setZoom(8)" class="w-12 h-12 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white/60 shadow-2xl hover:text-white hover:bg-primary transition-all">
           <span class="material-symbols-outlined text-[20px]">near_me</span>
        </button>
      </div>

    </main>
  </div>
</template>

<style scoped>
.h-85 { width: 21.25rem; }
.top-22 { top: 5.5rem; }
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }

/* Leaflet Overrides */
:deep(.leaflet-container) {
  background: #0f172a !important;
}
:deep(.leaflet-bar) {
  border: none !important;
  display: none !important; /* We use custom controls */
}
:deep(.leaflet-control-attribution) {
  background: rgba(0,0,0,0.5) !important;
  color: rgba(255,255,255,0.4) !important;
  font-size: 8px !important;
  text-transform: uppercase;
  font-weight: 900;
  backdrop-filter: blur(4px);
  padding: 2px 8px !important;
  border-radius: 4px 0 0 0;
}
</style>
