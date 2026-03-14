<script setup lang="ts">
import { ref } from 'vue'

const isSidebarOpen = ref(true)

const layers = ref({
  mantaRay: true,
  coralBleaching: false,
  marineReserves: true,
  shippingLanes: false,
  seaTemp: false
})
</script>

<template>
  <div class="h-screen w-full flex flex-col font-display bg-slate-900 text-white overflow-hidden transition-colors duration-300">
    
    <!-- Top Navigation Toolbar -->
    <header class="flex-none h-16 bg-white/10 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/20 dark:border-slate-800 flex items-center justify-between px-6 z-40 transition-colors">
      <div class="flex items-center gap-4">
        <RouterLink to="/" class="flex items-center justify-center w-10 h-10 bg-primary rounded-lg text-white hover:bg-primary/90 transition-colors">
          <span class="material-symbols-outlined">waves</span>
        </RouterLink>
        <div class="hidden sm:block">
          <h1 class="text-xl font-bold tracking-tight text-white dark:text-blue-400">BioMarina</h1>
          <p class="text-xs text-white/60 dark:text-slate-400 font-medium">Interactive Conservation Map</p>
        </div>
      </div>

      <!-- Quick Tools -->
      <div class="flex items-center gap-2 bg-black/20 dark:bg-slate-800 rounded-lg p-1 border border-white/10 dark:border-slate-700">
        <button class="w-10 h-10 rounded text-white/70 hover:text-white hover:bg-white/10 dark:hover:bg-slate-700 flex items-center justify-center transition-all bg-white/10 dark:bg-slate-700 pointer-events-none" title="Select Area">
          <span class="material-symbols-outlined text-[20px]">ads_click</span>
        </button>
        <button class="w-10 h-10 rounded text-white/70 hover:text-white hover:bg-white/10 dark:hover:bg-slate-700 flex items-center justify-center transition-all" title="Measure Distance">
          <span class="material-symbols-outlined text-[20px]">straighten</span>
        </button>
        <button class="w-10 h-10 rounded text-white/70 hover:text-white hover:bg-white/10 dark:hover:bg-slate-700 flex items-center justify-center transition-all" title="Draw Polygon">
          <span class="material-symbols-outlined text-[20px]">draw</span>
        </button>
        <div class="w-px h-6 bg-white/20 dark:bg-slate-600 mx-1"></div>
        <button class="w-10 h-10 rounded text-white/70 hover:text-white hover:bg-white/10 dark:hover:bg-slate-700 flex items-center justify-center transition-all" title="Reset View">
          <span class="material-symbols-outlined text-[20px]">my_location</span>
        </button>
      </div>

      <div class="flex items-center gap-4">
        <button class="flex items-center gap-2 bg-white/10 dark:bg-slate-800 hover:bg-white/20 dark:hover:bg-slate-700 border border-white/20 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          <span class="material-symbols-outlined text-[18px]">download</span> Export Data
        </button>
      </div>
    </header>

    <!-- Main Map Area -->
    <main class="flex-1 relative flex">
      
      <!-- FAKE MAP BACKGROUND -->
      <div class="absolute inset-0 z-0 bg-slate-900 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQqA8Qst9bN2eYVn9M3e9tN2O9gJ2uB9tG0cF0tY4mV2rP0pW4jP1pE9yK5lA2kX2iY0cN6gH2mV2zD1gF5oK4xH6wA0hR3lT7vK9mA2uL5jE8gQ2rL1wK4bJ8oV0qA8dH3aL2dJ0lW0rI0hZ5bJ3sT2dD5qD2yO3fA8mZ9oA5aK2e'); filter: grayscale(80%) contrast(120%) brightness(50%);">
        
        <!-- FAKE OVERLAYS (Simulating data layers) -->
        <!-- Manta Ray Track -->
        <div v-if="layers.mantaRay" class="absolute top-[40%] left-[30%] w-[300px] h-[300px]">
          <svg viewBox="0 0 100 100" class="w-full h-full stroke-orange-500 fill-none" style="stroke-width: 0.5;">
            <path d="M10,90 Q30,50 50,40 T90,20" stroke-dasharray="2,2"/>
            <circle cx="90" cy="20" r="1.5" class="fill-orange-500 animate-pulse"/>
            <circle cx="50" cy="40" r="1" class="fill-orange-500/50"/>
          </svg>
          <div class="absolute right-0 top-0 bg-black/60 backdrop-blur text-[10px] px-2 py-1 rounded text-orange-400 border border-orange-500/30">
            MR-42 "Luna" (Active)
          </div>
        </div>

        <!-- Marine Reserve Polygon -->
        <div v-if="layers.marineReserves" class="absolute top-[20%] right-[15%] w-[400px] h-[300px] bg-green-500/20 border-2 border-green-400/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] backdrop-blur-sm shadow-[0_0_30px_rgba(74,222,128,0.2)] flex items-center justify-center">
          <span class="text-green-300 font-bold bg-black/40 px-3 py-1 rounded text-xs tracking-wider border border-green-500/30">Sector 7 MPA</span>
        </div>
      </div>

      <!-- Left Control Panel -->
      <aside 
        :class="['absolute top-6 bottom-6 left-6 w-80 bg-black/60 dark:bg-slate-900/80 backdrop-blur-xl border border-white/10 dark:border-slate-700 rounded-2xl flex flex-col z-20 transition-all duration-300 overflow-hidden', !isSidebarOpen && '-translate-x-[120%]']"
      >
        <div class="p-5 border-b border-white/10 bg-white/5">
          <h2 class="font-bold text-lg tracking-wide flex items-center gap-2">
            <span class="material-symbols-outlined text-primary dark:text-blue-400">layers</span> Data Layers
          </h2>
        </div>
        
        <div class="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          
          <!-- Category: Telemetry -->
          <div>
            <h3 class="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-3">Live Telemetry</h3>
            <div class="space-y-2">
              <label class="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
                <input v-model="layers.mantaRay" type="checkbox" class="w-4 h-4 rounded border-white/20 bg-black/50 checked:bg-orange-500 checked:border-orange-500 focus:ring-0"/>
                <span class="text-sm font-medium group-hover:text-white text-white/80">Manta Ray Tags</span>
                <div class="ml-auto w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
              </label>
              <label class="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
                <input type="checkbox" class="w-4 h-4 rounded border-white/20 bg-black/50 checked:bg-blue-500 checked:border-blue-500 focus:ring-0"/>
                <span class="text-sm font-medium group-hover:text-white text-white/80">Whale Shark Routes</span>
                <div class="ml-auto w-3 h-3 rounded-full bg-blue-500"></div>
              </label>
            </div>
          </div>

          <!-- Category: Environment -->
          <div>
            <h3 class="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-3">Environment</h3>
            <div class="space-y-2">
              <label class="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
                <div class="flex items-center gap-3">
                  <input v-model="layers.seaTemp" type="checkbox" class="w-4 h-4 rounded border-white/20 bg-black/50 focus:ring-0"/>
                  <span class="text-sm font-medium group-hover:text-white text-white/80">Sea Surface Temp (SST)</span>
                </div>
              </label>
              <label class="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
                <div class="flex items-center gap-3">
                  <input v-model="layers.coralBleaching" type="checkbox" class="w-4 h-4 rounded border-white/20 bg-black/50 focus:ring-0"/>
                  <span class="text-sm font-medium group-hover:text-white text-white/80">Coral Bleaching Risk</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Category: Infrastructure -->
          <div>
            <h3 class="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-3">Infrastructure</h3>
            <div class="space-y-2">
              <label class="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
                <input v-model="layers.marineReserves" type="checkbox" checked class="w-4 h-4 rounded border-white/20 bg-black/50 checked:bg-green-500 checked:border-green-500 focus:ring-0"/>
                <span class="text-sm font-medium group-hover:text-white text-white/80">Marine Protected Areas</span>
                <div class="ml-auto w-4 h-3 rounded border border-green-500 bg-green-500/20"></div>
              </label>
              <label class="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
                <input v-model="layers.shippingLanes" type="checkbox" class="w-4 h-4 rounded border-white/20 bg-black/50 checked:bg-red-500 checked:border-red-500 focus:ring-0"/>
                <span class="text-sm font-medium group-hover:text-white text-white/80">Major Shipping Lanes</span>
                <div class="ml-auto w-4 h-0.5 bg-red-400"></div>
              </label>
            </div>
          </div>

        </div>

        <div class="p-4 border-t border-white/10 bg-black/40">
          <p class="text-xs text-white/40 mb-2">Base Map</p>
          <select class="w-full bg-white/10 border-white/20 text-sm rounded-lg text-white focus:ring-primary focus:border-primary">
            <option>Satellite Topography</option>
            <option>Bathymetry</option>
            <option>Nautical Chart</option>
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
        <div class="bg-black/60 dark:bg-slate-900/80 backdrop-blur-md border border-white/10 dark:border-slate-800 rounded-xl flex flex-col overflow-hidden">
          <button class="w-10 h-10 text-white/80 hover:text-white hover:bg-white/10 dark:hover:bg-slate-700 flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined">add</span>
          </button>
          <div class="w-full h-px bg-white/10"></div>
          <button class="w-10 h-10 text-white/80 hover:text-white hover:bg-white/10 dark:hover:bg-slate-700 flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined">remove</span>
          </button>
        </div>
      </div>

      <!-- Info/Scale Overlay -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black/60 dark:bg-slate-900/80 backdrop-blur-md border border-white/10 dark:border-slate-800 px-4 py-2 rounded-full hidden md:flex items-center gap-4 text-xs font-mono text-white/70">
        <div class="flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">location_on</span>
          Lat: -14.2341° Lon: 145.1830°
        </div>
        <div class="w-px h-3 bg-white/20"></div>
        <div class="flex items-center gap-2">
          <span>0</span>
          <div class="w-16 h-1 border-x border-b border-white/50 relative">
            <div class="absolute bottom-1 left-1/2 -translate-x-1/2 bg-white/80 w-8 h-px"></div>
          </div>
          <span>50 km</span>
        </div>
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
