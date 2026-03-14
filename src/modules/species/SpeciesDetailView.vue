<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/shared/components/AppHeader.vue'
import { useSpeciesStore } from '@/app/stores/speciesStore'
import { UICN_COLORS, UICN_LABELS, HABITAT_LABELS, VEDA_LABELS } from '@/shared/types/especie'
import { getFishBaseUrl } from '@/shared/services/fishbaseService'

const route = useRoute()
const router = useRouter()
const speciesStore = useSpeciesStore()

const activeTab = ref<'taxonomia' | 'biologia' | 'habitat' | 'reglamentacion' | 'pesca'>('taxonomia')

const init = () => {
  const id = route.params.id as string
  speciesStore.fetchSpeciesDetail(id)
}

onMounted(init)
watch(() => route.params.id, init)
</script>

<template>
  <AppHeader />

  <main class="flex-1 bg-background-light dark:bg-background-dark font-display min-h-screen transition-colors duration-300">

    <!-- Loading State -->
    <div v-if="speciesStore.loading" class="max-w-[1100px] mx-auto p-6 md:p-10 animate-pulse space-y-6">
      <div class="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      <div class="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
      <div class="h-5 bg-slate-100 dark:bg-slate-800 rounded w-1/4"></div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!speciesStore.selectedSpecies" class="flex flex-col items-center justify-center py-32 gap-4">
      <span class="material-symbols-outlined text-7xl text-slate-300">phishing</span>
      <p class="text-2xl font-bold text-slate-500">Especie no encontrada</p>
      <button @click="router.push('/catalog')" class="mt-2 px-6 py-2 bg-primary text-white font-bold rounded-lg transition-all hover:bg-primary/90">
        Volver al Catálogo
      </button>
    </div>

    <!-- Main Content -->
    <template v-else>
      <!-- Hero Banner -->
      <div class="relative w-full h-96 overflow-hidden">
        <img 
          v-if="speciesStore.imagenPrincipal" 
          :src="speciesStore.imagenPrincipal" 
          :alt="speciesStore.selectedSpecies.nombreComun" 
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full bg-gradient-to-br from-primary to-slate-800 flex items-center justify-center">
          <span class="text-8xl">{{ speciesStore.selectedSpecies.emoji || '🐟' }}</span>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>

        <!-- Back Button -->
        <button @click="router.push('/catalog')" class="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-white text-sm font-bold hover:bg-white/20 transition-colors">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span> Catálogo
        </button>

        <!-- FishBase Badge -->
        <div v-if="speciesStore.fishbaseLoading" class="absolute top-6 right-6 bg-white/10 backdrop-blur px-3 py-2 rounded-lg text-white text-xs font-bold flex items-center gap-2 border border-white/20">
          <div class="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          Enriqueciendo con FishBase...
        </div>
        <a v-else-if="speciesStore.fishbaseData?.speccode" :href="getFishBaseUrl(speciesStore.fishbaseData.speccode)" target="_blank" class="absolute top-6 right-6 bg-blue-600/80 backdrop-blur px-3 py-2 rounded-lg text-white text-xs font-bold flex items-center gap-2 border border-blue-400/30 hover:bg-blue-600 transition-colors">
          <span class="material-symbols-outlined text-[16px]">open_in_new</span>Ver en FishBase
        </a>

        <!-- Main Title Overlay -->
        <div class="absolute bottom-0 left-0 p-6 md:p-10 w-full">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span v-if="speciesStore.selectedSpecies.emoji" class="text-4xl">{{ speciesStore.selectedSpecies.emoji }}</span>
            <span :class="`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow ${UICN_COLORS[speciesStore.selectedSpecies.conservacion.uicn]}`">
              {{ UICN_LABELS[speciesStore.selectedSpecies.conservacion.uicn] }}
            </span>
            <span v-if="speciesStore.selectedSpecies.conservacion.protegida" class="px-3 py-1.5 bg-green-500/80 text-white rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">shield</span>Especie Protegida
            </span>
          </div>
          <h1 class="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
            {{ speciesStore.selectedSpecies.nombreComun }}
          </h1>
          <p class="text-xl italic text-white/70 mt-1">{{ speciesStore.selectedSpecies.nombreCientifico }}</p>
          <p v-if="speciesStore.selectedSpecies.nombreComunAlt?.length" class="text-sm text-white/50 mt-1">
            También conocido como: {{ speciesStore.selectedSpecies.nombreComunAlt.join(', ') }}
          </p>
        </div>
      </div>

      <!-- Quick Stats Grid -->
      <div class="max-w-[1100px] mx-auto px-6 md:px-10 -mt-8 relative z-10 mb-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-primary/10 p-4 text-center transition-colors">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Hábitat</p>
            <p class="font-bold text-slate-900 dark:text-white text-sm">{{ HABITAT_LABELS[speciesStore.selectedSpecies.habitat.tipo] }}</p>
          </div>
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-primary/10 p-4 text-center transition-colors">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Profundidad</p>
            <p class="font-bold text-slate-900 dark:text-white text-sm">
              {{ speciesStore.selectedSpecies.habitat.profundidadMinM ?? '?' }} – {{ speciesStore.selectedSpecies.habitat.profundidadMaxM ?? '?' }} m
            </p>
          </div>
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-primary/10 p-4 text-center transition-colors">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nivel Trófico</p>
            <p class="font-bold text-slate-900 dark:text-white text-sm">
              {{ speciesStore.selectedSpecies.biologia.nivelTrofico ?? speciesStore.fishbaseData?.trophicLevel ?? 'N/A' }}
            </p>
          </div>
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-primary/10 p-4 text-center transition-colors">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Longitud Máx.</p>
            <p class="font-bold text-slate-900 dark:text-white text-sm">
              {{ speciesStore.selectedSpecies.biologia.longMaxCm ?? speciesStore.fishbaseData?.maxLength ?? 'N/A' }} cm
            </p>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="max-w-[1100px] mx-auto px-6 md:px-10 pb-16">
        
        <!-- Descripción General -->
        <div v-if="speciesStore.selectedSpecies.descripcionGeneral" class="mb-10 bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 p-6 md:p-8 shadow-sm transition-colors">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary dark:text-blue-400">description</span>
            Descripción General
          </h2>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed text-base">{{ speciesStore.selectedSpecies.descripcionGeneral }}</p>
        </div>

        <!-- Tabs -->
        <div class="flex flex-wrap gap-2 mb-8">
          <button v-for="tab in [
            { id: 'taxonomia', label: 'Taxonomía', icon: 'account_tree' },
            { id: 'biologia', label: 'Biología', icon: 'science' },
            { id: 'habitat', label: 'Hábitat', icon: 'nature' },
            { id: 'reglamentacion', label: 'Conservación', icon: 'shield' },
            { id: 'pesca', label: 'Pesca', icon: 'sailing' },
          ]" :key="tab.id"
            @click="activeTab = tab.id as any"
            :class="['flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all', activeTab === tab.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-primary/10 hover:border-primary/30 hover:text-primary dark:hover:text-blue-400']"
          >
            <span class="material-symbols-outlined text-[18px]">{{ tab.icon }}</span>{{ tab.label }}
          </button>
        </div>

        <!-- Tab Content -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 p-6 md:p-8 shadow-sm transition-colors">
          
          <!-- Taxonomía -->
          <div v-show="activeTab === 'taxonomia'">
            <h3 class="text-lg font-bold mb-6 flex items-center gap-2"><span class="material-symbols-outlined text-primary dark:text-blue-400">account_tree</span>Clasificación Taxonómica</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="[label, value] in [
                ['Reino', speciesStore.selectedSpecies.taxonomia.reino],
                ['Filo', speciesStore.selectedSpecies.taxonomia.filo],
                ['Clase', speciesStore.selectedSpecies.taxonomia.clase],
                ['Orden', speciesStore.selectedSpecies.taxonomia.orden],
                ['Familia', speciesStore.selectedSpecies.taxonomia.familia],
                ['Género', speciesStore.selectedSpecies.taxonomia.genero],
                ['Especie', speciesStore.selectedSpecies.taxonomia.especie],
              ]" :key="label" class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{{ label }}</p>
                <p class="font-bold text-slate-900 dark:text-white" :class="label === 'Especie' || label === 'Género' ? 'italic' : ''">{{ value ?? '—' }}</p>
              </div>
            </div>
          </div>

          <!-- Biología -->
          <div v-show="activeTab === 'biologia'">
            <h3 class="text-lg font-bold mb-6 flex items-center gap-2"><span class="material-symbols-outlined text-primary dark:text-blue-400">science</span>Datos Biológicos</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Peso Promedio</p>
                <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.selectedSpecies.biologia.pesoPromedioKg ? `${speciesStore.selectedSpecies.biologia.pesoPromedioKg} kg` : '—' }}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Longitud Máx.</p>
                <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.selectedSpecies.biologia.longMaxCm ? `${speciesStore.selectedSpecies.biologia.longMaxCm} cm` : speciesStore.fishbaseData?.maxLength ? `${speciesStore.fishbaseData.maxLength} cm (FishBase)` : '—' }}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Nivel Trófico</p>
                <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.selectedSpecies.biologia.nivelTrofico ?? speciesStore.fishbaseData?.trophicLevel ?? '—' }}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Reproducción</p>
                <p class="font-bold text-slate-900 dark:text-white capitalize">{{ speciesStore.selectedSpecies.biologia.reproduccion ?? '—' }}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Longevidad</p>
                <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.selectedSpecies.biologia.longevidadAnios ? `${speciesStore.selectedSpecies.biologia.longevidadAnios} años` : '—' }}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Migratorio</p>
                <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.selectedSpecies.biologia.migracion == null ? '—' : speciesStore.selectedSpecies.biologia.migracion ? 'Sí' : 'No' }}</p>
              </div>
            </div>
            <div v-if="speciesStore.selectedSpecies.biologia.dieta?.length" class="mt-6">
              <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Dieta</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="item in speciesStore.selectedSpecies.biologia.dieta" :key="item" class="px-3 py-1.5 bg-primary/10 dark:bg-blue-900/20 text-primary dark:text-blue-400 text-sm font-semibold rounded-lg border border-primary/20">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>

          <!-- Hábitat -->
          <div v-show="activeTab === 'habitat'">
            <h3 class="text-lg font-bold mb-6 flex items-center gap-2"><span class="material-symbols-outlined text-primary dark:text-blue-400">nature</span>Hábitat y Distribución</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Tipo de Hábitat</p>
                <p class="font-bold text-slate-900 dark:text-white">{{ HABITAT_LABELS[speciesStore.selectedSpecies.habitat.tipo] }}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Profundidad</p>
                <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.selectedSpecies.habitat.profundidadMinM ?? 0 }} – {{ speciesStore.selectedSpecies.habitat.profundidadMaxM ?? '?' }} m</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Temperatura</p>
                <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.selectedSpecies.habitat.tempMinC ?? speciesStore.fishbaseData?.tempMin ?? '?' }}°C – {{ speciesStore.selectedSpecies.habitat.tempMaxC ?? speciesStore.fishbaseData?.tempMax ?? '?' }}°C</p>
              </div>
              <div v-if="speciesStore.selectedSpecies.habitat.salinidadPpt" class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Salinidad</p>
                <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.selectedSpecies.habitat.salinidadPpt }} ppt</p>
              </div>
            </div>

            <div v-if="speciesStore.selectedSpecies.zonas?.length" class="mt-4">
              <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Zonas de Distribución (Caribe Colombiano)</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div v-for="zona in speciesStore.selectedSpecies.zonas" :key="zona.nombre" class="flex items-start gap-3 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <span class="material-symbols-outlined text-primary dark:text-blue-400 mt-0.5">location_on</span>
                  <div>
                    <p class="font-bold text-slate-900 dark:text-white">{{ zona.nombre }}</p>
                    <p v-if="zona.departamento" class="text-sm text-slate-500">{{ zona.departamento }}</p>
                    <p v-if="zona.punto" class="text-xs text-slate-400 mt-1 font-mono">{{ zona.punto.coordinates[1].toFixed(4) }}°N, {{ zona.punto.coordinates[0].toFixed(4) }}°O</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Conservación -->
          <div v-show="activeTab === 'reglamentacion'">
            <h3 class="text-lg font-bold mb-6 flex items-center gap-2"><span class="material-symbols-outlined text-primary dark:text-blue-400">shield</span>Estado de Conservación</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-2">Estado UICN</p>
                <span :class="`px-3 py-1.5 rounded-full text-sm font-black ${UICN_COLORS[speciesStore.selectedSpecies.conservacion.uicn]}`">
                  {{ speciesStore.selectedSpecies.conservacion.uicn }} — {{ UICN_LABELS[speciesStore.selectedSpecies.conservacion.uicn] }}
                </span>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Estado de Veda</p>
                <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.selectedSpecies.conservacion.vedaTipo ? VEDA_LABELS[speciesStore.selectedSpecies.conservacion.vedaTipo] : '—' }}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Especie Protegida</p>
                <p class="font-bold" :class="speciesStore.selectedSpecies.conservacion.protegida ? 'text-green-600 dark:text-green-400' : 'text-slate-500'">{{ speciesStore.selectedSpecies.conservacion.protegida ? '✓ Sí' : '✗ No' }}</p>
              </div>
            </div>

            <div v-if="speciesStore.selectedSpecies.conservacion.vedaMeses?.length" class="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-5">
              <p class="font-bold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
                <span class="material-symbols-outlined">calendar_month</span> Meses de Veda
              </p>
              <div class="flex flex-wrap gap-2">
                <span v-for="mes in speciesStore.selectedSpecies.conservacion.vedaMeses" :key="mes" class="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">{{ mes }}</span>
              </div>
            </div>

            <div v-if="speciesStore.selectedSpecies.conservacion.notasLegales" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5">
              <p class="font-bold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2">
                <span class="material-symbols-outlined">gavel</span> Notas Legales
              </p>
              <p class="text-red-700 dark:text-red-300 text-sm leading-relaxed">{{ speciesStore.selectedSpecies.conservacion.notasLegales }}</p>
            </div>

            <div v-if="speciesStore.selectedSpecies.curiosidades?.length" class="mt-6">
              <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Curiosidades</p>
              <ul class="space-y-3">
                <li v-for="(c, i) in speciesStore.selectedSpecies.curiosidades" :key="i" class="flex items-start gap-3 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <span class="text-primary dark:text-blue-400 font-black text-lg leading-none">{{ (i as number) + 1 }}</span>
                  <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{{ c }}</p>
                </li>
              </ul>
            </div>
          </div>

          <!-- Pesca -->
          <div v-show="activeTab === 'pesca'">
            <h3 class="text-lg font-bold mb-6 flex items-center gap-2"><span class="material-symbols-outlined text-primary dark:text-blue-400">sailing</span>Actividad Pesquera</h3>
            <div v-if="speciesStore.selectedSpecies.pesca" class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Valor Comercial</p>
                <p class="font-bold text-slate-900 dark:text-white capitalize">{{ speciesStore.selectedSpecies.pesca.valorComercial ?? '—' }}</p>
              </div>
              <div v-if="speciesStore.selectedSpecies.pesca.capturaAnualTon" class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Captura Anual</p>
                <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.selectedSpecies.pesca.capturaAnualTon.toLocaleString() }} ton</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Pesca Artesanal</p>
                <p class="font-bold" :class="speciesStore.selectedSpecies.pesca.artesanal ? 'text-green-600 dark:text-green-400' : 'text-slate-400'">{{ speciesStore.selectedSpecies.pesca.artesanal ? '✓ Sí' : '✗ No' }}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Pesca Industrial</p>
                <p class="font-bold" :class="speciesStore.selectedSpecies.pesca.industrial ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'">{{ speciesStore.selectedSpecies.pesca.industrial ? '✓ Sí' : '✗ No' }}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p class="text-xs font-bold text-slate-400 uppercase mb-1">Acuariofilia</p>
                <p class="font-bold" :class="speciesStore.selectedSpecies.pesca.acuariofilia ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'">{{ speciesStore.selectedSpecies.pesca.acuariofilia ? '✓ Sí' : '✗ No' }}</p>
              </div>
            </div>
            <div v-else class="text-slate-500 italic text-center py-12">No hay datos de actividad pesquera para esta especie.</div>

            <div v-if="speciesStore.selectedSpecies.pesca?.artesPesca?.length" class="mt-6">
              <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Artes de Pesca</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="arte in speciesStore.selectedSpecies.pesca.artesPesca" :key="arte" class="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg capitalize">{{ arte }}</span>
              </div>
            </div>
            <div v-if="speciesStore.selectedSpecies.pesca?.puertosPrincipales?.length" class="mt-4">
              <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Puertos Principales</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="puerto in speciesStore.selectedSpecies.pesca.puertosPrincipales" :key="puerto" class="px-3 py-1.5 bg-primary/10 dark:bg-blue-900/20 text-primary dark:text-blue-400 text-sm font-semibold rounded-lg border border-primary/20">
                  <span class="material-symbols-outlined text-[14px]">anchor</span> {{ puerto }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- FishBase Enrichment Card -->
        <div v-if="speciesStore.fishbaseData && !speciesStore.fishbaseLoading" class="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 transition-colors">
          <h3 class="font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined">auto_awesome</span>
            Datos adicionales de FishBase
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div v-if="speciesStore.fishbaseData.maxLength" class="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3">
              <p class="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Long. Máx. (FishBase)</p>
              <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.fishbaseData.maxLength }} cm</p>
            </div>
            <div v-if="speciesStore.fishbaseData.trophicLevel" class="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3">
              <p class="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Nivel Trófico</p>
              <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.fishbaseData.trophicLevel }}</p>
            </div>
            <div v-if="speciesStore.fishbaseData.depthMax" class="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3">
              <p class="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Prof. Máx.</p>
              <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.fishbaseData.depthMax }} m</p>
            </div>
            <div v-if="speciesStore.fishbaseData.vulnerability" class="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3">
              <p class="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Vulnerabilidad</p>
              <p class="font-bold text-slate-900 dark:text-white">{{ speciesStore.fishbaseData.vulnerability.toFixed(1) }}/100</p>
            </div>
          </div>
          <a v-if="speciesStore.fishbaseData.speccode" :href="getFishBaseUrl(speciesStore.fishbaseData.speccode)" target="_blank" class="inline-flex items-center gap-2 mt-4 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
            <span class="material-symbols-outlined text-[16px]">open_in_new</span>
            Ver ficha completa en FishBase (SpecCode: {{ speciesStore.fishbaseData.speccode }})
          </a>
        </div>

        <!-- Completitud Badge -->
        <div class="mt-6 text-right">
          <span :class="`inline-flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-full ${speciesStore.selectedSpecies.completitud >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`">
            <span class="material-symbols-outlined text-[14px]">data_usage</span>
            Completitud del registro: {{ speciesStore.selectedSpecies.completitud }}%
          </span>
        </div>

      </div>
    </template>
  </main>
</template>
