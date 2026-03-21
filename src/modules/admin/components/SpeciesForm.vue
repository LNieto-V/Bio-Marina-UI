<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useSpecies } from '../../species/composables/useSpecies';
import { SpeciesStatus, MediaType, type Species, type CreateSpeciesInput } from '../../species/types/species';

const props = defineProps<{
  speciesId?: string;
}>();

const emit = defineEmits(['close', 'saved']);

const { 
  getSpeciesDetail, 
  createSpecies, 
  updateSpecies,
  updateTaxonomy,
  updateBiology,
  updateHabitat,
  addMedia,
  removeMedia
} = useSpecies();

const activeTab = ref('basic');
const loading = ref(false);
const saving = ref(false);

const form = reactive<any>({
  commonName: '',
  scientificName: '',
  emoji: '🐟',
  status: SpeciesStatus.DRAFT,
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: '', order: '', family: '', genus: '', species: '' },
  biology: { commonNames: [], description: '', feedingHabits: '', reproduction: '', reproductionMode: 'SEXUAL', weightAverageKg: 0, lengthAverageCm: 0 },
  habitat: { distribution: '', depthRange: [0, 0], temperatureRange: [0, 0], environment: '', habitatType: 'MARINO' },
  conservation: { iucnStatus: 'NE', cites: '', localProtection: '' },
  fishery: { commercialValue: 'MEDIO', catchMethods: [], seasonality: '', closureType: 'TEMPORAL' },
  media: [],
  zones: []
});

onMounted(async () => {
  if (props.speciesId) {
    loading.value = true;
    const { onResult, onError } = getSpeciesDetail(props.speciesId);
    
    onResult((result) => {
      const s = result.data?.getSpeciesById;
      if (s) {
        // Deep merge/assign to keep reactivity for nested objects
        Object.keys(s).forEach(key => {
          if (s[key] && typeof s[key] === 'object' && !Array.isArray(s[key])) {
             form[key] = { ...form[key], ...s[key] };
          } else if (Array.isArray(s[key])) {
             form[key] = [...s[key]];
          } else {
             form[key] = s[key];
          }
        });
      }
      loading.value = false;
    });

    onError((error) => {
      console.error('Error loading species:', error);
      loading.value = false;
    });
  }
});

const isNew = computed(() => !props.speciesId);

const tabs = [
  { id: 'basic', label: 'Basic Info', icon: '📝' },
  { id: 'taxonomy', label: 'Taxonomy', icon: '🧬' },
  { id: 'biology', label: 'Biology', icon: '🔬' },
  { id: 'habitat', label: 'Habitat & Conservation', icon: '🌊' },
  { id: 'media', label: 'Media & Zones', icon: '📸' }
];

const handleSaveBase = async () => {
  saving.value = true;
  try {
    if (isNew.value) {
      const input: CreateSpeciesInput = {
        commonName: form.commonName,
        scientificName: form.scientificName,
        emoji: form.emoji,
        taxonomy: form.taxonomy,
        biology: form.biology,
        habitat: form.habitat,
        conservation: form.conservation,
        fishery: form.fishery
      };
      const result = await createSpecies(input);
      emit('saved', result._id);
    } else {
      await updateSpecies(props.speciesId!, {
        commonName: form.commonName,
        scientificName: form.scientificName,
        emoji: form.emoji,
        status: form.status
      });
    }
  } finally {
    saving.value = false;
  }
};

const handleSaveSection = async (section: string) => {
  if (isNew.value) return;
  saving.value = true;
  try {
    switch (section) {
      case 'taxonomy': await updateTaxonomy(props.speciesId!, form.taxonomy); break;
      case 'biology': await updateBiology(props.speciesId!, form.biology); break;
      case 'habitat': await updateHabitat(props.speciesId!, form.habitat); break;
    }
  } finally {
    saving.value = false;
  }
};

const newMediaUrl = ref('');
const handleAddMedia = async () => {
  if (!newMediaUrl.value || isNew.value) return;
  await addMedia(props.speciesId!, { url: newMediaUrl.value, type: MediaType.IMAGE, title: '' });
  form.media.push({ url: newMediaUrl.value, type: MediaType.IMAGE, title: '' });
  newMediaUrl.value = '';
};

const handleRemoveMedia = async (url: string) => {
  if (isNew.value) return;
  await removeMedia(props.speciesId!, url);
  form.media = form.media.filter((m: any) => m.url !== url);
};

</script>

