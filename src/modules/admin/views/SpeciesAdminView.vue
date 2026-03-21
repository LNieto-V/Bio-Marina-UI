<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SpeciesTable from '../components/SpeciesTable.vue';
import SpeciesForm from '../components/SpeciesForm.vue';

const route = useRoute();
const router = useRouter();
const viewMode = ref<'list' | 'form'>('list');
const selectedId = ref<string | undefined>(undefined);

const checkQuery = () => {
  if (route.query.action === 'create') {
    selectedId.value = undefined;
    viewMode.value = 'form';
    router.replace({ query: {} }); // clean up
  } else if (route.query.action === 'edit' && route.query.id) {
    selectedId.value = route.query.id as string;
    viewMode.value = 'form';
    router.replace({ query: {} });
  }
};

onMounted(checkQuery);
watch(() => route.query, checkQuery);

const handleCreate = () => {
  selectedId.value = undefined;
  viewMode.value = 'form';
};

const handleEdit = (id: string) => {
  selectedId.value = id;
  viewMode.value = 'form';
};

const handleCloseForm = () => {
  viewMode.value = 'list';
  selectedId.value = undefined;
};

const handleSaved = (id?: string) => {
  if (id) selectedId.value = id;
  // We stay in form mode for granular updates if needed, 
  // or the user can manually close.
  // For simplicity, let's go back to list on first save if it was a new record
  if (!selectedId.value) {
    viewMode.value = 'list';
  }
};
</script>

<template>
  <div class="p-6 max-w-[1600px] mx-auto space-y-6 min-h-screen bg-slate-50/30 dark:bg-transparent transition-colors">
    <!-- Breadcrumbs / Header -->
    <div class="flex items-center gap-2 text-sm text-slate-400 mb-2">
      <span>Admin</span>
      <span>/</span>
      <span class="text-indigo-600 font-bold">Species Management</span>
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="viewMode === 'list'" key="list">
        <SpeciesTable @create="handleCreate" @edit="handleEdit" />
      </div>

      <div v-else key="form" class="h-[calc(100vh-120px)]">
        <SpeciesForm 
          :species-id="selectedId" 
          @close="handleCloseForm" 
          @saved="handleSaved" 
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.fade-enter-from { opacity: 0; transform: translateY(10px); }
.fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
