<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/shared/components/AppHeader.vue'

const currentStep = ref(1)
const format = ref('pdf')
const dateRange = ref('30')

const datasets = ref({
  population: true,
  sightings: true,
  incidents: false,
  environment: false
})

const sections = ref({
  execSummary: true,
  methodology: true,
  rawTables: false,
  charts: true,
  geoMaps: false
} as Record<string, boolean>)

const generating = ref(false)

const handleGenerate = () => {
  generating.value = true
  setTimeout(() => {
    generating.value = false
    alert('¡Reporte generado con éxito! Se ha iniciado la descarga automática.')
  }, 2500)
}
</script>

<template>
  <AppHeader />
  
  <main class="flex-1 w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
    <div class="max-w-[1200px] mx-auto p-6 md:p-10 lg:py-16">
      
      <!-- Page Header -->
      <header class="mb-12 animate-in slide-in-from-top-4 duration-700">
        <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 dark:bg-blue-900/40 text-primary dark:text-blue-400 rounded-xl text-[10px] font-black tracking-widest uppercase mb-6 border border-primary/10">
          <span class="material-symbols-outlined text-[18px]">insights</span>
          Centro de Análisis de Datos
        </div>
        <h1 class="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-none">Generador de Reportes</h1>
        <p class="text-xl text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
          Crea exportaciones personalizadas para propuestas de subvención, cumplimiento legal o investigación académica.
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <!-- Main Form Area -->
        <div class="lg:col-span-8 space-y-10">
          
          <!-- Step 1: Format & Range -->
          <section :class="['bg-white dark:bg-slate-900 rounded-[32px] border border-primary/10 shadow-sm overflow-hidden transition-all duration-500', currentStep >= 1 ? 'opacity-100' : 'opacity-40 pointer-events-none']">
            <div class="bg-slate-50 dark:bg-slate-800/50 p-8 border-b border-primary/5 flex items-center gap-4 cursor-pointer" @click="currentStep = 1">
              <div :class="['w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-lg transition-all', currentStep === 1 ? 'bg-primary text-white scale-110' : 'bg-slate-200 dark:bg-slate-700 text-slate-500']">1</div>
              <h2 class="text-2xl font-black tracking-tight">Formato y Rango</h2>
              <span v-if="currentStep > 1" class="material-symbols-outlined ml-auto text-green-500 text-3xl">check_circle</span>
            </div>
            
            <div v-show="currentStep === 1" class="p-8 md:p-10 animate-in slide-in-from-top-4 duration-500">
              <div class="space-y-10">
                <div>
                  <label class="block text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Formato de Salida</label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <label :class="['relative flex flex-col items-center p-6 rounded-2xl border-2 cursor-pointer transition-all hover:border-primary/50 hover:shadow-xl', format === 'pdf' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900']">
                      <input type="radio" value="pdf" v-model="format" class="sr-only"/>
                      <span class="material-symbols-outlined text-4xl mb-3" :class="format === 'pdf' ? 'text-primary' : 'text-slate-300'">picture_as_pdf</span>
                      <span class="font-black text-xs uppercase tracking-widest">PDF Premium</span>
                    </label>
                    <label :class="['relative flex flex-col items-center p-6 rounded-2xl border-2 cursor-pointer transition-all hover:border-primary/50 hover:shadow-xl', format === 'csv' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900']">
                      <input type="radio" value="csv" v-model="format" class="sr-only"/>
                      <span class="material-symbols-outlined text-4xl mb-3" :class="format === 'csv' ? 'text-primary' : 'text-slate-300'">table_view</span>
                      <span class="font-black text-xs uppercase tracking-widest">CSV Crudo</span>
                    </label>
                    <label :class="['relative flex flex-col items-center p-6 rounded-2xl border-2 cursor-pointer transition-all hover:border-primary/50 hover:shadow-xl', format === 'json' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900']">
                      <input type="radio" value="json" v-model="format" class="sr-only"/>
                      <span class="material-symbols-outlined text-4xl mb-3" :class="format === 'json' ? 'text-primary' : 'text-slate-300'">data_object</span>
                      <span class="font-black text-xs uppercase tracking-widest">JSON Dump</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Intervalo de Tiempo</label>
                  <select v-model="dateRange" class="w-full md:w-1/2 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 border-2 py-4 px-6 focus:ring-primary focus:border-primary text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest shadow-sm transition-all outline-none">
                    <option value="7">Últimos 7 Días</option>
                    <option value="30">Últimos 30 Días</option>
                    <option value="90">Trimestre Atual (90 Días)</option>
                    <option value="365">Año Completo</option>
                    <option value="custom">Rango Personalizado...</option>
                  </select>
                </div>

                <div class="flex justify-end pt-6">
                  <button @click="currentStep = 2" class="px-10 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 uppercase text-xs tracking-[0.2em]">
                    Siguiente: Datasets
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Step 2: Select Datasets -->
          <section :class="['bg-white dark:bg-slate-900 rounded-[32px] border border-primary/10 shadow-sm overflow-hidden transition-all duration-500', currentStep >= 2 ? 'opacity-100' : 'opacity-40 pointer-events-none']">
            <div class="bg-slate-50 dark:bg-slate-800/50 p-8 border-b border-primary/5 flex items-center gap-4 cursor-pointer" @click="currentStep > 2 ? currentStep = 2 : null">
              <div :class="['w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-lg transition-all', currentStep === 2 ? 'bg-primary text-white scale-110' : 'bg-slate-200 dark:bg-slate-700 text-slate-500']">2</div>
              <h2 class="text-2xl font-black tracking-tight">Selección de Datasets</h2>
              <span v-if="currentStep > 2" class="material-symbols-outlined ml-auto text-green-500 text-3xl">check_circle</span>
            </div>
            
            <div v-show="currentStep === 2" class="p-8 md:p-10 animate-in slide-in-from-top-4 duration-500">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <label :class="['flex items-start gap-5 p-6 rounded-3xl border-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50', datasets.population ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800']">
                  <div class="pt-1">
                    <input type="checkbox" v-model="datasets.population" class="rounded-lg border-slate-300 text-primary focus:ring-primary w-6 h-6 transition-all"/>
                  </div>
                  <div>
                    <h4 class="font-black text-slate-900 dark:text-white mb-2 uppercase text-xs tracking-widest">Métricas Poblacionales</h4>
                    <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">Conteos estimados, datos de marcaje y registros de rutas migratorias.</p>
                  </div>
                </label>
                
                <label :class="['flex items-start gap-5 p-6 rounded-3xl border-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50', datasets.sightings ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800']">
                  <div class="pt-1">
                    <input type="checkbox" v-model="datasets.sightings" class="rounded-lg border-slate-300 text-primary focus:ring-primary w-6 h-6 transition-all"/>
                  </div>
                  <div>
                    <h4 class="font-black text-slate-900 dark:text-white mb-2 uppercase text-xs tracking-widest">Avistamientos Validados</h4>
                    <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">Bitácoras de ciencia ciudadana y observaciones con coordenadas verificadas.</p>
                  </div>
                </label>

                <label :class="['flex items-start gap-5 p-6 rounded-3xl border-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50', datasets.incidents ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800']">
                  <div class="pt-1">
                    <input type="checkbox" v-model="datasets.incidents" class="rounded-lg border-slate-300 text-primary focus:ring-primary w-6 h-6 transition-all"/>
                  </div>
                  <div>
                    <h4 class="font-black text-slate-900 dark:text-white mb-2 uppercase text-xs tracking-widest">Incidentes de Conservación</h4>
                    <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">Reportes de pesca ilegal, colisiones con embarcaciones o vertidos de contaminación.</p>
                  </div>
                </label>

                <label :class="['flex items-start gap-5 p-6 rounded-3xl border-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50', datasets.environment ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800']">
                  <div class="pt-1">
                    <input type="checkbox" v-model="datasets.environment" class="rounded-lg border-slate-300 text-primary focus:ring-primary w-6 h-6 transition-all"/>
                  </div>
                  <div>
                    <h4 class="font-black text-slate-900 dark:text-white mb-2 uppercase text-xs tracking-widest">Sensores Ambientales</h4>
                    <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">Lecturas de temperatura (SST), salinidad y pH de boyas inteligentes.</p>
                  </div>
                </label>

              </div>
              
              <div class="flex justify-between pt-10">
                <button @click="currentStep = 1" class="px-8 py-3 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">
                  Atrás
                </button>
                <button @click="currentStep = 3" class="px-10 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95 uppercase text-xs tracking-[0.2em]" :disabled="!datasets.population && !datasets.sightings && !datasets.incidents && !datasets.environment">
                  Configurar Estilo
                </button>
              </div>
            </div>
          </section>

          <!-- Step 3: Report Customization -->
          <section :class="['bg-white dark:bg-slate-900 rounded-[32px] border border-primary/10 shadow-sm overflow-hidden transition-all duration-500', currentStep === 3 ? 'opacity-100' : 'opacity-40 pointer-events-none']">
            <div class="bg-slate-50 dark:bg-slate-800/50 p-8 border-b border-primary/5 flex items-center gap-4 cursor-pointer" @click="currentStep === 3 ? null : currentStep = 3">
              <div :class="['w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-lg transition-all', currentStep === 3 ? 'bg-primary text-white scale-110' : 'bg-slate-200 dark:bg-slate-700 text-slate-500']">3</div>
              <h2 class="text-2xl font-black tracking-tight">Personalización Visual</h2>
            </div>
            
            <div v-show="currentStep === 3" class="p-8 md:p-10 animate-in slide-in-from-top-4 duration-500">
              <div class="space-y-6 max-w-xl">
                
                <label v-for="(val, key) in sections" :key="key" class="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer border border-transparent hover:border-primary/10 group">
                  <div class="flex items-center gap-4">
                    <span class="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">{{ key === 'execSummary' ? 'subject' : key === 'methodology' ? 'science' : key === 'rawTables' ? 'table_chart' : key === 'charts' ? 'stacked_bar_chart' : 'map' }}</span>
                    <span class="font-black text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300">{{ key === 'execSummary' ? 'Resumen Ejecutivo' : key === 'methodology' ? 'Notas Metodológicas' : key === 'rawTables' ? 'Tablas de Datos' : key === 'charts' ? 'Gráficos de Tendencias' : 'Mapas Geoespaciales' }}</span>
                  </div>
                  <div class="relative inline-block w-12 h-6 transition duration-200 ease-in">
                    <input type="checkbox" v-model="sections[key]" class="peer absolute block w-6 h-6 rounded-full bg-white border-2 border-slate-300 appearance-none cursor-pointer transition-all duration-300 checked:translate-x-6 checked:border-primary z-10"/>
                    <div class="block overflow-hidden h-6 rounded-full bg-slate-200 dark:bg-slate-700 peer-checked:bg-primary/20 transition-colors w-12"></div>
                  </div>
                </label>

              </div>
              
              <div class="flex justify-between pt-10">
                <button @click="currentStep = 2" class="px-8 py-3 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">
                  Atrás
                </button>
              </div>
            </div>
          </section>

        </div>

        <!-- Right Side: Preview & Action -->
        <aside class="lg:col-span-4">
          <div class="sticky top-24 space-y-8">
            
            <div class="bg-white dark:bg-slate-900 rounded-[40px] border border-primary/10 shadow-2xl p-10 transition-all hover:scale-[1.02] duration-300">
              <h3 class="text-xl font-black mb-8 border-b border-primary/10 pb-6 uppercase tracking-widest text-primary dark:text-blue-400">Resumen del Reporte</h3>
              
              <div class="space-y-6 mb-10">
                <div class="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                  <span class="text-slate-400">Formato:</span>
                  <span class="text-slate-900 dark:text-white">{{ format }}</span>
                </div>
                <div class="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                  <span class="text-slate-400">Intervalo:</span>
                  <span class="text-slate-900 dark:text-white">{{ dateRange }} Días</span>
                </div>
                <div class="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                  <span class="text-slate-400">Tamaño Est.:</span>
                  <span class="text-primary dark:text-blue-400">~4.2 MB</span>
                </div>
              </div>

              <div class="bg-slate-50 dark:bg-slate-800/80 rounded-[32px] p-8 mb-8 border border-primary/5">
                <h4 class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Módulos Incluidos</h4>
                <ul class="space-y-3 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                  <li v-if="datasets.population" class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Población</li>
                  <li v-if="datasets.sightings" class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Avistamientos</li>
                  <li v-if="datasets.incidents" class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Incidentes</li>
                  <li v-if="datasets.environment" class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Ambiente</li>
                  <li v-if="!datasets.population && !datasets.sightings && !datasets.incidents && !datasets.environment" class="text-slate-400 italic">Sin datos seleccionados</li>
                </ul>
              </div>

              <button 
                @click="handleGenerate"
                :disabled="generating || currentStep < 3"
                class="w-full py-5 bg-primary text-white font-black text-sm rounded-2xl hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 hover:shadow-primary/50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-4 uppercase tracking-[0.2em]"
              >
                <svg v-if="generating" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ generating ? 'Generando...' : 'Descargar Reporte' }}
              </button>
              
              <p class="text-[9px] font-black text-slate-400 text-center mt-6 uppercase tracking-widest leading-loose">
                Al generar este reporte, aceptas los <br/> <a class="underline cursor-pointer hover:text-primary">Lineamientos de Uso de Datos</a> de BioMarina.
              </p>
            </div>

            <!-- Recent Exports -->
            <div class="bg-white dark:bg-slate-900 rounded-[32px] border border-primary/10 p-8 shadow-sm">
              <h3 class="text-[10px] font-black mb-6 uppercase tracking-[0.2em] text-slate-400 flex items-center justify-between">
                Exportaciones Recientes
                <span class="material-symbols-outlined text-[18px]">history</span>
              </h3>
              <div class="space-y-5">
                <div class="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group border border-transparent hover:border-primary/10">
                  <div class="size-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-red-500 text-xl">picture_as_pdf</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-black truncate text-slate-700 dark:text-slate-200 uppercase tracking-tight">Q3_Biodiv_Magdalena.pdf</p>
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hoy • 10:42 AM • 4.2 MB</p>
                  </div>
                  <span class="material-symbols-outlined text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:text-primary hover:scale-125">download</span>
                </div>
                <div class="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group border border-transparent hover:border-primary/10">
                  <div class="size-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-green-500 text-xl">table_view</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-black truncate text-slate-700 dark:text-slate-200 uppercase tracking-tight">Avistamientos_Crudo.csv</p>
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">12 Oct 2024 • 12.8 MB</p>
                  </div>
                  <span class="material-symbols-outlined text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:text-primary hover:scale-125">download</span>
                </div>
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
