<script setup lang="ts">
import { UICN_COLORS, UICN_LABELS, HABITAT_LABELS, type Especie, type Media } from '@/shared/types/especie'
import { useAdminPermissions } from '@/shared/composables/useAdminPermissions'

defineProps<{ species: Especie | null; open: boolean }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'edit', id: string): void
}>()

const { can } = useAdminPermissions()

const getImageUrl = (item: Especie) =>
  item.media?.find((m: Media) => m.esPrincipal)?.url || item.media?.[0]?.url || ''
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div
        v-if="open && species"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        @click.self="emit('close')"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="emit('close')" />

        <!-- Panel -->
        <div class="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-300">
          <!-- Hero image -->
          <div class="relative h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <img
              v-if="getImageUrl(species)"
              :src="getImageUrl(species)"
              :alt="species.nombreCientifico"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              @click="emit('close')"
              class="absolute top-3 right-3 p-1.5 bg-black/30 hover:bg-black/50 text-white rounded-lg transition-colors"
            >
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
            <!-- Badges overlay -->
            <div class="absolute bottom-3 left-4 flex gap-2">
              <span :class="['px-2 py-0.5 rounded-full text-[10px] font-black shadow', UICN_COLORS[species.conservacion.uicn]]">
                {{ species.conservacion.uicn }}
              </span>
              <span :class="[
                'px-2 py-0.5 rounded-full text-[10px] font-black shadow',
                species.estado === 'publicado' ? 'bg-green-500 text-white' :
                species.estado === 'revision'  ? 'bg-yellow-400 text-slate-900' : 'bg-slate-400 text-white',
              ]">{{ species.estado }}</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-4">
            <div>
              <p class="text-[11px] text-slate-400 uppercase font-black tracking-widest">{{ species.nombreComun }}</p>
              <h3 class="text-xl font-black italic text-slate-900 dark:text-white">{{ species.nombreCientifico }}</h3>
            </div>

            <!-- Quick facts grid -->
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                <p class="text-[9px] font-black text-slate-400 uppercase">UICN</p>
                <p class="text-sm font-bold text-slate-900 dark:text-white">{{ UICN_LABELS[species.conservacion.uicn] }}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                <p class="text-[9px] font-black text-slate-400 uppercase">Hábitat</p>
                <p class="text-sm font-bold text-slate-900 dark:text-white capitalize">{{ HABITAT_LABELS[species.habitat.tipo] ?? species.habitat.tipo }}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                <p class="text-[9px] font-black text-slate-400 uppercase">Completitud</p>
                <p class="text-sm font-bold text-slate-900 dark:text-white">{{ species.completitud }}%</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                <p class="text-[9px] font-black text-slate-400 uppercase">Protegida</p>
                <p class="text-sm font-bold" :class="species.conservacion.protegida ? 'text-green-600' : 'text-slate-400'">
                  {{ species.conservacion.protegida ? 'Sí' : 'No' }}
                </p>
              </div>
            </div>

            <!-- Description -->
            <p v-if="species.descripcionGeneral" class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
              {{ species.descripcionGeneral }}
            </p>

            <!-- Actions -->
            <div class="flex gap-3 pt-1">
              <RouterLink
                :to="`/species/${species.id}`"
                target="_blank"
                class="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span class="material-symbols-outlined text-[18px]">open_in_new</span>
                Ver ficha
              </RouterLink>
              <button
                v-if="can('species.edit')"
                @click="emit('edit', species.id)"
                class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 transition-all"
              >
                <span class="material-symbols-outlined text-[18px]">edit</span>
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay-enter-active, .overlay-leave-active { transition: opacity 0.2s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
