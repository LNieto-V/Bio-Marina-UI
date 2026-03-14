<script setup lang="ts">
import { ref } from 'vue'

const filters = ref({
  habitat: {
    'Coral Reef': true,
    'Deep Sea': false,
    'Mangroves': false,
    'Open Ocean': false
  },
  iucn: {
    'Critically Endangered': false,
    'Endangered': true,
    'Vulnerable': false,
    'Least Concern': false
  },
  commercialValue: 'Any value',
  depthRangeMin: '',
  depthRangeMax: ''
})

const results = ref([
  {
    id: 1,
    name: 'Blue Whale',
    scientificName: 'Balaenoptera musculus',
    status: 'Endangered',
    statusColor: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    description: 'The blue whale is a marine mammal belonging to the baleen whale suborder Mysticeti. Reaching a maximum confirmed length of 29.9 meters and weight of 199 tonnes, it is the largest animal known to have ever existed.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi7I2gEk3ucVtJ1X7aAygYZM_dRT-4KO5zwIzv8yi6Duzwj-YWRbgpXoAX84JboXYe2J34CzQBvI6b6cEfgdNgyOw6xAxYpkVlcISGGWoFjy2wR1mdk2EvQWrZxBiyq-ptpUJ1A9LDz1dSyBrw5dMDif_tNUi70l3KZC29EV_vwwrL9ipVJvavYoX2aCZFTCDB_RXMAbIkwQdSzWUeVo5nQzPpUhPymBsRRi1NLOU09epHX_X5rLykV3TgtBUm2QYutdwHQMh7MUa3',
    tags: [
      { icon: 'water_drop', text: 'Pelagic Habitat' },
      { icon: 'straighten', text: '24 - 30m' },
      { icon: 'public', text: 'Global Distribution' }
    ]
  },
  {
    id: 2,
    name: 'Pygmy Blue Whale',
    scientificName: 'Balaenoptera musculus brevicauda',
    status: 'Data Deficient',
    statusColor: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    description: 'A subspecies of the blue whale found in the Indian Ocean and the Southern Pacific Ocean. Smaller than the Antarctic blue whale, reaching lengths of up to 24 meters.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXGOX5s73EkdaPWn2ondX24tnE1M3KV-uq4fBqjgZaF2MLOejQT9FVoGyT5sRjbJaCgweP-mriAVxGayTupyXgeDNtWyyY99RIonHx5Gzcq0m9pBCD0mRdvhwwbaij0UfV2v_grLdSYPgOCb2nKn1h3u3Y__upPq9i0-Hh1KpvfouU0Uwszxe9NxmdbaV-aM3cRm0oEbdSvXuhVJZxmrcj6elWpaYFWN1uLxSY62gHsgj18KajSXRFKZZyW7XqNYc_Y5I8ogpj_BMt',
    tags: [
      { icon: 'water_drop', text: 'Temperate/Tropical' },
      { icon: 'straighten', text: 'Up to 24m' },
      { icon: 'analytics', text: 'High Commercial (Historical)' }
    ]
  },
  {
    id: 3,
    name: 'Fin Whale',
    scientificName: 'Balaenoptera physalus',
    status: 'Vulnerable',
    statusColor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    description: "The fin whale is the second-longest cetacean on Earth after the blue whale. It is found in all the world's major oceans, from polar to tropical waters.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyoBWuyQqLqfAxJZQBr5Mk-Y7pMBFqwXeMZLj6d3Ifh2s42qFhPrhjCT24BKaHqZtEtW02fAD_vZNO_5KBF6ocr_eDJC8uRZifQ39o6lniq7bdnUW1kZCQfyzJMGVb6Qd1GjrKhdi2kshzzBA7HVAVLCCOhwTSe5x1hNHzXErDI5nJMQqbgCRWHlXQX1pzhRi33G4riVqxKVovTM67FanVo-Czt5fZSLhUvaGesYnU9xpZUFyMXhNfVPuVL8iOChucPH1FRE2od1aJ',
    tags: [
      { icon: 'water_drop', text: 'Cosmopolitan' },
      { icon: 'straighten', text: '20 - 27m' },
      { icon: 'speed', text: 'Up to 46 km/h' }
    ]
  }
])

const searchQuery = ref('Blue Whale')
</script>

