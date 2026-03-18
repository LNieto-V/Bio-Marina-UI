<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useAdminStore }  from '@/app/stores/adminStore'
import { useSpeciesStore } from '@/app/stores/speciesStore'
import { useDashboard }   from '@/shared/composables/index'
import { useAdminPermissions } from '@/shared/composables/useAdminPermissions'
import StatCard    from '../components/dashboard/StatCard.vue'
import HabitatChart from '../components/dashboard/HabitatChart.vue'
import UicnChart   from '../components/dashboard/UicnChart.vue'
import { UICN_LABELS, UICN_COLORS, type Especie, type Media } from '@/shared/types/especie'

const adminStore   = useAdminStore()
const speciesStore = useSpeciesStore()
const { stats, loading } = useDashboard()
const { can } = useAdminPermissions()

onMounted(() => {
  if (speciesStore.allSpecies.length === 0) speciesStore.fetchSpecies()
})

// Recent species (last 5 by createdAt)
const recentSpecies = computed(() =>
  [...speciesStore.allSpecies]
    .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
    .slice(0, 5),
)

const getImageUrl = (item: Especie) =>
  item.media?.find((m: Media) => m.esPrincipal)?.url ||
  item.media?.[0]?.url ||
  `https://placehold.co/60x60/0b3c5b/white?text=${encodeURIComponent(item.nombreCientifico.slice(0, 2))}`

const completitud = computed(() => adminStore.stats.completitudMedia)
const completitudColor = computed(() =>
  completitud.value > 80 ? 'text-green-600 dark:text-green-400' :
  completitud.value > 60 ? 'text-blue-600 dark:text-blue-400' :
  'text-red-600 dark:text-red-400',
)
</script>

<template>
  <div class="p-6 md:p-8 space-y-8">

    <!-- Page Header -->
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-black text-slate-900 dark:text-white">Panel de Control</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Resumen del catálogo marino — {{ new Date().toLocaleDateString('es-CO', { dateStyle: 'long' }) }}
        </p>
      </div>
      <RouterLink
        v-if="can('species.create')"
        to="/admin/species/create"
        class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all active:scale-95"
      >
        <span class="material-symbols-outlined text-[20px]">add_circle</span>
        Nueva Especie
      </RouterLink>
    </div>

    <!-- Skeleton on loading -->
    <template v-if="loading">
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <div v-for="i in 6" :key="i" class="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
      </div>
    </template>

    <template v-else>
      <!-- KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <StatCard
          label="Total Biodiversidad"
          :value="adminStore.stats.totalEspecies"
          icon="set_meal"
          color="blue"
          description="Especies catalogadas en la base de datos"
          :trend="{ value: 8, label: 'vs. mes pasado' }"
        />
        <StatCard
          label="Publicadas"
          :value="adminStore.stats.publicadas"
          icon="public"
          color="green"
          description="Disponibles en el catálogo público"
          :trend="{ value: 5, label: 'este mes' }"
        />
        <StatCard
          label="En Peligro (CR/EN)"
          :value="adminStore.stats.enPeligro"
          icon="warning"
          color="red"
          description="Requieren atención crítica"
        />
        <StatCard
          label="Vulnerables (VU)"
          :value="adminStore.stats.vulnerables"
          icon="priority_high"
          color="orange"
          description="Estado de conservación vulnerable"
        />
        <StatCard
          label="Protegidas"
          :value="adminStore.stats.protegidas"
          icon="shield"
          color="violet"
          description="Bajo marco legal de protección"
        />
        <StatCard
          label="Completitud Media"
          :value="`${adminStore.stats.completitudMedia}%`"
          icon="fact_check"
          color="slate"
          description="Promedio de datos por especie"
        />
      </div>

      <!-- Completitud Progress -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-sm font-black text-slate-900 dark:text-white">Salud del Catálogo</h3>
            <p class="text-[11px] text-slate-400">Completitud de datos científicos promedio</p>
          </div>
          <span :class="['text-2xl font-black', completitudColor]">{{ completitud }}%</span>
        </div>
        <div class="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-1000 ease-out"
            :class="completitud > 80 ? 'bg-green-500' : completitud > 60 ? 'bg-blue-500' : 'bg-red-500'"
            :style="`width: ${completitud}%`"
          />
        </div>
        <div class="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase">
          <span>0%</span>
          <span :class="completitud > 50 ? 'opacity-0' : 'text-blue-500'">Óptimo: 80%+</span>
          <span>100%</span>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"
           v-if="stats?.porHabitat?.length || stats?.porUICN?.length">
        <HabitatChart :data="stats?.porHabitat ?? []" />
        <UicnChart    :data="stats?.porUICN    ?? []" />
      </div>

      <!-- Recent Species -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 class="text-sm font-black text-slate-900 dark:text-white">Últimas Especies Registradas</h3>
            <p class="text-[11px] text-slate-400">Las 5 entradas más recientes en el catálogo</p>
          </div>
          <RouterLink
            to="/admin/species"
            class="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Ver todas
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
          </RouterLink>
        </div>

        <div class="divide-y divide-slate-100 dark:divide-slate-800">
          <div
            v-for="sp in recentSpecies"
            :key="sp.id"
            class="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
          >
            <!-- Thumbnail -->
            <div
              class="w-12 h-12 rounded-xl bg-center bg-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700"
              :style="`background-image: url('${getImageUrl(sp)}')`"
            />
            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-900 dark:text-white truncate">{{ sp.nombreCientifico }}</p>
              <p class="text-[11px] text-slate-400 truncate">{{ sp.nombreComun }}</p>
            </div>
            <!-- IUCN Badge -->
            <span :class="['px-2 py-0.5 rounded-full text-[10px] font-black uppercase', UICN_COLORS[sp.conservacion.uicn]]">
              {{ sp.conservacion.uicn }}
            </span>
            <!-- Status -->
            <span :class="[
              'px-2.5 py-1 rounded-lg text-[10px] font-black uppercase',
              sp.estado === 'publicado' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
              sp.estado === 'revision'  ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
              'bg-slate-100 dark:bg-slate-800 text-slate-500'
            ]">
              {{ sp.estado }}
            </span>
            <!-- Actions -->
            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <RouterLink
                :to="`/species/${sp.id}`"
                class="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <span class="material-symbols-outlined text-[18px]">visibility</span>
              </RouterLink>
              <RouterLink
                v-if="can('species.edit')"
                :to="`/admin/species/${sp.id}/edit`"
                class="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <span class="material-symbols-outlined text-[18px]">edit</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
