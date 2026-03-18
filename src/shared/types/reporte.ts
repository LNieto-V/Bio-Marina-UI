// ============================================================
//  BioMarina — Reporte Types
//  Mapeados 1:1 con el schema GraphQL
// ============================================================

export type FormatoReporte = 'pdf' | 'xlsx'

export interface ConfigReporte {
  formato: FormatoReporte
  rangoFechas?: { desde: string; hasta: string }
  filtros?: {
    habitat?: string
    uicn?: string
    protegida?: boolean
    vedaTipo?: string
  }
  datasets: string[]
}

export interface Reporte {
  id: string
  titulo: string
  formato: FormatoReporte
  tamano: string
  creadoEn: string
  urlDescarga: string
  estado?: 'generando' | 'listo' | 'error'
}

export interface ResultadoReporte {
  success: boolean
  reportUrl?: string
  downloadSize?: string
  generatedAt?: string
  error?: string
}

export const FORMATO_LABELS: Record<FormatoReporte, string> = {
  pdf:  'PDF',
  xlsx: 'Excel (XLSX)',
}

export const FORMATO_ICONS: Record<FormatoReporte, string> = {
  pdf:  'picture_as_pdf',
  xlsx: 'table_chart',
}

export const DATASETS_DISPONIBLES = [
  { id: 'especies',      label: 'Listado de Especies',         icon: 'set_meal' },
  { id: 'conservacion',  label: 'Estado de Conservación UICN', icon: 'shield' },
  { id: 'distribucion',  label: 'Distribución Geográfica',     icon: 'map' },
  { id: 'taxonomia',     label: 'Taxonomía Completa',          icon: 'account_tree' },
  { id: 'pesca',         label: 'Información Pesquera',        icon: 'phishing' },
  { id: 'media',         label: 'Galería de Medios',           icon: 'photo_library' },
]
