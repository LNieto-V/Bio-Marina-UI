<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useReportStore } from '@/app/stores/reportStore'
import { FORMATO_LABELS, FORMATO_ICONS, DATASETS_DISPONIBLES } from '@/shared/types/reporte'
import type { ConfigReporte, FormatoReporte } from '@/shared/types/reporte'

const reportStore = useReportStore()
onMounted(() => reportStore.fetchRecentReports())

// Form state
const formato    = ref<FormatoReporte>('pdf')
const datasets   = ref<string[]>(['especies', 'conservacion'])
const desdeDate  = ref('')
const hastaDate  = ref(new Date().toISOString().split('T')[0])

const toggleDataset = (id: string) => {
  const i = datasets.value.indexOf(id)
  if (i > -1) datasets.value.splice(i, 1)
  else datasets.value.push(id)
}

const generate = async () => {
  const config: ConfigReporte = {
    formato:     formato.value,
    datasets:    datasets.value,
    rangoFechas: desdeDate.value ? { desde: desdeDate.value, hasta: (hastaDate.value || new Date().toISOString().split('T')[0]) as string } : undefined,
  }
  await reportStore.generateReport(config)
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-CO', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
</script>

<template>
  <div class="p-6 md:p-8 space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-black text-slate-900 dark:text-white">Generación de Reportes</h2>
      <p class="text-sm text-slate-400 mt-0.5">Exporta el catálogo marino en PDF o Excel con filtros personalizados</p>
    </div>

    <!-- Builder + History grid -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">

      <!-- Builder (3/5) -->
      <div class="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
        <h3 class="text-sm font-black text-slate-900 dark:text-white">Configurar Reporte</h3>

        <!-- Format selector -->
        <div>
          <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Formato de exportación</p>
          <div class="flex gap-3">
            <button
              v-for="(label, key) in FORMATO_LABELS"
              :key="key"
              @click="formato = key as FormatoReporte"
              :class="[
                'flex-1 flex items-center gap-3 p-5 rounded-2xl border-2 transition-all text-left group overflow-hidden relative shadow-sm hover:shadow-md',
                formato === key
                  ? 'border-blue-500 bg-white dark:bg-slate-900'
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-blue-900/50',
              ]"
            >
              <div v-if="formato === key" class="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5 pointer-events-none"></div>
              <span :class="['material-symbols-outlined text-[32px] transition-all duration-300', formato === key ? 'text-blue-600 scale-110 fill' : 'text-slate-300 group-hover:text-blue-400']">
                {{ FORMATO_ICONS[key as FormatoReporte] }}
              </span>
              <div class="relative z-10">
                <p :class="['text-sm font-black uppercase tracking-tight', formato === key ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300']">{{ label }}</p>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ key === 'pdf' ? 'Visual Document' : 'Spreadsheet' }}</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Dataset selection -->
        <div>
          <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Conjuntos de datos</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              v-for="ds in DATASETS_DISPONIBLES"
              :key="ds.id"
              @click="toggleDataset(ds.id)"
              :class="[
                'flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all',
                datasets.includes(ds.id)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300',
              ]"
            >
              <span :class="['material-symbols-outlined text-[20px]', datasets.includes(ds.id) ? 'text-blue-600' : 'text-slate-400']">
                {{ ds.icon }}
              </span>
              <span :class="['text-[12px] font-bold', datasets.includes(ds.id) ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400']">
                {{ ds.label }}
              </span>
              <div v-if="datasets.includes(ds.id)" class="ml-auto w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-white text-[12px] fill">check</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Date range -->
        <div>
          <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Rango de fechas (opcional)</p>
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="block text-[11px] text-slate-400 mb-1">Desde</label>
              <input type="date" v-model="desdeDate" class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
            <div class="flex-1">
              <label class="block text-[11px] text-slate-400 mb-1">Hasta</label>
              <input type="date" v-model="hastaDate" class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
          </div>
        </div>

        <!-- Generate button / progress -->
        <div>
          <div v-if="reportStore.generating" class="space-y-2">
            <div class="flex justify-between text-[11px] font-bold text-slate-500">
              <span>Generando reporte...</span>
              <span>{{ reportStore.generatingProgress }}%</span>
            </div>
            <div class="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                class="h-full bg-blue-500 rounded-full transition-all duration-300"
                :style="`width: ${reportStore.generatingProgress}%`"
              />
            </div>
          </div>
          <button
            v-else
            @click="generate"
            :disabled="datasets.length === 0"
            class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[20px] fill">download</span>
            Generar y descargar reporte
          </button>
        </div>

        <!-- Success notification -->
        <Transition name="slide">
          <div
            v-if="reportStore.lastGenerated"
            class="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
          >
            <span class="material-symbols-outlined text-green-600 text-[24px] fill">check_circle</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-green-800 dark:text-green-400">¡Reporte generado!</p>
              <p class="text-[11px] text-green-600 dark:text-green-500 truncate">{{ reportStore.lastGenerated.titulo }}</p>
            </div>
            <button @click="reportStore.clearLastGenerated()" class="text-green-400 hover:text-green-600 transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </Transition>
      </div>

      <!-- History (2/5) -->
      <div class="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 class="text-sm font-black text-slate-900 dark:text-white">Historial de Reportes</h3>
        </div>
        <div class="divide-y divide-slate-100 dark:divide-slate-800">
          <div
            v-for="report in reportStore.recentReports"
            :key="report.id"
            class="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
          >
            <div :class="[
              'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
              report.formato === 'pdf' ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'bg-green-50 dark:bg-green-900/20 text-green-600',
            ]">
              <span class="material-symbols-outlined text-[20px] fill">{{ FORMATO_ICONS[report.formato] }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[12px] font-bold text-slate-900 dark:text-white truncate">{{ report.titulo }}</p>
              <p class="text-[10px] text-slate-400">{{ report.tamano }} · {{ formatDate(report.creadoEn) }}</p>
            </div>
            <a
              :href="report.urlDescarga"
              class="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Descargar"
            >
              <span class="material-symbols-outlined text-[18px]">download</span>
            </a>
          </div>

          <div v-if="reportStore.recentReports.length === 0" class="py-12 text-center">
            <span class="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700 mb-2 block">bar_chart</span>
            <p class="text-sm text-slate-400">No hay reportes generados todavía</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
.material-symbols-outlined       { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.material-symbols-outlined.fill  { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
