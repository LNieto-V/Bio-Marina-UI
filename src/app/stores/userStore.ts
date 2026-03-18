import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Usuario, RolUsuario } from '@/shared/types/usuario'

// ─── Mock users for demo ────────────────────────────────────
const MOCK_USUARIOS: Usuario[] = [
  {
    id: '1',
    nombre: 'Dr. Carlos Palomino',
    email: 'admin@biomarina.edu.co',
    rol: 'admin',
    institucion: 'Universidad del Magdalena',
    activo: true,
    creadoEn: '2024-01-15T08:00:00Z',
    ultimoAcceso: '2026-03-17T20:00:00Z',
  },
  {
    id: '2',
    nombre: 'Dra. María Torres',
    email: 'investigador@biomarina.edu.co',
    rol: 'investigador',
    institucion: 'INVEMAR',
    activo: true,
    creadoEn: '2024-02-10T09:30:00Z',
    ultimoAcceso: '2026-03-15T14:22:00Z',
  },
  {
    id: '3',
    nombre: 'Juan Rodríguez',
    email: 'editor@biomarina.edu.co',
    rol: 'editor',
    institucion: 'MinAmbiente',
    activo: true,
    creadoEn: '2024-03-05T10:00:00Z',
    ultimoAcceso: '2026-03-16T11:10:00Z',
  },
  {
    id: '4',
    nombre: 'Ana Gómez',
    email: 'ana.gomez@invemar.edu.co',
    rol: 'investigador',
    institucion: 'INVEMAR',
    activo: true,
    creadoEn: '2024-04-20T08:45:00Z',
    ultimoAcceso: '2026-03-10T09:05:00Z',
  },
  {
    id: '5',
    nombre: 'Pedro Herrera',
    email: 'pherrera@corpoguajira.gov.co',
    rol: 'consultor',
    institucion: 'CORPOGUAJIRA',
    activo: false,
    creadoEn: '2024-05-12T11:00:00Z',
    ultimoAcceso: '2025-12-01T16:40:00Z',
  },
  {
    id: '6',
    nombre: 'Luisa Vargas',
    email: 'lvargas@uniatlántico.edu.co',
    rol: 'editor',
    institucion: 'Universidad del Atlántico',
    activo: true,
    creadoEn: '2024-06-18T13:15:00Z',
    ultimoAcceso: '2026-03-17T08:30:00Z',
  },
]

export const useUserStore = defineStore('users', () => {
  const users = ref<Usuario[]>([...MOCK_USUARIOS])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const selectedRol = ref<RolUsuario | 'todos'>('todos')

  // Getters
  const filteredUsers = computed(() => {
    let result = users.value
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        u =>
          u.nombre.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.institucion?.toLowerCase().includes(q) ?? false),
      )
    }
    if (selectedRol.value !== 'todos') {
      result = result.filter(u => u.rol === selectedRol.value)
    }
    return result
  })

  const totalUsuarios  = computed(() => users.value.length)
  const totalActivos   = computed(() => users.value.filter(u => u.activo).length)
  const totalInactivos = computed(() => users.value.filter(u => !u.activo).length)

  // Actions
  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      await new Promise(r => setTimeout(r, 400)) // simulate network
      users.value = [...MOCK_USUARIOS]
    } catch {
      error.value = 'Error al cargar usuarios'
    } finally {
      loading.value = false
    }
  }

  async function changeRole(userId: string, newRole: RolUsuario) {
    const user = users.value.find(u => u.id === userId)
    if (!user) return
    // Optimistic update
    user.rol = newRole
  }

  async function toggleUserStatus(userId: string) {
    const user = users.value.find(u => u.id === userId)
    if (!user) return
    // Optimistic update
    user.activo = !user.activo
  }

  function setSearch(q: string) {
    searchQuery.value = q
  }

  function setRolFilter(rol: RolUsuario | 'todos') {
    selectedRol.value = rol
  }

  return {
    users,
    filteredUsers,
    loading,
    error,
    searchQuery,
    selectedRol,
    totalUsuarios,
    totalActivos,
    totalInactivos,
    fetchUsers,
    changeRole,
    toggleUserStatus,
    setSearch,
    setRolFilter,
  }
})
