<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'

const activeFilter = ref('Taxonomy')
const sortBy = ref('Alphabetical (A-Z)')

const species = ref([
  {
    id: 1,
    name: 'Manta Ray',
    scientific: 'Mobula birostris',
    status: 'Vulnerable',
    statusClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    habitat: 'Reef/Pelagic',
    depth: '0-1000m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqA8Qst9bN2eYVn9M3e9tN2O9gJ2uB9tG0cF0tY4mV2rP0pW4jP1pE9yK5lA2kX2iY0cN6gH2mV2zD1gF5oK4xH6wA0hR3lT7vK9mA2uL5jE8gQ2rL1wK4bJ8oV0qA8dH3aL2dJ0lW0rI0hZ5bJ3sT2dD5qD2yO3fA8mZ9oA5aK2e',
    tags: ['Filter Feeder', 'Highly Migratory']
  },
  {
    id: 2,
    name: 'Hawksbill Turtle',
    scientific: 'Eretmochelys imbricata',
    status: 'Critically Endangered',
    statusClass: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    habitat: 'Coral Reefs',
    depth: '0-20m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2vX8hU4dM5rK0iE8zV8mT9gQ5lK1wG7mF3uV2eQ0uH3yY5lA2fK3hW4oT2yM5oH8bP0cX7uV5aI5fP7zU1lU8zV3gW4eQ4kV0mB2zZ8oX4bU5qM4cR3iT3sW8eW1tM1qM3lN7kV9mU8aV6oO5sV5uA3lF2lJ5wG7wH1qY9eA5iT7mT8fW4a',
    tags: ['Spongivore', 'Nesting']
  },
  {
    id: 3,
    name: 'Whale Shark',
    scientific: 'Rhincodon typus',
    status: 'Endangered',
    statusClass: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    habitat: 'Open Ocean',
    depth: '0-1900m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_ikwffQlQ4FCG6_P3VMNk90ZSFZWpNo8mQRik-UdP7_abL6CwRVl0anE4VfCPc23JC1R5vgESz8jM9k4sF05GO9S4uQ-xUSv6MESHjIKNNbjipY3tWQ_1AYOZxNBuIofpEogFSLNjgix_oNJq_tvDp18Nh-wLgui5Sbi-r6A1ssPDCAN_U1SrrggtaGyHB2bEU66XO_9Se882vBRL9sEXqnMrNMZjxYkPoJbgWzDl53Xgj0pEgRjNROJGQCUz9BVV1bSXPudHvSPO',
    tags: ['Filter Feeder', 'Cartilaginous']
  },
  {
    id: 4,
    name: 'Green Sea Turtle',
    scientific: 'Chelonia mydas',
    status: 'Endangered',
    statusClass: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    habitat: 'Coastal Waters',
    depth: '0-50m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsQ0pRRED5FBgTDVh8MSfZXiBcDekQggFHZVBe5OL-vi_4GwN-gnwLow0zVQ2ebR-0oaPupx66B8V-roKfwhnGune3DrEzSASMtXtXFUJmZSs1fInWFEQtXno1Uk82LScE65wuWpxCaF1BnkG0Cwje0ITJk6tcOdzfWtinl7fGXv-9mydMKgf3nMc2W11awa40lpMAPBd9zq4Zu6AZR7cKkFw3dhVTHChbgQtJ46sWe7R0xJoj5RBDwnYyrC6arItnXUiK-SiUsKzK',
    tags: ['Herbivore', 'Migratory']
  },
  {
    id: 5,
    name: 'Clownfish',
    scientific: 'Amphiprioninae',
    status: 'Least Concern',
    statusClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    habitat: 'Coral Reefs',
    depth: '1-15m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANeNiurUtIlBqwbzKVnYmYzodAEYHugU3LYub7HXyXFyls04MczoydH5AynkCANHfeQPdEkkS3ZWhva9lyitntq_so6WlXQV2nmv-v3D8Aod6Wn6ijjAwx_nNpcub04_rFdsKykKU5ugWEmNmctd8_nKi9MU3EG-bnlJd2GPxKz4cqPVGvlAQ-GLdJ2G6RG6aIfnVb3G5ZT35vwaLzON-Tx5jNlji5ghzq0F6cIxTErJGp8hpD6Zzm76lUbI8RNEgh-SQwEWgNwWXn',
    tags: ['Symbiotic', 'Anemone']
  },
  {
    id: 6,
    name: 'Great White Shark',
    scientific: 'Carcharodon carcharias',
    status: 'Vulnerable',
    statusClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    habitat: 'Coastal/Pelagic',
    depth: '0-1200m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIS3B9TGSyGakGJ1JYWDAhAnpM3Ar7iyfMYXSirlp_QpM-0i5AbPbZcuO2jaiz0KrHf2gBCseVU7-GR--1_HnOZoK2QTXhUpPzP293-w3hQLBXn81iyJY9VUBkfoGBqb2C4e87QWMbYef1Pe1GBGX_meSTiWOUm8ryYbOMBZYEnU4cgHQ3VSIa0_l66HwSJl7lw0ZjAi60W1YS73TI9sn6JOHdEBQvYlxO69fw1NwAwm7bZaNDOZkhHHvmagYijtHIpMai5g3Trh5i',
    tags: ['Apex Predator', 'Endothermic']
  }
])

