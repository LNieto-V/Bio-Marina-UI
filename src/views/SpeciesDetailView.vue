<script setup lang="ts">
import { ref } from 'vue'

const species = ref({
  name: 'Whale Shark',
  scientificName: 'Rhincodon typus',
  status: 'Endangered',
  statusColor: 'bg-red-600 text-white',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_ikwffQlQ4FCG6_P3VMNk90ZSFZWpNo8mQRik-UdP7_abL6CwRVl0anE4VfCPc23JC1R5vgESz8jM9k4sF05GO9S4uQ-xUSv6MESHjIKNNbjipY3tWQ_1AYOZxNBuIofpEogFSLNjgix_oNJq_tvDp18Nh-wLgui5Sbi-r6A1ssPDCAN_U1SrrggtaGyHB2bEU66XO_9Se882vBRL9sEXqnMrNMZjxYkPoJbgWzDl53Xgj0pEgRjNROJGQCUz9BVV1bSXPudHvSPO',
  attributes: [
    { icon: 'water_drop', label: 'Environment', value: 'Marine / Pelagic' },
    { icon: 'restaurant', label: 'Diet', value: 'Filter Feeder / Plankton' },
    { icon: 'straighten', label: 'Max Length', value: 'Up to 18.8 meters' }
  ],
  taxonomy: {
    Kingdom: 'Animalia',
    Phylum: 'Chordata',
    Class: 'Chondrichthyes',
    Order: 'Orectolobiformes',
    Family: 'Rhincodontidae',
    Genus: 'Rhincodon'
  },
  biology: {
    description: 'The whale shark is a slow-moving, filter-feeding carpet shark and the largest known extant fish species. The head is wide and flat with two small eyes at the front corners.',
    lifespan: '80 - 130 years',
    sociality: 'Solitary'
  },
  habitat: {
    description: 'Found in open waters of the tropical oceans and is rarely found in water below 21°C (70°F). They are migratory and often congregate in seasonal feeding areas.',
    tags: ['Coastal', 'Oceanic', 'Lagoons']
  },
  regulations: {
    title: 'Total Ban (Permanent)',
    description: 'Whale sharks are listed under Appendix II of CITES. International trade is strictly regulated. In most countries, it is illegal to catch, harass, or sell whale shark products.',
    body: 'International Union for Conservation of Nature (IUCN)'
  }
})

const activeTab = ref('taxonomy')
</script>

