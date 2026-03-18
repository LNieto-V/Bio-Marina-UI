<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  title:       string
  icon:        string
  description?: string
  completed?:  boolean
}>()

const open = ref(true)
</script>

<template>
  <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
    <!-- Section Header (collapsible) -->
    <button
      @click="open = !open"
      class="w-full flex items-center gap-4 px-6 py-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
    >
      <div class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/30">
        <span class="material-symbols-outlined text-[20px] text-blue-600 dark:text-blue-400 fill">{{ icon }}</span>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-black text-slate-900 dark:text-white">{{ title }}</h3>
        <p v-if="description" class="text-[11px] text-slate-400 truncate">{{ description }}</p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span
          v-if="completed !== undefined"
          :class="['w-2 h-2 rounded-full', completed ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600']"
        />
        <span
          class="material-symbols-outlined text-[20px] text-slate-400 transition-transform duration-200"
          :class="open ? 'rotate-180' : ''"
        >expand_more</span>
      </div>
    </button>

    <!-- Collapsible Content -->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition-all duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-show="open" class="p-6">
        <slot />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.material-symbols-outlined       { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.material-symbols-outlined.fill  { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