// Dummy filters structure representing UI state
const filterGroups = ref([
  {
    name: 'Conservation Status',
    options: [
      { label: 'Critically Endangered', count: 12, checked: false },
      { label: 'Endangered', count: 45, checked: true },
      { label: 'Vulnerable', count: 89, checked: false },
      { label: 'Near Threatened', count: 134, checked: false },
      { label: 'Least Concern', count: 890, checked: false }
    ]
  },
  {
    name: 'Habitat Type',
    options: [
      { label: 'Coral Reefs', count: 340, checked: false },
      { label: 'Open Ocean (Pelagic)', count: 215, checked: false },
      { label: 'Deep Sea (Benthic)', count: 120, checked: false },
      { label: 'Mangroves & Estuaries', count: 85, checked: false }
    ]
  },
  {
    name: 'Taxonomic Group',
    options: [
      { label: 'Chondrichthyes (Sharks/Rays)', count: 156, checked: false },
      { label: 'Actinopterygii (Bony Fishes)', count: 642, checked: false },
      { label: 'Mammalia (Marine Mammals)', count: 48, checked: false },
      { label: 'Reptilia (Sea Turtles)', count: 7, checked: false },
      { label: 'Anthozoa (Corals)', count: 230, checked: false }
    ]
  }
])
</script>

