<script setup lang="ts">
// Simple Login Layout
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
    <div class="relative w-full max-w-[1100px] min-h-[700px] bg-white dark:bg-slate-900 shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row">
      <!-- Image Section -->
      <div class="hidden md:flex md:w-1/2 relative overflow-hidden bg-primary/20">
        <div class="absolute bottom-12 left-12 z-20 text-white">
          <h1 class="text-4xl font-black tracking-tight mb-2">BioMarina</h1>
          <p class="text-lg text-slate-200">Advancing marine biotechnology research.</p>
        </div>
      </div>

      <!-- Form Section -->
      <div class="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 lg:px-16">
        <div class="max-w-md w-full mx-auto">
          <h2 class="text-3xl font-bold mb-2">Welcome Back</h2>
          <p class="text-slate-500 mb-8">Please enter your credentials.</p>

          <form class="space-y-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold">Email Address</label>
              <input type="email" class="w-full h-14 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-primary" placeholder="scientist@biomarina.org" />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold">Password</label>
              <input type="password" class="w-full h-14 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" />
            </div>
            <button class="w-full h-14 bg-primary text-white rounded-lg font-bold shadow-lg">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
