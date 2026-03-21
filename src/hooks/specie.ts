import { useLazyQuery } from "@vue/apollo-composable";
import { GetSpeciesDocument } from "@/graphql/graphql";

export const useGetSpecies = () =>
  useLazyQuery(GetSpeciesDocument, undefined, {
    fetchPolicy: "network-only",
  });