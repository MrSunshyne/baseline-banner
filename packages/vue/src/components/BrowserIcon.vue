<template>
  <span class="browser-icon" :class="name">
    <svg v-if="name === 'chrome'" width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7" fill="#4285F4"/>
      <circle cx="8" cy="8" r="4" fill="white"/>
      <circle cx="8" cy="8" r="2" fill="#4285F4"/>
    </svg>
    <svg v-else-if="name === 'edge'" width="16" height="16" viewBox="0 0 16 16">
      <path d="M2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8Z" fill="#0078D4"/>
    </svg>
    <svg v-else-if="name === 'firefox'" width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7" fill="#FF7139"/>
      <path d="M5 6C5 4 6.5 3 8 3C9.5 3 11 4 11 6V10C11 12 9.5 13 8 13C6.5 13 5 12 5 10V6Z" fill="white"/>
    </svg>
    <svg v-else width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7" fill="#007AFF"/>
      <path d="M6 10C6 8.5 7 7.5 8 7.5C9 7.5 10 8.5 10 10V11C10 12.5 9 13.5 8 13.5C7 13.5 6 12.5 6 11V10Z" fill="white"/>
    </svg>
  </span>
</template>

<script setup lang="ts">
interface Props {
  name: string
}

defineProps<Props>()
</script>
