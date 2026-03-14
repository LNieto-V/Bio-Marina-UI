// ============================================================
//  BioMarina — FishBase Service
//  Enriquece datos de especie con información pública de FishBase
//  Base URL: https://fishbase.ropensci.org
// ============================================================

const BASE_URL = import.meta.env.VITE_FISHBASE_URL || 'https://fishbase.ropensci.org'

export interface FishBaseSpecies {
  SpecCode: number
  Genus: string
  Species: string
  SpeciesRefNo: number
  Author: string
  FBname: string
  PicPreferredName?: string
  PicPreferredNameM?: string
  PicPreferredNameF?: string
  Length?: number
  LengthFemale?: number
  MaxLength?: number
  Weight?: number
  LongevityWild?: number
  Vulnerability?: number
  trophic_level?: number
  DepthRangeShallow?: number
  DepthRangeDeep?: number
  TempMin?: number
  TempMax?: number
  PD50?: number
}

export interface FishBaseEnrichment {
  speccode?: number
  imageUrl?: string
  maxLength?: number
  trophicLevel?: number
  depthMin?: number
  depthMax?: number
  tempMin?: number
  tempMax?: number
  vulnerability?: number
  commonName?: string
}

/**
 * Busca una especie en FishBase por nombre científico (Genus + species)
 * Retorna datos de enriquecimiento o null si no se encuentra
 */
export async function searchFishBase(nombreCientifico: string): Promise<FishBaseEnrichment | null> {
  try {
    const [genus, species] = nombreCientifico.trim().split(' ')
    if (!genus || !species) return null

    const url = `${BASE_URL}/species?Genus=${encodeURIComponent(genus)}&Species=${encodeURIComponent(species)}&limit=1`

    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' },
    })

    if (!response.ok) return null

    const data = await response.json()
    const items: FishBaseSpecies[] = data.data || []
    if (items.length === 0) return null

    const item = items[0]
    if (!item) return null

    // Componer URL de imagen si existe el campo
    let imageUrl: string | undefined
    if (item.PicPreferredName) {
      imageUrl = `https://www.fishbase.se/images/species/${item.PicPreferredName}`
    }

    return {
      speccode: item.SpecCode,
      imageUrl,
      maxLength: item.MaxLength ?? item.Length,
      trophicLevel: item.trophic_level,
      depthMin: item.DepthRangeShallow,
      depthMax: item.DepthRangeDeep,
      tempMin: item.TempMin,
      tempMax: item.TempMax,
      vulnerability: item.Vulnerability,
      commonName: item.FBname,
    }
  } catch (e) {
    console.warn('[FishBase] Error al consultar:', e)
    return null
  }
}

/**
 * Retorna la URL del perfil de FishBase para usar en enlaces externos
 */
export function getFishBaseUrl(speccode: number): string {
  return `https://www.fishbase.se/summary/${speccode}`
}

/**
 * Cache simple en memoria para no repetir llamadas a FishBase
 */
const _cache = new Map<string, FishBaseEnrichment | null>()

export async function searchFishBaseCached(nombreCientifico: string): Promise<FishBaseEnrichment | null> {
  if (_cache.has(nombreCientifico)) return _cache.get(nombreCientifico)!
  const result = await searchFishBase(nombreCientifico)
  _cache.set(nombreCientifico, result)
  return result
}
