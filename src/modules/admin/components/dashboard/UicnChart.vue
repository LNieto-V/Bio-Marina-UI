<script setup lang="ts">
import { computed } from 'vue'
import type { UICNConteo } from '@/shared/types/especie'
import { UICN_LABELS } from '@/shared/types/especie'

const props = defineProps<{ data: UICNConteo[] }>()

const UICN_BAR_COLORS: Record<string, string> = {
  CR: '#dc2626',
  EN: '#f97316',
  VU: '#eab308',
  NT: '#84cc16',
  LC: '#22c55e',
  DD: '#94a3b8',
  EX: '#1e293b',
  EW: '#374151',
  NE: '#cbd5e1',
}

const maxVal = computed(() => Math.max(...props.data.map(d => d.total), 1))

const bars = computed(() =>
  props.data
    .filter(d => d.total > 0)
    .sort((a, b) => {
      const ORDER = ['CR', 'EN', 'VU', 'NT', 'LC', 'DD', 'EX', 'EW', 'NE']
      return ORDER.indexOf(a.uicn) - ORDER.indexOf(b.uicn)
    })
    .map(d => ({
      uicn:  d.uicn,
      label: UICN_LABELS[d.uicn] ?? d.uicn,
      total: d.total,
      pct:   (d.total / maxVal.value) * 100,
      color: UICN_BAR_COLORS[d.uicn] ?? '#94a3b8',
    })),
)
</script>

<template>
  <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
    <h3 class="text-sm font-black text-slate-900 dark:text-white mb-1">Estado UICN</h3>
    <p class="text-[11px] text-slate-400 mb-5">Categorías de amenaza del catálogo</p>

    <div class="space-y-3">
      <div v-for="bar in bars" :key="bar.uicn" class="space-y-1">
        <div class="flex items-center justify-between text-[11px]">
          <div class="flex items-center gap-2">
            <span
              class="px-1.5 py-0.5 rounded text-[9px] font-black text-white"
              :style="{ background: bar.color }"
            >{{ bar.uicn }}</span>
            <span class="font-medium text-slate-600 dark:text-slate-400">{{ bar.label }}</span>
          </div>
          <span class="font-bold text-slate-900 dark:text-white">{{ bar.total }}</span>
        </div>
        <div class="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-700 ease-out"
            :style="{ width: `${bar.pct}%`, background: bar.color }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
