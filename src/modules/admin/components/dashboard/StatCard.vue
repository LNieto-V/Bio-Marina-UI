<script setup lang="ts">
defineProps<{
  label:       string
  value:       string | number
  icon:        string
  color?:      'blue' | 'red' | 'green' | 'orange' | 'violet' | 'slate'
  description?: string
  trend?:      { value: number; label: string }
}>()

const colorMap: Record<string, string> = {
  blue:   'bg-blue-50   dark:bg-blue-900/20  text-blue-600  dark:text-blue-400   border-blue-100  dark:border-blue-900/30',
  red:    'bg-red-50    dark:bg-red-900/20   text-red-600   dark:text-red-400    border-red-100   dark:border-red-900/30',
  green:  'bg-green-50  dark:bg-green-900/20 text-green-600 dark:text-green-400  border-green-100 dark:border-green-900/30',
  orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900/30',
  violet: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-900/30',
  slate:  'bg-slate-50  dark:bg-slate-800     text-slate-600  dark:text-slate-400  border-slate-200 dark:border-slate-700',
}
</script>

<template>
  <div class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
    <!-- Icon -->
    <div :class="['w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border', colorMap[color ?? 'blue']]">
      <span class="material-symbols-outlined text-[24px] fill">{{ icon }}</span>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ label }}</p>
      <p class="text-3xl font-black text-slate-900 dark:text-white leading-none mb-1">{{ value }}</p>
      <p v-if="description" class="text-[11px] text-slate-400 font-medium truncate">{{ description }}</p>

      <!-- Trend -->
      <div v-if="trend" class="flex items-center gap-1 mt-2">
        <span :class="['material-symbols-outlined text-[14px]', trend.value >= 0 ? 'text-green-500' : 'text-red-500']">
          {{ trend.value >= 0 ? 'trending_up' : 'trending_down' }}
        </span>
        <span :class="['text-[10px] font-bold', trend.value >= 0 ? 'text-green-500' : 'text-red-500']">
          {{ Math.abs(trend.value) }}%
        </span>
        <span class="text-[10px] text-slate-400">{{ trend.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.material-symbols-outlined       { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.material-symbols-outlined.fill  { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
