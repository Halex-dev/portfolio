<template>
  <div
    class="pattern-hexagon relative flex min-h-screen items-center justify-center overflow-hidden"
  >
    <!-- Enhanced Background Effects -->
    <div
      class="via-primary-50/30 to-secondary-50/30 dark:via-primary-950/50 dark:to-secondary-950/50 absolute inset-0 bg-gradient-to-br from-gray-50 dark:from-gray-900"
    />

    <!-- Geometric Patterns Overlay -->
    <div class="pattern-dots absolute inset-0 opacity-20 dark:opacity-10" />

    <!-- Particle Background -->
    <ParticleBackground />

    <!-- Floating Elements -->
    <div class="absolute top-20 left-10 hidden lg:block">
      <div
        class="float-animation bg-cyber-500/10 rounded-lg p-4 backdrop-blur-sm"
      >
        <Code2 class="text-cyber-500 h-8 w-8" />
      </div>
    </div>

    <div class="absolute right-10 bottom-20 hidden lg:block">
      <div
        class="float-animation bg-matrix-500/10 rounded-lg p-4 backdrop-blur-sm"
        style="animation-delay: 1s"
      >
        <Shield class="text-matrix-500 h-8 w-8" />
      </div>
    </div>

    <div class="absolute bottom-32 left-1/4 hidden xl:block">
      <div
        class="float-animation bg-accent-500/10 rounded-lg p-4 backdrop-blur-sm"
        style="animation-delay: 2s"
      >
        <Server class="text-accent-500 h-8 w-8" />
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8"
    >
      <!-- Status Badge -->
      <div ref="statusRef" class="mb-6 flex justify-center">
        <StatusBadge
          status="available"
          :text="t('home.status')"
          :animation-delay="0"
        />
      </div>

      <!-- Greeting -->
      <h2
        ref="greetingRef"
        class="text-lg font-medium text-gray-600 sm:text-xl md:text-2xl dark:text-gray-400"
      >
        {{ t("home.greeting") }}
      </h2>

      <!-- Name with Gradient -->
      <h1 ref="nameRef" class="heading-xl text-gradient mt-2 mb-4">
        {{ t("home.name") }}
      </h1>

      <!-- Dynamic Profession with Typing Effect -->
      <div ref="professionRef" class="mb-6">
        <div
          class="text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl dark:text-white"
        >
          <TypingText
            :words="typingWords"
            :type-speed="100"
            :delete-speed="50"
            :pause-time="2000"
          />
        </div>
      </div>

      <!-- Tagline -->
      <p
        ref="taglineRef"
        class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl dark:text-gray-300"
      >
        {{ t("home.tagline") }}
      </p>

      <!-- Quick Stats -->
      <div
        ref="statsRef"
        class="mb-8 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8"
      >
        <div class="stat-card group">
          <div class="flex items-center gap-2">
            <FolderOpen
              class="text-primary-500 group-hover:text-primary-600 h-5 w-5 transition-colors"
            />
            <div class="text-left">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                1+
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ t("home.stats.projects") }}
              </div>
            </div>
          </div>
        </div>

        <div class="stat-card group">
          <div class="flex items-center gap-2">
            <Award
              class="text-matrix-500 group-hover:text-matrix-600 h-5 w-5 transition-colors"
            />
            <div class="text-left">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                1
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ t("home.stats.certification") }}
              </div>
            </div>
          </div>
        </div>

        <div class="stat-card group">
          <div class="flex items-center gap-2">
            <Target
              class="text-accent-500 group-hover:text-accent-600 h-5 w-5 transition-colors"
            />
            <div class="text-left">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                3
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ t("home.stats.specializations") }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Actions -->
      <div
        ref="ctaRef"
        class="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <button @click="downloadCV" class="btn btn-outline group">
          <Download class="mr-2 h-4 w-4" />
          <span>{{ t("home.cta.cv") }}</span>
        </button>
      </div>

      <!-- Scroll Indicator -->
      <div ref="scrollRef" class="flex justify-center">
        <div class="scroll-indicator">
          <ChevronDown class="h-6 w-6 animate-bounce text-gray-400" />
          <span class="sr-only">{{ t("home.scrollDown") }}</span>
        </div>
      </div>
    </div>

    <!-- Terminal Window Decoration (Hidden on mobile) -->
    <div class="absolute bottom-8 left-8 hidden lg:block">
      <div class="terminal-style max-w-sm">
        <div class="mb-2 flex items-center gap-2">
          <div class="h-3 w-3 rounded-full bg-red-500"></div>
          <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div class="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div class="font-mono text-xs">
          <span class="text-matrix-400">$</span>
          <span class="ml-1 text-white">whoami</span><br />
          <span class="text-matrix-400">{{ t("home.terminal.developer") }}</span
          ><br />
          <span class="text-matrix-400">$</span>
          <span class="ml-1 text-white">status</span><br />
          <span class="text-matrix-400">{{
            t("home.terminal.available")
          }}</span>
          <span class="animate-pulse">█</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, onMounted, computed } from "vue";
