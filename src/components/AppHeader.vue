<script setup lang="ts">
// Navigation Header
</script>

<template>
  <header class="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 bg-white dark:bg-background-dark sticky top-0 z-50 backdrop-blur-md">
    <div class="flex items-center gap-4 text-primary">
      <div class="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
        <span class="material-symbols-outlined">tsunami</span>
      </div>
      <h2 class="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">BioMarina</h2>
    </div>

    <nav class="hidden md:flex items-center gap-8">
      <!-- Links will go here -->
    </nav>

    <div class="flex gap-3">
      <button class="flex h-10 px-4 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold tracking-wide">
        Contact Expert
      </button>
    </div>
  </header>
</template>
