<script setup lang="ts">
import { useSpecies } from '../../species/composables/useSpecies';
import { useSpeciesStore } from '../../species/stores/speciesStore';
import { onMounted, watch } from 'vue';
import { SpeciesStatus } from '../../species/types/species';

const { speciesList, loadingSpecies, removeSpecies } = useSpecies();
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
    case SpeciesStatus.PUBLISHED: return 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50';
    case SpeciesStatus.DRAFT: return 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50';
    case SpeciesStatus.REVISION: return 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50';
    default: return 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
  }
};
</script>

<template>
  <div class="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-w-0 transition-colors">
    <div class="p-4 sm:p-6 border-b border-primary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl sm:text-2xl font-black gradient-text">Species Inventory</h2>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Manage all registered species and their publication status.</p>
      </div>
      <button 
        @click="emit('create')"
        class="flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl font-black shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all active:scale-95"
      >
        <span class="material-symbols-outlined text-[20px]">add_circle</span>
        <span>Nueva Especie</span>
      </button>
    </div>

    <div class="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-800/20 border-b border-primary/10 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1 group">
        <input 
          v-model="store.searchQuery"
          type="text" 
          placeholder="Search species by name..." 
          class="w-full pl-10 pr-4 py-2.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition-all outline-none dark:text-slate-100 placeholder:text-slate-400"
        />
        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
          <span class="material-symbols-outlined text-[20px]">search</span>
        </div>
      </div>
      <select 
        v-model="store.statusFilter"
        class="px-4 py-2.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-bold text-slate-600 dark:text-slate-300 transition-all outline-none w-full sm:w-auto cursor-pointer"
      >
        <option value="ALL">All Status</option>
        <option :value="SpeciesStatus.DRAFT">Draft</option>
        <option :value="SpeciesStatus.PUBLISHED">Published</option>
        <option :value="SpeciesStatus.REVISION">Revision</option>
      </select>
    </div>

    <div class="overflow-x-auto w-full">
      <table class="w-full text-left whitespace-nowrap min-w-[700px]">
        <thead>
          <tr class="bg-slate-50/50 dark:bg-slate-800/50 border-b border-primary/5">
            <th class="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-16">Img</th>
            <th class="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Species</th>
            <th class="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
            <th class="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Completeness</th>
            <th class="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-primary/5">
          <tr v-if="store.loading" class="animate-pulse">
            <td colspan="5" class="px-6 py-8 text-center text-sm font-bold text-slate-400">Loading species data...</td>
          </tr>
          <tr v-else-if="store.filteredSpecies.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-slate-400">
              <div class="flex flex-col items-center gap-2">
                <span class="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">fish</span>
                <span class="text-sm font-bold">No species found matching your filters.</span>
              </div>
            </td>
          </tr>
          <tr 
            v-for="s in store.filteredSpecies" 
            :key="s?._id" 
            class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
          >
            <!-- Thumbnail -->
            <td class="px-4 sm:px-6 py-3 sm:py-4">
              <div v-if="s" class="size-11 rounded-xl bg-primary/10 overflow-hidden shadow-sm border border-primary/5 shrink-0 flex items-center justify-center">
                <img 
                  v-if="s.media && s.media.length > 0" 
                  :src="s.media[0]?.url" 
                  class="w-full h-full object-cover transition-transform group-hover:scale-125"
                />
                <span v-else class="text-xl leading-none">{{ s.emoji || '🐟' }}</span>
              </div>
            </td>

            <td class="px-4 sm:px-6 py-3 sm:py-4">
              <div v-if="s">
                <div class="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  {{ s.commonName }}
                  <span v-if="!s.media || s.media.length === 0" class="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded italic">Sin foto</span>
                </div>
                <div class="text-[11px] font-bold text-slate-500 uppercase">{{ s.scientificName }}</div>
              </div>
            </td>
            <td class="px-4 sm:px-6 py-3 sm:py-4">
              <span 
                v-if="s"
                :class="['px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide uppercase shadow-sm border', getStatusColor(s.status)]"
              >
                {{ s.status }}
              </span>
            </td>
            <td class="px-4 sm:px-6 py-3 sm:py-4 w-32 sm:w-48">
              <div v-if="s" class="space-y-1.5">
                <div class="flex items-center justify-between text-[9px] font-black text-slate-500 uppercase">
                  <span>{{ Math.round(s.completeness) }}%</span>
                </div>
                <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-1000" 
                    :class="s.completeness > 80 ? 'bg-emerald-500' : s.completeness > 50 ? 'bg-primary dark:bg-blue-500' : 'bg-rose-500'"
                    :style="`width: ${s.completeness}%`"
                  ></div>
                </div>
              </div>
            </td>
            <td class="px-4 sm:px-6 py-3 sm:py-4 text-right">
              <div v-if="s" class="flex justify-end gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  @click="emit('edit', s._id)"
                  class="p-1.5 hover:bg-primary/10 rounded-lg text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                  title="Editar Especie"
                >
                  <span class="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button 
                  @click="handleDelete(s._id)"
                  class="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                  title="Eliminar Especie"
                >
                  <span class="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
