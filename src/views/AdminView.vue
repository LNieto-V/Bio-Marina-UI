<script setup lang="ts">
import { ref } from 'vue'

const species = ref([
  {
    id: 1,
    name: 'Balaenoptera musculus',
    commonName: 'Blue Whale',
    status: 'Endangered',
    statusColor: 'bg-red-100 text-red-700',
    completeness: 92,
    location: 'Pacific Ocean (Northeast)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAys7FF0b-8bTczKjg8VMEBKaU3pmCvcdO2QcGiiVUg4nmaoxJHPbSnDZAgg9k3dr9tEj2UybIwMKpe7uRS1_SXajM89Gl5sq4wVv5IO8hPLuUiCW_q-fimcTRYsZSYAk_KdKxccb5fzn3Fmd8Pab7JNcFY1r4wJ8cF0hXvPTYuzAjrE3f8IsRBjjiQPuUb07H2OM0o5UPJf2wNJmhxRlOqKTK5TfB9vZZmUsXuQaPW-CDdHetHXPBnC-Eu0hRjydCuCodMSOgRpSuz'
  },
  {
    id: 2,
    name: 'Chelonia mydas',
    commonName: 'Green Sea Turtle',
    status: 'Vulnerable',
    statusColor: 'bg-amber-100 text-amber-700',
    completeness: 74,
    location: 'Great Barrier Reef',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsQ0pRRED5FBgTDVh8MSfZXiBcDekQggFHZVBe5OL-vi_4GwN-gnwLow0zVQ2ebR-0oaPupx66B8V-roKfwhnGune3DrEzSASMtXtXFUJmZSs1fInWFEQtXno1Uk82LScE65wuWpxCaF1BnkG0Cwje0ITJk6tcOdzfWtinl7fGXv-9mydMKgf3nMc2W11awa40lpMAPBd9zq4Zu6AZR7cKkFw3dhVTHChbgQtJ46sWe7R0xJoj5RBDwnYyrC6arItnXUiK-SiUsKzK'
  },
  {
    id: 3,
    name: 'Carcharodon carcharias',
    commonName: 'Great White Shark',
    status: 'Stable',
    statusColor: 'bg-blue-100 text-blue-700',
    completeness: 85,
    location: 'Coastal South Africa',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIS3B9TGSyGakGJ1JYWDAhAnpM3Ar7iyfMYXSirlp_QpM-0i5AbPbZcuO2jaiz0KrHf2gBCseVU7-GR--1_HnOZoK2QTXhUpPzP293-w3hQLBXn81iyJY9VUBkfoGBqb2C4e87QWMbYef1Pe1GBGX_meSTiWOUm8ryYbOMBZYEnU4cgHQ3VSIa0_l66HwSJl7lw0ZjAi60W1YS73TI9sn6JOHdEBQvYlxO69fw1NwAwm7bZaNDOZkhHHvmagYijtHIpMai5g3Trh5i'
  },
  {
    id: 4,
    name: 'Amphiprioninae',
    commonName: 'Clownfish',
    status: 'Least Concern',
    statusColor: 'bg-green-100 text-green-700',
    completeness: 98,
    location: 'Coral Sea, Australia',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANeNiurUtIlBqwbzKVnYmYzodAEYHugU3LYub7HXyXFyls04MczoydH5AynkCANHfeQPdEkkS3ZWhva9lyitntq_so6WlXQV2nmv-v3D8Aod6Wn6ijjAwx_nNpcub04_rFdsKykKU5ugWEmNmctd8_nKi9MU3EG-bnlJd2GPxKz4cqPVGvlAQ-GLdJ2G6RG6aIfnVb3G5ZT35vwaLzON-Tx5jNlji5ghzq0F6cIxTErJGp8hpD6Zzm76lUbI8RNEgh-SQwEWgNwWXn'
  }
])

