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
      emoji
      status
      completeness
      publishedAt
      alternativeCommonNames
      funFacts
      generalDescription
      taxonomy {
        kingdom phylum class order family genus species
      }
      biology {
        commonNames description feedingHabits reproduction reproductionMode weightAverageKg lengthAverageCm
      }
      habitat {
        distribution depthRange temperatureRange environment habitatType
      }
      conservation {
        iucnStatus cites localProtection
      }
      fishery {
        commercialValue catchMethods seasonality closureType
      }
      media {
        url title type
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
    updateSpecies(updateSpeciesInput: $input) {
      _id
      commonName
      scientificName
      status
      completeness
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
        commonNames description feedingHabits reproduction reproductionMode weightAverageKg lengthAverageCm
      }
    }
  }
`;

export const UPDATE_SPECIES_HABITAT = gql`
  mutation UpdateSpeciesHabitat($id: ID!, $input: UpdateHabitatInput!) {
    updateSpeciesHabitat(id: $id, input: $input) {
      _id
      habitat {
        distribution depthRange temperatureRange environment habitatType
      }
    }
  }
`;

export const ADD_SPECIES_MEDIA = gql`
  mutation AddSpeciesMedia($id: ID!, $input: MediaInput!) {
    addSpeciesMedia(id: $id, input: $input) {
      _id
      media {
        url title type
      }
    }
  }
`;

export const REMOVE_SPECIES_MEDIA = gql`
  mutation RemoveSpeciesMedia($id: ID!, $mediaUrl: String!) {
    removeSpeciesMedia(id: $id, mediaUrl: $mediaUrl) {
      _id
      media {
        url title type
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
