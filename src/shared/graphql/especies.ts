import gql from 'graphql-tag'

export const GET_SPECIES_LIST = gql`
  query GetSpeciesList($filter: SpeciesFilterInput, $limit: Int, $offset: Int) {
    speciesList(filter: $filter, limit: $limit, offset: $offset) {
      items {
        id
        name
        scientificName
        status
        habitat
        depth
        completeness
        location
        image
        tags
        statusColor
      }
      totalCount
    }
  }
`

export const GET_SPECIES_DETAIL = gql`
  query GetSpeciesDetail($id: ID!) {
    species(id: $id) {
      id
      name
      scientificName
      status
      statusColor
      image
      attributes {
        icon
        label
        value
      }
      taxonomy {
        kingdom
        phylum
        class
        order
        family
        genus
      }
      biology {
        description
        lifespan
        sociality
      }
      habitat {
        description
        tags
      }
      regulations {
        title
        description
        body
      }
    }
  }
`
