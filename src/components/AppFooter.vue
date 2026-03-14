<script setup lang="ts">
// Footer
</script>

<template>
  <footer class="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-12 px-6">
    <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="col-span-1 md:col-span-2">
        <div class="flex items-center gap-2 text-primary mb-4">
          <span class="material-symbols-outlined">tsunami</span>
          <h2 class="text-slate-900 dark:text-slate-100 text-lg font-bold">BioMarina</h2>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          Advancing marine biology research and conservation efforts globally. Comprehensive data on vulnerable and endangered species.
        </p>
      </div>
      <div>
        <h4 class="font-bold mb-4 text-sm uppercase tracking-wider">Resources</h4>
        <ul class="text-sm text-slate-500 dark:text-slate-400 space-y-2">
          <li><a class="hover:text-primary transition-colors" href="#">Taxonomy Database</a></li>
          <li><a class="hover:text-primary transition-colors" href="#">Marine Regulations</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
        <ul class="text-sm text-slate-500 dark:text-slate-400 space-y-2">
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs">mail</span> info@biomarina.org</li>
        </ul>
      </div>
    </div>
    <div class="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
      © 2024 BioMarina - Global Marine Species Archive
    </div>
  </footer>
</template>
