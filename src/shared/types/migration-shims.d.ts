// bio-marina-mocks.d.ts
// Tipos temporales para estabilizar la migración arquitectónica

declare module '@/shared/services/mockData' {
  export const MOCK_ESPECIES: any[];
  export const MOCK_ESTADISTICAS: any;
}

declare module '@/shared/types/especie' {
  export type Especie = any;
  export type EspeciePaginada = any;
  export type FiltrosEspecie = any;
  export type EstadisticasCatalogo = any;
  export type TipoHabitat = any;
  export type EstadoUICN = any;
  export const UICN_COLORS: Record<string, string>;
  export const UICN_LABELS: Record<string, string>;
  export const HABITAT_LABELS: Record<string, string>;
  export const VEDA_LABELS: Record<string, string>;
}

declare module '@/shared/composables/index' {
  export function useEspecies(...args: any[]): any;
  export function useEspecie(...args: any[]): any;
  export function useDashboard(...args: any[]): any;
  export function useEspeciesCercanas(...args: any[]): any;
}

declare module '@/shared/composables/useAuth' {
  export function useAuth(): any;
  export interface Usuario {
    id: string;
    nombre: string;
    rol: string;
  }
}
