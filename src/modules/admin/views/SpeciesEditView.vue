<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSpeciesStore } from '@/app/stores/speciesStore'
import type { Especie } from '@/shared/types/especie'
import SpeciesEditor from '../components/species/SpeciesEditor.vue'

const router       = useRouter()
const route        = useRoute()
const speciesStore = useSpeciesStore()
const saving       = ref(false)
const loading      = ref(true)

const form = ref<Partial<Especie>>({})

onMounted(async () => {
  const id = route.params.id as string
  if (!speciesStore.allSpecies.length) await speciesStore.fetchSpecies()
  const found = speciesStore.allSpecies.find(s => s.id === id)
  if (found) {
    form.value = JSON.parse(JSON.stringify(found))
  }
  loading.value = false
})

const speciesName = computed(() => form.value.nombreCientifico ?? 'Especie')

const save = async () => {
  saving.value = true
  await new Promise(r => setTimeout(r, 1000)) // simulate ACTUALIZAR_ESPECIE mutation
  saving.value = false
  router.push({ name: 'admin-species' })
}
</script>

<template>
  <div class="p-6 md:p-8">
    <div class="mb-6 flex items-center gap-3">
      <RouterLink to="/admin/species" class="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        <span class="material-symbols-outlined text-[20px]">arrow_back</span>
      </RouterLink>
      <div>
        <h2 class="text-2xl font-black text-slate-900 dark:text-white italic">{{ speciesName }}</h2>
        <p class="text-sm text-slate-400">Editando ficha de especie</p>
      </div>
    </div>

    <div v-if="loading" class="space-y-4">
      <div v-for="i in 4" :key="i" class="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
    </div>
    <SpeciesEditor
      v-else
      v-model="form"
      :saving="saving"
      @save="save"
      @cancel="router.push({ name: 'admin-species' })"
    />
  </div>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