<template>
<div class="relative flex h-auto min-h-screen w-full flex-col font-display text-slate-900 dark:text-slate-100 transition-colors duration-200">
  
  <!-- Navigation Header -->
  <header class="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 bg-white dark:bg-slate-900 sticky top-0 z-50">
    <RouterLink to="/" class="flex items-center gap-4 text-primary dark:text-blue-400 focus:outline-none">
      <div class="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
        <span class="material-symbols-outlined">tsunami</span>
      </div>
      <h2 class="text-xl font-bold leading-tight tracking-tight">BioMarina</h2>
    </RouterLink>
    
    <div class="flex gap-3">
      <button class="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/10 transition-colors">
        <span class="material-symbols-outlined text-[20px]">share</span>
      </button>
      <button class="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/10 transition-colors">
        <span class="material-symbols-outlined text-[20px]">bookmark</span>
      </button>
      <button class="flex h-10 px-4 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold tracking-wide transition-opacity hover:opacity-90">
        Contact Expert
      </button>
    </div>
  </header>

  <main class="flex-1 flex flex-col items-center">
    <div class="flex flex-col max-w-[1200px] w-full flex-1 px-4 md:px-10 py-8">
      
      <!-- Hero Section -->
      <div class="@container mb-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Main Image -->
          <div class="lg:col-span-8">
            <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-xl min-h-[400px] overflow-hidden relative group">
              <div 
                class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                :style="`background-image: url('${species.image}')`"
              ></div>
              <div class="absolute top-4 left-4">
                <span :class="`px-3 py-1 ${species.statusColor} text-xs font-bold rounded-full uppercase tracking-wider`">
                  {{ species.status }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Quick Info Side -->
          <div class="lg:col-span-4 flex flex-col gap-4">
            <div class="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
              <h1 class="text-4xl font-black leading-tight tracking-tight mb-1 content-start">{{ species.name }}</h1>
              <p class="text-primary dark:text-blue-400 italic font-medium text-lg mb-6">{{ species.scientificName }}</p>
              
              <div class="space-y-4">
                <div v-for="(attr, index) in species.attributes" :key="index" class="flex items-center gap-3">
                  <div class="p-2 bg-primary/10 rounded-lg text-primary dark:text-blue-400">
                    <span class="material-symbols-outlined">{{ attr.icon }}</span>
                  </div>
                  <div>
                    <p class="text-xs text-slate-500 uppercase font-bold tracking-tighter">{{ attr.label }}</p>
                    <p class="text-sm font-semibold">{{ attr.value }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Map Mini-Card -->
            <div class="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
              <h3 class="text-sm font-bold mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary dark:text-blue-400 text-sm">public</span>
                Global Distribution
              </h3>
              <div class="w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 relative">
                <div class="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center opacity-50" style="background-image: radial-gradient(circle, #0b3c5b 1px, transparent 1px); background-size: 10px 10px;">
                  <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded backdrop-blur">Map Data Visualization</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="mb-8 overflow-x-auto scrollbar-hide">
        <div class="flex border-b border-slate-200 dark:border-slate-800 min-w-max">
          <button 
            @click="activeTab = 'taxonomy'"
            :class="[
              'flex items-center gap-2 px-6 py-4 font-bold text-sm tracking-wide transition-colors focus:outline-none',
              activeTab === 'taxonomy' ? 'border-b-2 border-primary text-primary dark:border-blue-400 dark:text-blue-400' : 'border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400'
            ]"
          >
            <span class="material-symbols-outlined text-sm">account_tree</span> Taxonomy
          </button>
          <button 
            @click="activeTab = 'biology'"
            :class="[
              'flex items-center gap-2 px-6 py-4 font-bold text-sm tracking-wide transition-colors focus:outline-none',
              activeTab === 'biology' ? 'border-b-2 border-primary text-primary dark:border-blue-400 dark:text-blue-400' : 'border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400'
            ]"
          >
            <span class="material-symbols-outlined text-sm">science</span> Biology
          </button>
          <button 
            @click="activeTab = 'habitat'"
            :class="[
              'flex items-center gap-2 px-6 py-4 font-bold text-sm tracking-wide transition-colors focus:outline-none',
              activeTab === 'habitat' ? 'border-b-2 border-primary text-primary dark:border-blue-400 dark:text-blue-400' : 'border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400'
            ]"
          >
            <span class="material-symbols-outlined text-sm">landscape</span> Habitat
          </button>
          <button 
            @click="activeTab = 'regulations'"
            :class="[
              'flex items-center gap-2 px-6 py-4 font-bold text-sm tracking-wide transition-colors focus:outline-none',
              activeTab === 'regulations' ? 'border-b-2 border-primary text-primary dark:border-blue-400 dark:text-blue-400' : 'border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400'
            ]"
          >
            <span class="material-symbols-outlined text-sm">gavel</span> Regulations
          </button>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        
        <!-- Taxonomy Section -->
        <section v-show="activeTab === 'taxonomy'" class="space-y-4 animate-in fade-in duration-300 col-span-1 md:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2 mb-2">
            <h2 class="text-xl font-bold">Taxonomy</h2>
          </div>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
            <ul class="space-y-3">
              <li v-for="(value, key) in species.taxonomy" :key="key" class="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2 last:border-0 last:pb-0">
                <span class="text-slate-500 text-sm">{{ key }}</span>
                <span :class="['font-bold text-sm', key === 'Genus' ? 'italic' : '']">{{ value }}</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Biology Section -->
        <section v-show="activeTab === 'biology'" class="space-y-4 animate-in fade-in duration-300 col-span-1 md:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2 mb-2">
            <h2 class="text-xl font-bold">Biology &amp; Characteristics</h2>
          </div>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 transition-colors">
            <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {{ species.biology.description }}
            </p>
            <div class="grid grid-cols-2 gap-4 pt-2">
              <div class="bg-primary/5 dark:bg-slate-800 p-3 rounded-lg border border-transparent dark:border-slate-700">
                <span class="material-symbols-outlined text-primary dark:text-blue-400 block mb-1">child_care</span>
                <h4 class="text-xs font-bold uppercase text-slate-500">Lifespan</h4>
                <p class="text-sm font-semibold">{{ species.biology.lifespan }}</p>
              </div>
              <div class="bg-primary/5 dark:bg-slate-800 p-3 rounded-lg border border-transparent dark:border-slate-700">
                <span class="material-symbols-outlined text-primary dark:text-blue-400 block mb-1">groups</span>
                <h4 class="text-xs font-bold uppercase text-slate-500">Sociality</h4>
                <p class="text-sm font-semibold">{{ species.biology.sociality }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Habitat Section -->
        <section v-show="activeTab === 'habitat'" class="space-y-4 animate-in fade-in duration-300 col-span-1 md:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2 mb-2">
            <h2 class="text-xl font-bold">Habitat</h2>
          </div>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
            <div class="flex items-start gap-4">
              <span class="material-symbols-outlined text-primary dark:text-blue-400 text-3xl shrink-0">waves</span>
              <div class="space-y-2">
                <p class="text-sm font-bold">Tropical and Warm-Temperate Seas</p>
                <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {{ species.habitat.description }}
                </p>
                <div class="flex flex-wrap gap-2 mt-4">
                  <span v-for="(tag, index) in species.habitat.tags" :key="index" class="bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium rounded-full cursor-default border border-transparent dark:border-slate-700">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Fishing Regulations Section -->
        <section v-show="activeTab === 'regulations'" class="space-y-4 animate-in fade-in duration-300 col-span-1 md:col-span-2 mx-auto w-full max-w-2xl">
          <div class="flex items-center gap-2 mb-2">
            <h2 class="text-xl font-bold">Fishing Regulations (Veda)</h2>
          </div>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
            <div class="absolute top-0 right-0 p-3">
              <span class="material-symbols-outlined text-red-500 opacity-10 dark:opacity-20 text-6xl">block</span>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                  <span class="material-symbols-outlined">warning</span>
                </div>
                <h4 class="font-bold text-red-600">{{ species.regulations.title }}</h4>
              </div>
              <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400 relative z-10">
                {{ species.regulations.description }}
              </p>
              <div class="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg relative z-10 border border-transparent dark:border-slate-700">
                <p class="text-xs font-bold uppercase text-slate-500 mb-2">Regulatory Body</p>
                <p class="text-sm font-semibold">{{ species.regulations.body }}</p>
              </div>
            </div>
          </div>
        </section>
        
      </div>

      <!-- Conservation Message -->
      <div class="bg-primary/5 dark:bg-primary/20 rounded-xl p-8 text-center border border-primary/20 transition-colors">
        <span class="material-symbols-outlined text-primary dark:text-blue-400 text-4xl mb-4">volunteer_activism</span>
        <h3 class="text-xl font-bold text-primary dark:text-blue-400 mb-2">Help Protect Our Marine Giants</h3>
        <p class="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Whale sharks are highly vulnerable to human impact. Responsible tourism and habitat protection are critical for their survival. Report illegal sightings to local marine authorities.
        </p>
        <button class="mt-6 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md">
          Donate to Conservation
        </button>
      </div>
      
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-6 transition-colors duration-300">
    <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="col-span-1 md:col-span-2">
        <div class="flex items-center gap-2 text-primary dark:text-blue-400 mb-4">
          <span class="material-symbols-outlined">tsunami</span>
          <h2 class="text-slate-900 dark:text-white text-lg font-bold">BioMarina</h2>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          Advancing marine biology research and conservation efforts globally. Comprehensive data on vulnerable and endangered species.
        </p>
      </div>
      
      <div>
        <h4 class="font-bold mb-4 text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">Resources</h4>
        <ul class="text-sm text-slate-500 dark:text-slate-400 space-y-2">
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Taxonomy Database</a></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Marine Regulations</a></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Habitat Mapping</a></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Conservation Projects</a></li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-bold mb-4 text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">Contact</h4>
        <ul class="text-sm text-slate-500 dark:text-slate-400 space-y-2">
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs">mail</span> info@biomarina.org</li>
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs">call</span> +1 (555) 000-1234</li>
        </ul>
      </div>
    </div>
    
    <div class="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
      © 2024 BioMarina - Global Marine Species Archive
    </div>
  </footer>
</div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>