</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
    
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-slate-900 border-r border-primary/10 flex flex-col shrink-0">
      <div class="p-6 flex items-center gap-3">
        <div class="bg-primary text-white p-2 rounded-lg">
          <span class="material-symbols-outlined">waves</span>
        </div>
        <div>
          <h1 class="font-bold text-lg leading-tight text-primary">BioMarina</h1>
          <p class="text-xs text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1">
            Admin Panel
            <RouterLink to="/" class="material-symbols-outlined text-xs hover:text-primary" title="Back to Main App">open_in_new</RouterLink>
          </p>
        </div>
      </div>
      
      <nav class="flex-1 px-4 space-y-1">
        <a class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors cursor-pointer">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="font-medium text-sm">Dashboard</span>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 bg-primary text-white rounded-lg shadow-sm cursor-pointer">
          <span class="material-symbols-outlined text-fill-1">inventory_2</span>
          <span class="font-medium text-sm">Species Inventory</span>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors cursor-pointer">
          <span class="material-symbols-outlined">description</span>
          <span class="font-medium text-sm">Research Logs</span>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors cursor-pointer">
          <span class="material-symbols-outlined">groups</span>
          <span class="font-medium text-sm">Research Team</span>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors cursor-pointer">
          <span class="material-symbols-outlined">bar_chart</span>
          <span class="font-medium text-sm">Conservation Reports</span>
        </a>
      </nav>
      
      <div class="p-4 mt-auto border-t border-primary/10">
        <div class="flex items-center gap-3 p-2 bg-primary/5 rounded-xl transition-colors hover:bg-primary/10 cursor-pointer">
          <div class="size-10 rounded-full bg-primary/20 bg-cover bg-center shrink-0" data-alt="User profile circular avatar photo" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNrx6lBi6q9ysK9hJ87u4FBXg5rYsznzbzKf7OGuioFlBoZhGG5H1FAchLlWuaCSNpChhdnuuJAbYdnCEKFuJSUZvVhFmCuRu4SI49NxO3XF3YYdRN75z6h0sTACf9tmUinLjyOOcJj67MQylLGPWET5CMLSFlAdmzI_KWVt6BS8G6IO1p6Q8rVck595WhlOGd1ccFggrv32zHc-__pSRuSVhkLhw13sm2DZVFXzOsESAex1auxDB3dX-2PboeELyMBUbqFwQGgapU')"></div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">Dr. Sarah Vance</p>
            <p class="text-xs text-slate-500 truncate">Lead Marine Biologist</p>
          </div>
          <span class="material-symbols-outlined text-slate-400 text-lg">settings</span>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      
      <!-- Top Nav -->
      <header class="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-primary/10">
        <div class="flex-1 max-w-xl">
          <div class="relative group">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input class="w-full pl-10 pr-4 py-2 bg-primary/5 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-slate-400 text-slate-900 dark:text-slate-100" placeholder="Search species, habitats, or tags..." type="text"/>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <button class="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-primary/5 rounded-full transition-colors">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-2 right-2 size-2 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
          </button>
          <button class="p-2 text-slate-500 dark:text-slate-400 hover:bg-primary/5 rounded-full transition-colors">
            <span class="material-symbols-outlined">help</span>
          </button>
        </div>
      </header>

      <div class="p-8 space-y-8">
        <!-- Hero Header -->
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div class="space-y-1">
            <h2 class="text-3xl font-black tracking-tight text-primary dark:text-blue-400">Species Management</h2>
            <p class="text-slate-500 dark:text-slate-400 font-medium">Monitoring 1,284 marine species across 12 protected sectors.</p>
          </div>
          <button class="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95">
            <span class="material-symbols-outlined">add_circle</span>
            <span>Add New Species</span>
          </button>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Biodiversity</span>
              <div class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">+12%</div>
            </div>
            <div class="text-4xl font-black text-primary dark:text-blue-400">1,284</div>
            <p class="text-xs text-slate-400">Unique species cataloged</p>
          </div>
          
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Expeditions</span>
              <div class="bg-primary/10 text-primary dark:text-blue-400 px-2 py-1 rounded text-xs font-bold">Live</div>
            </div>
            <div class="text-4xl font-black text-primary dark:text-blue-400">42</div>
            <p class="text-xs text-slate-400">Ongoing research projects</p>
          </div>
          
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Data Health</span>
              <div class="bg-primary/10 text-primary dark:text-blue-400 px-2 py-1 rounded text-xs font-bold">Stable</div>
            </div>
            <div class="text-4xl font-black text-primary dark:text-blue-400">88%</div>
            <p class="text-xs text-slate-400">Average inventory completeness</p>
          </div>
        </div>

        <!-- Management Table -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-primary/10 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <button class="bg-primary/10 text-primary dark:text-blue-400 px-4 py-1.5 rounded-lg text-sm font-bold border border-primary/20">All Species</button>
              <button class="text-slate-500 dark:text-slate-400 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Endangered</button>
              <button class="text-slate-500 dark:text-slate-400 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Research Active</button>
            </div>
            <div class="flex items-center gap-2">
              <button class="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span class="material-symbols-outlined text-lg">filter_list</span>
                Filter
              </button>
              <button class="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span class="material-symbols-outlined text-lg">download</span>
                Export CSV
              </button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left whitespace-nowrap">
              <thead>
                <tr class="bg-slate-50/50 dark:bg-slate-800/50 border-b border-primary/5">
                  <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Species Info</th>
                  <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Conservation Status</th>
                  <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Completeness</th>
                  <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Location</th>
                  <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-primary/5">
                <tr 
                  v-for="item in species" 
                  :key="item.id" 
                  class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                >
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div 
                        class="size-10 rounded-lg bg-primary/10 bg-cover bg-center overflow-hidden shrink-0" 
                        :style="`background-image: url('${item.image}')`"
                      ></div>
                      <div>
                        <p class="font-bold text-slate-900 dark:text-slate-100">{{ item.name }}</p>
                        <p class="text-sm text-slate-500">{{ item.commonName }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span :class="`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${item.statusColor} dark:bg-opacity-20 dark:text-opacity-80`">
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 w-48">
                    <div class="space-y-1.5">
                      <div class="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
                        <span>{{ item.completeness }}%</span>
                      </div>
                      <div class="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div class="h-full bg-primary dark:bg-blue-500 rounded-full transition-all" :style="`width: ${item.completeness}%`"></div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                      <span class="material-symbols-outlined text-lg text-slate-400">location_on</span>
                      {{ item.location }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button class="p-1.5 hover:bg-primary/10 rounded text-primary dark:text-blue-400 transition-colors">
                        <span class="material-symbols-outlined text-xl">edit</span>
                      </button>
                      <button class="p-1.5 hover:bg-primary/10 rounded text-slate-400 transition-colors">
                        <span class="material-symbols-outlined text-xl">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="p-6 border-t border-primary/10 flex items-center justify-between">
            <p class="text-sm text-slate-500">Showing 1 to 4 of 1,284 results</p>
            <div class="flex items-center gap-2">
              <button class="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-400 cursor-not-allowed">Previous</button>
              <button class="px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20">1</button>
              <button class="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">2</button>
              <button class="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">3</button>
              <button class="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Next</button>
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
