<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import BaseButton from '../components/Common/BaseButton.vue'
</script>

<template>
  <AppHeader />
    <main class="flex-1 max-w-[1000px] mx-auto w-full px-6 py-10 gap-8 flex flex-col">
      <div class="flex flex-col gap-2">
        <h1 class="text-4xl font-black leading-tight">Export & Reporting</h1>
        <p class="text-slate-500 text-lg">Configure and generate your data synthesis reports.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
          <section class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm">
            <h2 class="text-xl font-bold mb-6 flex items-center gap-3">
               <span class="flex items-center justify-center size-8 rounded-full bg-primary text-white text-sm">1</span>
               Select Format
            </h2>
            <div class="grid grid-cols-3 gap-4">
              <div v-for="fmt in ['PDF', 'Excel', 'CSV']" :key="fmt" class="p-6 rounded-xl border-2 border-transparent bg-slate-50 dark:bg-slate-800 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/30 transition-all">
                <span class="material-symbols-outlined text-4xl">description</span>
                <span class="font-bold">{{ fmt }}</span>
              </div>
            </div>
          </section>
        </div>

        <aside>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm sticky top-24">
            <h3 class="text-lg font-bold mb-4">Report Structure</h3>
            <BaseButton class="w-full mt-4" size="lg">
               Generate Report
            </BaseButton>
          </div>
        </aside>
      </div>
    </main>
</template>
