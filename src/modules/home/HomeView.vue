<script setup lang="ts">
import { ref, computed } from 'vue'
import AppHeader from '@/shared/components/AppHeader.vue'
import { MOCK_ESPECIES } from '@/shared/services/mockData'
import { UICN_COLORS, UICN_LABELS } from '@/shared/types/especie'

// ─── Lógica de Especies Destacadas ──────────────────────────
const featuredSpecies = computed(() => {
  return MOCK_ESPECIES.slice(0, 3)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getImageUrl = (item: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (item.media as any[])?.find((m: any) => m.esPrincipal)?.url 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    || (item.media as any[])?.[0]?.url 
    || `https://placehold.co/400x300/0b3c5b/white?text=${encodeURIComponent(item.nombreCientifico)}`
}

const searchQuery = ref('')
</script>

<template>
  <AppHeader />

  <main class="flex-1 w-full bg-background-light dark:bg-background-dark font-display transition-colors duration-300">
    <!-- Hero Section -->
    <section class="relative h-[500px] md:h-[650px] lg:h-[750px] w-full flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0 bg-primary">
        <div class="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-primary/20 to-primary/60 z-10 transition-colors duration-300"></div>
        <img class="w-full h-full object-cover mix-blend-overlay opacity-90 scale-105 animate-pulse-slow" data-alt="Stunning aerial view of a vibrant coral reef system" src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"/>
      </div>
      
      <div class="relative z-20 w-full max-w-6xl px-4 sm:px-6 flex flex-col items-center text-center gap-8 md:gap-12 mt-8 md:mt-12">
        <div class="space-y-4 md:space-y-6 animate-in slide-in-from-bottom-12 duration-1000 w-full px-2">
          <div class="inline-flex items-center gap-2 md:gap-3 bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl px-4 py-2 rounded-full text-white font-black text-[10px] sm:text-xs border border-white/20 uppercase tracking-wider md:tracking-widest shadow-2xl text-balance">
            <span class="relative flex h-2.5 w-2.5 md:h-3 md:w-3 shrink-0">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-blue-500"></span>
            </span>
            <span>Monitoreo en Tiempo Real: Caribe Colombiano</span>
          </div>
          <h1 class="text-white text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-tighter drop-shadow-2xl text-balance">
            BioMarina <br class="hidden sm:block"/>Digital Hub
          </h1>
          <p class="text-white/90 text-sm sm:text-lg md:text-2xl max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto font-bold drop-shadow-lg leading-relaxed text-balance">
            Plataforma centralizada para la investigación, monitoreo y conservación de la biodiversidad marina en el Caribe.
          </p>
        </div>
        
        <div class="w-full max-w-[90%] sm:max-w-xl md:max-w-3xl animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-300">
          <div class="flex flex-col sm:flex-row items-center bg-white/95 dark:bg-slate-900/90 backdrop-blur-2xl p-2 md:p-2.5 rounded-2xl md:rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] w-full gap-2 md:gap-3 border border-white/20 transition-colors">
            <div class="flex items-center flex-1 w-full px-4 md:px-5 gap-3 md:gap-4">
              <span class="material-symbols-outlined text-primary/40 dark:text-blue-400/60 shrink-0 text-2xl md:text-3xl">search</span>
              <input 
                v-model="searchQuery"
                @keyup.enter="$router.push({ path: '/catalog', query: { q: searchQuery } })"
                class="w-full border-none focus:ring-0 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 py-3 md:py-5 text-base md:text-xl font-black outline-none" 
                placeholder="Explora por especie, familia o región..." 
                type="text"
              />
            </div>
            <RouterLink 
              :to="{ path: '/catalog', query: { q: searchQuery } }"
              class="w-full sm:w-auto px-6 md:px-12 py-3.5 md:py-5 bg-primary text-white font-black tracking-widest rounded-xl md:rounded-2xl hover:bg-primary/90 transition-all shadow-xl hover:shadow-primary/30 active:scale-95 text-xs md:text-sm uppercase text-center"
            >
              Explorar
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Global Threat Matrix Overview -->
    <section class="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24 -mt-16 md:-mt-24 z-30 relative">
      <div class="bg-white dark:bg-slate-900 rounded-[28px] md:rounded-[40px] shadow-2xl border border-primary/5 p-6 sm:p-8 md:p-16 transition-colors">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-6">
          <div>
            <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Matriz de Conservación</h2>
            <p class="text-slate-500 font-bold mt-2 uppercase text-[10px] md:text-xs tracking-widest opacity-80">Estado actual de prioridades críticas</p>
          </div>
          <RouterLink to="/catalog" class="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-50 dark:bg-slate-800 px-5 md:px-6 py-3 rounded-xl md:rounded-2xl text-primary dark:text-blue-400 font-black text-xs md:text-sm hover:gap-5 transition-all cursor-pointer border border-primary/5 uppercase tracking-widest text-center">
            Ver Reporte Completo <span class="material-symbols-outlined text-[18px] md:text-[20px]">arrow_forward</span>
          </RouterLink>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <div class="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 p-6 md:p-8 rounded-2xl md:rounded-3xl group cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 transition-all hover:-translate-y-2">
            <div class="flex items-center justify-between mb-4 md:mb-6">
              <span class="material-symbols-outlined text-4xl md:text-5xl text-red-500">warning</span>
              <span class="bg-red-500 text-white text-[9px] md:text-[10px] font-black px-2.5 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg shadow-red-500/20 uppercase tracking-widest">crítico</span>
            </div>
            <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 md:mb-3 leading-tight">Blanqueamiento Coralino</h3>
            <p class="text-slate-600 dark:text-slate-400 text-xs md:text-sm font-medium leading-relaxed">Temperaturas elevadas en Sector Tayrona afectando al 42% de los arrecifes locales.</p>
          </div>
          
          <div class="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 p-6 md:p-8 rounded-2xl md:rounded-3xl group cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-all hover:-translate-y-2">
            <div class="flex items-center justify-between mb-4 md:mb-6">
              <span class="material-symbols-outlined text-4xl md:text-5xl text-orange-500">phishing</span>
              <span class="bg-orange-500 text-white text-[9px] md:text-[10px] font-black px-2.5 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg shadow-orange-500/20 uppercase tracking-widest">alto riesgo</span>
            </div>
            <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 md:mb-3 leading-tight">Sobrepesca Detectada</h3>
            <p class="text-slate-600 dark:text-slate-400 text-xs md:text-sm font-medium leading-relaxed">Actividad industrial no autorizada cerca de las fronteras marítimas protegidas.</p>
          </div>
          
          <div class="bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 p-6 md:p-8 rounded-2xl md:rounded-3xl group cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/20 transition-all hover:-translate-y-2">
            <div class="flex items-center justify-between mb-4 md:mb-6">
              <span class="material-symbols-outlined text-4xl md:text-5xl text-green-500">sailing</span>
              <span class="bg-green-500 text-white text-[9px] md:text-[10px] font-black px-2.5 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg shadow-green-500/20 uppercase tracking-widest">estable</span>
            </div>
            <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 md:mb-3 leading-tight">Nidación de Tortugas</h3>
            <p class="text-slate-600 dark:text-slate-400 text-xs md:text-sm font-medium leading-relaxed">Cifras récord reportadas en los santuarios de la Guajira y Magdalena.</p>
          </div>
          
          <div class="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 p-6 md:p-8 rounded-2xl md:rounded-3xl group cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all hover:-translate-y-2">
            <div class="flex items-center justify-between mb-4 md:mb-6">
              <span class="material-symbols-outlined text-4xl md:text-5xl text-blue-500">biotech</span>
              <span class="bg-blue-500 text-white text-[9px] md:text-[10px] font-black px-2.5 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg shadow-blue-500/20 uppercase tracking-widest">monitoreo</span>
            </div>
            <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 md:mb-3 leading-tight">Calidad del Agua</h3>
            <p class="text-slate-600 dark:text-slate-400 text-xs md:text-sm font-medium leading-relaxed">Nuevas boyas inteligentes desplegadas para rastrear microplásticos y pH.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Species Section -->
    <section class="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div class="text-center mb-10 md:mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-3 md:mb-4">Especies Destacadas</h2>
        <p class="text-sm md:text-lg text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider md:tracking-widest text-[10px] md:text-[11px]">Biodiversidad en la Cuenca del Caribe</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        <RouterLink 
          v-for="esp in featuredSpecies" 
          :key="esp.id"
          :to="`/species/${esp.id}`"
          class="group bg-white dark:bg-slate-900 rounded-[24px] md:rounded-[32px] overflow-hidden border border-primary/5 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 md:hover:-translate-y-3"
        >
          <div class="h-48 md:h-64 w-full relative overflow-hidden">
            <img :src="getImageUrl(esp)" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
            <div class="absolute top-4 right-4">
               <span :class="`px-2.5 md:px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl ${UICN_COLORS[esp.conservacion.uicn]}`">
                 {{ UICN_LABELS[esp.conservacion.uicn] }}
               </span>
            </div>
          </div>
          <div class="p-6 md:p-8">
            <p class="text-primary font-black uppercase text-[9px] md:text-[10px] tracking-[0.2em] mb-1.5 md:mb-2">{{ esp.taxonomia.clase }}</p>
            <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{{ esp.nombreComun }}</h3>
            <p class="text-xs md:text-sm italic text-slate-400 mb-4 md:mb-6 font-bold">{{ esp.nombreCientifico }}</p>
            <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 md:mb-8 leading-relaxed font-medium">
              {{ esp.descripcionGeneral }}
            </p>
            <div class="flex items-center justify-between pt-5 md:pt-6 border-t border-slate-100 dark:border-slate-800">
              <div class="flex items-center gap-2">
                 <span class="material-symbols-outlined text-primary text-[18px] md:text-[20px]">waves</span>
                 <span class="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">{{ esp.habitat.tipo }}</span>
              </div>
              <span class="material-symbols-outlined text-sm md:text-base text-slate-300 group-hover:translate-x-2 transition-transform">east</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- Interactive Data Portals -->
    <section class="py-16 md:py-32 border-y border-primary/5 bg-slate-50 dark:bg-slate-900/50 transition-colors px-4">
      <div class="max-w-[1600px] mx-auto sm:px-6 md:px-12 lg:px-20">
        <div class="text-center max-w-[90%] md:max-w-4xl mx-auto mb-12 md:mb-20">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 md:mb-6 text-balance">The BioMarina ecosystem</h2>
          <p class="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-balance">Herramientas digitales avanzadas diseñadas para investigadores, biólogos y entidades de protección marítima.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <div class="group h-[350px] sm:h-[400px] md:h-[500px] rounded-[32px] md:rounded-[48px] overflow-hidden relative shadow-2xl cursor-pointer">
            <img src="https://images.unsplash.com/photo-1551244072-5d12891f6c44?q=80&w=2070&auto=format&fit=crop" alt="Interactive Map" class="absolute w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 md:p-10 w-full">
              <div class="bg-white/20 backdrop-blur-2xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl md:rounded-2xl mb-4 md:mb-8 shadow-2xl border border-white/30 text-white">
                <span class="material-symbols-outlined text-2xl md:text-4xl">public</span>
              </div>
              <h3 class="text-2xl md:text-3xl font-black text-white mb-2 md:mb-3">Cartografía Pro</h3>
              <p class="text-sm md:text-base text-slate-300 mb-6 md:mb-8 line-clamp-2 font-medium">Visualización 3D de rutas marinas, zonas protegidas y telemetría activa en el Caribe.</p>
              <RouterLink to="/map" class="inline-flex w-full sm:w-auto justify-center items-center gap-2 md:gap-3 bg-white text-primary hover:bg-white/90 font-black py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all uppercase text-[10px] md:text-xs tracking-widest shadow-xl">
                Abrir Mapa <span class="material-symbols-outlined text-sm">open_in_new</span>
              </RouterLink>
            </div>
          </div>
          
          <div class="group h-[350px] sm:h-[400px] md:h-[500px] rounded-[32px] md:rounded-[48px] overflow-hidden relative shadow-2xl cursor-pointer">
            <img src="https://images.unsplash.com/photo-1551288049-bbda38a5f67d?q=80&w=2070&auto=format&fit=crop" alt="Reporting Dashboard" class="absolute w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 md:p-10 w-full">
              <div class="bg-white/20 backdrop-blur-2xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl md:rounded-2xl mb-4 md:mb-8 shadow-2xl border border-white/30 text-white">
                <span class="material-symbols-outlined text-2xl md:text-4xl">insights</span>
              </div>
              <h3 class="text-2xl md:text-3xl font-black text-white mb-2 md:mb-3">Analítica & Reportes</h3>
              <p class="text-sm md:text-base text-slate-300 mb-6 md:mb-8 line-clamp-2 font-medium">Generación automática de indicadores poblacionales y análisis de impacto ambiental en PDF.</p>
              <RouterLink to="/reports" class="inline-flex w-full sm:w-auto justify-center items-center gap-2 md:gap-3 bg-white text-primary hover:bg-white/90 font-black py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all uppercase text-[10px] md:text-xs tracking-widest shadow-xl">
                Generar Datos <span class="material-symbols-outlined text-sm">open_in_new</span>
              </RouterLink>
            </div>
          </div>
          
          <div class="group h-[350px] sm:h-[400px] md:h-[500px] rounded-[32px] md:rounded-[48px] overflow-hidden relative shadow-2xl cursor-pointer md:col-span-2 lg:col-span-1">
            <img src="https://images.unsplash.com/photo-1560205001-a74e1dca9322?q=80&w=2070&auto=format&fit=crop" alt="Species Catalog" class="absolute w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 md:p-10 w-full">
              <div class="bg-white/20 backdrop-blur-2xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl md:rounded-2xl mb-4 md:mb-8 shadow-2xl border border-white/30 text-white">
                <span class="material-symbols-outlined text-2xl md:text-4xl">menu_book</span>
              </div>
              <h3 class="text-2xl md:text-3xl font-black text-white mb-2 md:mb-3">Registro Biológico</h3>
              <p class="text-sm md:text-base text-slate-300 mb-6 md:mb-8 line-clamp-2 font-medium">Investigación profunda en taxonomía, biología y regulaciones de pesca por especie.</p>
              <RouterLink to="/catalog" class="inline-flex w-full sm:w-auto justify-center items-center gap-2 md:gap-3 bg-white text-primary hover:bg-white/90 font-black py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all uppercase text-[10px] md:text-xs tracking-widest shadow-xl">
                Ver Catálogo <span class="material-symbols-outlined text-sm">open_in_new</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16 md:py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 font-display">
    <div class="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-16">
      <div class="sm:col-span-2 lg:col-span-2">
        <div class="flex items-center gap-3 md:gap-4 text-primary dark:text-blue-400 mb-6 md:mb-8">
          <div class="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <span class="material-symbols-outlined text-xl md:text-2xl">tsunami</span>
          </div>
          <h2 class="text-slate-900 dark:text-white text-2xl md:text-3xl font-black tracking-tighter">BioMarina</h2>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-sm mb-8 md:mb-10 leading-relaxed font-bold">
          Infraestructura digital para el monitoreo de la biodiversidad, ejecución de protocolos de conservación y empoderamiento de la comunidad científica.
        </p>
        <div class="flex items-center gap-3 md:gap-4">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm border border-primary/5">
            <span class="font-black text-sm md:text-base">𝕏</span>
          </div>
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm border border-primary/5">
            <span class="font-black text-lg md:text-xl">in</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 class="font-black mb-6 md:mb-8 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-slate-400">Plataforma</h4>
        <ul class="text-slate-700 dark:text-slate-400 space-y-4 md:space-y-5 font-black text-[10px] md:text-xs uppercase tracking-widest">
          <li><RouterLink to="/map" class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Mapa Global</RouterLink></li>
          <li><RouterLink to="/catalog" class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Base de Especies</RouterLink></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Matriz de Riesgo</a></li>
          <li><RouterLink to="/reports" class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Reportes</RouterLink></li>
        </ul>
      </div>

      <div>
        <h4 class="font-black mb-6 md:mb-8 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-slate-400">Institucional</h4>
        <ul class="text-slate-700 dark:text-slate-400 space-y-4 md:space-y-5 font-black text-[10px] md:text-xs uppercase tracking-widest">
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Quiénes Somos</a></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Misión</a></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Investigación</a></li>
          <li><a class="hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Alianzas</a></li>
        </ul>
      </div>
      
      <div class="flex flex-col gap-6 md:gap-8 sm:col-span-2 lg:col-span-1">
        <div>
          <h4 class="font-black mb-6 md:mb-8 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-slate-400">Acceso</h4>
          <RouterLink to="/login" class="inline-flex w-full bg-primary/10 hover:bg-primary/20 text-primary dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-center font-black py-3 md:py-4 rounded-xl md:rounded-2xl transition-all border border-primary/10 uppercase text-[9px] md:text-[10px] tracking-widest justify-center">
            Consola Investigador
          </RouterLink>
        </div>
        <div class="bg-blue-50 dark:bg-slate-800 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-blue-100 dark:border-slate-700">
           <p class="text-[9px] md:text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1 md:mb-2">API Status</p>
           <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span class="text-[10px] md:text-xs font-bold text-slate-600 dark:text-slate-300">Operational</span>
           </div>
        </div>
      </div>
    </div>
    
    <div class="max-w-[1600px] mx-auto mt-12 md:mt-24 pt-8 md:pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.1em] text-center md:text-left">
      <p>© 2024 BioMarina Global Network • Universidad del Magdalena</p>
      <div class="flex gap-6 md:gap-10">
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Privacidad</a>
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Términos</a>
        <a class="hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Cookies</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { opacity: 0.85; transform: scale(1.05); }
  50% { opacity: 1; transform: scale(1); }
}
.animate-pulse-slow {
  animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
