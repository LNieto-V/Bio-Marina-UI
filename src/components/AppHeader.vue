<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="sticky top-0 z-50 flex items-center justify-between border-b border-primary/10 bg-white/80 backdrop-blur-md dark:bg-background-dark/80 px-6 md:px-20 lg:px-40 py-4">
    <RouterLink to="/" class="flex items-center gap-4 text-primary dark:text-slate-100">
      <div class="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
        <span class="material-symbols-outlined">water_drop</span>
      </div>
      <h2 class="text-xl font-bold leading-tight tracking-tight">BioMarina</h2>
    </RouterLink>

    <nav class="hidden md:flex flex-1 justify-center gap-8">
      <RouterLink
        to="/"
        class="text-sm font-semibold transition-colors"
        active-class="text-primary border-b-2 border-primary pb-1"
        inactive-class="text-slate-600 dark:text-slate-400 hover:text-primary"
      >Home</RouterLink>
      <RouterLink
        to="/catalog"
        class="text-sm font-medium transition-colors"
        active-class="text-primary border-b-2 border-primary pb-1"
        inactive-class="text-slate-600 dark:text-slate-400 hover:text-primary"
      >Catalog</RouterLink>
      <RouterLink
        to="/map"
        class="text-sm font-medium transition-colors"
        active-class="text-primary border-b-2 border-primary pb-1"
        inactive-class="text-slate-600 dark:text-slate-400 hover:text-primary"
      >Map</RouterLink>
      <RouterLink
        to="/reports"
        class="text-sm font-medium transition-colors"
        active-class="text-primary border-b-2 border-primary pb-1"
        inactive-class="text-slate-600 dark:text-slate-400 hover:text-primary"
      >Regulations</RouterLink>
    </nav>

    <div class="flex items-center gap-3">
      <button class="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
        <span class="material-symbols-outlined shrink-0">notifications</span>
      </button>
      <RouterLink to="/login" class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/10 overflow-hidden shrink-0">
        <img class="w-full h-full object-cover" alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeYUr4opW3VAy8aUGPUpxTkuC7CB2-bhgXh2eP0hnNxYIvpnYi0eBqaC1pRyXRzDkhpI0GUa3dcPWpM_ko72jcqAfyeLqashyYFcECq4I8VOFwZWofPPZd3_eUbS1eWkA7mXQfJiLQqK-jTx9bsmqcNSEgLWmwoV-C6xxV3ds7uYvggBGX5l_oY5W-cUxU22ypukjfXdE6mv0bMnB-RRPTnF-UsEBZOK5uQRneXrMtEnKBaBuuro6kXQ_h-sXhXb_zAtbXgA4CQspW"/>
      </RouterLink>
    </div>
  </header>
</template>
