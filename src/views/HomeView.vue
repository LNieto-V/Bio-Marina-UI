<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<template>
  <AppHeader />

  <main class="flex-1">
    <!-- Hero Section -->
    <section class="relative h-[500px] md:h-[700px] w-full flex items-center justify-center px-4 overflow-hidden">
      <div class="absolute inset-0 z-0 bg-[#0b3c5b]">
        <div class="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-background-light z-10"></div>
        <img class="w-full h-full object-cover opacity-50" data-alt="Aerial view of clear turquoise marine waters" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-TlzbhCS9TTiIT1Te6hs4HsO-QQ4Z9YANB_LLGdn0ZXnt4g-hRaMlR16NBKOYP7Hy60wfmrYp80u9M3SuiI14cVDN-baOp_TU07zrmrb1rO0O0KQ_54UwpACWUJEI93t8Zi6vF2zn6s4W4vGCwnm2fo3OryDwASKJ_8w5MaZKclPTtqvrur2R2rFyydaaECHKylBRjw8TX549cXZJhIYIqqKKNfhGX-RfPyYmClEj530nPgwaaoSVLgVhd1hukg7YJQFagi63Lu6l"/>
      </div>
      <div class="relative z-20 w-full max-w-4xl flex flex-col items-center text-center gap-8">
        <div class="space-y-4">
          <h1 class="text-slate-900 text-4xl md:text-7xl font-black leading-tight tracking-tight drop-shadow-sm">
            Explore Marine Biodiversity
          </h1>
          <p class="text-slate-800 text-lg md:text-2xl max-w-2xl mx-auto font-medium">
            Discover local species, monitor coral health, and navigate marine protection zones with our interactive portal.
          </p>
        </div>
        <div class="w-full max-w-2xl px-4">
          <div class="flex flex-col md:flex-row items-center bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-2xl w-full gap-2 border border-white/20">
            <div class="flex items-center flex-1 w-full px-4 gap-3">
              <span class="material-symbols-outlined text-slate-400 shrink-0">search</span>
              <input class="w-full border-none focus:ring-0 bg-transparent text-slate-900 placeholder:text-slate-400 py-4 text-lg" placeholder="Search species, locations, or guides..." type="text"/>
            </div>
            <button class="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 text-lg">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Access Section -->
    <section class="max-w-7xl mx-auto px-6 md:px-20 lg:px-40 py-24">
      <div class="mb-12 text-center md:text-left">
        <h2 class="text-4xl font-black text-slate-900 tracking-tight">Quick Access</h2>
        <p class="text-slate-500 text-xl mt-3">Essential tools for marine conservation and research</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <RouterLink to="/catalog" class="group flex flex-col gap-6 p-10 rounded-3xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
          <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
            <span class="material-symbols-outlined text-3xl shrink-0">menu_book</span>
          </div>
          <div class="space-y-3">
            <h3 class="text-2xl font-bold text-slate-900">Species Catalog</h3>
            <p class="text-slate-600 leading-relaxed text-lg">
              Browse our comprehensive database of regional marine life, from vibrant corals to migrating mammals.
            </p>
          </div>
          <div class="mt-auto flex items-center text-primary font-bold text-base">
            Browse Catalog <span class="material-symbols-outlined ml-2 shrink-0">chevron_right</span>
          </div>
        </RouterLink>
        <RouterLink to="/map" class="group flex flex-col gap-6 p-10 rounded-3xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
          <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
            <span class="material-symbols-outlined text-3xl shrink-0">map</span>
          </div>
          <div class="space-y-3">
            <h3 class="text-2xl font-bold text-slate-900">Interactive Map</h3>
            <p class="text-slate-600 leading-relaxed text-lg">
              Visualize conservation zones, protected habitats, and real-time environmental monitoring data.
            </p>
          </div>
          <div class="mt-auto flex items-center text-primary font-bold text-base">
            Explore Zones <span class="material-symbols-outlined ml-2 shrink-0">chevron_right</span>
          </div>
        </RouterLink>
        <RouterLink to="/reports" class="group flex flex-col gap-6 p-10 rounded-3xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
          <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
            <span class="material-symbols-outlined text-3xl shrink-0">gavel</span>
          </div>
          <div class="space-y-3">
            <h3 class="text-2xl font-bold text-slate-900">Local Regulations</h3>
            <p class="text-slate-600 leading-relaxed text-lg">
              Stay up to date with the latest fishing rules, vessel restrictions, and environmental protection laws.
            </p>
          </div>
          <div class="mt-auto flex items-center text-primary font-bold text-base">
            Stay Compliant <span class="material-symbols-outlined ml-2 shrink-0">chevron_right</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- Insights Section -->
    <section class="bg-primary/[0.02] py-24 border-y border-primary/5">
      <div class="max-w-7xl mx-auto px-6 md:px-20 lg:px-40">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="flex-1 space-y-8">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Real-time Marine Insights</h2>
            <p class="text-xl text-slate-600 leading-relaxed">
              Our data network provides live updates on water temperature, salinity, and biodiversity sightings. Use these insights to better understand our changing oceans.
            </p>
            <div class="flex flex-col gap-6">
              <div class="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm border border-primary/5">
                <span class="material-symbols-outlined text-primary text-3xl shrink-0">monitoring</span>
                <div>
                  <p class="font-bold text-slate-900 text-lg">12,400+ Species Tracked</p>
                  <p class="text-slate-500">Updated hourly from global databases</p>
                </div>
              </div>
              <div class="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm border border-primary/5">
                <span class="material-symbols-outlined text-primary text-3xl shrink-0">verified</span>
                <div>
                  <p class="font-bold text-slate-900 text-lg">Official Data Sources</p>
                  <p class="text-slate-500">Validated by marine biologists</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 w-full">
            <div class="aspect-video bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border-8 border-white dark:border-slate-700">
              <img class="w-full h-full object-cover" data-alt="Screenshot of an interactive map with data layers" data-location="The Great Barrier Reef" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTwnSv1JR0iUlDiCPFivmghtYl6PP4yskW3ZM8cI82DP7P79xRVkrPGdBdVYBqn0fl_GBILbqJGVfjRbcz5iYv-Y4ry5oVtLTHsx_ZJAyxHGeSTtmXpPPxqyNccw6XcF-gJ6dfsaqN4QZcYFsP8nE82a0oJeORqFFhyKddxhdYWMV_UojPYZOc8SbYYLAn68dzkvL3B1-e54vAFbhEI9-c_7Lm4JUV18e-rQUFt_C0GEZXan6s91I7AR5pjeLxZQB9w9VUuUhrxHY5"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <AppFooter />
</template>
