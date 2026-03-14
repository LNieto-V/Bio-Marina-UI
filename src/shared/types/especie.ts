// ============================================================
//  BioMarina — TypeScript Types
//  Mapeados 1:1 con el schema GraphQL
// ============================================================

export type EstadoUICN = 'EX' | 'EW' | 'CR' | 'EN' | 'VU' | 'NT' | 'LC' | 'DD' | 'NE'
export type TipoHabitat = 'arrecife' | 'pelagico' | 'fondo' | 'estuario' | 'manglar' | 'costero'
export type TipoVeda = 'ninguna' | 'temporal' | 'permanente' | 'prohibida'
export type ValorEcologico = 'bajo' | 'medio' | 'alto' | 'muy alto'
export type ValorComercial = 'ninguno' | 'bajo' | 'medio' | 'alto' | 'muy alto'
export type EstadoPublicacion = 'borrador' | 'revision' | 'publicado'
export type TipoMedia = 'foto' | 'video' | 'ilustracion'

export interface Taxonomia {
  reino: string
  filo: string
  clase?: string
  orden?: string
  familia?: string
  genero: string
  especie: string
}

export interface GeoPoint {
  type: 'Point'
  coordinates: [number, number] // [lng, lat]
}

export interface ZonaDistribucion {
  nombre: string
  departamento?: string
  tipo?: TipoHabitat
  punto?: GeoPoint
}

export interface EstadoConservacion {
  uicn: EstadoUICN
  uicnAnio?: number
  vedaTipo?: TipoVeda
  vedaMeses?: string[]
  valorEcologico?: ValorEcologico
  protegida: boolean
  notasLegales?: string
}

export interface Biologia {
  pesoPromedioKg?: number
  pesoMaximoKg?: number
  longPromedCm?: number
  longMaxCm?: number
  dieta?: string[]
  nivelTrofico?: number
  reproduccion?: string
  migracion?: boolean
  longevidadAnios?: number
}

export interface Habitat {
  tipo: TipoHabitat
  profundidadMinM?: number
  profundidadMaxM?: number
  tempMinC?: number
  tempMaxC?: number
  salinidadPpt?: number
  sustrato?: string[]
}

export interface Pesca {
  valorComercial?: ValorComercial
  capturaAnualTon?: number
  artesanal?: boolean
  industrial?: boolean
  acuariofilia?: boolean
  artesPesca?: string[]
  puertosPrincipales?: string[]
}

export interface Media {
  tipo: TipoMedia
  url: string
  miniatura?: string
  autoria?: string
  licencia?: string
  esPrincipal?: boolean
  creadoEn?: string
}

export interface Especie {
  id: string
  nombreComun: string
  nombreComunAlt?: string[]
  nombreCientifico: string
  emoji?: string

  taxonomia: Taxonomia
  biologia: Biologia
  habitat: Habitat
  conservacion: EstadoConservacion
  pesca?: Pesca
  media?: Media[]
  zonas?: ZonaDistribucion[]

  descripcionGeneral?: string
  notas?: string
  curiosidades?: string[]
  referenciasBiblio?: string[]

  estado: EstadoPublicacion
  completitud: number
  publicadoEn?: string
  createdAt?: string
  updatedAt?: string
}

export interface EspeciePaginada {
  total: number
  pagina: number
  limite: number
  especies: Especie[]
}

export interface HabitatConteo { habitat: TipoHabitat; total: number }
export interface UICNConteo    { uicn: EstadoUICN;    total: number }

export interface EstadisticasCatalogo {
  totalEspecies: number
  publicadas: number
  enPeligro: number
  vulnerables: number
  protegidas: number
  completitudMedia: number
  porHabitat: HabitatConteo[]
  porUICN: UICNConteo[]
}

export interface FiltrosEspecie {
  habitat?: TipoHabitat
  uicn?: EstadoUICN
  estado?: EstadoPublicacion
  vedaTipo?: TipoVeda
  valorComercial?: ValorComercial
  protegida?: boolean
  busqueda?: string
  zona?: string
}

// Helpers de colores para UI
export const UICN_COLORS: Record<EstadoUICN, string> = {
  EX: 'bg-gray-900 text-white',
  EW: 'bg-gray-700 text-white',
  CR: 'bg-red-600 text-white',
  EN: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  VU: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  NT: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  LC: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  DD: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  NE: 'bg-slate-100 text-slate-500',
}

export const UICN_LABELS: Record<EstadoUICN, string> = {
  EX: 'Extinto', EW: 'Extinto en Naturaleza', CR: 'En Peligro Crítico',
  EN: 'En Peligro', VU: 'Vulnerable', NT: 'Casi Amenazado',
  LC: 'Preocupación Menor', DD: 'Datos Insuficientes', NE: 'No Evaluado',
}

export const HABITAT_LABELS: Record<TipoHabitat, string> = {
  arrecife: 'Arrecife de Coral', pelagico: 'Pelágico (Mar Abierto)',
  fondo: 'Fondo Marino (Bentónico)', estuario: 'Estuario',
  manglar: 'Manglar', costero: 'Costero',
}

export const VEDA_LABELS: Record<TipoVeda, string> = {
  ninguna: 'Sin Veda', temporal: 'Veda Temporal',
  permanente: 'Veda Permanente', prohibida: 'Totalmente Prohibida',
}
