<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}>()

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-lg font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-opacity-90',
    secondary: 'bg-primary/10 text-primary hover:bg-primary/20',
    ghost: 'hover:bg-primary/5 text-slate-600 dark:text-slate-400',
    outline: 'border border-primary/20 text-primary hover:bg-primary hover:text-white'
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base'
  }
  return `${base} ${variants[props.variant || 'primary']} ${sizes[props.size || 'md']}`
})
</script>

<template>
  <button :class="buttonClasses">
    <slot />
  </button>
</template>
