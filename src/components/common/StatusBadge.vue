<template>
  <div class="status-badge" :class="statusClass">
    <div class="flex items-center gap-2">
      <div
        class="h-2 w-2 rounded-full"
        :class="dotClass"
        :style="{ animationDelay: `${animationDelay}ms` }"
      />
      <span class="text-sm font-medium">{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  status: "available" | "busy" | "offline";
  text: string;
  animationDelay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  animationDelay: 0,
});

const statusClass = computed(() => {
  switch (props.status) {
    case "available":
      return "status-available";
    case "busy":
      return "status-busy";
    case "offline":
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
  }
});

const dotClass = computed(() => {
  switch (props.status) {
    case "available":
      return "bg-matrix-500 animate-pulse";
    case "busy":
      return "bg-accent-500 animate-pulse";
    case "offline":
    default:
      return "bg-gray-500";
  }
});
</script>

<style scoped>
@reference "tailwindcss";

.status-badge {
  @apply inline-flex items-center rounded-full px-3 py-1 text-sm font-medium backdrop-blur-sm;
  @apply border border-white/20 dark:border-gray-700/50;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
