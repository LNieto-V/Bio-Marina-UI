// ============================================================
//  BioMarina — useAdminPermissions composable
//  UI-level permission checks derived from the current user's role
// ============================================================

import { computed } from 'vue'
import { useAuth } from './useAuth'
import { ROL_PERMISOS } from '@/shared/types/usuario'
import type { RolUsuario } from '@/shared/types/usuario'

export type AdminAction =
  | 'species.create'
  | 'species.edit'
  | 'species.delete'
  | 'species.publish'
  | 'users.manage'
  | 'users.viewAll'
  | 'reports.generate'
  | 'reports.export'

export function useAdminPermissions() {
  const { currentUser } = useAuth()

  const userRole = computed<RolUsuario | undefined>(() => currentUser.value?.rol)

  /**
   * Returns true if the current user has permission to perform the given action.
   * Usage: `v-if="can('species.create')"`
   */
  const can = (action: AdminAction): boolean => {
    const role = userRole.value
    if (!role) return false
    return ROL_PERMISOS[role]?.includes(action) ?? false
  }

  /**
   * Returns true if the current user has AT LEAST ONE of the provided roles.
   * Usage: `v-if="hasRole(['admin', 'investigador'])"`
   */
  const hasRole = (roles: RolUsuario[]): boolean => {
    const role = userRole.value
    if (!role) return false
    return roles.includes(role)
  }

  const isAdmin        = computed(() => userRole.value === 'admin')
  const isInvestigador = computed(() => userRole.value === 'investigador')
  const isEditor       = computed(() => userRole.value === 'editor')

  return {
    can,
    hasRole,
    isAdmin,
    isInvestigador,
    isEditor,
    userRole,
  }
}
