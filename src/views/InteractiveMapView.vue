<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
</script>

<template>
  <div class="layout-container h-screen overflow-hidden">
    <AppHeader />
    <main class="relative flex-1 bg-slate-200 dark:bg-slate-800">
      <!-- Map Background Placeholder -->
      <div class="absolute inset-0 flex items-center justify-center opacity-20">
        <span class="material-symbols-outlined text-9xl">public</span>
      </div>

      <!-- Overlay UI -->
      <div class="absolute inset-0 pointer-events-none p-6">
        <div class="w-80 bg-white/95 backdrop-blur shadow-xl rounded-xl p-4 border border-slate-200 pointer-events-auto">
          <h3 class="font-bold flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary">layers</span>
            Habitat Explorer
          </h3>
          <div class="space-y-2">
            <!-- Layers list -->
            <p class="text-xs text-slate-500 italic">Toggle layers to visualize data...</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
