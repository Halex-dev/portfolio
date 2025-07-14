<template>
  <section id="projects" class="section bg-white dark:bg-gray-800">
    <div class="section-content">
      <!-- Header -->
      <div ref="headerRef" class="mb-16 text-center">
        <div class="mb-4 flex items-center justify-center gap-3">
          <div
            class="from-primary-500 to-secondary-500 h-1 w-12 rounded-full bg-gradient-to-r"
          ></div>
          <span
            class="text-primary-600 dark:text-primary-400 text-sm font-medium tracking-wider uppercase"
          >
            {{ t("projects.subtitle") }}
          </span>
          <div
            class="from-secondary-500 to-accent-500 h-1 w-12 rounded-full bg-gradient-to-r"
          ></div>
        </div>

        <h2 class="heading-lg mb-4 text-gray-900 dark:text-white">
          {{ t("projects.title") }}
        </h2>

        <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          {{ t("projects.description") }}
        </p>
      </div>

      <!-- Featured Project -->
      <div v-if="mainProject" ref="featuredRef" class="mb-20">
        <div class="featured-project">
          <div class="featured-badge">
            <Star class="h-4 w-4" />
            <span>{{ t("projects.featured") }}</span>
          </div>

          <div class="featured-content">
            <!-- Project Image/Preview -->
            <div class="featured-image">
              <div class="image-placeholder">
                <!-- Placeholder for project screenshot -->
                <div class="placeholder-content">
                  <Monitor class="h-16 w-16 text-gray-400" />
                  <p class="mt-2 text-sm text-gray-500">
                    {{ t("projects.imagePreview") }}
                  </p>
                </div>

                <!-- Overlay with quick actions -->
                <div class="image-overlay">
                  <button class="overlay-btn">
                    <ExternalLink class="h-5 w-5" />
                  </button>
                  <button class="overlay-btn">
                    <Github class="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Project Details -->
            <div class="featured-details">
              <div class="project-header">
                <h3 class="project-title">{{ t("projects.main.title") }}</h3>
                <div class="project-status">
                  <div class="status-dot bg-matrix-500"></div>
                  <span>{{ t("projects.main.status") }}</span>
                </div>
              </div>

              <p class="project-description">
                {{ t("projects.main.description") }}
              </p>

              <!-- Key Features -->
              <div class="project-features">
                <h4 class="features-title">{{ t("projects.keyFeatures") }}</h4>
                <ul class="features-list">
                  <li
                    v-for="feature in mainProjectFeatures"
                    :key="feature"
                    class="feature-item"
                  >
                    <CheckCircle
                      class="text-matrix-500 h-4 w-4 flex-shrink-0"
                    />
                    <span>{{ t(`projects.main.features.${feature}`) }}</span>
                  </li>
                </ul>
              </div>

              <!-- Tech Stack -->
              <div class="project-tech">
                <h4 class="tech-title">{{ t("projects.techStack") }}</h4>
                <div class="tech-stack">
                  <span
                    v-for="tech in mainProjectTech"
                    :key="tech.name"
                    class="tech-tag"
                    :style="{
                      backgroundColor: tech.color + '15',
                      color: tech.color,
                      borderColor: tech.color + '30',
                    }"
                  >
                    <component
                      v-if="tech.icon"
                      :is="tech.icon"
                      class="h-4 w-4"
                    />
                    <span>{{ tech.name }}</span>
                  </span>
                </div>
              </div>

              <!-- Project Links -->
              <div class="project-actions">
                <button class="btn btn-primary cyber-glow group">
                  <ExternalLink class="mr-2 h-4 w-4" />
                  <span>{{ t("projects.viewProject") }}</span>
                </button>
                <button class="btn btn-outline group">
                  <Github class="mr-2 h-4 w-4" />
                  <span>{{ t("projects.viewCode") }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Projects Grid -->
      <div ref="gridRef" class="mb-16">
        <h3
          v-if="mainProject"
          class="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white"
        >
          {{ t("projects.otherProjects") }}
        </h3>

        <div class="projects-grid">
          <div
            v-for="project in otherProjects"
            :key="project.id"
            class="project-card group"
            :class="{ 'project-card-concept': project.type === 'concept' }"
          >
            <!-- Project Header -->
            <div class="project-card-header">
              <div
                class="project-icon"
                :style="{
                  backgroundColor: project.color + '15',
                  color: project.color,
                }"
              >
                <component :is="project.icon" class="h-6 w-6" />
              </div>

              <div class="project-type">
                <span
                  class="type-badge"
                  :class="{
                    'type-badge-live': project.type === 'live',
                    'type-badge-concept': project.type === 'concept',
                    'type-badge-wip': project.type === 'wip',
                  }"
                >
                  {{ t(`projects.types.${project.type}`) }}
                </span>
              </div>
            </div>

            <!-- Project Content -->
            <div class="project-card-content">
              <h4 class="project-card-title">
                {{ t(`projects.items.${project.id}.title`) }}
              </h4>
              <p class="project-card-description">
                {{ t(`projects.items.${project.id}.description`) }}
              </p>

              <!-- Mini Tech Stack -->
              <div class="project-card-tech">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="mini-tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Project Footer -->
            <div class="project-card-footer">
              <div class="project-links">
                <!-- Live/Demo Link Button -->
                <a
                  v-if="project.type !== 'concept' && project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                  :title="t('projects.viewProject')"
                >
                  <ExternalLink class="h-4 w-4" />
                </a>

                <!-- Disabled Live Link for WIP projects -->
                <button
                  v-else-if="project.type === 'wip'"
                  class="project-link"
                  disabled
                  :title="t('projects.comingSoon')"
                >
                  <ExternalLink class="h-4 w-4" />
                </button>

                <!-- GitHub Repository Link -->
                <a
                  v-if="project.type !== 'concept' && project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                  :title="t('projects.viewCode')"
                >
                  <Github class="h-4 w-4" />
                </a>

                <!-- Concept Details Button -->
                <button
                  v-if="project.type === 'concept'"
                  class="project-link"
                  @click="showConceptDetails(project.id)"
                  :title="t('projects.viewDetails')"
                >
                  <Eye class="h-4 w-4" />
                </button>
              </div>
            </div>

            <!-- Concept Overlay -->
            <div v-if="project.type === 'concept'" class="concept-overlay">
              <div class="concept-content">
                <Lightbulb class="text-accent-500 mb-2 h-8 w-8" />
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ t("projects.conceptHint") }}
                </p>
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