<template>
  <div class="h-full flex flex-col bg-slate-50 overflow-hidden rounded-xl border border-slate-200">
    <!-- Header -->
    <div class="bg-white p-6 border-b border-slate-200 shadow-sm flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">{{ isNew ? 'Register New Species' : 'Edit Species' }}</h2>
        <p class="text-slate-500">{{ isNew ? 'Fill in the basic taxonomy to get started.' : `Editing: ${form.commonName}` }}</p>
      </div>
      <button @click="emit('close')" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Tabs Navigation -->
    <div class="bg-white px-6 border-b border-slate-200 sticky top-0 z-10 flex gap-2 overflow-x-auto">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-6 py-4 font-bold text-sm transition-all border-b-4 flex items-center gap-2 whitespace-nowrap',
          activeTab === tab.id ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
        ]"
      >
        <span>{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-y-auto p-6 scroll-smooth">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
        <div class="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p>Loading species data...</p>
      </div>

      <div v-else class="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        <!-- Tab: Basic Info -->
        <div v-if="activeTab === 'basic'" class="space-y-6">
          <section class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-black text-slate-900 uppercase tracking-tight">Common Name</label>
                <input v-model="form.commonName" type="text" class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all text-slate-900 font-medium" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-black text-slate-900 uppercase tracking-tight">Scientific Name</label>
                <input v-model="form.scientificName" type="text" class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all italic text-slate-900 font-medium" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700 uppercase tracking-tight">Emoji Representative</label>
                <div class="flex gap-2">
                  <input v-model="form.emoji" type="text" class="w-16 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-center text-xl" />
                  <div class="flex-1 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg items-center flex">This icon will be used in lists and maps.</div>
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-black text-slate-900 uppercase tracking-tight">Record Status</label>
                <select v-model="form.status" class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all text-slate-900 font-bold">
                  <option :value="SpeciesStatus.DRAFT">Draft (Editing)</option>
                  <option :value="SpeciesStatus.PUBLISHED">Published (Visible to all)</option>
                  <option :value="SpeciesStatus.REVISION">Revision (In Review)</option>
                </select>
              </div>
            </div>
            <div class="pt-4 border-t border-slate-100 flex justify-end">
              <button @click="handleSaveBase" :disabled="saving" class="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md">
                {{ saving ? 'Saving...' : 'Save Base Info' }}
              </button>
            </div>
          </section>
        </div>

        <!-- Tab: Taxonomy -->
        <div v-if="activeTab === 'taxonomy'" class="space-y-6">
          <section class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span class="text-indigo-600">🧬</span> Taxonomic Classification
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div v-for="field in ['kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species']" :key="field" class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">{{ field }}</label>
                <input v-model="form.taxonomy[field]" type="text" class="w-full px-4 py-2 bg-white border-2 border-slate-300 rounded-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all text-slate-900" />
              </div>
            </div>
            <div class="pt-4 border-t border-slate-100 flex justify-end" v-if="!isNew">
              <button @click="handleSaveSection('taxonomy')" :disabled="saving" class="px-6 py-2 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 shadow-md">
                Save Taxonomy
              </button>
            </div>
          </section>
        </div>

        <!-- Tab: Biology -->
        <div v-if="activeTab === 'biology'" class="space-y-6">
          <section class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div class="space-y-2">
              <label class="text-xs font-black text-slate-600 uppercase">General Description</label>
              <textarea v-model="form.biology.description" rows="4" class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 text-slate-900"></textarea>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">Feeding Habits</label>
                <input v-model="form.biology.feedingHabits" type="text" class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl" />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">Reproduction Mode</label>
                <select v-model="form.biology.reproductionMode" class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-slate-900 font-bold">
                  <option value="SEXUAL">Sexual</option>
                  <option value="ASEXUAL">Asexual</option>
                  <option value="HERMAFRODITA">Hermafrodita</option>
                </select>
              </div>
            </div>
            <div class="pt-4 border-t border-slate-100 flex justify-end" v-if="!isNew">
              <button @click="handleSaveSection('biology')" :disabled="saving" class="px-6 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md">
                Save Biology
              </button>
            </div>
          </section>
        </div>

        <!-- Tab: Habitat & Conservation -->
        <div v-if="activeTab === 'habitat'" class="space-y-6">
          <section class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 class="text-lg font-bold text-slate-800">Habitat & Distribution</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">Habitat Type</label>
                <select v-model="form.habitat.habitatType" class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-slate-900 font-bold">
                  <option value="MARINO">Marino</option>
                  <option value="AGUA_DULCE">Agua Dulce</option>
                  <option value="ESTUARIO">Estuario</option>
                  <option value="SALOBRE">Salobre</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">IUCN Status</label>
                <select v-model="form.conservation.iucnStatus" class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-slate-900 font-bold">
                  <option value="NE">No Evaluado (NE)</option>
                  <option value="DD">Datos Insuficientes (DD)</option>
                  <option value="LC">Preocupación Menor (LC)</option>
                  <option value="NT">Casi Amenazado (NT)</option>
                  <option value="VU">Vulnerable (VU)</option>
                  <option value="EN">En Peligro (EN)</option>
                  <option value="CR">En Peligro Crítico (CR)</option>
                  <option value="EW">Extinto en Naturaleza (EW)</option>
                  <option value="EX">Extinto (EX)</option>
                </select>
              </div>
            </div>
            <div class="pt-4 border-t border-slate-100 flex justify-end" v-if="!isNew">
              <button @click="handleSaveSection('habitat')" :disabled="saving" class="px-6 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md">
                Save Habitat & Conservation
              </button>
            </div>
          </section>
        </div>
        <div v-if="activeTab === 'media'" class="space-y-6">
          <section class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 class="text-lg font-bold text-slate-800">Media Gallery</h3>
            <div class="flex gap-2">
              <input v-model="newMediaUrl" type="text" placeholder="Paste Image URL here..." class="flex-1 px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none text-slate-900" />
              <button @click="handleAddMedia" class="px-6 py-2 bg-indigo-700 text-white rounded-xl font-black shadow-lg hover:bg-indigo-800 transition-all active:scale-95">Add Image</button>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div v-for="m in form.media" :key="m.url" class="relative group aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                <img :src="m.url" class="w-full h-full object-cover" />
                <button @click="handleRemoveMedia(m.url)" class="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-in { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
