<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/app/stores/adminStore'
import { useSpeciesStore } from '@/app/stores/speciesStore'
import { useAdminPermissions } from '@/shared/composables/useAdminPermissions'
import SpeciesFilters from '../components/species/SpeciesFilters.vue'
import SpeciesTable  from '../components/species/SpeciesTable.vue'
import SpeciesPreview from '../components/species/SpeciesPreview.vue'
import type { Especie } from '@/shared/types/especie'
import type { TipoHabitat, EstadoUICN, EstadoPublicacion } from '@/shared/types/especie'

const router       = useRouter()
const adminStore   = useAdminStore()
const speciesStore = useSpeciesStore()
const { can }      = useAdminPermissions()

// Filter state
const selectedHabitat = ref<TipoHabitat | undefined>()
const selectedUicn    = ref<EstadoUICN | undefined>()

// Preview modal state
const previewOpen    = ref(false)
const previewSpecies = ref<Especie | null>(null)

const handlePreview = (item: Especie) => {
  previewSpecies.value = item
  previewOpen.value = true
}

const handleEdit = (id: string) => {
  router.push({ name: 'admin-species-edit', params: { id } })
}

const handleDelete = async (id: string) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta especie?')) {
    await adminStore.deleteSpecies(id)
  }
}

// Combined filtering across store + local habitat/UICN filters
const displayedSpecies = computed(() => {
  let result = adminStore.filteredSpecies
  if (selectedHabitat.value) result = result.filter(s => s.habitat.tipo === selectedHabitat.value)
  if (selectedUicn.value)    result = result.filter(s => s.conservacion.uicn === selectedUicn.value)
  return result
})

const paginatedDisplayed = computed(() => {
  const start = (adminStore.currentPage - 1) * adminStore.itemsPerPage
  return displayedSpecies.value.slice(start, start + adminStore.itemsPerPage)
})

const totalPages = computed(() => Math.ceil(displayedSpecies.value.length / adminStore.itemsPerPage))
</script>

<template>
  <div class="p-6 md:p-8 space-y-6">

    <!-- Header -->
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-black text-slate-900 dark:text-white">Inventario de Especies</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {{ displayedSpecies.length }} especies encontradas
        </p>
      </div>
      <div class="flex gap-3">
        <button class="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <span class="material-symbols-outlined text-[18px]">download</span>
          Exportar
        </button>
        <RouterLink
          v-if="can('species.create')"
          to="/admin/species/create"
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          Nueva Especie
        </RouterLink>
      </div>
    </div>

    <!-- Filters -->
    <SpeciesFilters
      :status="adminStore.selectedStatus"
      :habitat="selectedHabitat"
      :uicn="selectedUicn"
      @update:status="adminStore.setStatus($event)"
      @update:habitat="selectedHabitat = $event"
      @update:uicn="selectedUicn = $event"
    />

    <!-- Table Card -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <SpeciesTable
        :species="paginatedDisplayed"
        @preview="handlePreview"
        @edit="handleEdit"
        @delete="handleDelete"
      />

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <p class="text-[11px] font-bold text-slate-400 uppercase">
          Mostrando {{ paginatedDisplayed.length }} de {{ displayedSpecies.length }}
        </p>
        <div class="flex items-center gap-1.5">
          <button
            @click="adminStore.setPage(adminStore.currentPage - 1)"
            :disabled="adminStore.currentPage === 1"
            class="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span class="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>

          <button
            v-for="p in totalPages"
            :key="p"
            @click="adminStore.setPage(p)"
            :class="[
              'w-8 h-8 rounded-lg text-[11px] font-black transition-all',
              p === adminStore.currentPage
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
            ]"
          >{{ p }}</button>

          <button
            @click="adminStore.setPage(adminStore.currentPage + 1)"
            :disabled="adminStore.currentPage === totalPages"
            class="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Species Preview Modal -->
    <SpeciesPreview
      :open="previewOpen"
      :species="previewSpecies"
      @close="previewOpen = false"
      @edit="(id) => { previewOpen = false; handleEdit(id) }"
    />
  </div>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
