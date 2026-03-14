<script setup lang="ts">
// Reusable Card component
</script>

<template>
  <div class="group bg-white dark:bg-background-dark/40 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
    <div class="relative aspect-[16/10] overflow-hidden">
      <!-- Thumbnail/Image Slot -->
      <slot name="image" />
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <slot name="badge" />
      </div>
    </div>
    <div class="p-5">
      <div class="mb-3">
        <slot name="title" />
        <slot name="subtitle" />
      </div>
      <div class="flex items-center gap-2 py-3 border-t border-slate-100 dark:border-slate-800">
        <slot name="meta" />
      </div>
      <slot name="action" />
    </div>
  </div>
</template>
