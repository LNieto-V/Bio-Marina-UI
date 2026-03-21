<script setup lang="ts">
import { useSpecies } from '../../species/composables/useSpecies';
import { useSpeciesStore } from '../../species/stores/speciesStore';
import { onMounted, watch } from 'vue';
import { SpeciesStatus } from '../../species/types/species';

const { speciesList, loadingSpecies, removeSpecies, refetchSpecies } = useSpecies();
const store = useSpeciesStore();

const emit = defineEmits(['edit', 'create']);

onMounted(async () => {
  store.loading = loadingSpecies.value;
  if (!loadingSpecies.value && speciesList.value.length > 0) {
    store.setSpecies(speciesList.value);
  }
});

watch(speciesList, (newList) => {
  store.setSpecies(newList);
}, { deep: true });

watch(loadingSpecies, (isLoading) => {
  store.loading = isLoading;
});

const handleDelete = async (id: string) => {
  console.log('Attempting to delete species:', id);
  if (window.confirm('Are you sure you want to delete this species?')) {
    try {
      await removeSpecies(id);
      store.removeSpecies(id);
      console.log('Successfully deleted species:', id);
    } catch (e) {
      console.error('Failed to delete species:', e);
    }
  }
};

const getStatusColor = (status: SpeciesStatus) => {
  switch (status) {
    case SpeciesStatus.PUBLISHED: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case SpeciesStatus.DRAFT: return 'bg-amber-100 text-amber-700 border-amber-200';
    case SpeciesStatus.REVISION: return 'bg-blue-100 text-blue-700 border-blue-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
      <div>
        <h2 class="text-lg font-bold text-slate-800">Species Inventory</h2>
        <p class="text-sm text-slate-500">Manage all registered species and their publication status.</p>
      </div>
      <button 
        @click="emit('create')"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
      >
        <span class="text-lg font-bold">+</span> Add New Species
      </button>
    </div>

    <div class="p-4 bg-white border-b border-slate-100 flex gap-4">
      <div class="relative flex-1">
        <input 
          v-model="store.searchQuery"
          type="text" 
          placeholder="Search species by name..." 
          class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
        />
        <div class="absolute left-3 top-2.5 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <select 
        v-model="store.statusFilter"
        class="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
      >
        <option value="ALL">All Status</option>
        <option :value="SpeciesStatus.DRAFT">Draft</option>
        <option :value="SpeciesStatus.PUBLISHED">Published</option>
        <option :value="SpeciesStatus.REVISION">Revision</option>

      </select>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-indigo-50 border-b-2 border-slate-200">
          <tr>
            <th class="px-6 py-4 text-xs font-black text-slate-800 uppercase tracking-wider">Species</th>
            <th class="px-6 py-4 text-xs font-black text-slate-800 uppercase tracking-wider">Status</th>
            <th class="px-6 py-4 text-xs font-black text-slate-800 uppercase tracking-wider">Completeness</th>
            <th class="px-6 py-4 text-xs font-black text-slate-800 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="store.loading" class="animate-pulse">
            <td colspan="4" class="px-6 py-8 text-center text-slate-400">Loading species data...</td>
          </tr>
          <tr v-else-if="store.filteredSpecies.length === 0">
            <td colspan="4" class="px-6 py-12 text-center text-slate-400">
              <div class="flex flex-col items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No species found matching your filters.</span>
              </div>
            </td>
          </tr>
          <tr 
            v-for="s in store.filteredSpecies" 
            :key="s._id" 
            class="hover:bg-slate-50/80 transition-colors group"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-xl shadow-sm">
                  {{ s.emoji || '🐟' }}
                </div>
                <div>
                  <div class="font-bold text-slate-800">{{ s.commonName }}</div>
                  <div class="text-xs italic text-slate-600 font-medium">{{ s.scientificName }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                :class="['px-2.5 py-1 rounded-full text-xs font-bold uppercase transition-all ring-1 ring-white shadow-sm', getStatusColor(s.status)]"
              >
                {{ s.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2 max-w-[120px]">
                <div class="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    class="bg-indigo-500 h-full rounded-full transition-all duration-1000" 
                    :style="{ width: `${s.completeness}%` }"
                  ></div>
                </div>
                <span class="text-xs font-semibold text-slate-600">{{ Math.round(s.completeness) }}%</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <div class="flex justify-end gap-2 relative z-10">
                <button 
                  @click="emit('edit', s._id)"
                  class="p-2 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-all shadow-sm"
                  title="Edit Species"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </button>
                <button 
                  @click="handleDelete(s._id)"
                  class="p-2 text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-all shadow-sm"
                  title="Delete Species"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
