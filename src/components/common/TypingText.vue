<template>
  <span class="relative">
    <span
      ref="textRef"
      class="text-cyber-500 dark:text-cyber-400 font-mono"
      :class="{ 'typing-cursor': showCursor }"
    >
      {{ currentText }}
    </span>
    <span
      v-if="showCursor"
      class="text-cyber-500 dark:text-cyber-400 ml-1 animate-pulse"
    >
      |
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Props {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  showCursor?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  typeSpeed: 100,
  deleteSpeed: 50,
  pauseTime: 2000,
  showCursor: true,
});

const currentText = ref("");
const textRef = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
const isDeleting = ref(false);
let timeoutId: NodeJS.Timeout | null = null;

const type = () => {
  const currentWord = props.words[currentIndex.value];

  if (isDeleting.value) {
    // Deleting
    currentText.value = currentWord.substring(0, currentText.value.length - 1);

    if (currentText.value === "") {
      isDeleting.value = false;
      currentIndex.value = (currentIndex.value + 1) % props.words.length;
      timeoutId = setTimeout(type, props.typeSpeed);
    } else {
      timeoutId = setTimeout(type, props.deleteSpeed);
    }
  } else {
    // Typing
    currentText.value = currentWord.substring(0, currentText.value.length + 1);

    if (currentText.value === currentWord) {
      // Pause before deleting
      timeoutId = setTimeout(() => {
        isDeleting.value = true;
        type();
      }, props.pauseTime);
    } else {
      timeoutId = setTimeout(type, props.typeSpeed);
    }
  }
};

onMounted(() => {
  if (props.words.length > 0) {
    // Start typing after a short delay
    timeoutId = setTimeout(type, 500);
  }
});

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});
</script>

<style scoped>
.typing-cursor::after {
  content: "";
  display: inline-block;
  width: 3px;
  height: 1.2em;
  background-color: currentColor;
  margin-left: 2px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}
</style>
