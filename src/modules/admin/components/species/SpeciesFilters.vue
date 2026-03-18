<script setup lang="ts">
import { type TipoHabitat, type EstadoUICN, HABITAT_LABELS, UICN_LABELS } from '@/shared/types/especie'
import type { EstadoPublicacion } from '@/shared/types/especie'

const emit = defineEmits<{
  (e: 'update:status',  v: 'todas' | EstadoPublicacion): void
  (e: 'update:habitat', v: TipoHabitat | undefined): void
  (e: 'update:uicn',    v: EstadoUICN | undefined): void
}>()

const props = defineProps<{
  status:  'todas' | EstadoPublicacion
  habitat?: TipoHabitat
  uicn?:   EstadoUICN
}>()

const STATUS_TABS: Array<{ key: 'todas' | EstadoPublicacion; label: string }> = [
  { key: 'todas',     label: 'Todas' },
  { key: 'publicado', label: 'Publicadas' },
  { key: 'revision',  label: 'En Revisión' },
  { key: 'borrador',  label: 'Borradores' },
]

const habitatOptions: Array<{ value: TipoHabitat; label: string }> = Object.entries(HABITAT_LABELS).map(
  ([value, label]) => ({ value: value as TipoHabitat, label }),
)

const uicnOptions: Array<{ value: EstadoUICN; label: string }> = Object.entries(UICN_LABELS).map(
  ([value, label]) => ({ value: value as EstadoUICN, label }),
)
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <!-- Status Tabs -->
    <div class="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-0.5">
      <button
        v-for="tab in STATUS_TABS"
        :key="tab.key"
        @click="emit('update:status', tab.key)"
        :class="[
          'px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all',
          props.status === tab.key
            ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Habitat Filter -->
    <select
      :value="props.habitat ?? ''"
      @change="emit('update:habitat', ($event.target as HTMLSelectElement).value as TipoHabitat || undefined)"
      class="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer"
    >
      <option value="">Todos los hábitats</option>
      <option v-for="opt in habitatOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>

    <!-- IUCN Filter -->
    <select
      :value="props.uicn ?? ''"
      @change="emit('update:uicn', ($event.target as HTMLSelectElement).value as EstadoUICN || undefined)"
      class="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer"
    >
      <option value="">Toda categoría UICN</option>
      <option v-for="opt in uicnOptions" :key="opt.value" :value="opt.value">{{ opt.value }} — {{ opt.label }}</option>
    </select>
  </div>
</template>
