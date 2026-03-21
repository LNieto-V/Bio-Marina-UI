import { useQuery, useMutation } from '@vue/apollo-composable';
import {
  GET_SPECIES,
  GET_SPECIES_BY_ID,
  CREATE_SPECIES,
  UPDATE_SPECIES,
  REMOVE_SPECIES,
  UPDATE_SPECIES_TAXONOMY,
  UPDATE_SPECIES_BIOLOGY,
  UPDATE_SPECIES_HABITAT,
  UPDATE_SPECIES_CONSERVATION,
  UPDATE_SPECIES_FISHERY,
  ADD_SPECIES_MEDIA,
  REMOVE_SPECIES_MEDIA,
  ADD_SPECIES_ZONE,
  REMOVE_SPECIES_ZONE
} from '../graphql/species.operations';
import type {
  CreateSpeciesInput,
  UpdateSpeciesInput,
  Taxonomy,
  Biology,
  Habitat,
  Conservation,
  Fishery,
  Media,
  Zone
} from '../types/species';
import { computed } from 'vue';

export function useSpecies() {
  // Query: Get All Species
  const {
    result: speciesResult,
    loading: loadingSpecies,
    error: errorSpecies,
    refetch: refetchSpecies
  } = useQuery(GET_SPECIES);

  const speciesList = computed(() => speciesResult.value?.getSpecies ?? []);

  // Query: Get Species by ID (Lazy or reactive)
  const getSpeciesDetail = (id: string) => {
    return useQuery(GET_SPECIES_BY_ID, { id });
  };

  // Mutation: Create
  const { mutate: createSpeciesMutation } = useMutation(CREATE_SPECIES);

  const createSpecies = async (input: CreateSpeciesInput) => {
    try {
      const result = await createSpeciesMutation({ input });
      await refetchSpecies();
      return result?.data?.createSpecies;
    } catch (e) {
      console.error('Error creating species:', e);
      throw e;
    }
  };

  // Mutation: Update Base
  const { mutate: updateSpeciesMutation } = useMutation(UPDATE_SPECIES);

  const updateSpecies = async (id: string, input: UpdateSpeciesInput) => {
    try {
      const result = await updateSpeciesMutation({ id, input });
      return result?.data?.updateSpecies;
    } catch (e) {
      console.error('Error updating species:', e);
      throw e;
    }
  };

  // Mutation: Remove
  const { mutate: removeSpeciesMutation } = useMutation(REMOVE_SPECIES);

  const removeSpecies = async (id: string) => {
    try {
      const result = await removeSpeciesMutation({ id });
      await refetchSpecies();
      return result?.data?.removeSpecies;
    } catch (e) {
      console.error('Error removing species:', e);
      throw e;
    }
  };

  // ─── Granular Updates ───────────────────────────────────────

  const { mutate: updateTaxonomyMutation } = useMutation(UPDATE_SPECIES_TAXONOMY);
  const updateTaxonomy = (id: string, input: Partial<Taxonomy>) =>
    updateTaxonomyMutation({ id, input });

  const { mutate: updateBiologyMutation } = useMutation(UPDATE_SPECIES_BIOLOGY);
  const updateBiology = (id: string, input: Partial<Biology>) =>
    updateBiologyMutation({ id, input });

  const { mutate: updateHabitatMutation } = useMutation(UPDATE_SPECIES_HABITAT);
  const updateHabitat = (id: string, input: Partial<Habitat>) =>
    updateHabitatMutation({ id, input });

  const { mutate: updateConservationMutation } = useMutation(UPDATE_SPECIES_CONSERVATION);
  const updateConservation = (id: string, input: Partial<Conservation>) =>
    updateConservationMutation({ id, input });

  const { mutate: updateFisheryMutation } = useMutation(UPDATE_SPECIES_FISHERY);
  const updateFishery = (id: string, input: Partial<Fishery>) =>
    updateFisheryMutation({ id, input });

  const { mutate: addMediaMutation } = useMutation(ADD_SPECIES_MEDIA);
  const addMedia = (id: string, input: Media) =>
    addMediaMutation({ id, input });

  const { mutate: removeMediaMutation } = useMutation(REMOVE_SPECIES_MEDIA);
  const removeMedia = (speciesId: string, mediaId: string) =>
    removeMediaMutation({ speciesId, mediaId });

  const { mutate: addZoneMutation } = useMutation(ADD_SPECIES_ZONE);
  const addZone = (id: string, input: Zone) =>
    addZoneMutation({ id, input });

  const { mutate: removeZoneMutation } = useMutation(REMOVE_SPECIES_ZONE);
  const removeZone = (id: string, zoneName: string) =>
    removeZoneMutation({ id, zoneName });

  return {
    speciesList,
    loadingSpecies,
    errorSpecies,
    refetchSpecies,
    getSpeciesDetail,
    createSpecies,
    updateSpecies,
    removeSpecies,
    updateTaxonomy,
    updateBiology,
    updateHabitat,
    updateConservation,
    updateFishery,
    addMedia,
    removeMedia,
    addZone,
    removeZone,
  };
}
