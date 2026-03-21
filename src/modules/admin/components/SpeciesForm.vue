<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { useSpecies } from '../../species/composables/useSpecies';
import { GET_SPECIES_BY_ID } from '../../species/graphql/species.operations';
import { SpeciesStatus, type CreateSpeciesInput, type Media, type Zone, ReproductionMode, FishingClosureType, MediaType, EcologicalValue } from '../../species/types/species';

const props = defineProps<{
  speciesId?: string;
}>();

const emit = defineEmits(['close', 'saved']);

const { 
  createSpecies, 
  updateSpecies,
  updateTaxonomy,
  updateBiology,
  updateHabitat,
  updateConservation,
  updateFishery,
  addMedia,
  removeMedia
} = useSpecies();

const activeTab = ref('basic');
const loading = ref(false);
const saving = ref(false);

const form = reactive({
  commonName: '',
  scientificName: '',
  alternativeCommonNames: [] as string[],
  emoji: '🐟',
  status: SpeciesStatus.DRAFT,
  generalDescription: '',
  notes: '',
  funFacts: [] as string[],
  bibliographicReferences: [] as string[],
  completeness: 0,
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: '', order: '', family: '', genus: '', species: '' },
  biology: { 
    diet: [] as string[], 
    reproductionMode: ReproductionMode.OVIPAROUS, 
    averageWeightKg: 0, 
    maximumWeightKg: 0, 
    averageLengthCm: 0, 
    maximumLengthCm: 0,
    trophicLevel: 0,
    migration: false,
    longevityYears: 0
  },
  habitat: { 
    type: 'PELAGIC', 
    minDepthM: 0, 
    maxDepthM: 0, 
    minTempC: 0, 
    maxTempC: 0, 
    salinityPpt: 0, 
    substrate: [] as string[],
  },
  conservation: { 
    iucn: 'NE', 
    iucnYear: new Date().getFullYear(),
    closureType: FishingClosureType.TEMPORARY,
    closureMonths: [] as string[],
    ecologicalValue: EcologicalValue.MEDIUM,
    protected: false,
    legalNotes: ''
  },
  fishery: { 
    commercialValue: '', 
    annualCatchTon: 0, 
    artisanal: false, 
    industrial: false, 
    aquariumTrade: false, 
    fishingGears: [] as string[], 
    mainPorts: [] as string[]
  },
  media: [] as Media[],
  zones: [] as Zone[]
});

const { result, error } = useQuery(GET_SPECIES_BY_ID, 
  () => ({ id: props.speciesId }), 
  () => ({ enabled: !!props.speciesId, fetchPolicy: 'network-only' })
);

watch(result, (newVal) => {
  const s = newVal?.getSpeciesById;
  if (s) {
    // Reset form with new data, ensuring we don't lose structure
    Object.assign(form, {
      ...s,
      taxonomy: { ...form.taxonomy, ...s.taxonomy },
      biology: { ...form.biology, ...s.biology },
      habitat: { ...form.habitat, ...s.habitat },
      conservation: { ...form.conservation, ...s.conservation },
      fishery: { ...form.fishery, ...s.fishery },
    });
  }
}, { immediate: true });

watch(error, (err) => {
  if (err) console.error('Error loading species:', err);
});

const isNew = computed(() => !props.speciesId);

const tabs = [
  { id: 'basic', label: 'Basic Info', icon: '📝' },
  { id: 'taxonomy', label: 'Taxonomy', icon: '🧬' },
  { id: 'biology', label: 'Biology', icon: '🔬' },
  { id: 'habitat', label: 'Habitat & Conservation', icon: '🌊' },
  { id: 'fishery', label: 'Fishery & Commercial', icon: '⚓' },
  { id: 'media', label: 'Media & Zones', icon: '📸' }
];

