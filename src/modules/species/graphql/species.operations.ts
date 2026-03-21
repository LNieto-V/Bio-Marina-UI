import gql from 'graphql-tag';

// ─── Queries ─────────────────────────────────────────────────

export const GET_SPECIES = gql`
  query GetSpecies {
    getSpecies {
      _id
      commonName
      scientificName
      emoji
      status
      completeness
      publishedAt
    }
  }
`;

export const GET_SPECIES_BY_ID = gql`
  query GetSpeciesById($id: ID!) {
    getSpeciesById(id: $id) {
      _id
      commonName
      scientificName
      alternativeCommonNames
      emoji
      status
      completeness
      publishedAt
      generalDescription
      notes
      funFacts
      bibliographicReferences
      taxonomy {
        kingdom phylum class order family genus species
      }
      biology {
        diet reproductionMode averageWeightKg maximumWeightKg averageLengthCm maximumLengthCm
        trophicLevel migration longevityYears
      }
      habitat {
        type minDepthM maxDepthM minTempC maxTempC salinityPpt substrate
      }
      conservation {
        iucn iucnYear closureType closureMonths ecologicalValue protected legalNotes
      }
      fishery {
        commercialValue annualCatchTon artisanal industrial aquariumTrade fishingGears mainPorts
      }
      media {
        _id url type isMain authorship license thumbnail createdAt
      }
      zones {
        name coordinates
      }
    }
  }
`;

// ─── Mutations (Full CRUD) ───────────────────────────────────

export const CREATE_SPECIES = gql`
  mutation CreateSpecies($input: CreateSpeciesInput!) {
    createSpecies(createSpeciesInput: $input) {
      _id
      commonName
      scientificName
      status
    }
  }
`;

export const UPDATE_SPECIES = gql`
  mutation UpdateSpecies($id: ID!, $input: UpdateSpeciesInput!) {
    updateSpecies(id: $id, updateSpeciesInput: $input) {
      _id
      status
    }
  }
`;

export const REMOVE_SPECIES = gql`
  mutation RemoveSpecies($id: ID!) {
    removeSpecies(id: $id)
  }
`;

// ─── Granular Updates (Sub-Entities) ─────────────────────────

export const UPDATE_SPECIES_TAXONOMY = gql`
  mutation UpdateSpeciesTaxonomy($id: ID!, $input: UpdateTaxonomyInput!) {
    updateSpeciesTaxonomy(id: $id, input: $input) {
      _id
      taxonomy {
        kingdom phylum class order family genus species
      }
    }
  }
`;

export const UPDATE_SPECIES_BIOLOGY = gql`
  mutation UpdateSpeciesBiology($id: ID!, $input: UpdateBiologyInput!) {
    updateSpeciesBiology(id: $id, input: $input) {
      _id
      biology {
        diet reproductionMode averageWeightKg maximumWeightKg averageLengthCm maximumLengthCm
        trophicLevel migration longevityYears
      }
    }
  }
`;

export const UPDATE_SPECIES_HABITAT = gql`
  mutation UpdateSpeciesHabitat($id: ID!, $input: UpdateHabitatInput!) {
    updateSpeciesHabitat(id: $id, input: $input) {
      _id
      habitat {
        type minDepthM maxDepthM minTempC maxTempC salinityPpt substrate
      }
    }
  }
`;

export const UPDATE_SPECIES_CONSERVATION = gql`
  mutation UpdateSpeciesConservation($id: ID!, $input: UpdateConservationInput!) {
    updateSpeciesConservation(id: $id, input: $input) {
      _id
      conservation {
        iucn iucnYear closureType closureMonths ecologicalValue protected legalNotes
      }
    }
  }
`;

export const UPDATE_SPECIES_FISHERY = gql`
  mutation UpdateSpeciesFishery($id: ID!, $input: UpdateFisheryInput!) {
    updateSpeciesFishery(id: $id, input: $input) {
      _id
      fishery {
        commercialValue annualCatchTon artisanal industrial aquariumTrade fishingGears mainPorts
      }
    }
  }
`;

export const ADD_SPECIES_MEDIA = gql`
  mutation AddSpeciesMedia($id: ID!, $input: MediaInput!) {
    addSpeciesMedia(id: $id, input: $input) {
      _id
      media {
        _id url type isMain authorship license thumbnail createdAt
      }
    }
  }
`;

export const REMOVE_SPECIES_MEDIA = gql`
  mutation RemoveSpeciesMedia($speciesId: ID!, $mediaId: ID!) {
    removeSpeciesMedia(speciesId: $speciesId, mediaId: $mediaId) {
      _id
      media {
        _id url type isMain authorship license thumbnail createdAt
      }
    }
  }
`;

export const ADD_SPECIES_ZONE = gql`
  mutation AddSpeciesZone($id: ID!, $input: ZoneInput!) {
    addSpeciesZone(id: $id, input: $input) {
      _id
      zones {
        name coordinates
      }
    }
  }
`;

export const REMOVE_SPECIES_ZONE = gql`
  mutation RemoveSpeciesZone($id: ID!, $zoneName: String!) {
    removeSpeciesZone(id: $id, zoneName: $zoneName) {
      _id
      zones {
        name coordinates
      }
    }
  }
`;