<template>
<div class="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors">
  
  <!-- Top Navigation Bar -->
  <header class="sticky top-0 z-50 flex items-center justify-between border-b border-primary/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-3 lg:px-20 transition-colors duration-300">
    <RouterLink to="/" class="flex items-center gap-3">
      <div class="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
        <span class="material-symbols-outlined">waves</span>
      </div>
      <h2 class="text-xl font-bold tracking-tight text-primary dark:text-blue-400">BioMarina</h2>
    </RouterLink>
    
    <nav class="hidden md:flex items-center gap-8">
      <RouterLink to="/catalog" class="text-sm font-semibold hover:text-primary dark:hover:text-blue-400 transition-colors">Species</RouterLink>
      <RouterLink to="/map" class="text-sm font-semibold hover:text-primary dark:hover:text-blue-400 transition-colors">Habitats</RouterLink>
      <a class="text-sm font-semibold hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Conservation</a>
      <a class="text-sm font-semibold hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Research</a>
    </nav>
    
    <div class="flex items-center gap-4">
      <button class="p-2 rounded-full hover:bg-primary/10 transition-colors">
        <span class="material-symbols-outlined text-primary dark:text-slate-300">notifications</span>
      </button>
      <RouterLink to="/login" class="size-10 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 shrink-0">
        <img alt="User" class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD03vop9lv8U6gWbO1zlPahVwcgEKaoZaIIR2G5fS3DJDxP9NO38Y9hsfcdX69oUUEuckf96luT8BNdF8PQho2EL0y7cyadXo4L9YbamXbxzYMKp7sWWz73pWKYmRvmHADarAWOXB4OC6Vn8qg8wCjybM1Z_WL3-v-dnMl-pZ4kkOeF53Ah2A_3-LmtTo2_3Q_v6u9KSj_Ex3FNQZFB8lGhGRs_Dp-u3xUJVvgK6kJtZGCAMU4RN1kvkAQREaVTnGkRBbxUMPh2hItG"/>
      </RouterLink>
    </div>
  </header>

  <main class="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 p-6 lg:flex-row lg:px-20">
    
    <!-- Left Sidebar Filters -->
    <aside class="w-full shrink-0 lg:w-72">
      <div class="sticky top-24 flex flex-col gap-6 rounded-xl border border-primary/10 bg-white dark:bg-slate-900 p-6 shadow-sm transition-colors duration-300">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold">Filters</h3>
          <button class="text-xs font-semibold text-primary dark:text-blue-400 hover:underline">Clear all</button>
        </div>
        
        <!-- Habitat Filter -->
        <div class="space-y-3">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Habitat</p>
          <div class="flex flex-wrap gap-2">
            <label 
              v-for="(val, key) in filters.habitat" 
              :key="key"
              class="group relative flex cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/5 dark:bg-slate-800 px-3 py-1.5 text-sm transition-all hover:bg-primary hover:text-white has-[:checked]:bg-primary has-[:checked]:text-white dark:hover:bg-primary dark:has-[:checked]:bg-primary"
            >
              <input v-model="filters.habitat[key]" type="checkbox" class="peer sr-only"/>
              <span class="dark:text-slate-300 peer-checked:dark:text-white group-hover:dark:text-white transition-colors">{{ key }}</span>
            </label>
          </div>
        </div>

        <!-- IUCN Status Filter -->
        <div class="space-y-3">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500">IUCN Status</p>
          <div class="space-y-2">
            <label 
              v-for="(val, key) in filters.iucn" 
              :key="key"
              class="flex items-center gap-3 rounded-lg border border-transparent p-2 hover:bg-primary/5 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <input v-model="filters.iucn[key]" type="checkbox" class="rounded border-primary/30 text-primary focus:ring-primary bg-transparent"/>
              <span class="text-sm font-medium dark:text-slate-300">{{ key }}</span>
            </label>
          </div>
        </div>

        <!-- Commercial Value -->
        <div class="space-y-3">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Commercial Value</p>
          <select v-model="filters.commercialValue" class="w-full rounded-lg border-primary/20 bg-primary/5 dark:bg-slate-800 dark:border-slate-700 text-sm focus:border-primary focus:ring-primary text-slate-900 dark:text-white">
            <option>Any value</option>
            <option>High Commercial</option>
            <option>Subsistence Only</option>
            <option>No Commercial Value</option>
          </select>
        </div>

        <!-- Depth Range Slider Placeholder -->
        <div class="space-y-3">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Depth Range (m)</p>
          <div class="flex items-center gap-4">
            <input v-model="filters.depthRangeMin" type="text" placeholder="0" class="w-full rounded-lg border-primary/20 bg-primary/5 dark:bg-slate-800 dark:border-slate-700 text-center text-sm focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-400"/>
            <span class="text-slate-400">—</span>
            <input v-model="filters.depthRangeMax" type="text" placeholder="5000" class="w-full rounded-lg border-primary/20 bg-primary/5 dark:bg-slate-800 dark:border-slate-700 text-center text-sm focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-400"/>
          </div>
        </div>

        <button class="w-full rounded-lg bg-primary text-white py-2.5 text-sm font-bold shadow-md transition-transform hover:scale-[1.02] active:scale-95">
          Apply Filters
        </button>
      </div>
    </aside>

    <!-- Main Content: Search Results -->
    <div class="flex-1 space-y-6">
      
      <!-- Search Bar Container -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <h1 class="text-3xl font-black tracking-tight text-primary dark:text-white transition-colors">Advanced Search</h1>
          <p class="text-slate-500 dark:text-slate-400 transition-colors">Find species, datasets, and ecological reports in our global database.</p>
        </div>

        <div class="relative flex h-14 w-full items-center group">
          <span class="material-symbols-outlined absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search by common name, scientific name, or family..." 
            class="h-full w-full rounded-xl border border-primary/10 bg-white dark:bg-slate-900 dark:border-slate-800 pl-12 pr-32 text-base font-medium shadow-sm focus:border-primary focus:ring-primary transition-colors placeholder:text-slate-400"
          />
          <button class="absolute right-2 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90">
            Search
          </button>
        </div>
      </div>

      <!-- Results Header -->
      <div class="flex items-center justify-between border-b border-primary/10 pb-4">
        <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Showing <span class="text-primary dark:text-blue-400 font-bold">124</span> results for <span class="italic text-slate-800 dark:text-slate-200">"{{ searchQuery }}"</span>
        </p>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-400">SORT BY:</span>
          <select class="border-none bg-transparent text-sm font-bold text-primary dark:text-blue-400 focus:ring-0 cursor-pointer">
            <option>Relevance</option>
            <option>Scientific Name (A-Z)</option>
            <option>IUCN Status</option>
          </select>
        </div>
      </div>

      <!-- Results List -->
      <div class="grid gap-4">
        <div 
          v-for="item in results" 
          :key="item.id"
          class="group flex flex-col gap-4 rounded-xl border border-primary/10 bg-white dark:bg-slate-900 p-4 transition-all hover:border-primary/30 hover:shadow-lg md:flex-row"
        >
          <div class="h-40 w-full shrink-0 overflow-hidden rounded-lg md:h-auto md:w-56 bg-slate-100 dark:bg-slate-800">
            <img :alt="item.name" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" :src="item.image"/>
          </div>
          
          <div class="flex flex-1 flex-col justify-between">
            <div class="space-y-1">
              <div class="flex items-start justify-between">
                <h4 class="text-xl font-bold text-slate-900 dark:text-slate-100">{{ item.name }}</h4>
                <span :class="`rounded-full px-3 py-1 text-[10px] font-black uppercase ${item.statusColor}`">
                  {{ item.status }}
                </span>
              </div>
              <p class="text-sm italic text-primary dark:text-blue-400">{{ item.scientificName }}</p>
              <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                {{ item.description }}
              </p>
            </div>
            
            <div class="mt-4 flex flex-wrap gap-4 text-xs font-bold text-slate-600 dark:text-slate-400">
              <div v-for="(tag, index) in item.tags" :key="index" class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[18px]">{{ tag.icon }}</span>
                <span>{{ tag.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center gap-2 pt-8 text-sm font-bold">
        <button class="flex size-10 items-center justify-center rounded-lg border border-primary/10 bg-white hover:bg-primary/5 dark:bg-slate-900 dark:border-slate-800 disabled:opacity-50 transition-colors">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button class="flex size-10 items-center justify-center rounded-lg bg-primary text-white shadow-md">1</button>
        <button class="flex size-10 items-center justify-center rounded-lg border border-primary/10 bg-white hover:bg-primary/5 dark:bg-slate-900 dark:border-slate-800 transition-colors">2</button>
        <button class="flex size-10 items-center justify-center rounded-lg border border-primary/10 bg-white hover:bg-primary/5 dark:bg-slate-900 dark:border-slate-800 transition-colors">3</button>
        <span class="px-2 text-slate-400">...</span>
        <button class="flex size-10 items-center justify-center rounded-lg border border-primary/10 bg-white hover:bg-primary/5 dark:bg-slate-900 dark:border-slate-800 transition-colors">12</button>
        <button class="flex size-10 items-center justify-center rounded-lg border border-primary/10 bg-white hover:bg-primary/5 dark:bg-slate-900 dark:border-slate-800 transition-colors">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      
    </div>
  </main>

  <!-- Minimal Footer -->
  <footer class="mt-auto border-t border-primary/10 bg-white dark:bg-slate-900 px-6 py-10 lg:px-20 transition-colors duration-300">
    <div class="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 md:flex-row">
      <div class="flex items-center gap-2">
        <div class="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
          <span class="material-symbols-outlined text-sm">waves</span>
        </div>
        <p class="text-sm font-bold text-primary dark:text-slate-100">BioMarina Database © 2024</p>
      </div>
      
      <div class="flex gap-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Documentation</a>
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">API Access</a>
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Terms of Service</a>
      </div>
      
      <div class="flex gap-4">
        <span class="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary dark:hover:text-white transition-colors">language</span>
        <span class="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary dark:hover:text-white transition-colors">database</span>
        <span class="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary dark:hover:text-white transition-colors">hub</span>
      </div>
    </div>
  </footer>
</div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>