import { gsap } from "gsap";

// Components
import ParticleBackground from "@/components/common/ParticleBackground.vue";
import TypingText from "@/components/common/TypingText.vue";
import StatusBadge from "@/components/common/StatusBadge.vue";

// Icons (assumendo Lucide Vue)
import {
  ArrowRight,
  Download,
  Mail,
  ChevronDown,
  Code2,
  Shield,
  Server,
  FolderOpen,
  Award,
  Target,
} from "lucide-vue-next";

const { t } = useI18n();

// Animation references
const statusRef = ref(null);
const greetingRef = ref(null);
const nameRef = ref(null);
const professionRef = ref(null);
const taglineRef = ref(null);
const statsRef = ref(null);
const ctaRef = ref(null);
const scrollRef = ref(null);

// Typing words for profession
const typingWords = computed(() => [
  t("home.profession.backend"),
  t("home.profession.devops"),
  t("home.profession.security"),
]);

const downloadCV = () => {
  // Implementa il download del CV
  console.log("Download CV");
};

// Enhanced animations
onMounted(() => {
  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.8,
    },
  });

  timeline
    .from(statusRef.value, {
      y: -20,
      opacity: 0,
      scale: 0.8,
    })
    .from(
      greetingRef.value,
      {
        y: 20,
        opacity: 0,
      },
      "-=0.6",
    )
    .from(
      nameRef.value,
      {
        y: 30,
        opacity: 0,
        scale: 0.95,
      },
      "-=0.5",
    )
    .from(
      professionRef.value,
      {
        y: 20,
        opacity: 0,
      },
      "-=0.4",
    )
    .from(
      taglineRef.value,
      {
        y: 20,
        opacity: 0,
      },
      "-=0.3",
    )
    .from(
      statsRef.value?.children || [],
      {
        y: 20,
        opacity: 0,
        stagger: 0.1,
      },
      "-=0.2",
    )
    .from(
      ctaRef.value?.children || [],
      {
        y: 20,
        opacity: 0,
        stagger: 0.1,
      },
      "-=0.1",
    )
    .from(
      scrollRef.value,
      {
        y: 10,
        opacity: 0,
      },
      "-=0.1",
    );

  // Floating elements animation
  gsap.to(".float-animation", {
    y: -10,
    duration: 3,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    stagger: 0.5,
  });
});
</script>

<style scoped>
@reference "tailwindcss";

.stat-card {
  @apply rounded-lg border border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80;
  @apply p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg;
  @apply hover:bg-white dark:hover:bg-gray-800;
}

.scroll-indicator {
  @apply cursor-pointer rounded-full p-2 transition-colors;
  @apply hover:bg-gray-100 dark:hover:bg-gray-800;
}

.text-gradient {
  background: linear-gradient(
    135deg,
    var("colors.primary.500") 0%,
    var("colors.secondary.500") 50%,
    var("colors.accent.500") 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .stat-card {
    @apply p-3;
  }

  .terminal-style {
    @apply hidden;
  }
}

/* Enhanced hover effects */
.btn:hover {
  transform: translateY(-2px) scale(1.02);
}

.cyber-glow:hover {
  box-shadow:
    0 0 20px var("colors.cyber.500/30"),
    0 10px 25px var("colors.cyber.500/20");
}

.matrix-glow:hover {
  box-shadow:
    0 0 20px var("colors.matrix.500/30"),
    0 10px 25px var("colors.matrix.500/20");
}
</style>
