<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
</script>

<template>
  <AppHeader />
    <main class="relative flex-1 bg-slate-200 dark:bg-slate-800">
      <!-- Map Background Placeholder -->
      <div class="absolute inset-0 flex items-center justify-center opacity-20">
        <span class="material-symbols-outlined text-9xl">public</span>
      </div>

      <!-- Overlay UI -->
      <div class="absolute inset-0 pointer-events-none p-6">
        <div class="w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-xl rounded-xl p-4 border border-slate-200 dark:border-white/10 pointer-events-auto transition-colors duration-300">
          <h3 class="font-bold flex items-center gap-2 mb-4 dark:text-white">
            <span class="material-symbols-outlined text-primary dark:text-blue-400">layers</span>
            Habitat Explorer
          </h3>
          <div class="space-y-2">
            <!-- Layers list -->
            <p class="text-xs text-slate-500 dark:text-slate-400 italic">Toggle layers to visualize data...</p>
          </div>
        </div>
      </div>
    </main>
</template>
