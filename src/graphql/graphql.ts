import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: unknown; output: unknown; }
};

export type Biology = {
  __typename?: 'Biology';
  averageLengthCm?: Maybe<Scalars['Float']['output']>;
  averageWeightKg?: Maybe<Scalars['Float']['output']>;
  diet?: Maybe<Array<Scalars['String']['output']>>;
  longevityYears?: Maybe<Scalars['Int']['output']>;
  maximumLengthCm?: Maybe<Scalars['Float']['output']>;
  maximumWeightKg?: Maybe<Scalars['Float']['output']>;
  migration?: Maybe<Scalars['Boolean']['output']>;
  reproductionMode?: Maybe<ReproductionMode>;
  trophicLevel?: Maybe<Scalars['Float']['output']>;
};

export type BiologyInput = {
  averageLengthCm?: InputMaybe<Scalars['Float']['input']>;
  averageWeightKg?: InputMaybe<Scalars['Float']['input']>;
  diet?: InputMaybe<Array<Scalars['String']['input']>>;
  longevityYears?: InputMaybe<Scalars['Int']['input']>;
  maximumLengthCm?: InputMaybe<Scalars['Float']['input']>;
  maximumWeightKg?: InputMaybe<Scalars['Float']['input']>;
  migration?: InputMaybe<Scalars['Boolean']['input']>;
  reproductionMode?: InputMaybe<ReproductionMode>;
  trophicLevel?: InputMaybe<Scalars['Float']['input']>;
};

export type Conservation = {
  __typename?: 'Conservation';
  closureMonths?: Maybe<Array<Scalars['String']['output']>>;
  closureType?: Maybe<FishingClosureType>;
  ecologicalValue?: Maybe<EcologicalValue>;
  iucn?: Maybe<IucnStatus>;
  iucnYear?: Maybe<Scalars['Int']['output']>;
  legalNotes?: Maybe<Scalars['String']['output']>;
  protected?: Maybe<Scalars['Boolean']['output']>;
};

