<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import type {
  Especie, Taxonomia, Biologia, Habitat, EstadoConservacion,
  Pesca,
  TipoHabitat, EstadoUICN, TipoVeda, ValorComercial, ValorEcologico
} from '@/shared/types/especie'
import {
  UICN_LABELS, HABITAT_LABELS, VEDA_LABELS
} from '@/shared/types/especie'
import FormSection from '@/shared/components/Common/FormSection.vue'

const props = defineProps<{
  modelValue: Partial<Especie>
  saving?: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: Partial<Especie>): void
  (e: 'save'): void
  (e: 'cancel'): void
}>()

// Local copy to avoid mutating prop directly
const form = ref<Partial<Especie>>(JSON.parse(JSON.stringify(props.modelValue)))
watch(() => props.modelValue, v => { form.value = JSON.parse(JSON.stringify(v)) }, { deep: true })

// Helpers
const update = () => emit('update:modelValue', JSON.parse(JSON.stringify(form.value)))

const HABITATS:         TipoHabitat[]      = ['arrecife', 'pelagico', 'fondo', 'estuario', 'manglar', 'costero']
const UICN_CATS:        EstadoUICN[]       = ['EX','EW','CR','EN','VU','NT','LC','DD','NE']
const VEDA_TIPOS:       TipoVeda[]         = ['ninguna','temporal','permanente','prohibida']
const VALOR_ECOLOGICO:  ValorEcologico[]   = ['bajo','medio','alto','muy alto']
const VALOR_COMERCIAL:  ValorComercial[]   = ['ninguno','bajo','medio','alto','muy alto']

const dietaInput    = ref('')
const artesInput    = ref('')
const puertosInput  = ref('')
const altNamesInput = ref('')

const addToArray = (field: string, inputRef: Ref<string>) => {
  const parts = inputRef.value.split(',').map((s: string) => s.trim()).filter(Boolean)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target = form.value as Record<string, any>
  const dotIdx = field.indexOf('.')
  if (dotIdx > -1) {
    const rootKey = field.substring(0, dotIdx)
    const subKey  = field.substring(dotIdx + 1)
    if (!target[rootKey]) target[rootKey] = {}
    if (!Array.isArray(target[rootKey][subKey])) target[rootKey][subKey] = []
    target[rootKey][subKey].push(...parts)
  } else {
    if (!Array.isArray(target[field])) target[field] = []
    target[field].push(...parts)
  }
  inputRef.value = ''
  update()
}

const removeFromArray = (field: string, index: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target = form.value as Record<string, any>
  target[field]?.splice(index, 1)
  update()
}

// Convenience alias for nested objects
const tax = computed({ get: () => form.value.taxonomia  ?? {} as Taxonomia,          set: v => { form.value.taxonomia  = v; update() } })
const bio = computed({ get: () => form.value.biologia   ?? {} as Biologia,            set: v => { form.value.biologia   = v; update() } })
const hab = computed({ get: () => form.value.habitat    ?? {} as Habitat,             set: v => { form.value.habitat    = v; update() } })
const con = computed({ get: () => form.value.conservacion ?? {} as EstadoConservacion, set: v => { form.value.conservacion = v; update() } })
const pes = computed({ get: () => form.value.pesca      ?? {} as Pesca,               set: v => { form.value.pesca      = v; update() } })

const completitud = computed(() => {
  let score = 0
  if (form.value.nombreCientifico)         score += 15
  if (form.value.descripcionGeneral)       score += 10
  if (form.value.taxonomia?.familia)       score += 10
  if (form.value.biologia?.longPromedCm)   score += 10
  if (form.value.habitat?.tipo)            score += 10
  if (form.value.conservacion?.uicn)       score += 15
  if (form.value.media?.length)            score += 15
  if (form.value.zonas?.length)            score += 10
  if (form.value.referenciasBiblio?.length) score += 5
  return score
})
</script>

