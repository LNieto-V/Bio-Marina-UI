<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="bg-white dark:bg-background-dark border-t border-primary/10 py-12 px-6 md:px-20 lg:px-40">
    <div class="flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex items-center gap-3 text-primary dark:text-slate-100 opacity-60">
        <span class="material-symbols-outlined">water_drop</span>
        <span class="text-lg font-bold">BioMarina</span>
      </div>
      <div class="flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
        <RouterLink to="/privacy" class="hover:text-primary transition-colors">Privacy Policy</RouterLink>
        <RouterLink to="/terms" class="hover:text-primary transition-colors">Terms of Service</RouterLink>
        <RouterLink to="/contact" class="hover:text-primary transition-colors">Contact Support</RouterLink>
      </div>
      <div class="text-slate-400 text-sm">
        © 2024 BioMarina. All rights reserved.
      </div>
    </div>
  </footer>
</template>
