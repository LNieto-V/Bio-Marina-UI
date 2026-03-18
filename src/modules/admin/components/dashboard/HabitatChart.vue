<script setup lang="ts">
import { computed } from 'vue'
import type { HabitatConteo } from '@/shared/types/especie'
import { HABITAT_LABELS } from '@/shared/types/especie'

const props = defineProps<{ data: HabitatConteo[] }>()

const COLORS = ['#2563eb', '#0891b2', '#0d9488', '#16a34a', '#7c3aed', '#dc2626']

const total = computed(() => props.data.reduce((a, b) => a + b.total, 0))

const segments = computed(() => {
  let offset = 0
  return props.data.map((item, i) => {
    const pct = total.value > 0 ? (item.total / total.value) * 100 : 0
    const seg = {
      habitat: item.habitat,
      label: HABITAT_LABELS[item.habitat] ?? item.habitat,
      total: item.total,
      pct,
      offset,
      color: COLORS[i % COLORS.length],
      // SVG circumference math for circle r=15.9 (circumference ≈ 100)
      dash: pct,
      dashStart: offset,
    }
    offset += pct
    return seg
  })
})
</script>

<template>
  <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
    <h3 class="text-sm font-black text-slate-900 dark:text-white mb-1">Distribución por Hábitat</h3>
    <p class="text-[11px] text-slate-400 mb-5">Número de especies por tipo de ecosistema</p>

    <div class="flex items-center gap-6">
      <!-- SVG Donut -->
      <div class="shrink-0">
        <svg viewBox="0 0 36 36" class="w-28 h-28 -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" stroke-width="3.5" class="dark:[stroke:#1e293b]" />
          <circle
            v-for="(seg, i) in segments"
            :key="i"
            cx="18" cy="18" r="15.9"
            fill="none"
            :stroke="seg.color"
            stroke-width="3.5"
            :stroke-dasharray="`${seg.dash} ${100 - seg.dash}`"
            :stroke-dashoffset="`${-seg.dashStart}`"
            stroke-linecap="butt"
            class="transition-all duration-700"
          />
          <!-- Center text -->
          <text x="18" y="18" text-anchor="middle" dominant-baseline="central" class="rotate-90 origin-center text-slate-900 fill-current dark:fill-white" font-size="5" font-weight="800" transform="rotate(90, 18, 18)">
            {{ total }}
          </text>
          <text x="18" y="23" text-anchor="middle" class="fill-slate-400 dark:fill-slate-500" font-size="2.8" transform="rotate(90, 18, 23)">
            total
          </text>
        </svg>
      </div>

      <!-- Legend -->
      <div class="flex-1 space-y-2">
        <div v-for="seg in segments" :key="seg.habitat" class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 min-w-0">
            <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ background: seg.color }" />
            <span class="text-[11px] font-medium text-slate-600 dark:text-slate-400 truncate">{{ seg.label }}</span>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-[11px] font-bold text-slate-900 dark:text-white">{{ seg.total }}</span>
            <span class="text-[10px] text-slate-400 w-8 text-right">{{ seg.pct.toFixed(1) }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
