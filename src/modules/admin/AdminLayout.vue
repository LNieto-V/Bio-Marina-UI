<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'
import AdminSidebar from './components/layout/AdminSidebar.vue'
import AdminHeader  from './components/layout/AdminHeader.vue'

const router = useRouter()
const { isAuthenticated } = useAuth()

onMounted(() => {
  if (!isAuthenticated.value) {
    router.replace({ name: 'login', query: { redirect: '/admin/dashboard' } })
  }
})
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-display">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <!-- Sticky Header -->
      <AdminHeader />

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
