<script setup lang="ts">
import { UICN_COLORS, UICN_LABELS, type Especie, type Media } from '@/shared/types/especie'
import { useAdminPermissions } from '@/shared/composables/useAdminPermissions'

defineProps<{ species: Especie[] }>()
const emit = defineEmits<{
  (e: 'edit',    id: string): void
  (e: 'delete',  id: string): void
  (e: 'preview', item: Especie): void
}>()

const { can } = useAdminPermissions()

const getImageUrl = (item: Especie) =>
  item.media?.find((m: Media) => m.esPrincipal)?.url ||
  item.media?.[0]?.url ||
  `https://placehold.co/60x60/0b3c5b/white?text=${encodeURIComponent(item.nombreCientifico.slice(0, 2))}`
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left whitespace-nowrap">
      <!-- Head -->
      <thead>
        <tr class="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
          <th class="px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Especie</th>
          <th class="px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">UICN</th>
          <th class="px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</th>
          <th class="px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-44">Completitud</th>
          <th class="px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hábitat</th>
          <th class="px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
        <tr
          v-for="item in species"
          :key="item.id"
          class="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors"
        >
          <!-- Especie -->
          <td class="px-5 py-4">
            <div class="flex items-center gap-3">
              <div
                class="w-11 h-11 rounded-xl bg-center bg-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700"
                :style="`background-image: url('${getImageUrl(item)}')`"
              />
              <div class="min-w-0">
                <p class="text-sm font-bold italic text-slate-900 dark:text-white truncate">{{ item.nombreCientifico }}</p>
                <p class="text-[11px] text-slate-400 uppercase truncate">{{ item.nombreComun }}</p>
              </div>
            </div>
          </td>

          <!-- UICN -->
          <td class="px-5 py-4">
            <span :class="['px-2 py-0.5 rounded-full text-[10px] font-black', UICN_COLORS[item.conservacion.uicn]]">
              {{ item.conservacion.uicn }} — {{ UICN_LABELS[item.conservacion.uicn] }}
            </span>
          </td>

          <!-- Estado publicación -->
          <td class="px-5 py-4">
            <span :class="[
              'px-2.5 py-1 rounded-lg text-[10px] font-black uppercase',
              item.estado === 'publicado' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
              item.estado === 'revision'  ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
              'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
            ]">{{ item.estado }}</span>
          </td>

          <!-- Completitud -->
          <td class="px-5 py-4 w-44">
            <div class="space-y-1.5">
              <div class="flex justify-between text-[10px] font-bold text-slate-500">
                <span>{{ item.completitud }}%</span>
              </div>
              <div class="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :class="item.completitud > 80 ? 'bg-green-500' : item.completitud > 50 ? 'bg-blue-500' : 'bg-red-500'"
                  :style="`width: ${item.completitud}%`"
                />
              </div>
            </div>
          </td>

          <!-- Hábitat -->
          <td class="px-5 py-4">
            <span class="text-xs font-medium text-slate-500 dark:text-slate-400 capitalize">{{ item.habitat.tipo }}</span>
          </td>

          <!-- Actions -->
          <td class="px-5 py-4 text-right">
            <div class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                @click="emit('preview', item)"
                class="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                title="Vista rápida"
              >
                <span class="material-symbols-outlined text-[18px]">visibility</span>
              </button>
              <button
                v-if="can('species.edit')"
                @click="emit('edit', item.id)"
                class="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                title="Editar"
              >
                <span class="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button
                v-if="can('species.delete')"
                @click="emit('delete', item.id)"
                class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Eliminar"
              >
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          </td>
        </tr>

        <!-- Empty state -->
        <tr v-if="species.length === 0">
          <td colspan="6" class="px-5 py-16 text-center">
            <span class="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-700 mb-3 block">search_off</span>
            <p class="font-bold text-slate-400 dark:text-slate-500">No se encontraron especies con los filtros actuales</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
