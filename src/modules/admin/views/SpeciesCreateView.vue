<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Especie } from '@/shared/types/especie'
import SpeciesEditor from '../components/species/SpeciesEditor.vue'

const router = useRouter()
const saving = ref(false)

const emptySpecies: Partial<Especie> = {
  nombreComun: '',
  nombreCientifico: '',
  estado: 'borrador',
  completitud: 0,
  taxonomia:    { reino: 'Animalia', filo: '', genero: '', especie: '' },
  biologia:     {},
  habitat:      { tipo: 'arrecife' },
  conservacion: { uicn: 'NE', protegida: false },
  pesca:        {},
  media:        [],
  zonas:        [],
  referenciasBiblio: [],
}

const form = ref<Partial<Especie>>({ ...emptySpecies })

const save = async () => {
  saving.value = true
  await new Promise(r => setTimeout(r, 1000)) // simulate API call
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
        <h2 class="text-2xl font-black text-slate-900 dark:text-white">Nueva Especie</h2>
        <p class="text-sm text-slate-400">Completa el formulario científico para añadir la especie al catálogo</p>
      </div>
    </div>

    <SpeciesEditor
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