<template>
  <AppHeader />

  <main class="flex-1 flex flex-col font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
    
    <!-- Unified Page Header -->
    <header class="bg-white dark:bg-slate-900 border-b border-primary/10 py-10 px-6 lg:px-12 transition-colors">
      <div class="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="max-w-xl">
          <div class="flex items-center gap-2 mb-3">
            <span class="material-symbols-outlined text-primary dark:text-blue-400">menu_book</span>
            <span class="text-sm font-bold text-primary dark:text-blue-400 tracking-wider uppercase">Global Database</span>
          </div>
          <h1 class="text-4xl font-black tracking-tight mb-2">Species Catalog</h1>
          <p class="text-slate-500 dark:text-slate-400 font-medium">Browse, filter, and access detailed reports on over 1,200 documented marine species.</p>
        </div>

        <div class="flex-1 w-full max-w-md relative group">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input 
            class="w-full text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary rounded-xl py-3 pl-12 pr-4 shadow-sm transition-all" 
            placeholder="Search by common or scientific name..." 
            type="text"
          />
        </div>
      </div>
    </header>

    <div class="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto p-6 lg:p-12 gap-10">
      
      <!-- Left Sidebar (Filters) -->
      <aside class="w-full lg:w-72 shrink-0 space-y-8">
        <div class="flex items-center justify-between pb-4 border-b border-primary/10">
          <h2 class="text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined">tune</span> Filters
          </h2>
          <button class="text-xs font-bold text-primary dark:text-blue-400 hover:underline">Clear All</button>
        </div>

        <div v-for="(group, gIdx) in filterGroups" :key="gIdx" class="space-y-4">
          <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500">{{ group.name }}</h3>
          <div class="space-y-3">
            <label 
              v-for="(opt, oIdx) in group.options" 
              :key="oIdx"
              class="flex items-start justify-between group cursor-pointer"
            >
              <div class="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  v-model="opt.checked"
                  class="rounded border-slate-300 dark:border-slate-600 bg-transparent text-primary focus:ring-primary w-5 h-5 transition-colors cursor-pointer"
                />
                <span :class="['text-sm font-medium transition-colors', opt.checked ? 'text-primary dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-blue-400']">
                  {{ opt.label }}
                </span>
              </div>
              <span class="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 rounded-full">{{ opt.count }}</span>
            </label>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col gap-6">
        
        <!-- Toolbar -->
        <div class="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-primary/10 shadow-sm transition-colors">
          <p class="text-sm font-bold text-slate-500">Showing <span class="text-slate-900 dark:text-white">1,284</span> Species</p>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-slate-400">Sort by:</span>
              <select class="text-sm font-bold bg-transparent border-none text-primary dark:text-blue-400 focus:ring-0 cursor-pointer">
                <option>A-Z (Common Name)</option>
                <option>Conservation Status (Crit. First)</option>
                <option>Recently Updated</option>
              </select>
            </div>
            <div class="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
              <button class="w-8 h-8 rounded-md bg-white dark:bg-slate-700 text-primary dark:text-blue-400 shadow-sm flex items-center justify-center transition-colors">
                <span class="material-symbols-outlined text-lg">grid_view</span>
              </button>
              <button class="w-8 h-8 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center justify-center transition-colors">
                <span class="material-symbols-outlined text-lg">view_list</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Grid Results -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <RouterLink 
            v-for="item in species" 
            :key="item.id" 
            :to="`/species/${item.id}`"
            class="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
          >
            <!-- Card Image -->
            <div class="h-52 w-full overflow-hidden relative bg-slate-100 dark:bg-slate-800">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Status Badge -->
              <div class="absolute top-4 left-4">
                <span :class="`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${item.statusClass}`">
                  {{ item.status }}
                </span>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-6 flex-1 flex flex-col bg-white dark:bg-slate-900 transition-colors">
              <div class="mb-4">
                <h3 class="text-xl font-black text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{{ item.name }}</h3>
                <p class="text-sm italic font-medium text-slate-500 dark:text-slate-400">{{ item.scientific }}</p>
              </div>

              <!-- Key Metrics -->
              <div class="grid grid-cols-2 gap-3 mb-6">
                <div class="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-transparent dark:border-slate-700">
                  <span class="material-symbols-outlined text-[16px] text-primary dark:text-blue-400">waves</span>
                  <span class="truncate">{{ item.habitat }}</span>
                </div>
                <div class="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-transparent dark:border-slate-700">
                  <span class="material-symbols-outlined text-[16px] text-primary dark:text-blue-400">straighten</span>
                  <span class="truncate">{{ item.depth }}</span>
                </div>
              </div>

              <!-- Tags / Footer -->
              <div class="mt-auto pt-4 border-t border-primary/5 flex items-center justify-between">
                <div class="flex gap-2">
                  <span v-for="(tag, idx) in item.tags" :key="idx" class="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md uppercase tracking-wide">
                    {{ tag }}
                  </span>
                </div>
                <button class="w-8 h-8 rounded-full bg-primary/5 text-primary dark:text-blue-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white">
                  <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </RouterLink>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center gap-2 pt-10 pb-8 text-sm font-bold">
          <button class="flex w-10 h-10 items-center justify-center rounded-lg border border-primary/20 bg-white dark:bg-slate-900 text-slate-400 hover:bg-primary/5 dark:hover:bg-slate-800 transition-colors disabled:opacity-50">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button class="flex w-10 h-10 items-center justify-center rounded-lg bg-primary text-white shadow-md">1</button>
          <button class="flex w-10 h-10 items-center justify-center rounded-lg border border-primary/20 bg-white dark:bg-slate-900 hover:bg-primary/5 dark:hover:bg-slate-800 transition-colors">2</button>
          <button class="flex w-10 h-10 items-center justify-center rounded-lg border border-primary/20 bg-white dark:bg-slate-900 hover:bg-primary/5 dark:hover:bg-slate-800 transition-colors">3</button>
          <span class="px-2 text-slate-400">...</span>
          <button class="flex w-10 h-10 items-center justify-center rounded-lg border border-primary/20 bg-white dark:bg-slate-900 hover:bg-primary/5 dark:hover:bg-slate-800 transition-colors">12</button>
          <button class="flex w-10 h-10 items-center justify-center rounded-lg border border-primary/20 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-primary/5 dark:hover:bg-slate-800 transition-colors">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
/* Optional scoped styling if necessary */
</style>