<template>
  <div class="space-y-4 max-w-3xl">

    <!-- Completitud Banner -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4 shadow-sm">
      <div class="flex-1">
        <div class="flex justify-between mb-1.5 text-xs font-bold text-slate-600 dark:text-slate-400">
          <span>Completitud del registro</span>
          <span :class="completitud > 80 ? 'text-green-600' : completitud > 50 ? 'text-blue-600' : 'text-red-500'">
            {{ completitud }}%
          </span>
        </div>
        <div class="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500"
            :class="completitud > 80 ? 'bg-green-500' : completitud > 50 ? 'bg-blue-500' : 'bg-red-500'"
            :style="`width: ${completitud}%`"
          />
        </div>
      </div>
      <div class="flex gap-2 shrink-0">
        <button @click="emit('cancel')" type="button"
          class="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          Cancelar
        </button>
        <button @click="emit('save')" type="button" :disabled="saving"
          class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-60 flex items-center gap-2">
          <span v-if="saving" class="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
          <span>{{ saving ? 'Guardando...' : 'Guardar' }}</span>
        </button>
      </div>
    </div>

    <!-- 1. Información General -->
    <FormSection icon="info" title="Información General" description="Nombres, descripción y datos básicos" :completed="!!form.nombreCientifico">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="col-span-2">
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Nombre Científico *</label>
          <input v-model="form.nombreCientifico" @input="update" class="input" placeholder="p.ej. Pterois volitans" />
        </div>
        <div>
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Nombre Común *</label>
          <input v-model="form.nombreComun" @input="update" class="input" placeholder="p.ej. Pez León" />
        </div>
        <div>
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Emoji</label>
          <input v-model="form.emoji" @input="update" class="input" placeholder="🐠" maxlength="4" />
        </div>
        <div class="col-span-2">
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Descripción General</label>
          <textarea v-model="form.descripcionGeneral" @input="update" class="input min-h-[100px] resize-y" placeholder="Descripción ecológica y relevancia..." />
        </div>
        <div class="col-span-2">
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Notas Científicas</label>
          <textarea v-model="form.notas" @input="update" class="input min-h-[80px] resize-y" />
        </div>
        <!-- Nombres alternativos -->
        <div class="col-span-2">
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Nombres Comunes Alternativos</label>
          <div class="flex gap-2 mb-2">
            <input v-model="altNamesInput" class="input flex-1" placeholder="Añadir nombre, separar por comas" @keydown.enter.prevent="addToArray('nombreComunAlt', altNamesInput as any)" />
            <button @click="addToArray('nombreComunAlt', altNamesInput as any)" type="button" class="px-3 py-2 bg-blue-600 text-white text-[11px] font-black rounded-xl hover:bg-blue-700 transition-colors shrink-0">+ Añadir</button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="(n, i) in form.nombreComunAlt" :key="i" class="flex items-center px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-[11px] font-bold">
              {{ n }}
              <button @click="removeFromArray('nombreComunAlt', i)" class="ml-1 text-slate-400 hover:text-red-500">×</button>
            </span>
          </div>
        </div>
        <!-- Estado publicación -->
        <div>
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Estado de Publicación</label>
          <select v-model="form.estado" @change="update" class="input">
            <option value="borrador">Borrador</option>
            <option value="revision">En Revisión</option>
            <option value="publicado">Publicado</option>
          </select>
        </div>
      </div>
    </FormSection>

    <!-- 2. Taxonomía -->
    <FormSection icon="account_tree" title="Taxonomía" description="Clasificación científica completa" :completed="!!form.taxonomia?.familia">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div v-for="field in ['reino','filo','clase','orden','familia','genero','especie'] as const" :key="field">
          <label class="label capitalize">{{ field }}</label>
          <input v-model="tax[field]" @input="form.taxonomia = tax; update()" class="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" :placeholder="field" />
        </div>
      </div>
    </FormSection>

    <!-- 3. Biología -->
    <FormSection icon="biotech" title="Biología" description="Características físicas y de comportamiento" :completed="!!form.biologia?.longPromedCm">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Peso Prom. (kg)</label><input type="number" v-model.number="bio.pesoPromedioKg" @input="form.biologia = bio; update()" class="input" /></div>
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Peso Máx. (kg)</label><input type="number" v-model.number="bio.pesoMaximoKg"   @input="form.biologia = bio; update()" class="input" /></div>
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Long. Prom. (cm)</label><input type="number" v-model.number="bio.longPromedCm" @input="form.biologia = bio; update()" class="input" /></div>
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Long. Máx. (cm)</label><input type="number" v-model.number="bio.longMaxCm"     @input="form.biologia = bio; update()" class="input" /></div>
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Nivel Trófico</label><input type="number" step="0.1" v-model.number="bio.nivelTrofico" @input="form.biologia = bio; update()" class="input" /></div>
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Longevidad (años)</label><input type="number" v-model.number="bio.longevidadAnios" @input="form.biologia = bio; update()" class="input" /></div>
        <div class="col-span-2 sm:col-span-3">
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Reproducción</label>
          <input v-model="bio.reproduccion" @input="form.biologia = bio; update()" class="input" placeholder="ovíparo / vivíparo / ovovivíparo" />
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="bio.migracion" @change="form.biologia = bio; update()" class="w-4 h-4 rounded" />
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Especie migratoria</label>
        </div>
        <div class="col-span-2 sm:col-span-3">
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Dieta</label>
          <div class="flex gap-2 mb-2">
            <input v-model="dietaInput" class="input flex-1" placeholder="Ítem de dieta, comas para separar" @keydown.enter.prevent="addToArray('biologia.dieta', dietaInput as any)" />
            <button @click="addToArray('biologia.dieta', dietaInput as any)" type="button" class="px-3 py-2 bg-blue-600 text-white text-[11px] font-black rounded-xl hover:bg-blue-700 transition-colors shrink-0">+ Añadir</button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="(d, i) in form.biologia?.dieta" :key="i" class="flex items-center px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-[11px] font-bold">
              {{ d }}<button @click="form.biologia!.dieta!.splice(i, 1); update()" class="ml-1 text-slate-400 hover:text-red-500">×</button>
            </span>
          </div>
        </div>
      </div>
    </FormSection>

    <!-- 4. Hábitat -->
    <FormSection icon="water" title="Hábitat" description="Ecosistema y parámetros físicos" :completed="!!form.habitat?.tipo">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div class="col-span-2 sm:col-span-3">
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Tipo de Hábitat *</label>
          <select v-model="hab.tipo" @change="form.habitat = hab; update()" class="input">
            <option v-for="h in HABITATS" :key="h" :value="h">{{ HABITAT_LABELS[h] }}</option>
          </select>
        </div>
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Prof. Mín. (m)</label><input type="number" v-model.number="hab.profundidadMinM" @input="form.habitat = hab; update()" class="input" /></div>
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Prof. Máx. (m)</label><input type="number" v-model.number="hab.profundidadMaxM" @input="form.habitat = hab; update()" class="input" /></div>
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Temp. Mín. (°C)</label><input type="number" v-model.number="hab.tempMinC"        @input="form.habitat = hab; update()" class="input" /></div>
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Temp. Máx. (°C)</label><input type="number" v-model.number="hab.tempMaxC"        @input="form.habitat = hab; update()" class="input" /></div>
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Salinidad (ppt)</label><input type="number" v-model.number="hab.salinidadPpt"   @input="form.habitat = hab; update()" class="input" /></div>
      </div>
    </FormSection>

    <!-- 5. Conservación -->
    <FormSection icon="shield" title="Conservación" description="Estado UICN y marco legal" :completed="!!form.conservacion?.uicn">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Categoría UICN *</label>
          <select v-model="con.uicn" @change="form.conservacion = con; update()" class="input">
            <option v-for="u in UICN_CATS" :key="u" :value="u">{{ u }} — {{ UICN_LABELS[u] }}</option>
          </select>
        </div>
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Año evaluación</label><input type="number" v-model.number="con.uicnAnio" @input="form.conservacion = con; update()" class="input" placeholder="2022" /></div>
        <div>
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Tipo de Veda</label>
          <select v-model="con.vedaTipo" @change="form.conservacion = con; update()" class="input">
            <option v-for="v in VEDA_TIPOS" :key="v" :value="v">{{ VEDA_LABELS[v] }}</option>
          </select>
        </div>
        <div>
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Valor Ecológico</label>
          <select v-model="con.valorEcologico" @change="form.conservacion = con; update()" class="input">
            <option v-for="v in VALOR_ECOLOGICO" :key="v" :value="v" class="capitalize">{{ v }}</option>
          </select>
        </div>
        <div class="flex items-center gap-2 mt-4">
          <input type="checkbox" v-model="con.protegida" @change="form.conservacion = con; update()" class="w-4 h-4 rounded" />
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Especie legalmente protegida</label>
        </div>
        <div class="col-span-2 sm:col-span-3">
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Notas Legales</label>
          <textarea v-model="con.notasLegales" @input="form.conservacion = con; update()" class="input resize-y min-h-[80px]" placeholder="Normativa CITES, AUNAP, MADS..." />
        </div>
      </div>
    </FormSection>

    <!-- 6. Pesca -->
    <FormSection icon="phishing" title="Información Pesquera" description="Valor comercial y artes de pesca">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Valor Comercial</label>
          <select v-model="pes.valorComercial" @change="form.pesca = pes; update()" class="input">
            <option v-for="v in VALOR_COMERCIAL" :key="v" :value="v" class="capitalize">{{ v }}</option>
          </select>
        </div>
        <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Captura Anual (ton)</label><input type="number" v-model.number="pes.capturaAnualTon" @input="form.pesca = pes; update()" class="input" /></div>
        <div class="flex flex-col gap-2 mt-4">
          <label class="flex gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" v-model="pes.artesanal"  @change="form.pesca = pes; update()" class="w-4 h-4 rounded" /> Pesca Artesanal
          </label>
          <label class="flex gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" v-model="pes.industrial" @change="form.pesca = pes; update()" class="w-4 h-4 rounded" /> Pesca Industrial
          </label>
          <label class="flex gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" v-model="pes.acuariofilia" @change="form.pesca = pes; update()" class="w-4 h-4 rounded" /> Acuariofilia
          </label>
        </div>
        <!-- Artes de pesca -->
        <div class="col-span-2 sm:col-span-3">
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Artes de Pesca</label>
          <div class="flex gap-2 mb-2">
            <input v-model="artesInput" class="input flex-1" placeholder="palangre, red, etc." />
            <button @click="addToArray('pesca.artesPesca', artesInput as any)" type="button" class="px-3 py-2 bg-blue-600 text-white text-[11px] font-black rounded-xl hover:bg-blue-700 transition-colors shrink-0">+ Añadir</button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="(a, i) in form.pesca?.artesPesca" :key="i" class="flex items-center px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-[11px] font-bold">
              {{ a }}<button @click="form.pesca!.artesPesca!.splice(i, 1); update()" class="ml-1 text-slate-400 hover:text-red-500">×</button>
            </span>
          </div>
        </div>
        <!-- Puertos principales -->
        <div class="col-span-2 sm:col-span-3">
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Puertos Principales</label>
          <div class="flex gap-2 mb-2">
            <input v-model="puertosInput" class="input flex-1" placeholder="Santa Marta, Cartagena..." />
            <button @click="addToArray('pesca.puertosPrincipales', puertosInput as any)" type="button" class="px-3 py-2 bg-blue-600 text-white text-[11px] font-black rounded-xl hover:bg-blue-700 transition-colors shrink-0">+ Añadir</button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="(p, i) in form.pesca?.puertosPrincipales" :key="i" class="flex items-center px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-[11px] font-bold">
              {{ p }}<button @click="form.pesca!.puertosPrincipales!.splice(i, 1); update()" class="ml-1 text-slate-400 hover:text-red-500">×</button>
            </span>
          </div>
        </div>
      </div>
    </FormSection>

    <!-- 7. Distribución Geográfica -->
    <FormSection icon="map" title="Distribución Geográfica" description="Zonas de presencia de la especie" :completed="!!form.zonas?.length">
      <div class="space-y-3">
        <div
          v-for="(zona, i) in form.zonas"
          :key="i"
          class="border border-slate-200 dark:border-slate-700 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 relative"
        >
          <button @click="form.zonas!.splice(i, 1); update()" class="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 transition-colors">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
          <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Nombre zona</label><input v-model="zona.nombre" @input="update" class="input" /></div>
          <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Departamento</label><input v-model="zona.departamento" @input="update" class="input" /></div>
          <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Longitud</label><input type="number" step="0.001" :value="zona.punto?.coordinates[0]" @input="(e) => { if (!zona.punto) zona.punto = { type: 'Point', coordinates: [0, 0] }; zona.punto.coordinates[0] = +((e.target as HTMLInputElement).value); update() }" class="input" /></div>
          <div><label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Latitud</label><input type="number" step="0.001" :value="zona.punto?.coordinates[1]" @input="(e) => { if (!zona.punto) zona.punto = { type: 'Point', coordinates: [0, 0] }; zona.punto.coordinates[1] = +((e.target as HTMLInputElement).value); update() }" class="input" /></div>
        </div>
        <button
          @click="form.zonas = [...(form.zonas ?? []), { nombre: '', departamento: '', tipo: 'arrecife', punto: { type: 'Point', coordinates: [0, 0] } }]; update()"
          type="button"
          class="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined text-[18px]">add_location</span>
          Añadir zona de distribución
        </button>
      </div>
    </FormSection>

    <!-- 8. Media -->
    <FormSection icon="photo_library" title="Galería de Medios" description="Fotos, videos e ilustraciones" :completed="!!form.media?.length">
      <div class="space-y-4">
        <!-- Existing media gallery -->
        <div v-if="form.media?.length" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div
            v-for="(m, i) in form.media"
            :key="i"
            class="relative group rounded-xl overflow-hidden border-2 transition-all"
            :class="m.esPrincipal ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 dark:border-slate-700'"
          >
            <img :src="m.url" :alt="m.autoria ?? ''" class="w-full h-28 object-cover" />
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                @click="form.media!.forEach(x => x.esPrincipal = false); m.esPrincipal = true; update()"
                type="button"
                class="p-1.5 bg-white/20 text-white rounded-lg hover:bg-blue-500 transition-colors text-[11px] font-bold"
                title="Establecer como principal"
              >
                <span class="material-symbols-outlined text-[16px]">star</span>
              </button>
              <button
                @click="form.media!.splice(i, 1); update()"
                type="button"
                class="p-1.5 bg-white/20 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                <span class="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>
            <div v-if="m.esPrincipal" class="absolute top-1.5 left-1.5 bg-blue-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
              PRINCIPAL
            </div>
          </div>
        </div>

        <!-- URL quick-add -->
        <div>
          <label class="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Añadir imagen por URL</label>
          <div class="flex gap-2">
            <input
              ref="addUrlInput"
              type="url"
              class="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all flex-1"
              placeholder="https://..."
              @keydown.enter.prevent="(e) => {
                const url = (e.target as HTMLInputElement).value.trim()
                if (url) {
                  if (!form.media) form.media = []
                  form.media.push({ tipo: 'foto', url, esPrincipal: form.media.length === 0 })
                  ;(e.target as HTMLInputElement).value = ''
                  update()
                }
              }"
            />
            <button
              type="button"
              class="px-3 py-2 bg-blue-600 text-white text-[11px] font-black rounded-xl hover:bg-blue-700 transition-colors shrink-0"
              @click="(e) => {
                const inp = (e.target as HTMLElement).previousElementSibling as HTMLInputElement
                const url = inp?.value.trim()
                if (url) {
                  if (!form.media) form.media = []
                  form.media.push({ tipo: 'foto', url, esPrincipal: form.media.length === 0 })
                  inp.value = ''
                  update()
                }
              }"
            >
              + Añadir
            </button>
          </div>
        </div>
      </div>
    </FormSection>

    <!-- 9. Referencias Bibliográficas -->
    <FormSection icon="menu_book" title="Referencias Científicas" description="Bibliografía y fuentes de datos">
      <div class="space-y-3">
        <div v-for="(ref, i) in form.referenciasBiblio" :key="i" class="flex gap-2">
          <input v-model="form.referenciasBiblio![i]" @input="update" class="input flex-1 text-xs" />
          <button @click="form.referenciasBiblio!.splice(i, 1); update()" class="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
        <button
          @click="form.referenciasBiblio = [...(form.referenciasBiblio ?? []), '']; update()"
          type="button"
          class="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          Añadir referencia
        </button>
      </div>
    </FormSection>

    <!-- Bottom save bar -->
    <div class="flex justify-end gap-3 py-2">
      <button @click="emit('cancel')" type="button"
        class="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
        Cancelar
      </button>
      <button @click="emit('save')" type="button" :disabled="saving"
        class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-60 flex items-center gap-2">
        <span v-if="saving" class="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
        {{ saving ? 'Guardando...' : 'Guardar Especie' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
