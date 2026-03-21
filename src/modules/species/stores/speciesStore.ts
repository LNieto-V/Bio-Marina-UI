import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Species, SpeciesStatus } from '../types/species';

export const useSpeciesStore = defineStore('species-management', () => {
  const species = ref<Species[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Filters
  const searchQuery = ref('');
  const statusFilter = ref<SpeciesStatus | 'ALL'>('ALL');

  const filteredSpecies = computed(() => {
    return species.value.filter(s => {
      const matchesSearch = s.commonName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          s.scientificName.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesStatus = statusFilter.value === 'ALL' || s.status === statusFilter.value;
      return matchesSearch && matchesStatus;
    });
  });

  function setSpecies(newList: Species[]) {
    species.value = newList;
  }

  function addOrUpdateSpecies(s: Species) {
    const index = species.value.findIndex(item => item._id === s._id);
    if (index !== -1) {
      species.value[index] = { ...species.value[index], ...s };
    } else {
      species.value.push(s);
    }
  }

  function removeSpecies(id: string) {
    species.value = species.value.filter(item => item._id !== id);
  }

  return {
    species,
    loading,
    error,
    searchQuery,
    statusFilter,
    filteredSpecies,
    setSpecies,
    addOrUpdateSpecies,
    removeSpecies,
  };
});
