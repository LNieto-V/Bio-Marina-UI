<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import SidebarMenu from '../components/SidebarMenu.vue'
import BaseCard from '../components/Common/BaseCard.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<template>
  <div class="layout-container">
    <AppHeader />

    <main class="flex flex-1 flex-col lg:flex-row px-6 lg:px-20 py-8 gap-8">
      <SidebarMenu>
        <!-- Taxonomy Section Placeholder -->
        <section class="flex flex-col gap-3">
          <h4 class="text-slate-900 dark:text-slate-100 text-sm font-semibold uppercase tracking-wider">Taxonomy</h4>
          <!-- Checkbox list items -->
        </section>
      </SidebarMenu>

      <div class="flex-1 flex flex-col gap-6">
        <header class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight">Marine Species Catalog</h1>
            <p class="text-slate-600 dark:text-slate-400 mt-1">Discover and track biodiversity across global marine ecosystems.</p>
          </div>
        </header>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <BaseCard v-for="i in 6" :key="i">
            <template #image>
              <div class="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
            </template>
            <template #title>
              <h3 class="text-lg font-bold">Species Name</h3>
            </template>
            <template #subtitle>
              <p class="text-sm italic text-slate-500">Scientific Name</p>
            </template>
          </BaseCard>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