const handleSaveBase = async () => {
  saving.value = true;
  try {
    if (isNew.value) {
      const input: CreateSpeciesInput = {
        commonName: form.commonName,
        scientificName: form.scientificName,
        alternativeCommonNames: form.alternativeCommonNames,
        emoji: form.emoji,
        status: form.status,
        generalDescription: form.generalDescription,
        notes: form.notes,
        funFacts: form.funFacts,
        bibliographicReferences: form.bibliographicReferences,
        completeness: form.completeness,
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
        alternativeCommonNames: form.alternativeCommonNames,
        emoji: form.emoji,
        status: form.status,
        generalDescription: form.generalDescription,
        notes: form.notes,
        funFacts: form.funFacts,
        bibliographicReferences: form.bibliographicReferences,
        completeness: form.completeness
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
      case 'habitat': 
        await updateHabitat(props.speciesId!, form.habitat); 
        await updateConservation(props.speciesId!, form.conservation);
        break;
      case 'fishery': await updateFishery(props.speciesId!, form.fishery); break;
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
  form.media = form.media.filter((m: { url: string }) => m.url !== url);
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
                <label class="text-sm font-black text-slate-900 uppercase tracking-tight">Emoji Representative</label>
                <div class="flex gap-2">
                  <input v-model="form.emoji" type="text" class="w-20 px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-center text-2xl" />
                  <div class="flex-1 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl flex items-center">Used as a visual identifier in maps and lists.</div>
                </div>
              </div>
              
              <div class="space-y-2 col-span-2">
                <label class="text-sm font-black text-slate-900 uppercase tracking-tight">Alternative Common Names (Separated by commas)</label>
                <div class="flex flex-wrap gap-2 mb-2" v-if="form.alternativeCommonNames.length">
                  <span v-for="(name, i) in form.alternativeCommonNames" :key="i" class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1">
                    {{ name }}
                    <button @click="form.alternativeCommonNames.splice(i, 1)" class="hover:text-rose-600">×</button>
                  </span>
                </div>
                <input 
                  type="text" 
                  placeholder="Type and press Enter to add..."
                  @keydown.enter.prevent="(e) => { 
                    const val = (e.target as HTMLInputElement).value.trim(); 
                    if (val) { form.alternativeCommonNames.push(val); (e.target as HTMLInputElement).value = ''; }
                  }"
                  class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl outline-none" 
                />
              </div>

              <div class="space-y-2 col-span-2">
                <label class="text-sm font-black text-slate-900 uppercase tracking-tight">Bibliographic References (Enter to add)</label>
                <div class="flex flex-wrap gap-2 mb-2" v-if="form.bibliographicReferences.length">
                  <span v-for="(ref, i) in form.bibliographicReferences" :key="i" class="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium italic border border-slate-200">
                    {{ ref }} <button @click="form.bibliographicReferences.splice(i, 1)" class="ml-1 text-slate-400 hover:text-rose-600">×</button>
                  </span>
                </div>
                <input 
                  type="text" 
                  @keydown.enter.prevent="(e) => { 
                    const v = (e.target as HTMLInputElement).value.trim(); 
                    if (v) { form.bibliographicReferences.push(v); (e.target as HTMLInputElement).value = ''; } 
                  }"
                  placeholder="e.g. FAO Species Fact Sheets: Engraulis ringens"
                  class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl outline-none focus:border-indigo-600" 
                />
              </div>

              <div class="space-y-2 col-span-2">
                <label class="text-sm font-black text-slate-900 uppercase tracking-tight">Fun Facts (Enter to add)</label>
                <div class="flex flex-wrap gap-2 mb-2" v-if="form.funFacts.length">
                  <span v-for="(fact, i) in form.funFacts" :key="i" class="px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold border border-amber-100">
                    💡 {{ fact }} <button @click="form.funFacts.splice(i, 1)" class="ml-1 text-amber-400 hover:text-rose-600">×</button>
                  </span>
                </div>
                <input 
                  type="text" 
                  @keydown.enter.prevent="(e) => { 
                    const v = (e.target as HTMLInputElement).value.trim(); 
                    if (v) { form.funFacts.push(v); (e.target as HTMLInputElement).value = ''; } 
                  }"
                  placeholder="e.g. It is the most captured marine species in the world."
                  class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl outline-none focus:border-indigo-600" 
                />
              </div>

              <div class="space-y-2 col-span-2">
                <label class="text-sm font-black text-slate-900 uppercase tracking-tight">General Description</label>
                <textarea v-model="form.generalDescription" rows="3" class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl outline-none focus:border-indigo-600"></textarea>
              </div>

              <div class="space-y-2 col-span-2">
                <label class="text-sm font-black text-slate-900 uppercase tracking-tight">Notes & Strategic Value</label>
                <textarea v-model="form.notes" rows="2" class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl outline-none focus:border-indigo-600"></textarea>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-black text-slate-900 uppercase tracking-tight">Completeness (%)</label>
                <input v-model.number="form.completeness" type="number" step="0.1" class="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl outline-none" />
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
                {{ saving ? 'Saving...' : 'Save All Basic Info' }}
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
                <input v-model="(form.taxonomy as any)[field]" type="text" class="w-full px-4 py-2 bg-white border-2 border-slate-300 rounded-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all text-slate-900" />
              </div>
            </div>
            <div class="pt-4 border-t border-slate-100 flex justify-end" v-if="!isNew">
              <button @click="handleSaveSection('taxonomy')" :disabled="saving" class="px-6 py-2 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 shadow-md">
                Save Taxonomy
              </button>
            </div>
          </section>
        </div>

        <div v-if="activeTab === 'biology'" class="space-y-6">
          <section class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">🔬 Biology & Life History</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">Diet / Eating Habits (Comma separated)</label>
                <div class="flex flex-wrap gap-2 mb-2" v-if="form.biology.diet.length">
                  <span v-for="(item, i) in form.biology.diet" :key="i" class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
                    {{ item }} <button @click="form.biology.diet.splice(i, 1)">×</button>
                  </span>
                </div>
                <input 
                  type="text" 
                  @keydown.enter.prevent="(e) => { const v = (e.target as HTMLInputElement).value.trim(); if (v) { form.biology.diet.push(v); (e.target as HTMLInputElement).value = ''; } }"
                  class="w-full px-4 py-2 bg-white border-2 border-slate-200 rounded-lg" 
                />
              </div>

              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">Reproduction Mode</label>
                <select v-model="form.biology.reproductionMode" class="w-full px-4 py-2 bg-white border-2 border-slate-200 rounded-lg text-slate-900 font-bold">
                  <option value="OVIPAROUS">Oviparous</option>
                  <option value="VIVIPAROUS">Viviparous</option>
                  <option value="OVOVIVIPAROUS">Ovoviviparous</option>
                  <option value="ASEXUAL">Asexual</option>
                  <option value="SEXUAL">Sexual</option>
                  <option value="HERMAFRODITA">Hermaphrodite</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-4 col-span-2">
                <div class="space-y-2">
                  <label class="text-xs font-black text-slate-600 uppercase">Avg Weight (kg)</label>
                  <input v-model.number="form.biology.averageWeightKg" type="number" step="0.01" class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg" />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-black text-slate-600 uppercase">Max Weight (kg)</label>
                  <input v-model.number="form.biology.maximumWeightKg" type="number" step="0.01" class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg" />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-black text-slate-600 uppercase">Avg Length (cm)</label>
                  <input v-model.number="form.biology.averageLengthCm" type="number" step="0.1" class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg" />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-black text-slate-600 uppercase">Max Length (cm)</label>
                  <input v-model.number="form.biology.maximumLengthCm" type="number" step="0.1" class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg" />
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">Trophic Level</label>
                <input v-model.number="form.biology.trophicLevel" type="number" step="0.1" class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg" />
              </div>
              <div class="space-y-2 flex items-center gap-4 pt-6">
                <label class="text-xs font-black text-slate-600 uppercase cursor-pointer flex items-center gap-2">
                  <input v-model="form.biology.migration" type="checkbox" class="w-5 h-5 accent-indigo-600" />
                  Migratory Species
                </label>
              </div>
            </div>
            <div class="pt-4 border-t border-slate-100 flex justify-end" v-if="!isNew">
              <button @click="handleSaveSection('biology')" :disabled="saving" class="px-6 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md hover:bg-slate-900 transition-all">
                Save Biology
              </button>
            </div>
          </section>
        </div>

        <div v-if="activeTab === 'habitat'" class="space-y-6">
          <section class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">🌊 Habitat & Environment</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">Habitat Type</label>
                <select v-model="form.habitat.type" class="w-full px-4 py-2 bg-white border-2 border-slate-200 rounded-lg font-bold">
                  <option value="PELAGIC">Pelagic</option>
                  <option value="BENTHIC">Benthic</option>
                  <option value="DEMERSAL">Demersal</option>
                  <option value="REEF">Reef</option>
                  <option value="ESTUARY">Estuary</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">Salinity (ppt)</label>
                <input v-model.number="form.habitat.salinityPpt" type="number" class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-xs font-black text-slate-600 uppercase">Min Depth (m)</label>
                  <input v-model.number="form.habitat.minDepthM" type="number" class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg" />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-black text-slate-600 uppercase">Max Depth (m)</label>
                  <input v-model.number="form.habitat.maxDepthM" type="number" class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-xs font-black text-slate-600 uppercase">Min Temp (°C)</label>
                  <input v-model.number="form.habitat.minTempC" type="number" class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg" />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-black text-slate-600 uppercase">Max Temp (°C)</label>
                  <input v-model.number="form.habitat.maxTempC" type="number" class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg" />
                </div>
              </div>
              <div class="space-y-2 col-span-2">
                <label class="text-xs font-black text-slate-600 uppercase">Substrate / Environment Details (Comma separated)</label>
                <div class="flex flex-wrap gap-2 mb-2" v-if="form.habitat.substrate.length">
                  <span v-for="(item, i) in form.habitat.substrate" :key="i" class="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                    {{ item }} <button @click="form.habitat.substrate.splice(i, 1)">×</button>
                  </span>
                </div>
                <input 
                  type="text" 
                  @keydown.enter.prevent="(e) => { const v = (e.target as HTMLInputElement).value.trim(); if (v) { form.habitat.substrate.push(v); (e.target as HTMLInputElement).value = ''; } }"
                  placeholder="e.g. Water column, Rocky reef..."
                  class="w-full px-4 py-2 bg-white border-2 border-slate-200 rounded-lg" 
                />
              </div>
            </div>
          </section>

          <section class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">🛡️ Conservation & Protection</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">IUCN Status</label>
                <select v-model="form.conservation.iucn" class="w-full px-4 py-2 bg-white border-2 border-slate-200 rounded-lg font-bold">
                  <option value="EX">Extinct (EX)</option>
                  <option value="EW">Extinct in the Wild (EW)</option>
                  <option value="CR">Critically Endangered (CR)</option>
                  <option value="EN">Endangered (EN)</option>
                  <option value="VU">Vulnerable (VU)</option>
                  <option value="NT">Near Threatened (NT)</option>
                  <option value="LC">Least Concern (LC)</option>
                  <option value="DD">Data Deficient (DD)</option>
                  <option value="NE">Not Evaluated (NE)</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">IUCN Evaluation Year</label>
                <input v-model.number="form.conservation.iucnYear" type="number" class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg" />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">Ecological Value</label>
                <select v-model="form.conservation.ecologicalValue" class="w-full px-4 py-2 bg-white border-2 border-slate-200 rounded-lg font-bold">
                  <option value="VERY_HIGH">Very High</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
              <div class="space-y-2 flex items-center gap-4 pt-6">
                <label class="text-xs font-black text-slate-600 uppercase cursor-pointer flex items-center gap-2">
                  <input v-model="form.conservation.protected" type="checkbox" class="w-5 h-5 accent-emerald-600" />
                  Legally Protected
                </label>
              </div>
              <div class="space-y-2 col-span-2">
                <label class="text-xs font-black text-slate-600 uppercase italic">Fishing Closure Months</label>
                <div class="grid grid-cols-4 md:grid-cols-6 gap-2">
                  <label v-for="m in ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']" :key="m" 
                    class="flex items-center gap-1 text-[10px] font-bold p-1 border rounded cursor-pointer transition-colors"
                    :class="form.conservation.closureMonths.includes(m) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-400 border-slate-200'"
                  >
                    <input type="checkbox" :value="m" v-model="form.conservation.closureMonths" class="hidden" />
                    {{ m }}
                  </label>
                </div>
              </div>
              <div class="space-y-2 col-span-2">
                <label class="text-xs font-black text-slate-600 uppercase">Legal Protection Notes</label>
                <textarea v-model="form.conservation.legalNotes" rows="2" class="w-full px-4 py-2 bg-white border-2 border-slate-200 rounded-lg"></textarea>
              </div>
            </div>
            <div class="pt-4 border-t border-slate-100 flex justify-end" v-if="!isNew">
              <button @click="handleSaveSection('habitat')" :disabled="saving" class="px-6 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md hover:bg-slate-900 transition-all">
                Save Hab/Cons
              </button>
            </div>
          </section>
        </div>

        <!-- Tab: Fishery -->
        <div v-if="activeTab === 'fishery'" class="space-y-6">
          <section class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">⚓ Fishery & Commercial Data</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2 col-span-2">
                <label class="text-xs font-black text-slate-600 uppercase">Commercial Value (Description)</label>
                <textarea v-model="form.fishery.commercialValue" rows="2" class="w-full px-4 py-2 bg-white border-2 border-slate-200 rounded-lg"></textarea>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">Annual Catch (Tons)</label>
                <input v-model.number="form.fishery.annualCatchTon" type="number" class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg" />
              </div>
              <div class="grid grid-cols-3 gap-2 py-4 items-center h-full">
                <label class="flex items-center gap-1 text-[10px] font-black uppercase text-slate-500 cursor-pointer italic">
                  <input v-model="form.fishery.artisanal" type="checkbox" class="w-4 h-4 accent-indigo-600" /> Artisanal
                </label>
                <label class="flex items-center gap-1 text-[10px] font-black uppercase text-slate-500 cursor-pointer italic">
                  <input v-model="form.fishery.industrial" type="checkbox" class="w-4 h-4 accent-indigo-600" /> Industrial
                </label>
                <label class="flex items-center gap-1 text-[10px] font-black uppercase text-slate-500 cursor-pointer italic">
                  <input v-model="form.fishery.aquariumTrade" type="checkbox" class="w-4 h-4 accent-indigo-600" /> Aquarium
                </label>
              </div>
              
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">Fishing Gears Used</label>
                <div class="flex flex-wrap gap-2 mb-2" v-if="form.fishery.fishingGears.length">
                  <span v-for="(gear, i) in form.fishery.fishingGears" :key="i" class="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-100">
                    {{ gear }} <button @click="form.fishery.fishingGears.splice(i, 1)">×</button>
                  </span>
                </div>
                <input 
                  type="text" 
                  @keydown.enter.prevent="(e) => { const v = (e.target as HTMLInputElement).value.trim(); if (v) { form.fishery.fishingGears.push(v); (e.target as HTMLInputElement).value = ''; } }"
                  placeholder="e.g. Purse seine, Trawling..."
                  class="w-full px-4 py-2 bg-white border-2 border-slate-200 rounded-lg" 
                />
              </div>

              <div class="space-y-2">
                <label class="text-xs font-black text-slate-600 uppercase">Main Landing Ports</label>
                <div class="flex flex-wrap gap-2 mb-2" v-if="form.fishery.mainPorts.length">
                  <span v-for="(port, i) in form.fishery.mainPorts" :key="i" class="px-2 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100">
                    {{ port }} <button @click="form.fishery.mainPorts.splice(i, 1)">×</button>
                  </span>
                </div>
                <input 
                  type="text" 
                  @keydown.enter.prevent="(e) => { const v = (e.target as HTMLInputElement).value.trim(); if (v) { form.fishery.mainPorts.push(v); (e.target as HTMLInputElement).value = ''; } }"
                  placeholder="e.g. Chimbote, Pisco..."
                  class="w-full px-4 py-2 bg-white border-2 border-slate-200 rounded-lg" 
                />
              </div>
            </div>
            <div class="pt-4 border-t border-slate-100 flex justify-end" v-if="!isNew">
              <button @click="handleSaveSection('fishery')" :disabled="saving" class="px-6 py-2 bg-indigo-800 text-white font-bold rounded-lg shadow-md hover:bg-indigo-900 transition-all">
                Save Fishery Info
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