import {
  otherProjects,
  mainProjectFeatures,
  mainProjectTech,
  mainProject,
} from "@/data/projects/projects";

// Icons
import {
  Star,
  Monitor,
  ExternalLink,
  Github,
  CheckCircle,
  Eye,
  Lightbulb,
  Rocket,
  ArrowRight,
  Mail,
} from "lucide-vue-next";

gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();

// Template refs
const headerRef = ref(null);
const featuredRef = ref(null);
const gridRef = ref(null);
const techRef = ref(null);

// Methods
const showConceptDetails = (projectId: string) => {
  // Show modal or expand details for concept projects
  console.log("Show concept details for:", projectId);
};

const scrollToContact = () => {
  const element = document.getElementById("contact");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Animations
onMounted(() => {
  // Header animation
  gsap.fromTo(
    headerRef.value?.children || [],
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headerRef.value,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Featured project animation
  gsap.fromTo(
    ".featured-project",
    { y: 100, opacity: 0, scale: 0.95 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: featuredRef.value,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Projects grid animation
  gsap.fromTo(
    ".project-card",
    { y: 50, opacity: 0, scale: 0.9 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: gridRef.value,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );
});
</script>

<style scoped>
@reference "@/assets/css/style.css";

/* Featured Project */
.featured-project {
  @apply relative rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100;
  @apply p-8 shadow-2xl dark:from-gray-800 dark:to-gray-900;
  @apply border border-gray-200 dark:border-gray-700;
}

.featured-badge {
  @apply absolute -top-4 left-8 flex items-center gap-2 rounded-full;
  @apply from-primary-500 to-secondary-500 bg-gradient-to-r px-4 py-2;
  @apply text-sm font-medium text-white shadow-lg;
}

.featured-content {
  @apply grid gap-8 lg:grid-cols-2 lg:gap-12;
}

/* Featured Image */
.featured-image {
  @apply relative;
}

.image-placeholder {
  @apply relative aspect-video rounded-xl bg-gray-200 dark:bg-gray-700;
  @apply flex items-center justify-center overflow-hidden;
  @apply border-2 border-dashed border-gray-300 dark:border-gray-600;
}

.placeholder-content {
  @apply text-center;
}

.image-overlay {
  @apply absolute inset-0 flex items-center justify-center gap-4;
  @apply bg-black/80 opacity-0 transition-opacity duration-300;
  @apply rounded-xl hover:opacity-100;
}

.overlay-btn {
  @apply rounded-full bg-white/20 p-3 text-white backdrop-blur-sm;
  @apply transition-all duration-200 hover:scale-110 hover:bg-white/30;
}

/* Featured Details */
.featured-details {
  @apply space-y-6;
}

.project-header {
  @apply flex items-start justify-between;
}

.project-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white;
}

.project-status {
  @apply flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400;
}

.status-dot {
  @apply h-2 w-2 animate-pulse rounded-full;
}

.project-description {
  @apply leading-relaxed text-gray-600 dark:text-gray-300;
}

/* Features */
.features-title {
  @apply mb-3 text-lg font-semibold text-gray-900 dark:text-white;
}

.features-list {
  @apply space-y-2;
}

.feature-item {
  @apply flex items-start gap-3 text-gray-600 dark:text-gray-300;
}

/* Tech Stack */
.tech-title {
  @apply mb-3 text-lg font-semibold text-gray-900 dark:text-white;
}

.tech-stack {
  @apply flex flex-wrap gap-2;
}

.tech-tag {
  @apply flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium;
}

/* Project Actions */
.project-actions {
  @apply flex flex-wrap gap-4;
}

/* Projects Grid */
.projects-grid {
  @apply grid gap-6 sm:grid-cols-2 lg:grid-cols-4;
}

.project-card {
  @apply relative rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800;
  @apply border border-gray-200 dark:border-gray-700;
  @apply transition-all duration-300 hover:scale-105 hover:shadow-xl;
  @apply overflow-hidden;
}

.project-card-concept {
  @apply border-dashed border-gray-300 dark:border-gray-600;
}

.project-card-header {
  @apply mb-4 flex items-center justify-between;
}

.project-icon {
  @apply flex h-10 w-10 items-center justify-center rounded-lg;
}

.type-badge {
  @apply rounded-full px-2 py-1 text-xs font-medium;
}

.type-badge-live {
  @apply bg-matrix-100 text-matrix-800 dark:bg-matrix-900/30 dark:text-matrix-400;
}

.type-badge-wip {
  @apply bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-400;
}

.type-badge-concept {
  @apply bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400;
}

.project-card-content {
  @apply mb-4 space-y-3;
}

.project-card-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.project-card-description {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

.project-card-tech {
  @apply flex flex-wrap gap-1;
}

.mini-tech-tag {
  @apply rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700;
  @apply text-gray-600 dark:text-gray-400;
}

.project-card-footer {
  @apply flex justify-end;
}

.project-links {
  @apply flex gap-2;
}

.project-link {
  @apply rounded-lg p-2 text-gray-600 dark:text-gray-400;
  @apply hover:bg-gray-100 dark:hover:bg-gray-700;
  @apply hover:text-primary-600 dark:hover:text-primary-400;
  @apply transition-colors disabled:cursor-not-allowed disabled:opacity-50;
}

/* Concept Overlay */
.concept-overlay {
  @apply absolute inset-0 flex items-center justify-center;
  @apply bg-white/90 backdrop-blur-sm dark:bg-gray-800/90;
  @apply opacity-0 transition-opacity duration-300 group-hover:opacity-100;
}

.concept-content {
  @apply text-center;
}

.btn-outline-white {
  @apply border-2 border-white/30 text-white hover:bg-white/10;
  @apply focus:ring-white/50;
}

/* Responsive */
@media (max-width: 1023px) {
  .featured-content {
    @apply grid-cols-1;
  }

  .projects-grid {
    @apply grid-cols-1 sm:grid-cols-2;
  }
}

@media (max-width: 640px) {
  .featured-project {
    @apply p-4;
  }

  .project-card {
    @apply p-4;
  }
}
</style>