export type ConservationInput = {
  closureMonths?: InputMaybe<Array<Scalars['String']['input']>>;
  closureType?: InputMaybe<FishingClosureType>;
  ecologicalValue?: InputMaybe<EcologicalValue>;
  iucn?: InputMaybe<IucnStatus>;
  iucnYear?: InputMaybe<Scalars['Int']['input']>;
  legalNotes?: InputMaybe<Scalars['String']['input']>;
  protected?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateSpeciesInput = {
  alternativeCommonNames?: InputMaybe<Array<Scalars['String']['input']>>;
  bibliographicReferences?: InputMaybe<Array<Scalars['String']['input']>>;
  biology?: InputMaybe<BiologyInput>;
  commonName: Scalars['String']['input'];
  completeness?: Scalars['Float']['input'];
  conservation?: InputMaybe<ConservationInput>;
  createdBy?: InputMaybe<Scalars['ID']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  fishery?: InputMaybe<FisheryInput>;
  funFacts?: InputMaybe<Array<Scalars['String']['input']>>;
  generalDescription?: InputMaybe<Scalars['String']['input']>;
  habitat?: InputMaybe<HabitatInput>;
  media?: InputMaybe<Array<MediaInput>>;
  notes?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  scientificName: Scalars['String']['input'];
  status?: SpeciesStatus;
  taxonomy: TaxonomyInput;
  zones?: InputMaybe<Array<ZoneInput>>;
};

export enum EcologicalValue {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  VeryHigh = 'VERY_HIGH'
}

export type Fishery = {
  __typename?: 'Fishery';
  annualCatchTon?: Maybe<Scalars['Float']['output']>;
  aquariumTrade?: Maybe<Scalars['Boolean']['output']>;
  artisanal?: Maybe<Scalars['Boolean']['output']>;
  commercialValue?: Maybe<Scalars['String']['output']>;
  fishingGears?: Maybe<Array<Scalars['String']['output']>>;
  industrial?: Maybe<Scalars['Boolean']['output']>;
  mainPorts?: Maybe<Array<Scalars['String']['output']>>;
};

export type FisheryInput = {
  annualCatchTon?: InputMaybe<Scalars['Float']['input']>;
  aquariumTrade?: InputMaybe<Scalars['Boolean']['input']>;
  artisanal?: InputMaybe<Scalars['Boolean']['input']>;
  commercialValue?: InputMaybe<Scalars['String']['input']>;
  fishingGears?: InputMaybe<Array<Scalars['String']['input']>>;
  industrial?: InputMaybe<Scalars['Boolean']['input']>;
  mainPorts?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum FishingClosureType {
  None = 'NONE',
  Permanent = 'PERMANENT',
  Prohibited = 'PROHIBITED',
  Temporary = 'TEMPORARY'
}

export type Habitat = {
  __typename?: 'Habitat';
  maxDepthM?: Maybe<Scalars['Float']['output']>;
  maxTempC?: Maybe<Scalars['Float']['output']>;
  minDepthM?: Maybe<Scalars['Float']['output']>;
  minTempC?: Maybe<Scalars['Float']['output']>;
  salinityPpt?: Maybe<Scalars['Float']['output']>;
  substrate?: Maybe<Array<Scalars['String']['output']>>;
  type?: Maybe<HabitatType>;
};

export type HabitatInput = {
  maxDepthM?: InputMaybe<Scalars['Float']['input']>;
  maxTempC?: InputMaybe<Scalars['Float']['input']>;
  minDepthM?: InputMaybe<Scalars['Float']['input']>;
  minTempC?: InputMaybe<Scalars['Float']['input']>;
  salinityPpt?: InputMaybe<Scalars['Float']['input']>;
  substrate?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<HabitatType>;
};

export enum HabitatType {
  Benthic = 'BENTHIC',
  Coastal = 'COASTAL',
  Estuary = 'ESTUARY',
  Mangrove = 'MANGROVE',
  Pelagic = 'PELAGIC',
  Reef = 'REEF'
}

export enum IucnStatus {
  Cr = 'CR',
  Dd = 'DD',
  En = 'EN',
  Ew = 'EW',
  Ex = 'EX',
  Lc = 'LC',
  Ne = 'NE',
  Nt = 'NT',
  Vu = 'VU'
}

export type Media = {
  __typename?: 'Media';
  _id: Scalars['ID']['output'];
  authorship: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  isMain: Scalars['Boolean']['output'];
  license: Scalars['String']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
  type: MediaType;
  url: Scalars['String']['output'];
};

export type MediaInput = {
  authorship: Scalars['String']['input'];
  isMain: Scalars['Boolean']['input'];
  license?: Scalars['String']['input'];
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  type: MediaType;
  url: Scalars['String']['input'];
};

export enum MediaType {
  Illustration = 'ILLUSTRATION',
  Photo = 'PHOTO',
  Video = 'VIDEO'
}

export type Mutation = {
  __typename?: 'Mutation';
  addSpeciesMedia: Species;
  addSpeciesZone: Species;
  createSpecies: Species;
  removeSpecies: Scalars['Boolean']['output'];
  removeSpeciesMedia: Species;
  removeSpeciesZone: Species;
  updateSpecies: Species;
  updateSpeciesBiology: Species;
  updateSpeciesConservation: Species;
  updateSpeciesFishery: Species;
  updateSpeciesHabitat: Species;
  updateSpeciesTaxonomy: Species;
};


export type MutationAddSpeciesMediaArgs = {
  id: Scalars['ID']['input'];
  input: MediaInput;
};


export type MutationAddSpeciesZoneArgs = {
  id: Scalars['ID']['input'];
  input: ZoneInput;
};


export type MutationCreateSpeciesArgs = {
  createSpeciesInput: CreateSpeciesInput;
};


export type MutationRemoveSpeciesArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveSpeciesMediaArgs = {
  mediaId: Scalars['ID']['input'];
  speciesId: Scalars['ID']['input'];
};


export type MutationRemoveSpeciesZoneArgs = {
  speciesId: Scalars['ID']['input'];
  zoneId: Scalars['ID']['input'];
};


export type MutationUpdateSpeciesArgs = {
  updateSpeciesInput: UpdateSpeciesInput;
};


export type MutationUpdateSpeciesBiologyArgs = {
  id: Scalars['ID']['input'];
  input: UpdateBiologyInput;
};


export type MutationUpdateSpeciesConservationArgs = {
  id: Scalars['ID']['input'];
  input: UpdateConservationInput;
};


export type MutationUpdateSpeciesFisheryArgs = {
  id: Scalars['ID']['input'];
  input: UpdateFisheryInput;
};


export type MutationUpdateSpeciesHabitatArgs = {
  id: Scalars['ID']['input'];
  input: UpdateHabitatInput;
};


export type MutationUpdateSpeciesTaxonomyArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTaxonomyInput;
};

export type Query = {
  __typename?: 'Query';
  getSpecies: Array<Species>;
  getSpeciesById: Species;
};


export type QueryGetSpeciesByIdArgs = {
  id: Scalars['ID']['input'];
};

export enum ReproductionMode {
  Oviparous = 'OVIPAROUS',
  Ovoviviparous = 'OVOVIVIPAROUS',
  Protogenic = 'PROTOGENIC',
  Viviparous = 'VIVIPAROUS'
}

export type Species = {
  __typename?: 'Species';
  _id: Scalars['ID']['output'];
  alternativeCommonNames?: Maybe<Array<Scalars['String']['output']>>;
  bibliographicReferences?: Maybe<Array<Scalars['String']['output']>>;
  biology: Biology;
  commonName: Scalars['String']['output'];
  completeness: Scalars['Float']['output'];
  conservation: Conservation;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['ID']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  fishery: Fishery;
  funFacts?: Maybe<Array<Scalars['String']['output']>>;
  generalDescription?: Maybe<Scalars['String']['output']>;
  habitat: Habitat;
  media: Array<Media>;
  notes?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  scientificName: Scalars['String']['output'];
  status: SpeciesStatus;
  taxonomy: Taxonomy;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
  zones: Array<Zone>;
};

export enum SpeciesStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Revision = 'REVISION'
}

