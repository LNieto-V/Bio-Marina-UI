export enum SpeciesStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  REVISION = 'REVISION',
}

export enum IUCNStatus {
  CR = 'CR',
  DD = 'DD',
  EN = 'EN',
  EW = 'EW',
  EX = 'EX',
  LC = 'LC',
  NE = 'NE',
  NT = 'NT',
  VU = 'VU',
}

export enum HabitatType {
  AGUA_DULCE = 'AGUA_DULCE',
  ESTUARIO = 'ESTUARIO',
  MARINO = 'MARINO',
  SALOBRE = 'SALOBRE',
}

export enum ReproductionMode {
  ASEXUAL = 'ASEXUAL',
  SEXUAL = 'SEXUAL',
  HERMAFRODITA = 'HERMAFRODITA',
}

export enum EcologicalValue {
  ALTO = 'ALTO',
  MEDIO = 'MEDIO',
  BAJO = 'BAJO',
}

export enum FishingClosureType {
  MORATORIA = 'MORATORIA',
  REGLAMENTADA = 'REGLAMENTADA',
  TEMPORAL = 'TEMPORAL',
  TOTAL = 'TOTAL',
}

export enum MediaType {
  AUDIO = 'AUDIO',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export interface Taxonomy {
  kingdom: string;
  phylum: string;
  class?: string;
  order?: string;
  family?: string;
  genus: string;
  species: string;
}

export interface Biology {
  commonNames?: string[];
  description?: string;
  feedingHabits?: string;
  reproduction?: string;
  reproductionMode?: ReproductionMode;
  weightAverageKg?: number;
  lengthAverageCm?: number;
}

export interface Habitat {
  distribution?: string;
  depthRange?: [number, number];
  temperatureRange?: [number, number];
  environment?: string;
  habitatType?: HabitatType;
}

export interface Conservation {
  iucnStatus: IUCNStatus;
  cites?: string;
  localProtection?: string;
}

export interface Fishery {
  commercialValue?: EcologicalValue;
  catchMethods?: string[];
  seasonality?: string;
  closureType?: FishingClosureType;
}

export interface Media {
  url: string;
  title?: string;
  type: MediaType;
}

export interface Zone {
  name: string;
  coordinates?: number[][];
}

export interface Species {
  _id: string;
  commonName: string;
  scientificName: string;
  emoji?: string;
  status: SpeciesStatus;
  completeness: number;
  publishedAt?: string;
  taxonomy: Taxonomy;
  biology: Biology;
  habitat: Habitat;
  conservation: Conservation;
  fishery: Fishery;
  media: Media[];
  zones: Zone[];
  alternativeCommonNames?: string[];
  funFacts?: string[];
  generalDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSpeciesInput {
  commonName: string;
  scientificName: string;
  emoji?: string;
  status?: SpeciesStatus;
  taxonomy: Partial<Taxonomy>;
  biology: Partial<Biology>;
  habitat: Partial<Habitat>;
  conservation: Partial<Conservation>;
  fishery: Partial<Fishery>;
}

export type UpdateSpeciesInput = Partial<Omit<Species, '_id' | 'createdAt' | 'updatedAt'>>;
