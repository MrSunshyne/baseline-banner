<template>
    <div class="baseline-badge">
        <div class="baseline-icon">
            <svg v-if="props.status ==='limited'" viewBox="0 0 36 20">
                <path fill="var(--baseline-icon-limited-front)" d="M10 0L16 6L14 8L8 2L10 0Z"/>
                <path fill="var(--baseline-icon-limited-front)" d="M22 12L20 14L26 20L28 18L22 12Z"/>
                <path fill="var(--baseline-icon-limited-front)" d="M26 0L28 2L10 20L8 18L26 0Z"/>
                <path fill="var(--baseline-icon-limited-back)" d="M8 2L10 4L4 10L10 16L8 18L0 10L8 2Z"/>
                <path fill="var(--baseline-icon-limited-back)" d="M28 2L36 10L28 18L26 16L32 10L26 4L28 2Z"/>
            </svg>
            <svg v-if="props.status ==='widely'" viewBox="0 0 36 20">
                <path fill="var(--baseline-icon-widely-front)" d="M18 8L20 10L18 12L16 10L18 8Z"/>
                <path fill="var(--baseline-icon-widely-front)" d="M26 0L28 2L10 20L0 10L2 8L10 16L26 0Z"/>
                <path fill="var(--baseline-icon-widely-back)" d="M28 2L26 4L32 10L26 16L22 12L20 14L26 20L36 10L28 2Z"/>
                <path fill="var(--baseline-icon-widely-back)" d="M10 0L2 8L4 10L10 4L14 8L16 6L10 0Z"/>
            </svg>
            <svg v-if="props.status ==='newly'" viewBox="0 0 36 20">
                <path fill="var(--baseline-icon-newly-back)" d="m10 0 2 2-2 2-2-2 2-2Zm4 4 2 2-2 2-2-2 2-2Zm16 0 2 2-2 2-2-2 2-2Zm4 4 2 2-2 2-2-2 2-2Zm-4 4 2 2-2 2-2-2 2-2Zm-4 4 2 2-2 2-2-2 2-2Zm-4-4 2 2-2 2-2-2 2-2ZM6 4l2 2-2 2-2-2 2-2Z"/>
                <path fill="var(--baseline-icon-newly-front)" d="m26 0 2 2-18 18L0 10l2-2 8 8L26 0Z"/>
            </svg>
            <svg v-if="props.status ==='no_data'" viewBox="0 0 36 20">
                <path fill="var(--baseline-icon-no_data)" d="M18 8L20 10L18 12L16 10L18 8Z"/>
                <path fill="var(--baseline-icon-no_data)" d="M28 2L26 4L32 10L26 16L22 12L20 14L26 20L36 10L28 2Z"/>
                <path fill="var(--baseline-icon-no_data)" d="M10 0L2 8L4 10L10 4L14 8L16 6L10 0Z"/>
                <path fill="var(--baseline-icon-no_data)" d="M26 0L28 2L10 20L0 10L2 8L10 16L26 0Z"/>
            </svg>
        </div>

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