export type Taxonomy = {
  __typename?: 'Taxonomy';
  class: Scalars['String']['output'];
  family: Scalars['String']['output'];
  genus: Scalars['String']['output'];
  kingdom: Scalars['String']['output'];
  order?: Maybe<Scalars['String']['output']>;
  phylum: Scalars['String']['output'];
  species: Scalars['String']['output'];
};

export type TaxonomyInput = {
  class: Scalars['String']['input'];
  family: Scalars['String']['input'];
  genus: Scalars['String']['input'];
  kingdom?: Scalars['String']['input'];
  order: Scalars['String']['input'];
  phylum?: Scalars['String']['input'];
  species: Scalars['String']['input'];
};

export type UpdateBiologyInput = {
  averageLengthCm?: InputMaybe<Scalars['Float']['input']>;
  averageWeightKg?: InputMaybe<Scalars['Float']['input']>;
  diet?: InputMaybe<Array<Scalars['String']['input']>>;
  longevityYears?: InputMaybe<Scalars['Int']['input']>;
  maximumLengthCm?: InputMaybe<Scalars['Float']['input']>;
  maximumWeightKg?: InputMaybe<Scalars['Float']['input']>;
  migration?: InputMaybe<Scalars['Boolean']['input']>;
  reproductionMode?: InputMaybe<ReproductionMode>;
  trophicLevel?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateConservationInput = {
  closureMonths?: InputMaybe<Array<Scalars['String']['input']>>;
  closureType?: InputMaybe<FishingClosureType>;
  ecologicalValue?: InputMaybe<EcologicalValue>;
  iucn?: InputMaybe<IucnStatus>;
  iucnYear?: InputMaybe<Scalars['Int']['input']>;
  legalNotes?: InputMaybe<Scalars['String']['input']>;
  protected?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateFisheryInput = {
  annualCatchTon?: InputMaybe<Scalars['Float']['input']>;
  aquariumTrade?: InputMaybe<Scalars['Boolean']['input']>;
  artisanal?: InputMaybe<Scalars['Boolean']['input']>;
  commercialValue?: InputMaybe<Scalars['String']['input']>;
  fishingGears?: InputMaybe<Array<Scalars['String']['input']>>;
  industrial?: InputMaybe<Scalars['Boolean']['input']>;
  mainPorts?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateHabitatInput = {
  maxDepthM?: InputMaybe<Scalars['Float']['input']>;
  maxTempC?: InputMaybe<Scalars['Float']['input']>;
  minDepthM?: InputMaybe<Scalars['Float']['input']>;
  minTempC?: InputMaybe<Scalars['Float']['input']>;
  salinityPpt?: InputMaybe<Scalars['Float']['input']>;
  substrate?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<HabitatType>;
};

export type UpdateSpeciesInput = {
  id: Scalars['ID']['input'];
  alternativeCommonNames?: InputMaybe<Array<Scalars['String']['input']>>;
  bibliographicReferences?: InputMaybe<Array<Scalars['String']['input']>>;
  biology?: InputMaybe<BiologyInput>;
  commonName?: InputMaybe<Scalars['String']['input']>;
  completeness?: InputMaybe<Scalars['Float']['input']>;
  conservation?: InputMaybe<ConservationInput>;
  createdBy?: InputMaybe<Scalars['ID']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  fishery?: InputMaybe<FisheryInput>;
  funFacts?: InputMaybe<Array<Scalars['String']['input']>>;
  generalDescription?: InputMaybe<Scalars['String']['input']>;
  habitat?: InputMaybe<HabitatInput>;
  media?: InputMaybe<Array<MediaInput>>;
  notes?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  scientificName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SpeciesStatus>;
  taxonomy?: InputMaybe<TaxonomyInput>;
  zones?: InputMaybe<Array<ZoneInput>>;
};

export type UpdateTaxonomyInput = {
  class?: InputMaybe<Scalars['String']['input']>;
  family?: InputMaybe<Scalars['String']['input']>;
  genus?: InputMaybe<Scalars['String']['input']>;
  kingdom?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  phylum?: InputMaybe<Scalars['String']['input']>;
  species?: InputMaybe<Scalars['String']['input']>;
};

export type Zone = {
  __typename?: 'Zone';
  _id: Scalars['ID']['output'];
  /** [lng, lat] */
  coordinates: Array<Scalars['Float']['output']>;
  department: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: HabitatType;
};

export type ZoneInput = {
  /** [lng, lat] */
  coordinates: Array<Scalars['Float']['input']>;
  department: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: HabitatType;
};

export type GetSpeciesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpeciesQuery = { __typename?: 'Query', getSpecies: Array<{ __typename?: 'Species', _id: string }> };


export const GetSpeciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSpecies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSpecies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<GetSpeciesQuery, GetSpeciesQueryVariables>;