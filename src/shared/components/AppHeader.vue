<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'

const { isAuthenticated } = useAuth()
const route = useRoute()

const isDark = ref(false)
const isMenuOpen = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Close mobile menu on route change
watch(() => route.path, () => {
  isMenuOpen.value = false
})

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-primary/10 bg-white/95 backdrop-blur-xl dark:bg-slate-950/95 dark:border-slate-800 transition-colors duration-300">
    <!-- Main bar -->
    <div class="flex items-center justify-between px-4 sm:px-6 md:px-20 lg:px-40 py-3 md:py-4">
      <RouterLink to="/" class="flex items-center gap-3 md:gap-4 text-primary dark:text-slate-100">
        <div class="size-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
          <span class="material-symbols-outlined">water_drop</span>
        </div>
        <h2 class="text-lg md:text-xl font-bold leading-tight tracking-tight">BioMarina</h2>
      </RouterLink>

      <nav class="hidden md:flex flex-1 justify-center gap-8">
        <RouterLink
          to="/"
          class="text-sm font-bold transition-colors"
          active-class="text-slate-900 border-b-2 border-primary dark:text-white dark:border-cyan-400 pb-1"
          inactive-class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-cyan-400"
        >Home</RouterLink>
        <RouterLink
          to="/catalog"
          class="text-sm font-bold transition-colors"
          active-class="text-slate-900 border-b-2 border-primary dark:text-white dark:border-cyan-400 pb-1"
          inactive-class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-cyan-400"
        >Catalog</RouterLink>
        <RouterLink
          to="/map"
          class="text-sm font-bold transition-colors"
          active-class="text-slate-900 border-b-2 border-primary dark:text-white dark:border-cyan-400 pb-1"
          inactive-class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-cyan-400"
        >Map</RouterLink>
        <RouterLink
          to="/reports"
          class="text-sm font-bold transition-colors"
          active-class="text-slate-900 border-b-2 border-primary dark:text-white dark:border-cyan-400 pb-1"
          inactive-class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-cyan-400"
        >Regulations</RouterLink>
      </nav>

      <div class="flex items-center gap-2 md:gap-3">
        <!-- Admin Link (Only for logged-in users) -->
        <RouterLink
          v-if="isAuthenticated"
          to="/admin"
          class="hidden sm:flex items-center gap-2 px-4 py-2 mr-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-[13px] font-bold rounded-xl transition-all shadow-md shadow-cyan-500/20"
        >
          <span class="material-symbols-outlined text-[18px]">admin_panel_settings</span>
          Panel Admin
        </RouterLink>

        <button 
          @click="toggleTheme"
          class="flex items-center justify-center rounded-lg h-9 w-9 md:h-10 md:w-10 bg-primary/5 text-primary hover:bg-primary/10 dark:text-slate-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <span class="material-symbols-outlined shrink-0">
            {{ isDark ? 'light_mode' : 'dark_mode' }}
          </span>
        </button>
        <button class="hidden sm:flex items-center justify-center rounded-lg h-9 w-9 md:h-10 md:w-10 bg-primary/5 text-primary hover:bg-primary/10 dark:text-slate-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors">
          <span class="material-symbols-outlined shrink-0">notifications</span>
        </button>
        <RouterLink to="/login" class="hidden sm:flex h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary/20 items-center justify-center border-2 border-primary/10 overflow-hidden shrink-0">
          <img class="w-full h-full object-cover" alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeYUr4opW3VAy8aUGPUpxTkuC7CB2-bhgXh2eP0hnNxYIvpnYi0eBqaC1pRyXRzDkhpI0GUa3dcPWpM_ko72jcqAfyeLqashyYFcECq4I8VOFwZWofPPZd3_eUbS1eWkA7mXQfJiLQqK-jTx9bsmqcNSEgLWmwoV-C6xxV3ds7uYvggBGX5l_oY5W-cUxU22ypukjfXdE6mv0bMnB-RRPTnF-UsEBZOK5uQRneXrMtEnKBaBuuro6kXQ_h-sXhXb_zAtbXgA4CQspW"/>
        </RouterLink>

        <!-- Hamburger Button (mobile only) -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden flex items-center justify-center rounded-lg h-9 w-9 bg-primary/5 text-primary hover:bg-primary/10 dark:text-slate-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <span class="material-symbols-outlined shrink-0">
            {{ isMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <nav v-if="isMenuOpen" class="md:hidden border-t border-primary/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 pb-6 pt-2">
        <div class="flex flex-col gap-1">
          <RouterLink
            to="/"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold transition-colors hover:bg-primary/5 dark:hover:bg-white/5"
            active-class="text-primary bg-primary/10 dark:bg-blue-900/20 dark:text-blue-400"
            inactive-class="text-slate-700 dark:text-slate-300"
          >
            <span class="material-symbols-outlined text-[20px]">home</span>
            Home
          </RouterLink>
          <RouterLink
            to="/catalog"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold transition-colors hover:bg-primary/5 dark:hover:bg-white/5"
            active-class="text-primary bg-primary/10 dark:bg-blue-900/20 dark:text-blue-400"
            inactive-class="text-slate-700 dark:text-slate-300"
          >
            <span class="material-symbols-outlined text-[20px]">menu_book</span>
            Catalog
          </RouterLink>
          <RouterLink
            to="/map"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold transition-colors hover:bg-primary/5 dark:hover:bg-white/5"
            active-class="text-primary bg-primary/10 dark:bg-blue-900/20 dark:text-blue-400"
            inactive-class="text-slate-700 dark:text-slate-300"
          >
            <span class="material-symbols-outlined text-[20px]">map</span>
            Map
          </RouterLink>
          <RouterLink
            to="/reports"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold transition-colors hover:bg-primary/5 dark:hover:bg-white/5"
            active-class="text-primary bg-primary/10 dark:bg-blue-900/20 dark:text-blue-400"
            inactive-class="text-slate-700 dark:text-slate-300"
          >
            <span class="material-symbols-outlined text-[20px]">gavel</span>
            Regulations
          </RouterLink>
        </div>

        <!-- Mobile-only extras -->
        <div class="mt-4 pt-4 border-t border-primary/10 flex flex-col gap-2">
          <RouterLink
            v-if="isAuthenticated"
            to="/admin"
            class="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm"
          >
            <span class="material-symbols-outlined text-[18px]">admin_panel_settings</span>
            Panel Admin
          </RouterLink>
          <RouterLink 
            to="/login" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary dark:text-blue-400 text-sm font-bold transition-colors"
          >
            <span class="material-symbols-outlined text-[18px]">person</span>
            Mi Cuenta
          </RouterLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>
