<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'

// Since the footer in the template is slightly different but we want to maintain AppFooter integration
// or just use the customized footer from the template, we'll embed the template's footer directly 
// to ensure perfect fidelity to the design provided, and use the global Header since it has the toggle.
</script>

<template>
  <AppHeader />

  <main class="flex-1 w-full bg-background-light dark:bg-background-dark font-display transition-colors duration-300">
    <!-- Hero Section -->
    <section class="relative h-[650px] w-full flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0 bg-primary">
        <div class="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-primary/30 to-primary/60 z-10 transition-colors duration-300"></div>
        <img class="w-full h-full object-cover mix-blend-overlay opacity-80" data-alt="Stunning aerial view of a vibrant coral reef system" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-TlzbhCS9TTiIT1Te6hs4HsO-QQ4Z9YANB_LLGdn0ZXnt4g-hRaMlR16NBKOYP7Hy60wfmrYp80u9M3SuiI14cVDN-baOp_TU07zrmrb1rO0O0KQ_54UwpACWUJEI93t8Zi6vF2zn6s4W4vGCwnm2fo3OryDwASKJ_8w5MaZKclPTtqvrur2R2rFyydaaECHKylBRjw8TX549cXZJhIYIqqKKNfhGX-RfPyYmClEj530nPgwaaoSVLgVhd1hukg7YJQFagi63Lu6l"/>
      </div>
      
      <div class="relative z-20 w-full max-w-5xl px-6 flex flex-col items-center text-center gap-10 mt-12">
        <div class="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
          <div class="inline-flex items-center gap-2 bg-white/20 dark:bg-slate-900/40 backdrop-blur-md px-4 py-1.5 rounded-full text-white font-semibold text-sm border border-white/20">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Live tracking active in 12 sectors
          </div>
          <h1 class="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight drop-shadow-lg">
            Protecting Our <br class="hidden md:block"/>Oceanic Heritage
          </h1>
          <p class="text-white/90 text-lg md:text-2xl max-w-2xl mx-auto font-medium drop-shadow-md">
            Join the global effort to monitor endangered species, track habitat health, and enforce conservation zones.
          </p>
        </div>
        
        <div class="w-full max-w-2xl animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-150">
          <div class="flex flex-col sm:flex-row items-center bg-white/95 dark:bg-slate-900/90 backdrop-blur-lg p-2 rounded-2xl shadow-2xl w-full gap-2 border border-white/20 transition-colors">
            <div class="flex items-center flex-1 w-full px-4 gap-3">
              <span class="material-symbols-outlined text-primary/60 dark:text-slate-400 shrink-0 text-3xl">search</span>
              <input class="w-full border-none focus:ring-0 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 py-4 text-lg font-medium outline-none" placeholder="Search for species, regions, or data..." type="text"/>
            </div>
            <button class="w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold tracking-wide rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 active:scale-95 text-lg">
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Global Threat Matrix Overview -->
    <section class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-24 -mt-16 z-30 relative">
      <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-primary/5 p-8 md:p-12 transition-colors">
        <div class="flex justify-between items-end mb-10 flex-wrap gap-4">
          <div>
            <h2 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Conservation Matrix</h2>
            <p class="text-slate-500 font-medium mt-2">Current priority status across key areas</p>
          </div>
          <RouterLink to="/catalog" class="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all cursor-pointer">
            View full report <span class="material-symbols-outlined">arrow_forward</span>
          </RouterLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div class="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-6 rounded-2xl group cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
            <div class="flex items-center justify-between mb-4">
              <span class="material-symbols-outlined text-4xl text-red-500">warning</span>
              <span class="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-full">CRITICAL</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Coral Bleaching</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm">Elevated temperatures in Sector 7 affecting 42% of local reefs.</p>
          </div>
          
          <div class="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-6 rounded-2xl group cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors">
            <div class="flex items-center justify-between mb-4">
              <span class="material-symbols-outlined text-4xl text-orange-500">phishing</span>
              <span class="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400 text-xs font-bold px-3 py-1 rounded-full">HIGH RISK</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Overfishing</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm">Industrial activity detected near protected maritime borders.</p>
          </div>
          
          <div class="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 p-6 rounded-2xl group cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors">
            <div class="flex items-center justify-between mb-4">
              <span class="material-symbols-outlined text-4xl text-green-500">sailing</span>
              <span class="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full">STABLE</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Turtle Nesting</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm">Record numbers reported on northern hemisphere sanctuary beaches.</p>
          </div>
          
          <div class="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-6 rounded-2xl group cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors">
            <div class="flex items-center justify-between mb-4">
              <span class="material-symbols-outlined text-4xl text-blue-500">biotech</span>
              <span class="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full">MONITORING</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Water Quality</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm">New sensor arrays deployed to track microplastic concentrations.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Data Portals -->
    <section class="py-24 border-y border-primary/5 bg-slate-50 dark:bg-slate-900/50 transition-colors">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 text-balance">The BioMarina Hub</h2>
          <p class="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">Centralized access to specialized tools for researchers, policymakers, and registered conservationists.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="group h-[400px] rounded-3xl overflow-hidden relative shadow-lg cursor-pointer">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMsZ4y3sV9_yN4O42Nf3rK1gS4Z035Wk85_k1ZgN1T12-m3uYg9qPqDqS2c1G6u93I6fC8nK4mS5WpS1mF231S2V3uW6lM3tKq6r5m3tP1qD6pT8g4K1W5yQn9S4m5R1Z3qM4WpF5aG2kO5Q2C4E3tW5rA1mV2B6cN1D7xR1vF1cZ8bN3X9qE5tL7uJ5rK8yX3" alt="Interactive Map" class="absolute w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-8 w-full">
              <div class="bg-white/20 backdrop-blur-md w-14 h-14 flex items-center justify-center rounded-xl mb-6 shadow border border-white/30 text-white">
                <span class="material-symbols-outlined text-3xl">public</span>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Live Marine Map</h3>
              <p class="text-slate-300 mb-6 line-clamp-2">Visualize shipping lanes, protected zones, and real-time animal telemetry in full 3D.</p>
              <RouterLink to="/map" class="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg transition-colors">
                Open Map <span class="material-symbols-outlined text-sm">open_in_new</span>
              </RouterLink>
            </div>
          </div>
          
          <!-- Card 2 -->
          <div class="group h-[400px] rounded-3xl overflow-hidden relative shadow-lg cursor-pointer">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnE3bT1E1X92D2c7Q3M5C3tW5S7fF4X8dD5U8R9H7xT2zM9pT4gR2mB9pS7H6eC1qH1tF6dJ8kN3Z6pP7mD8aG9uJ9uX4qR3mZ1zT4gK3W7fJ8xL3yW8cF8aT9kN1uX7yK9mB2wZ7uR4kX5qR9cJ5xN5vF9gK9jR6qE4tJ8wV7mK2hB1cF7bQ3mH3xN5kP2" alt="Reporting Dashboard" class="absolute w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-8 w-full">
              <div class="bg-white/20 backdrop-blur-md w-14 h-14 flex items-center justify-center rounded-xl mb-6 shadow border border-white/30 text-white">
                <span class="material-symbols-outlined text-3xl">insights</span>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Data &amp; Reports</h3>
              <p class="text-slate-300 mb-6 line-clamp-2">Generate comprehensive PDFs on population trends and environmental impact analyses.</p>
              <RouterLink to="/reports" class="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg transition-colors">
                Build Report <span class="material-symbols-outlined text-sm">open_in_new</span>
              </RouterLink>
            </div>
          </div>
          
          <!-- Card 3 -->
          <div class="group h-[400px] rounded-3xl overflow-hidden relative shadow-lg cursor-pointer">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD31H6f4uX07D0hT8S7fG8eC6T1M0iA9mO5I9D4cI9R0zV6yO0oD5yF3pT7F0xI8oE2rH4hI2oI7cK4iD8vU9nH3uJ4fH5cT4kO0sO8jP3fT3lP6xY0bP7lG2gV2kJ2fK7tL3nN0xV9fI4eT3hA5lG7iX9nR5tG8tN9iC4hN5rF8yS6rA1vE5aQ1kT5cN3iI2" alt="Species Catalog" class="absolute w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-8 w-full">
              <div class="bg-white/20 backdrop-blur-md w-14 h-14 flex items-center justify-center rounded-xl mb-6 shadow border border-white/30 text-white">
                <span class="material-symbols-outlined text-3xl">menu_book</span>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Species Registry</h3>
              <p class="text-slate-300 mb-6 line-clamp-2">Deep dive into taxonomy, biology, and specific fishing regulations per species.</p>
              <RouterLink to="/catalog" class="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg transition-colors">
                Search Registry <span class="material-symbols-outlined text-sm">open_in_new</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16 px-6 md:px-12 lg:px-20 transition-colors duration-300 font-display">
    <div class="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
      <div class="lg:col-span-2">
        <div class="flex items-center gap-3 text-primary dark:text-blue-400 mb-6">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
            <span class="material-symbols-outlined text-xl">tsunami</span>
          </div>
          <h2 class="text-slate-900 dark:text-white text-2xl font-black tracking-tight">BioMarina</h2>
        </div>
        <p class="text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed font-medium">
          A dedicated infrastructure for monitoring marine biodiversity, enforcing conservation protocols, and empowering environmental researchers globally.
        </p>
        <div class="flex items-center gap-4">
          <!-- Social Placeholders -->
          <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm">
            <span class="font-bold text-lg">f</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm">
            <span class="font-bold text-lg">𝕏</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm">
            <span class="font-bold text-lg">in</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 class="font-black mb-6 text-sm uppercase tracking-widest text-slate-900 dark:text-slate-200">Platform</h4>
        <ul class="text-slate-600 dark:text-slate-400 space-y-4 font-medium">
          <li><RouterLink to="/map" class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Global Map</RouterLink></li>
          <li><RouterLink to="/catalog" class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Species DB</RouterLink></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Threat Matrix</a></li>
          <li><RouterLink to="/reports" class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Reporting</RouterLink></li>
        </ul>
      </div>

      <div>
        <h4 class="font-black mb-6 text-sm uppercase tracking-widest text-slate-900 dark:text-slate-200">Organization</h4>
        <ul class="text-slate-600 dark:text-slate-400 space-y-4 font-medium">
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span> About Us</a></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Our Mission</a></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Research Grants</a></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Partner Network</a></li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-black mb-6 text-sm uppercase tracking-widest text-slate-900 dark:text-slate-200">Support</h4>
        <ul class="text-slate-600 dark:text-slate-400 space-y-4 font-medium mb-8">
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span> API Documentation</a></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Data Integration</a></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Contact Support</a></li>
        </ul>
        <RouterLink to="/login" class="w-full bg-primary/10 hover:bg-primary/20 text-primary dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-center font-bold py-3 rounded-lg transition-colors border border-primary/20 flex flex-col items-center justify-center">
          Researcher Login
        </RouterLink>
      </div>
    </div>
    
    <div class="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 font-medium">
      <p>© 2024 BioMarina Global Network. All rights reserved.</p>
      <div class="flex gap-6">
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Terms of Service</a>
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Cookie Settings</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Scoped styles if needed */
</style>
