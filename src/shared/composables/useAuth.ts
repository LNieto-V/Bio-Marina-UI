// ============================================================
//  BioMarina — useAuth composable
//  Autenticación mock-first, lista para Apollo/JWT
// ============================================================

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'investigador' | 'editor' | 'consultor'
  institucion?: string
}

// Credenciales de usuarios mock para demo
const MOCK_USERS: Array<{ email: string; password: string; user: Usuario }> = [
  {
    email: 'admin@biomarina.edu.co',
    password: 'admin123',
    user: { id: '1', nombre: 'Dr. Carlos Palomino', email: 'admin@biomarina.edu.co', rol: 'admin', institucion: 'Universidad del Magdalena' },
  },
  {
    email: 'investigador@biomarina.edu.co',
    password: 'inv123',
    user: { id: '2', nombre: 'Dra. María Torres', email: 'investigador@biomarina.edu.co', rol: 'investigador', institucion: 'INVEMAR' },
  },
  {
    email: 'editor@biomarina.edu.co',
    password: 'editor123',
    user: { id: '3', nombre: 'Juan Rodríguez', email: 'editor@biomarina.edu.co', rol: 'editor', institucion: 'MinAmbiente' },
  },
]

// Estado global reactivo
const _currentUser = ref<Usuario | null>(null)
const _token = ref<string | null>(null)

// Restaurar sesión al cargar
const stored = localStorage.getItem('biomarina_user')
if (stored) {
  try {
    _currentUser.value = JSON.parse(stored)
    _token.value = localStorage.getItem('biomarina_token')
  } catch {
    localStorage.removeItem('biomarina_user')
  }
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function useAuth() {
  const router = useRouter()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!_currentUser.value)
  const currentUser = computed(() => _currentUser.value)
  const isAdmin = computed(() => _currentUser.value?.rol === 'admin')
  const canEdit = computed(() => ['admin', 'investigador', 'editor'].includes(_currentUser.value?.rol ?? ''))

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    await delay(600) // simular latencia

    const match = MOCK_USERS.find(
      (u) => u.email === email.toLowerCase() && u.password === password,
    )

    if (!match) {
      error.value = 'Credenciales inválidas. Intenta con admin@biomarina.edu.co / admin123'
      loading.value = false
      return false
    }

    // Guardar en localStorage
    const mockToken = `mock_jwt_${match.user.id}_${Date.now()}`
    _currentUser.value = match.user
    _token.value = mockToken
    localStorage.setItem('biomarina_user', JSON.stringify(match.user))
    localStorage.setItem('biomarina_token', mockToken)
    loading.value = false
    return true
  }

  const logout = () => {
    _currentUser.value = null
    _token.value = null
    localStorage.removeItem('biomarina_user')
    localStorage.removeItem('biomarina_token')
    router.push('/login')
  }

  return { login, logout, isAuthenticated, currentUser, isAdmin, canEdit, loading, error, token: _token }
}
