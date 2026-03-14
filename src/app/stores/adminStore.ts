import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSpeciesStore } from './speciesStore'
import type { Especie, EstadisticasCatalogo } from '@/shared/types/especie'

export const useAdminStore = defineStore('admin', () => {
  const speciesStore = useSpeciesStore()

  // State
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const selectedStatus = ref<'todas' | 'borrador' | 'revision' | 'publicado'>('todas')
  
  // Stats (Mocked or derived from speciesStore)
  const stats = computed<EstadisticasCatalogo>(() => ({
    totalEspecies: speciesStore.allSpecies.length,
    publicadas: speciesStore.allSpecies.filter(s => s.estado === 'publicado').length,
    enPeligro: speciesStore.allSpecies.filter(s => s.conservacion.uicn === 'EN' || s.conservacion.uicn === 'CR').length,
    vulnerables: speciesStore.allSpecies.filter(s => s.conservacion.uicn === 'VU').length,
    protegidas: speciesStore.allSpecies.filter(s => s.conservacion.protegida).length,
    completitudMedia: Math.round(speciesStore.allSpecies.reduce((acc, s) => acc + (s.completitud || 0), 0) / (speciesStore.allSpecies.length || 1)),
    porHabitat: [],
    porUICN: []
  }))

  // Getters
  const filteredSpecies = computed(() => {
    let result = speciesStore.allSpecies

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(s => 
        s.nombreCientifico.toLowerCase().includes(q) || 
        s.nombreComun.toLowerCase().includes(q)
      )
    }

    if (selectedStatus.value !== 'todas') {
      result = result.filter(s => s.estado === selectedStatus.value)
    }

    return result
  })

  const paginatedSpecies = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredSpecies.value.slice(start, end)
  })

  const totalPages = computed(() => Math.ceil(filteredSpecies.value.length / itemsPerPage.value))

  // Actions
  const setSearchQuery = (q: string) => {
    searchQuery.value = q
    currentPage.value = 1
  }

  const setStatus = (status: typeof selectedStatus.value) => {
    selectedStatus.value = status
    currentPage.value = 1
  }

  const setPage = (page: number) => {
    currentPage.value = page
  }

  const deleteSpecies = async (id: string) => {
    // In a real app, this would be an API call
    console.log(`Deleting species ${id}`)
    // For now, we simulate success
    return true
  }

  // Reports
  const generateReport = async (config: { format: string; range: string; datasets: string[] }) => {
    console.log('Generating report with config:', config)
    return new Promise(resolve => setTimeout(resolve, 2000))
  }

  return {
    searchQuery,
    currentPage,
    itemsPerPage,
    selectedStatus,
    stats,
    filteredSpecies,
    paginatedSpecies,
    totalPages,
    setSearchQuery,
    setStatus,
    setPage,
    deleteSpecies,
    generateReport
  }
})
