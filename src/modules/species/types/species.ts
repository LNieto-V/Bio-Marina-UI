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
    PELAGIC = 'PELAGIC',
    BENTHIC = 'BENTHIC',
    DEMERSAL = 'DEMERSAL',
    REEF = 'REEF',
    ESTUARY = 'ESTUARY',
}

export enum ReproductionMode {
    OVIPAROUS = 'OVIPAROUS',
    VIVIPAROUS = 'VIVIPAROUS',
    OVOVIVIPAROUS = 'OVOVIVIPAROUS',
    ASEXUAL = 'ASEXUAL',
    SEXUAL = 'SEXUAL',
    HERMAFRODITA = 'HERMAFRODITA',
}

export enum EcologicalValue {
    VERY_HIGH = 'VERY_HIGH',
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW',
}

export enum FishingClosureType {
    TEMPORARY = 'TEMPORARY',
    PERMANENT = 'PERMANENT',
    REGLAMENTADA = 'REGLAMENTADA',
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
    diet?: string[];
    reproductionMode?: ReproductionMode;
    averageWeightKg?: number;
    maximumWeightKg?: number;
    averageLengthCm?: number;
    maximumLengthCm?: number;
    trophicLevel?: number;
    migration?: boolean;
    longevityYears?: number;
}

export interface Habitat {
    type?: string;
    minDepthM?: number;
    maxDepthM?: number;
    minTempC?: number;
    maxTempC?: number;
    salinityPpt?: number;
    substrate?: string[];
}

export interface Conservation {
    iucn: string;
    iucnYear?: number;
    closureType?: FishingClosureType;
    closureMonths?: string[];
    ecologicalValue?: EcologicalValue;
    protected?: boolean;
    legalNotes?: string;
}

export interface Fishery {
    commercialValue?: string;
    annualCatchTon?: number;
    artisanal?: boolean;
    industrial?: boolean;
    aquariumTrade?: boolean;
    fishingGears?: string[];
    mainPorts?: string[];
}

export interface Media {
    url: string;
    type: MediaType;
    authorship: string;
    isMain: boolean;
    license?: string;
    thumbnail?: string;
}

export interface Zone {
    name: string;
    coordinates?: number[][];
}

export interface Species {
    _id: string;
    commonName: string;
    scientificName: string;
    alternativeCommonNames?: string[];
    emoji?: string;
    status: SpeciesStatus;
    completeness: number;
    generalDescription?: string;
    notes?: string;
    funFacts?: string[];
    bibliographicReferences?: string[];
    publishedAt?: string;
    taxonomy: Taxonomy;
    biology: Biology;
    habitat: Habitat;
    conservation: Conservation;
    fishery: Fishery;
    media: Media[];
    zones: Zone[];
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateSpeciesInput {
    commonName: string;
    scientificName: string;
    alternativeCommonNames?: string[];
    emoji?: string;
    generalDescription?: string;
    notes?: string;
    funFacts?: string[];
    bibliographicReferences?: string[];
    status?: SpeciesStatus;
    completeness?: number;
    taxonomy: Partial<Taxonomy>;
    biology: Partial<Biology>;
    habitat: Partial<Habitat>;
    conservation: Partial<Conservation>;
    fishery: Partial<Fishery>;
}

export interface UpdateSpeciesInput extends Partial<Omit<Species, '_id' | 'createdAt' | 'updatedAt'>> {
    _id?: string;
}
