<template>
  <section id="about" class="section pattern-dots bg-gray-50 dark:bg-gray-900">
    <div class="section-content">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <!-- Left Column - Profile & Visual -->
        <div
          ref="leftColumnRef"
          class="flex flex-col items-center lg:items-start"
        >
          <!-- Profile Image -->
          <div class="profile-container group">
            <div class="profile-image-wrapper">
              <div class="profile-image">
                <!-- Placeholder for actual image -->
                <div
                  class="from-primary-500 to-secondary-500 flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br"
                >
                  <img
                    src="/about/me.webp"
                    alt="Foto Profilo - Developer Backend & Cybersecurity Specialist"
                    class="profile-photo h-full w-full rounded-full object-cover"
                    loading="lazy"
                  />
                </div>

                <!-- Tech Icons Floating -->
                <div class="floating-icon floating-icon-1">
                  <Code2 class="text-primary-500 h-4 w-4" />
                </div>
                <div class="floating-icon floating-icon-2">
                  <Shield class="text-matrix-500 h-4 w-4" />
                </div>
                <div class="floating-icon floating-icon-3">
                  <Server class="text-accent-500 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Facts -->
          <div class="mt-8 space-y-4 text-center lg:text-left">
            <div class="quick-fact">
              <MapPin class="h-4 w-4 text-gray-500" />
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ t("about.location") }}
              </span>
            </div>

            <div class="quick-fact">
              <Award class="text-matrix-500 h-4 w-4" />
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ t("about.certification") }}
              </span>
            </div>

            <div class="quick-fact">
              <Popcorn class="text-accent-500 h-4 w-4" />
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ t("about.motivation") }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right Column - Content -->
        <div ref="rightColumnRef" class="space-y-8">
          <!-- Header -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div
                class="from-primary-500 to-secondary-500 h-1 w-12 rounded-full bg-gradient-to-r"
              ></div>
              <span
                class="text-primary-600 dark:text-primary-400 text-sm font-medium tracking-wider uppercase"
              >
                {{ t("about.subtitle") }}
              </span>
            </div>

            <h2 class="heading-lg text-gray-900 dark:text-white">
              {{ t("about.title") }}
            </h2>
          </div>

          <!-- Main Description -->
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <p class="leading-relaxed text-gray-600 dark:text-gray-300">
              {{ t("about.description.intro") }}
            </p>

            <p class="leading-relaxed text-gray-600 dark:text-gray-300">
              {{ t("about.description.journey") }}
            </p>

            <p class="leading-relaxed text-gray-600 dark:text-gray-300">
              {{ t("about.description.philosophy") }}
            </p>
          </div>

          <!-- Highlights Grid -->
          <div class="grid gap-6 sm:grid-cols-3">
            <div
              v-for="(highlight, index) in highlights"
              :key="highlight.key"
              ref="highlightRefs"
              class="highlight-card group"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="highlight-icon">
                <component
                  :is="highlight.icon"
                  class="h-6 w-6"
                  :class="highlight.iconColor"
                />
              </div>

              <h3 class="highlight-title">
                {{ t(`about.highlights.${highlight.key}.title`) }}
              </h3>

              <p class="highlight-description">
                {{ t(`about.highlights.${highlight.key}.description`) }}
              </p>
            </div>
          </div>

          <!-- Tech Philosophy -->
          <div class="tech-philosophy">
            <div class="tech-philosophy-content">
              <h3
                class="mb-4 text-xl font-semibold text-gray-900 dark:text-white"
              >
                {{ t("about.philosophy.title") }}
              </h3>

              <div class="space-y-3">
                <div
                  v-for="principle in techPrinciples"
                  :key="principle"
                  class="tech-principle"
                >
                  <CheckCircle class="text-matrix-500 h-5 w-5 flex-shrink-0" />
                  <span class="text-gray-600 dark:text-gray-300">
                    {{ t(`about.philosophy.principles.${principle}`) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Icons
import {
  User,
  Code2,
  Shield,
  Server,
  MapPin,
  Award,
  Popcorn,
  GraduationCap,
  Heart,
  Target,
  CheckCircle,
  Mail,
  ArrowRight,
  FolderOpen,
} from "lucide-vue-next";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();

// Template refs
const leftColumnRef = ref(null);
const rightColumnRef = ref(null);
const highlightRefs = ref([]);

// Highlights data
const highlights = [
  {
    key: "education",
    icon: GraduationCap,
    iconColor: "text-primary-500",
  },
  {
    key: "passion",
    icon: Heart,
    iconColor: "text-matrix-500",
  },
  {
    key: "approach",
    icon: Target,
    iconColor: "text-accent-500",
  },
];

// Tech principles
const techPrinciples = [
  "securityFirst",
  "cleanCode",
  "continuousLearning",
  "problemSolving",
];

// Navigation methods
const scrollToContact = () => {
  const element = document.getElementById("contact");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToProjects = () => {
  const element = document.getElementById("projects");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Animations
onMounted(() => {
  // Profile image animation
  gsap.fromTo(
    ".profile-image",
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: leftColumnRef.value,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Floating icons
  gsap.to(".floating-icon", {
    rotation: 360,
    duration: 20,
    ease: "none",
    repeat: -1,
  });

  gsap.to(".floating-icon-1", {
    y: -10,
    duration: 2,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
  });

  gsap.to(".floating-icon-2", {
    y: -15,
    duration: 2.5,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    delay: 0.5,
  });

  gsap.to(".floating-icon-3", {
    y: -8,
    duration: 3,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    delay: 1,
  });

  // Content animations
  gsap.fromTo(
    rightColumnRef.value?.children || [],
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: rightColumnRef.value,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Highlight cards
  gsap.fromTo(
    ".highlight-card",
    {
      y: 30,
      opacity: 0,
      scale: 0.95,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".highlight-card",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );
});
</script>

<style scoped>
@reference "@/assets/css/style.css";

/* Profile Section */
.profile-container {
  @apply relative;
}

.profile-image-wrapper {
  @apply relative;
}

.profile-image {
  @apply relative h-48 w-48 rounded-full shadow-xl;
  @apply ring-4 ring-white dark:ring-gray-800;
  @apply transition-all duration-300 group-hover:scale-105;
}

.floating-icon {
  @apply absolute flex h-8 w-8 items-center justify-center rounded-full;
  @apply bg-white shadow-lg ring-2 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700;
}

.floating-icon-1 {
  @apply -top-2 -right-2;
}

.floating-icon-2 {
  @apply -bottom-2 -left-2;
}

.floating-icon-3 {
  @apply top-1/2 -right-4;
}

/* Quick Facts */
.quick-fact {
  @apply flex items-center gap-2;
}

/* Highlight Cards */
.highlight-card {
  @apply rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800;
  @apply border border-gray-200 dark:border-gray-700;
  @apply transition-all duration-300 hover:scale-105 hover:shadow-xl;
  @apply hover:border-primary-200 dark:hover:border-primary-700;
}

.highlight-icon {
  @apply mb-4 flex h-12 w-12 items-center justify-center rounded-lg;
  @apply bg-gray-100 transition-transform group-hover:scale-110 dark:bg-gray-700;
}

.highlight-title {
  @apply mb-2 text-lg font-semibold text-gray-900 dark:text-white;
}

.highlight-description {
  @apply text-sm leading-relaxed text-gray-600 dark:text-gray-300;
}

/* Tech Philosophy */
.tech-philosophy {
  @apply from-primary-50 to-secondary-50 rounded-xl bg-gradient-to-br;
  @apply dark:from-primary-950/20 dark:to-secondary-950/20;
  @apply border-primary-200/50 dark:border-primary-800/50 border p-6;
}

.tech-philosophy-content {
  @apply relative;
}

.tech-principle {
  @apply flex items-start gap-3;
}

/* CTA Section */
.cta-section {
  @apply rounded-xl bg-gradient-to-r from-gray-900 to-gray-800;
  @apply p-8 text-white dark:from-gray-800 dark:to-gray-900;
}

.cta-content h3 {
  @apply text-white;
}

.cta-content p {
  @apply text-gray-300;
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .profile-image {
    @apply h-40 w-40;
  }

  .floating-icon {
    @apply h-6 w-6;
  }

  .floating-icon .lucide {
    @apply h-3 w-3;
  }
}

@media (max-width: 639px) {
  .highlight-card {
    @apply p-4;
  }

  .tech-philosophy,
  .cta-section {
    @apply p-4;
  }
}

/* Animations */
@keyframes float-gentle {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.profile-image:hover .floating-icon {
  animation: float-gentle 2s ease-in-out infinite;
}
</style>
