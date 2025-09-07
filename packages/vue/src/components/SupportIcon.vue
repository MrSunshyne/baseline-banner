<template>
  <span class="support-icon" :class="status">
    <svg v-if="status === 'available'" width="12" height="12" viewBox="0 0 12 12">
      <circle cx="6" cy="6" r="5" fill="currentColor"/>
      <path d="M3 6L5 8L9 4" stroke="white" stroke-width="1.5" fill="none"/>
    </svg>
    <svg v-else-if="status === 'unavailable'" width="12" height="12" viewBox="0 0 12 12">
      <circle cx="6" cy="6" r="5" fill="currentColor"/>
      <path d="M4 4L8 8M8 4L4 8" stroke="white" stroke-width="1.5"/>
    </svg>
    <svg v-else width="12" height="12" viewBox="0 0 12 12">
      <circle cx="6" cy="6" r="5" fill="currentColor"/>
      <text x="6" y="8" text-anchor="middle" font-size="8" fill="white">?</text>
    </svg>
  </span>
</template>

<script setup lang="ts">
interface Props {
  status: string
}

defineProps<Props>()
</script>
