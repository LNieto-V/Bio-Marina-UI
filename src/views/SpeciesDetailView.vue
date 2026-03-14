<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<template>
  <div class="layout-container">
    <AppHeader />
    <main class="flex-1 max-w-[1200px] mx-auto w-full px-4 py-8">
      <h1 class="text-4xl font-black mb-4">Species Detail</h1>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div class="md:col-span-8 bg-slate-200 h-[400px] rounded-xl animate-pulse"></div>
        <div class="md:col-span-4 space-y-4">
          <div class="bg-white p-6 rounded-xl border border-slate-200 h-64"></div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
