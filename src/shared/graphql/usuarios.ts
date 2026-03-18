import gql from 'graphql-tag'

// ─── Queries ─────────────────────────────────────────────────

export const LISTAR_USUARIOS = gql`
  query ListarUsuarios($limit: Int, $offset: Int) {
    usuarios(limit: $limit, offset: $offset) {
      items {
        id
        nombre
        email
        rol
        institucion
        activo
        avatarUrl
        creadoEn
        ultimoAcceso
      }
      total
    }
  }
`

// ─── Mutations ────────────────────────────────────────────────

export const CAMBIAR_ROL_USUARIO = gql`
  mutation CambiarRolUsuario($id: ID!, $rol: String!) {
    cambiarRol(usuarioId: $id, nuevoRol: $rol) {
      id
      rol
    }
  }
`

export const TOGGLE_USUARIO = gql`
  mutation ToggleUsuario($id: ID!, $activo: Boolean!) {
    toggleUsuario(usuarioId: $id, activo: $activo) {
      id
      activo
    }
  }
`
