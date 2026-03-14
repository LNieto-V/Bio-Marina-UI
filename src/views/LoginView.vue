<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const remember = ref(false)

const handleLogin = (e: Event) => {
  e.preventDefault()
  // Simulate login
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen w-full flex bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
    
    <!-- Left Hand Image Section -->
    <div class="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden">
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMsZ4y3sV9_yN4O42Nf3rK1gS4Z035Wk85_k1ZgN1T12-m3uYg9qPqDqS2c1G6u93I6fC8nK4mS5WpS1mF231S2V3uW6lM3tKq6r5m3tP1qD6pT8g4K1W5yQn9S4m5R1Z3qM4WpF5aG2kO5Q2C4E3tW5rA1mV2B6cN1D7xR1vF1cZ8bN3X9qE5tL7uJ5rK8yX3" alt="Abstract Marine Topography" class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay filter blur-[2px] scale-105" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-primary/30 mix-blend-multiply"></div>
      
      <div class="relative z-10 flex flex-col justify-end p-12 w-full max-w-2xl text-white">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
            <span class="material-symbols-outlined text-3xl">tsunami</span>
          </div>
        </div>
        <h1 class="text-5xl font-black tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
          Global Marine<br/>Data Infrastructure.
        </h1>
        <p class="text-xl text-white/80 font-medium max-w-lg leading-relaxed mb-12">
          Secure access to real-time telemetry, conservation tracking, and the global species registry.
        </p>
        
        <div class="flex items-center gap-6 text-sm font-bold text-white/60">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">verified_user</span> ISO 27001 Certified
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">public</span> Global NGO Network
          </div>
        </div>
      </div>
    </div>

    <!-- Right Hand Login Section -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
      <RouterLink to="/" class="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-blue-400 transition-colors cursor-pointer group">
        <span class="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
        Return Home
      </RouterLink>

      <div class="w-full max-w-md animate-in slide-in-from-right-8 duration-700">
        <div class="flex items-center gap-3 mb-8 lg:hidden">
          <div class="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">tsunami</span>
          </div>
          <span class="text-xl font-black tracking-tight">BioMarina</span>
        </div>

        <h2 class="text-3xl font-black tracking-tight mb-2">Researcher Portal</h2>
        <p class="text-slate-500 dark:text-slate-400 font-medium mb-10">Sign in to access your authorized datasets.</p>

        <form @submit="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-4 text-slate-400 text-[20px]">mail</span>
              <input 
                v-model="email"
                type="email" 
                class="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white transition-all outline-none font-medium" 
                placeholder="dr.smith@institute.org"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
              <a href="#" class="text-sm font-bold text-primary dark:text-blue-400 hover:underline">Forgot?</a>
            </div>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-4 text-slate-400 text-[20px]">lock</span>
              <input 
                v-model="password"
                type="password" 
                class="w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white transition-all outline-none font-medium" 
                placeholder="••••••••"
                required
              />
              <button type="button" class="absolute right-4 text-slate-400 hover:text-primary transition-colors focus:outline-none">
                <span class="material-symbols-outlined text-[20px]">visibility_off</span>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="remember" type="checkbox" class="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-transparent transition-colors cursor-pointer"/>
              <span class="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Remember this device</span>
            </label>
          </div>

          <button type="submit" class="w-full py-4 px-6 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 flex items-center justify-center gap-2">
            Authenticate <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </form>

        <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4">
          <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">Need academic access?</p>
          <button class="w-full py-3.5 px-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:border-primary dark:hover:border-blue-400 hover:text-primary dark:hover:text-blue-400 transition-all shadow-sm">
            Request API Credentials
          </button>
        </div>

      </div>
    </div>
    
  </div>
</template>

<style scoped>
/* Optional scoped styling */
</style>
