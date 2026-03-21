<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'
import AdminSidebar from './components/layout/AdminSidebar.vue'
import AdminHeader  from './components/layout/AdminHeader.vue'

const router = useRouter()
const { isAuthenticated } = useAuth()

// ─── Mobile Sidebar State ─────────────────────────────────────────
const isSidebarOpen = ref(false)

onMounted(() => {
  if (!isAuthenticated.value) {
    router.replace({ name: 'login', query: { redirect: '/admin/dashboard' } })
  }
})
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-display">
    
    <!-- Mobile Sidebar Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z[40] lg:hidden"
        @click="isSidebarOpen = false"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <AdminSidebar 
      :is-open="isSidebarOpen"
      @close="isSidebarOpen = false"
    />

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <!-- Sticky Header -->
      <AdminHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />

      <!-- Route Content -->
      <main class="flex-1 overflow-y-auto scroll-smooth">
        <RouterView v-slot="{ Component, route }">
          <Transition
            :name="'fade'"
            mode="out-in"
          >
            <component :is="Component" :key="route.fullPath" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
