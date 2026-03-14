<script setup lang="ts">
// Sidebar Filter/Menu
</script>

<template>
  <aside class="w-full lg:w-72 flex flex-col gap-8">
    <div class="sticky top-24 flex flex-col gap-6 rounded-xl border border-primary/10 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">Filters</h3>
        <button class="text-xs font-semibold text-primary hover:underline">Clear all</button>
      </div>

      <!-- Content Slots could go here -->
      <slot />

      <button class="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-95">
        Apply Filters
      </button>
    </div>
  </aside>
</template>
