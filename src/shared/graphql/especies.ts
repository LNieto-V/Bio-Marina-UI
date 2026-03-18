import gql from 'graphql-tag'

// ─── Queries ─────────────────────────────────────────────────

export const GET_SPECIES_LIST = gql`
  query GetSpeciesList($filter: SpeciesFilterInput, $limit: Int, $offset: Int) {
    speciesList(filter: $filter, limit: $limit, offset: $offset) {
      items {
        id
        nombreComun
        nombreCientifico
        estado
        habitat { tipo }
        conservacion { uicn protegida }
        completitud
        zonas { nombre }
        media { url esPrincipal }
        createdAt
        updatedAt
      }
      total
      pagina
      limite
    }
  }
`

export const GET_SPECIES_DETAIL = gql`
  query GetSpeciesDetail($id: ID!) {
    especie(id: $id) {
      id
      nombreComun
      nombreComunAlt
      nombreCientifico
      emoji
      descripcionGeneral
      notas
      curiosidades
      referenciasBiblio
      estado
      completitud
      publicadoEn
      createdAt
      updatedAt

      taxonomia {
        reino filo clase orden familia genero especie
      }
      biologia {
        pesoPromedioKg pesoMaximoKg longPromedCm longMaxCm
        dieta nivelTrofico reproduccion migracion longevidadAnios
      }
      habitat {
        tipo profundidadMinM profundidadMaxM tempMinC tempMaxC salinidadPpt sustrato
      }
      conservacion {
        uicn uicnAnio vedaTipo vedaMeses valorEcologico protegida notasLegales
      }
      pesca {
        valorComercial capturaAnualTon artesanal industrial acuariofilia artesPesca puertosPrincipales
      }
      media {
        tipo url miniatura autoria licencia esPrincipal creadoEn
      }
      zonas {
        nombre departamento tipo
        punto { type coordinates }
      }
    }
  }
`

export const GET_ESTADISTICAS_CATALOGO = gql`
  query GetEstadisticasCatalogo {
    estadisticasCatalogo {
      totalEspecies
      publicadas
      enPeligro
      vulnerables
      protegidas
      completitudMedia
      porHabitat { habitat total }
      porUICN    { uicn total }
    }
  }
`

// ─── Mutations ────────────────────────────────────────────────

export const CREAR_ESPECIE = gql`
  mutation CrearEspecie($input: CrearEspecieInput!) {
    crearEspecie(input: $input) {
      id
      nombreCientifico
      nombreComun
      estado
      completitud
      createdAt
    }
  }
`

export const ACTUALIZAR_ESPECIE = gql`
  mutation ActualizarEspecie($id: ID!, $input: ActualizarEspecieInput!) {
    actualizarEspecie(id: $id, input: $input) {
      id
      nombreCientifico
      nombreComun
      estado
      completitud
      updatedAt
    }
  }
`

export const ELIMINAR_ESPECIE = gql`
  mutation EliminarEspecie($id: ID!) {
    eliminarEspecie(id: $id) {
      success
      message
    }
  }
`

export const PUBLICAR_ESPECIE = gql`
  mutation PublicarEspecie($id: ID!) {
    publicarEspecie(id: $id) {
      id
      estado
      publicadoEn
    }
  }
`

export const SUBIR_FOTO_ESPECIE = gql`
  mutation SubirFotoEspecie($especieId: ID!, $archivo: Upload!, $esPrincipal: Boolean) {
    subirFotoEspecie(especieId: $especieId, archivo: $archivo, esPrincipal: $esPrincipal) {
      tipo
      url
      miniatura
      autoria
      licencia
      esPrincipal
      creadoEn
    }
  }
`

export const ELIMINAR_MEDIA_ESPECIE = gql`
  mutation EliminarMediaEspecie($especieId: ID!, $mediaUrl: String!) {
    eliminarMediaEspecie(especieId: $especieId, mediaUrl: $mediaUrl) {
      success
    }
  }
`

export const SET_IMAGEN_PRINCIPAL = gql`
  mutation SetImagenPrincipal($especieId: ID!, $mediaUrl: String!) {
    setImagenPrincipal(especieId: $especieId, mediaUrl: $mediaUrl) {
      success
    }
  }
`
