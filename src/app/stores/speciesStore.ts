import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { MOCK_ESPECIES } from '@/shared/services/mockData'
import type { Especie, FiltrosEspecie, Media } from '@/shared/types/especie'
import { searchFishBaseCached, type FishBaseEnrichment } from '@/shared/services/fishbaseService'

export const useSpeciesStore = defineStore('species', () => {
  const allSpecies = ref<Especie[]>([...MOCK_ESPECIES])
  const filters = ref<FiltrosEspecie>({
    busqueda: '',
    habitat: undefined,
    uicn: undefined,
    estado: undefined,
    vedaTipo: undefined,
  })
  
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const itemsPerPage = ref(12)
  
  // Detalle
  const selectedSpeciesId = ref<string | null>(null)
  const fishbaseData = ref<FishBaseEnrichment | null>(null)
  const fishbaseLoading = ref(false)

  const filteredSpecies = computed(() => {
    let results = [...allSpecies.value]
    const f = filters.value

    if (f.busqueda) {
      const q = f.busqueda.toLowerCase()
      results = results.filter(e => 
        e.nombreComun.toLowerCase().includes(q) || 
        e.nombreCientifico.toLowerCase().includes(q)
      )
    }

    if (f.habitat) results = results.filter(e => e.habitat.tipo === f.habitat)
    if (f.uicn) results = results.filter(e => e.conservacion.uicn === f.uicn)
    if (f.estado) results = results.filter(e => e.estado === f.estado)

    return results
  })

  const paginatedSpecies = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return filteredSpecies.value.slice(start, start + itemsPerPage.value)
  })

  const totalFiltered = computed(() => filteredSpecies.value.length)
  const totalPages = computed(() => Math.ceil(totalFiltered.value / itemsPerPage.value))

  const selectedSpecies = computed(() => 
    allSpecies.value.find(e => e.id === selectedSpeciesId.value) || null
  )

  const imagenPrincipal = computed(() => {
    const localImg = selectedSpecies.value?.media?.find((m: Media) => m.esPrincipal)?.url
    return localImg || fishbaseData.value?.imageUrl || null
  })

  async function fetchSpecies() {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 400))
      allSpecies.value = [...MOCK_ESPECIES]
    } catch (e) {
      error.value = 'Error al cargar especies'
    } finally {
      loading.value = false
    }
  }

  async function fetchSpeciesDetail(id: string) {
    selectedSpeciesId.value = id
    fishbaseData.value = null
    
    // Si no tenemos las especies cargadas, intentamos cargar (en caso de entrada directa por URL)
    if (allSpecies.value.length === 0) {
      await fetchSpecies()
    }

    const species = selectedSpecies.value
    if (species) {
      // Enriquecimiento con FishBase
      fishbaseLoading.value = true
      try {
        fishbaseData.value = await searchFishBaseCached(species.nombreCientifico)
      } catch (_) {
        fishbaseData.value = null
      } finally {
        fishbaseLoading.value = false
      }
    }
  }

  function setFilters(newFilters: Partial<FiltrosEspecie>) {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
  }

  function clearFilters() {
    filters.value = {
      busqueda: '',
      habitat: undefined,
      uicn: undefined,
      estado: undefined,
      vedaTipo: undefined,
    }
    currentPage.value = 1
  }

  function selectSpecies(id: string | null) {
    selectedSpeciesId.value = id
    if (!id) fishbaseData.value = null
  }

  return {
    allSpecies,
    filteredSpecies,
    paginatedSpecies,
    filters,
    currentPage,
    itemsPerPage,
    totalPages,
    selectedSpecies,
    selectedSpeciesId,
    imagenPrincipal,
    fishbaseData,
    loading,
    fishbaseLoading,
    error,
    totalFiltered,
    fetchSpecies,
    fetchSpeciesDetail,
    setFilters,
    clearFilters,
    selectSpecies
  }
})
