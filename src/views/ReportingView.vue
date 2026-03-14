<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'

const currentStep = ref(1)

const format = ref('pdf')
const dateRange = ref('7')

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
})

const generating = ref(false)

const handleGenerate = () => {
  generating.value = true
  setTimeout(() => {
    generating.value = false
    // Simulate generation complete
    alert('Report generation complete! Check your downloads folder.')
  }, 2000)
}
</script>

<template>
  <AppHeader />
  
  <main class="flex-1 w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
    <div class="max-w-[1200px] mx-auto p-6 md:p-10 lg:py-16">
      
      <!-- Page Header -->
      <header class="mb-10 animate-in slide-in-from-top-4 duration-500">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400 rounded-lg text-sm font-bold tracking-wider uppercase mb-4 border border-primary/20">
          <span class="material-symbols-outlined text-[18px]">insights</span>
          Data Synthesis
        </div>
        <h1 class="text-4xl md:text-5xl font-black tracking-tight mb-4">Export &amp; Reporting</h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
          Generate comprehensive data exports for grant proposals, legal compliance, or academic research. Select your parameters below.
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Main Form Area -->
        <div class="lg:col-span-8 space-y-8">
          
          <!-- Step 1: Format & Range -->
          <section :class="['bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm overflow-hidden transition-all duration-300 ring-2', currentStep >= 1 ? 'ring-primary/20 opacity-100' : 'ring-transparent opacity-50 pointer-events-none']">
            <div class="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-primary/5 flex items-center gap-4 cursor-pointer" @click="currentStep = 1">
              <div :class="['w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors', currentStep === 1 ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500']">1</div>
              <h2 class="text-xl font-bold">Format &amp; Timeframe</h2>
              <span v-if="currentStep > 1" class="material-symbols-outlined ml-auto text-green-500">check_circle</span>
            </div>
            
            <div v-show="currentStep === 1" class="p-6 md:p-8 animate-in slide-in-from-top-2">
              <div class="space-y-8">
                <div>
                  <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">Output Format</label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <label :class="['relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50', format === 'pdf' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700']">
                      <input type="radio" value="pdf" v-model="format" class="sr-only"/>
                      <span class="material-symbols-outlined text-4xl mb-2" :class="format === 'pdf' ? 'text-primary' : 'text-slate-400'">picture_as_pdf</span>
                      <span class="font-bold">PDF Document</span>
                    </label>
                    <label :class="['relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50', format === 'csv' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700']">
                      <input type="radio" value="csv" v-model="format" class="sr-only"/>
                      <span class="material-symbols-outlined text-4xl mb-2" :class="format === 'csv' ? 'text-primary' : 'text-slate-400'">table_view</span>
                      <span class="font-bold">Raw CSV</span>
                    </label>
                    <label :class="['relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50', format === 'json' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700']">
                      <input type="radio" value="json" v-model="format" class="sr-only"/>
                      <span class="material-symbols-outlined text-4xl mb-2" :class="format === 'json' ? 'text-primary' : 'text-slate-400'">data_object</span>
                      <span class="font-bold">JSON Dump</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">Data Timeframe</label>
                  <select v-model="dateRange" class="w-full md:w-1/2 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 border-2 py-3 px-4 focus:ring-primary focus:border-primary text-slate-900 dark:text-white font-medium shadow-sm transition-colors">
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                    <option value="90">Last Quarter (90 Days)</option>
                    <option value="365">Year to Date</option>
                    <option value="custom">Custom Range...</option>
                  </select>
                </div>

                <div class="flex justify-end pt-4">
                  <button @click="currentStep = 2" class="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md active:scale-95">
                    Continue to Datasets
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Step 2: Select Datasets -->
          <section :class="['bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm overflow-hidden transition-all duration-300 ring-2', currentStep >= 2 ? 'ring-primary/20 opacity-100' : 'ring-transparent opacity-50 pointer-events-none']">
            <div class="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-primary/5 flex items-center gap-4 cursor-pointer" @click="currentStep > 2 ? currentStep = 2 : null">
              <div :class="['w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors', currentStep === 2 ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500']">2</div>
              <h2 class="text-xl font-bold">Select Datasets</h2>
              <span v-if="currentStep > 2" class="material-symbols-outlined ml-auto text-green-500">check_circle</span>
            </div>
            
            <div v-show="currentStep === 2" class="p-6 md:p-8 animate-in slide-in-from-top-2">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <label :class="['flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50', datasets.population ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700']">
                  <div class="pt-1">
                    <input type="checkbox" v-model="datasets.population" class="rounded border-slate-300 text-primary focus:ring-primary w-5 h-5 transition-colors"/>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-1">Population Metrics</h4>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Species count estimations, tagging data, and migratory tracking records.</p>
                  </div>
                </label>
                
                <label :class="['flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50', datasets.sightings ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700']">
                  <div class="pt-1">
                    <input type="checkbox" v-model="datasets.sightings" class="rounded border-slate-300 text-primary focus:ring-primary w-5 h-5 transition-colors"/>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-1">Verified Sightings</h4>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Citizen science logs and researcher observations with geo-coordinates.</p>
                  </div>
                </label>

                <label :class="['flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50', datasets.incidents ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700']">
                  <div class="pt-1">
                    <input type="checkbox" v-model="datasets.incidents" class="rounded border-slate-300 text-primary focus:ring-primary w-5 h-5 transition-colors"/>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-1">Conservation Incidents</h4>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Reports on illegal fishing, boat strikes, or pollution events.</p>
                  </div>
                </label>

                <label :class="['flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50', datasets.environment ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700']">
                  <div class="pt-1">
                    <input type="checkbox" v-model="datasets.environment" class="rounded border-slate-300 text-primary focus:ring-primary w-5 h-5 transition-colors"/>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-1">Environmental Sensors</h4>
                    <p class="text-sm text-slate-500 dark:text-slate-400">SST, salinity, and pH readings from deployed buoys.</p>
                  </div>
                </label>

              </div>
              
              <div class="flex justify-between pt-8">
                <button @click="currentStep = 1" class="px-6 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  Back
                </button>
                <button @click="currentStep = 3" class="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md active:scale-95" :disabled="!datasets.population && !datasets.sightings && !datasets.incidents && !datasets.environment">
                  Continue to Customization
                </button>
              </div>
            </div>
          </section>

          <!-- Step 3: Report Customization -->
          <section :class="['bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm overflow-hidden transition-all duration-300 ring-2', currentStep === 3 ? 'ring-primary/20 opacity-100' : 'ring-transparent opacity-50 pointer-events-none']">
            <div class="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-primary/5 flex items-center gap-4 cursor-pointer" @click="currentStep === 3 ? null : currentStep = 3">
              <div :class="['w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors', currentStep === 3 ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500']">3</div>
              <h2 class="text-xl font-bold">Include Sections</h2>
            </div>
            
            <div v-show="currentStep === 3" class="p-6 md:p-8 animate-in slide-in-from-top-2">
              <div class="space-y-4 max-w-xl">
                
                <label class="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-slate-400">subject</span>
                    <span class="font-medium">Executive Summary</span>
                  </div>
                  <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" v-model="sections.execSummary" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-5 checked:border-primary"/>
                    <label class="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer transition-colors duration-200 ease-in-out"></label>
                  </div>
                </label>

                <label class="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-slate-400">science</span>
                    <span class="font-medium">Data Methodology Notes</span>
                  </div>
                  <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" v-model="sections.methodology" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-5 checked:border-primary"/>
                    <label class="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer transition-colors duration-200 ease-in-out"></label>
                  </div>
                </label>

                <label class="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-slate-400">table_chart</span>
                    <span class="font-medium">Raw Data Appendices (Tables)</span>
                  </div>
                  <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" v-model="sections.rawTables" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-5 checked:border-primary"/>
                    <label class="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer transition-colors duration-200 ease-in-out"></label>
                  </div>
                </label>

                <label class="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-slate-400">stacked_bar_chart</span>
                    <span class="font-medium">Trend Charts &amp; Graphs</span>
                  </div>
                  <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" v-model="sections.charts" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-5 checked:border-primary"/>
                    <label class="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer transition-colors duration-200 ease-in-out"></label>
                  </div>
                </label>

                <label class="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-slate-400">map</span>
                    <span class="font-medium">Geospatial Maps</span>
                  </div>
                  <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" v-model="sections.geoMaps" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-5 checked:border-primary"/>
                    <label class="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer transition-colors duration-200 ease-in-out"></label>
                  </div>
                </label>

              </div>
              
              <div class="flex justify-between pt-8">
                <button @click="currentStep = 2" class="px-6 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  Back
                </button>
              </div>
            </div>
          </section>

        </div>

        <!-- Right Side: Preview & Action -->
        <aside class="lg:col-span-4">
          <div class="sticky top-24 space-y-6">
            
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-lg p-6 transition-colors">
              <h3 class="text-lg font-bold mb-4 border-b border-primary/10 pb-4">Report Summary</h3>
              
              <div class="space-y-4 mb-8">
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500">Selected Format:</span>
                  <span class="font-bold uppercase">{{ format }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500">Timeframe:</span>
                  <span class="font-bold">Last {{ dateRange }} Days</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500">Est. Size:</span>
                  <span class="font-bold text-primary dark:text-blue-400">~4.2 MB</span>
                </div>
              </div>

              <div class="bg-primary/5 dark:bg-slate-800 rounded-xl p-4 mb-6 border border-transparent dark:border-slate-700">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Included Data</h4>
                <ul class="space-y-1 text-sm font-medium">
                  <li v-if="datasets.population" class="flex items-center gap-2"><span class="material-symbols-outlined text-[16px] text-green-500">check</span> Population Metrics</li>
                  <li v-if="datasets.sightings" class="flex items-center gap-2"><span class="material-symbols-outlined text-[16px] text-green-500">check</span> Verified Sightings</li>
                  <li v-if="datasets.incidents" class="flex items-center gap-2"><span class="material-symbols-outlined text-[16px] text-green-500">check</span> Conservation Incidents</li>
                  <li v-if="datasets.environment" class="flex items-center gap-2"><span class="material-symbols-outlined text-[16px] text-green-500">check</span> Environmental Sensors</li>
                  <li v-if="!datasets.population && !datasets.sightings && !datasets.incidents && !datasets.environment" class="text-slate-400 italic">No datasets selected.</li>
                </ul>
              </div>

              <button 
                @click="handleGenerate"
                :disabled="generating || currentStep < 3"
                class="w-full py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                <span v-if="generating" class="material-symbols-outlined animate-spin hidden">sync</span>
                <svg v-if="generating" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ generating ? 'Generating...' : 'Generate Report' }}
              </button>
              
              <p class="text-[11px] text-slate-400 text-center mt-4">
                By generating this report, you agree to the BioMarina <a class="underline cursor-pointer">Data Usage Guidelines</a>.
              </p>
            </div>

            <!-- Recent Exports -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 p-6 transition-colors">
              <h3 class="text-sm font-bold mb-4 uppercase tracking-wider text-slate-500 flex items-center justify-between">
                Recent Exports
                <span class="material-symbols-outlined text-[18px]">history</span>
              </h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                  <span class="material-symbols-outlined text-red-500">picture_as_pdf</span>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold truncate">Q3_Population_Metrics.pdf</p>
                    <p class="text-[10px] text-slate-400">Today at 10:42 AM • 4.2 MB</p>
                  </div>
                  <span class="material-symbols-outlined text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">download</span>
                </div>
                <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                  <span class="material-symbols-outlined text-green-500">table_view</span>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold truncate">Sightings_Raw_Dump.csv</p>
                    <p class="text-[10px] text-slate-400">Oct 12, 2024 • 12.8 MB</p>
                  </div>
                  <span class="material-symbols-outlined text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">download</span>
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
/* Custom Toggle Switch Styles */
.toggle-checkbox:checked {
  right: 0;
  border-color: #0b3c5b; /* primary */
}
.toggle-checkbox:checked + .toggle-label {
  background-color: rgba(11, 60, 91, 0.2);
}
</style>
