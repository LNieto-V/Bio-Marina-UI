// ============================================================
//  BioMarina — Usuario Types
//  Mapeados 1:1 con el schema GraphQL
// ============================================================

export type RolUsuario = 'admin' | 'investigador' | 'editor' | 'consultor'

export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: RolUsuario
  institucion?: string
  activo: boolean
  avatarUrl?: string
  creadoEn?: string
  ultimoAcceso?: string
}

export interface UsuarioPaginado {
  total: number
  pagina: number
  limite: number
  usuarios: Usuario[]
}

export const ROL_LABELS: Record<RolUsuario, string> = {
  admin:        'Administrador',
  investigador: 'Investigador',
  editor:       'Editor',
  consultor:    'Consultor',
}

export const ROL_COLORS: Record<RolUsuario, string> = {
  admin:        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  investigador: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  editor:       'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  consultor:    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
}

export const ROL_PERMISOS: Record<RolUsuario, string[]> = {
  admin:        ['species.create', 'species.edit', 'species.delete', 'species.publish', 'users.manage', 'users.viewAll', 'reports.generate', 'reports.export'],
  investigador: ['species.create', 'species.edit', 'species.publish', 'reports.generate', 'reports.export'],
  editor:       ['species.edit', 'reports.generate'],
  consultor:    [],
}
