<template>
  <span class="baseline-icon" :class="support">
    <svg v-if="support === 'limited'" width="36" height="20" viewBox="0 0 36 20">
      <path d="M15 3L21 13H9L15 3Z" fill="var(--baseline-icon-limited-front)"/>
      <circle cx="27" cy="10" r="7" fill="var(--baseline-icon-limited-back)" stroke="none"/>
    </svg>
    <svg v-else-if="support === 'widely'" width="36" height="20" viewBox="0 0 36 20">
      <circle cx="9" cy="10" r="8" fill="var(--baseline-icon-widely-back)"/>
      <path d="M5 10L8 13L13 7" stroke="var(--baseline-icon-widely-front)" stroke-width="2" fill="none"/>
      <circle cx="27" cy="10" r="7" fill="var(--baseline-icon-widely-back)"/>
    </svg>
    <svg v-else-if="support === 'newly'" width="36" height="20" viewBox="0 0 36 20">
      <circle cx="9" cy="10" r="8" fill="var(--baseline-icon-newly-back)"/>
      <circle cx="9" cy="10" r="3" fill="var(--baseline-icon-newly-front)"/>
      <circle cx="27" cy="10" r="7" fill="var(--baseline-icon-newly-back)"/>
    </svg>
    <svg v-else width="36" height="20" viewBox="0 0 36 20">
      <circle cx="18" cy="10" r="8" fill="none" stroke="var(--baseline-icon-no-data)" stroke-width="2" stroke-dasharray="2,2"/>
      <text x="18" y="14" text-anchor="middle" font-size="12" fill="var(--baseline-icon-no-data)">?</text>
    </svg>
  </span>
</template>

<script setup lang="ts">
interface Props {
  support: string
}

defineProps<Props>()
</script>
