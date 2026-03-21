import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Reporte, ConfigReporte } from '@/shared/types/reporte'

// ─── Mock recent reports ────────────────────────────────────
const MOCK_REPORTES: Reporte[] = [
  {
    id: 'r1',
    titulo: 'Catálogo Completo de Especies 2026',
    formato: 'pdf',
    tamano: '3.2 MB',
    creadoEn: '2026-03-15T10:00:00Z',
    urlDescarga: '#',
    estado: 'listo',
  },
  {
    id: 'r2',
    titulo: 'Reporte de Conservación Q1 2026',
    formato: 'xlsx',
    tamano: '1.1 MB',
    creadoEn: '2026-03-10T14:30:00Z',
    urlDescarga: '#',
    estado: 'listo',
  },
  {
    id: 'r3',
    titulo: 'Distribución Geográfica — Mar Caribe',
    formato: 'pdf',
    tamano: '5.8 MB',
    creadoEn: '2026-02-28T09:15:00Z',
    urlDescarga: '#',
    estado: 'listo',
  },
]

export const useReportStore = defineStore('reports', () => {
  const recentReports = ref<Reporte[]>([...MOCK_REPORTES])
  const generating = ref(false)
  const generatingProgress = ref(0)
  const error = ref<string | null>(null)
  const lastGenerated = ref<Reporte | null>(null)

  // Getters
  const hasPdfReports  = computed(() => recentReports.value.some(r => r.formato === 'pdf'))
  const hasXlsxReports = computed(() => recentReports.value.some(r => r.formato === 'xlsx'))

  // Actions
  async function generateReport(config: ConfigReporte): Promise<Reporte | null> {
    generating.value = true
    generatingProgress.value = 0
    error.value = null

    try {
      // Simulate generation with progress
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(r => setTimeout(r, 200))
        generatingProgress.value = i
      }

      const newReport: Reporte = {
        id: `r${Date.now()}`,
        titulo: `Reporte ${config.formato.toUpperCase()} — ${new Date().toLocaleDateString('es-CO')}`,
        formato: config.formato,
        tamano: config.formato === 'pdf' ? '2.4 MB' : '0.8 MB',
        creadoEn: new Date().toISOString(),
        urlDescarga: '#',
        estado: 'listo',
      }

      recentReports.value.unshift(newReport)
      lastGenerated.value = newReport
      return newReport
    } catch {
      error.value = 'Error al generar el reporte'
      return null
    } finally {
      generating.value = false
      generatingProgress.value = 0
    }
  }

  async function fetchRecentReports() {
    try {
      await new Promise(r => setTimeout(r, 300))
      recentReports.value = [...MOCK_REPORTES]
    } catch {
      error.value = 'Error al cargar reportes'
    }
  }

  function clearLastGenerated() {
    lastGenerated.value = null
  }

  return {
    recentReports,
    generating,
    generatingProgress,
    error,
    lastGenerated,
    hasPdfReports,
    hasXlsxReports,
    generateReport,
    fetchRecentReports,
    clearLastGenerated,
  }
})
