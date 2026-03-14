// ============================================================
//  BioMarina — Composables / Hooks
//  Capa de acceso a datos. Mock-first, lista para Apollo.
// ============================================================

import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import type { Especie, EspeciePaginada, FiltrosEspecie, EstadisticasCatalogo } from '@/shared/types/especie'
import { MOCK_ESPECIES, MOCK_ESTADISTICAS } from '../services/mockData'
import { searchFishBaseCached, type FishBaseEnrichment } from '../services/fishbaseService'

// ─── Simulación de delay de red ─────────────────────────────
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

// ─── HOOK: useEspecies ───────────────────────────────────────
export function useEspecies(filtros?: Ref<FiltrosEspecie>, pagina?: Ref<number>, limite = 12) {
  const especies = ref<Especie[]>([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = pagina ?? ref(1)

  const fetchEspecies = async () => {
    loading.value = true
    error.value = null
    await delay(400) // simula latencia de red

    try {
      let results = [...MOCK_ESPECIES]

      // Aplicar filtros
      const f = filtros?.value ?? {}
      if (f.busqueda) {
        const q = f.busqueda.toLowerCase()
        results = results.filter(
          (e) =>
            e.nombreComun.toLowerCase().includes(q) ||
            e.nombreCientifico.toLowerCase().includes(q) ||
            e.taxonomia.familia?.toLowerCase().includes(q) ||
            e.taxonomia.clase?.toLowerCase().includes(q),
        )
      }
      if (f.habitat) results = results.filter((e) => e.habitat.tipo === f.habitat)
      if (f.uicn) results = results.filter((e) => e.conservacion.uicn === f.uicn)
      if (f.estado) results = results.filter((e) => e.estado === f.estado)
      if (f.vedaTipo) results = results.filter((e) => e.conservacion.vedaTipo === f.vedaTipo)
      if (f.valorComercial) results = results.filter((e) => e.pesca?.valorComercial === f.valorComercial)
      if (f.protegida !== undefined) results = results.filter((e) => e.conservacion.protegida === f.protegida)
      if (f.zona) results = results.filter((e) => e.zonas?.some((z) => z.nombre.toLowerCase().includes(f.zona!.toLowerCase())))

      total.value = results.length
      const start = (currentPage.value - 1) * limite
      especies.value = results.slice(start, start + limite)
    } catch (e) {
      error.value = 'Error cargando especies'
    } finally {
      loading.value = false
    }
  }

  fetchEspecies()
  if (filtros) watch(filtros, fetchEspecies, { deep: true })
  if (pagina) watch(pagina, fetchEspecies)

  const totalPages = computed(() => Math.ceil(total.value / limite))

  return { especies, total, totalPages, loading, error, refetch: fetchEspecies }
}

// ─── HOOK: useEspecie (detalle individual) ──────────────────
export function useEspecie(id: Ref<string> | string) {
  const especie = ref<Especie | null>(null)
  const fishbaseData = ref<FishBaseEnrichment | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const fishbaseLoading = ref(false)

  const fetchEspecie = async () => {
    const idVal = typeof id === 'string' ? id : id.value
    loading.value = true
    error.value = null
    await delay(300)

    try {
      const found = MOCK_ESPECIES.find((e) => e.id === idVal) ?? null
      especie.value = found
    } catch (e) {
      error.value = 'Error cargando especie'
    } finally {
      loading.value = false
    }

    // Enriquecimiento con FishBase (en paralelo, no bloquea la UI)
    if (especie.value) {
      fishbaseLoading.value = true
      try {
        fishbaseData.value = await searchFishBaseCached(especie.value.nombreCientifico)
      } catch (_) {
        fishbaseData.value = null
      } finally {
        fishbaseLoading.value = false
      }
    }
  }

  fetchEspecie()
  if (typeof id !== 'string') watch(id, fetchEspecie)

  /** Imagen principal de la especie o fallback a FishBase */
  const imagenPrincipal = computed(() => {
    const localImg = especie.value?.media?.find((m) => m.esPrincipal)?.url
    return localImg || fishbaseData.value?.imageUrl || null
  })

  return { especie, fishbaseData, imagenPrincipal, loading, fishbaseLoading, error }
}

// ─── HOOK: useDashboard ──────────────────────────────────────
export function useDashboard() {
  const stats = ref<EstadisticasCatalogo | null>(null)
  const loading = ref(false)

  const fetchStats = async () => {
    loading.value = true
    await delay(300)
    stats.value = MOCK_ESTADISTICAS
    loading.value = false
  }

  fetchStats()
  return { stats, loading, refetch: fetchStats }
}

// ─── HOOK: useEspeciesCercanas (mapa) ────────────────────────
export function useEspeciesCercanas(lat: number, lng: number, radioKm = 100) {
  const especies = ref<Especie[]>([])
  const loading = ref(false)

  const fetchCercanas = async () => {
    loading.value = true
    await delay(300)

    // Filtro por distancia euclidiana aproximada (mock)
    const R2KM = 111
    especies.value = MOCK_ESPECIES.filter((e) =>
      e.zonas?.some((z) => {
        if (!z.punto) return false
        const [lngZ, latZ] = z.punto.coordinates
        const dx = (lngZ - lng) * R2KM * Math.cos((latZ * Math.PI) / 180)
        const dy = (latZ - lat) * R2KM
        return Math.sqrt(dx * dx + dy * dy) <= radioKm
      }),
    )
    loading.value = false
  }

  fetchCercanas()
  return { especies, loading }
}
