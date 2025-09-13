<template>
    <div class="year-label">
        <div class="year" v-if="props.status ==='newly' || props.status ==='widely'"> 
            Baseline <span>{{ yearLabel }}</span>
        </div>

        <div class="label" :class="props.status">
        {{ props.label }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BaselineInfo } from '@baseline-banner/core'

const props = defineProps<{
    status: BaselineInfo['status']
    year: string | undefined
    label: string
}>()

const yearLabel = computed(() => {
    if (props.year) {
        return props.year
    }
    return ''
})

</script>
