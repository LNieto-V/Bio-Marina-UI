import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSpeciesStore } from './speciesStore'

export interface MapState {
  center: [number, number]
  zoom: number
  selectedSpeciesId: string | null
  activeLayers: string[]
  isSidebarOpen: boolean
}

export const useMapStore = defineStore('map', () => {
  const speciesStore = useSpeciesStore()

  // State
  const center = ref<[number, number]>([11.24, -74.21]) // Santa Marta / Caribbean
  const zoom = ref(8)
  const selectedSpeciesId = ref<string | null>(null)
  const activeLayers = ref(['species-markers', 'conservation-zones'])
  const isSidebarOpen = ref(true)

  // Getters
  const speciesOnMap = computed(() => {
    // Synchronized with speciesStore filtered results
    return speciesStore.filteredSpecies.map(s => ({
      ...s,
      // Ensure we have coordinates for the map
      position: s.zonas?.[0]?.punto?.coordinates 
        ? [s.zonas[0].punto.coordinates[1], s.zonas[0].punto.coordinates[0]]
        : null
    })).filter(s => s.position !== null)
  })

  const selectedSpeciesData = computed(() => {
    if (!selectedSpeciesId.value) return null
    return speciesStore.allSpecies.find(s => s.id === selectedSpeciesId.value) || null
  })

  // Actions
  const setCenter = (newCenter: [number, number]) => {
    center.value = newCenter
  }

  const setZoom = (newZoom: number) => {
    zoom.value = newZoom
  }

  const selectSpecies = (id: string | null) => {
    selectedSpeciesId.value = id
    if (id) {
      const species = speciesStore.allSpecies.find(s => s.id === id)
      if (species?.zonas?.[0]?.punto?.coordinates) {
        setCenter([species.zonas[0].punto.coordinates[1], species.zonas[0].punto.coordinates[0]])
        setZoom(12)
      }
    }
  }

  const toggleLayer = (layerId: string) => {
    const index = activeLayers.value.indexOf(layerId)
    if (index > -1) {
      activeLayers.value.splice(index, 1)
    } else {
      activeLayers.value.push(layerId)
    }
  }

  return {
    center,
    zoom,
    selectedSpeciesId,
    activeLayers,
    isSidebarOpen,
    speciesOnMap,
    selectedSpeciesData,
    setCenter,
    setZoom,
    selectSpecies,
    toggleLayer
  }
})
