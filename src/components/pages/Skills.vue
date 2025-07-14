<template>
  <section id="skills" class="section bg-white dark:bg-gray-800">
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
            {{ t("skills.subtitle") }}
          </span>
          <div
            class="from-secondary-500 to-accent-500 h-1 w-12 rounded-full bg-gradient-to-r"
          ></div>
        </div>

        <h2 class="heading-lg mb-4 text-gray-900 dark:text-white">
          {{ t("skills.title") }}
        </h2>

        <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          {{ t("skills.description") }}
        </p>
      </div>

      <!-- Category Filters -->
      <div ref="filtersRef" class="mb-12 flex flex-wrap justify-center gap-4">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="setActiveCategory(category.id)"
          class="category-filter"
          :class="{ 'category-filter-active': activeCategory === category.id }"
        >
          <component :is="category.icon" class="h-4 w-4" />
          <span>{{ t(`skills.categories.${category.id}`) }}</span>
          <span class="category-count">{{ getSkillsCount(category.id) }}</span>
        </button>
      </div>

      <!-- Skills Grid -->
      <div ref="skillsGridRef" class="skills-grid">
        <transition-group
          name="skill-card"
          tag="div"
          class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="skill in filteredSkills"
            :key="skill.name"
            class="skill-card group"
            :style="{ animationDelay: `${skill.delay}ms` }"
          >
            <!-- Skill Icon -->
            <div class="skill-icon-wrapper">
              <div
                class="skill-icon"
                :style="{
                  backgroundColor: skill.color + '15',
                  color: skill.color,
                }"
              >
                <component v-if="skill.icon" :is="skill.icon" class="h-8 w-8" />
                <div
                  v-else
                  class="skill-text-icon"
                  :style="{ color: skill.color }"
                >
                  {{ skill.name.substring(0, 2).toUpperCase() }}
                </div>
              </div>

              <!-- Badge piccolo in alto a destra -->
              <div class="skill-level-badge-corner">
                <div
                  class="skill-badge-small"
                  :style="{
                    background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}25)`,
                    borderColor: `${skill.color}30`,
                    color: skill.color,
                  }"
                >
                  <span class="skill-badge-text-small">{{ skill.level }}%</span>
                  <div
                    class="skill-badge-dot"
                    :style="{ background: skill.color }"
                  />
                </div>
              </div>
            </div>

            <!-- Skill Info -->
            <div class="skill-info">
              <h3 class="skill-name">{{ skill.name }}</h3>
              <p class="skill-description">{{ skill.description }}</p>

              <!-- Skill Tags -->
              <div class="skill-tags">
                <span v-for="tag in skill.tags" :key="tag" class="skill-tag">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Certifications -->
      <div ref="certificationsRef" class="mt-20">
        <div class="mb-12 text-center">
          <h3 class="heading-sm mb-4 text-gray-900 dark:text-white">
            {{ t("skills.certifications.title") }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ t("skills.certifications.subtitle") }}
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="cert in certifications"
            :key="cert.name"
            class="certification-card group"
          >
            <div class="certification-icon">
              <component :is="cert.icon" class="text-matrix-500 h-8 w-8" />
            </div>

            <div class="certification-info">
              <h4 class="certification-name">{{ cert.name }}</h4>
              <p class="certification-issuer">{{ cert.issuer }}</p>
              <p class="certification-date">{{ cert.date }}</p>
            </div>

            <div class="certification-actions">
              <div class="certification-badge">
                <Shield class="text-matrix-500 h-5 w-5" />
              </div>
              <a
                v-if="cert.downloadUrl"
                :href="cert.downloadUrl"
                download
                class="download-btn group-hover:opacity-100 opacity-0 transition-opacity duration-200"
                title="Download Certificate"
              >
                <Download class="text-matrix-500 hover:text-matrix-400 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Learning Path -->
      <div ref="learningRef" class="mt-20">
        <div class="learning-section">
          <div class="learning-content">
            <div class="learning-header">
              <Target class="text-accent-500 h-8 w-8" />
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ t("skills.learning.title") }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t("skills.learning.subtitle") }}
                </p>
              </div>
            </div>

            <div class="learning-items">
              <div
                v-for="item in learningPath"
                :key="item"
                class="learning-item"
              >
                <BookOpen class="text-accent-500 h-4 w-4 flex-shrink-0" />
                <span class="text-gray-700 dark:text-gray-300">
                  {{ t(`skills.learning.items.${item}`) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Icons
import { Shield, Target, BookOpen, Download } from "lucide-vue-next";

import { skills, categories } from "@/data/skills/skills";
import certifications from "@/data/skills/certificates";
import { learningPath } from "@/data/skills/learning";

gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();

// Reactive state
const headerRef = ref(null);
const filtersRef = ref(null);
const skillsGridRef = ref(null);
const certificationsRef = ref(null);
const learningRef = ref(null);
const activeCategory = ref("all");

// Computed
const filteredSkills = computed(() => {
  if (activeCategory.value === "all") {
    return skills.map((skill, index) => ({
      ...skill,
      delay: index * 50,
    }));
  }
  return skills
    .filter((skill) => skill.category === activeCategory.value)
    .map((skill, index) => ({
      ...skill,
      delay: index * 50,
    }));
});

const getSkillsCount = (categoryId: string) => {
  if (categoryId === "all") return skills.length;
  return skills.filter((skill) => skill.category === categoryId).length;
};

// Methods
const setActiveCategory = (categoryId: string) => {
  activeCategory.value = categoryId;
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

  // Filters animation
  gsap.fromTo(
    ".category-filter",
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: filtersRef.value,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Skills cards animation
  gsap.fromTo(
    ".skill-card",
    { y: 50, opacity: 0, scale: 0.9 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: skillsGridRef.value,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Certifications animation
  gsap.fromTo(
    ".certification-card",
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: certificationsRef.value,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Learning section animation
  gsap.fromTo(
    learningRef.value,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: learningRef.value,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );
});
</script>

<style scoped>
@reference "@/assets/css/style.css";

/* Category Filters */
.category-filter {
  @apply flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium;
  @apply bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300;
  @apply transition-all duration-300 hover:scale-105;
  @apply hover:bg-primary-100 dark:hover:bg-primary-900/30;
  @apply hover:text-primary-600 dark:hover:text-primary-400;
}

.category-filter-active {
  @apply bg-primary-500 text-white shadow-lg;
  @apply hover:bg-primary-600;
}

.category-count {
  @apply ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs;
}

/* Skills Grid */
.skills-grid {
  @apply relative;
}

.skill-card {
  @apply relative rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800;
  @apply border border-gray-200 dark:border-gray-700;
  @apply transition-all duration-300 hover:scale-105 hover:shadow-xl;
  @apply hover:border-primary-200 dark:hover:border-primary-700;
  @apply cursor-pointer overflow-hidden;
}

.skill-icon-wrapper {
  @apply relative mb-4 flex items-center justify-center;
}

.skill-icon {
  @apply flex h-16 w-16 items-center justify-center rounded-xl;
  @apply transition-transform duration-300 group-hover:scale-110;
}

.skill-text-icon {
  @apply text-xl font-bold;
}

.skill-level-ring {
  @apply absolute -top-1 -right-1 h-8 w-8;
}

.skill-level-svg {
  @apply h-full w-full -rotate-90 transform;
}

.skill-level-bg {
  @apply fill-none stroke-gray-200 dark:stroke-gray-600;
  stroke-width: 3;
}

.skill-level-progress {
  @apply fill-none;
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dasharray 1s ease-in-out;
}

.skill-level-text {
  @apply absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300;
}

.skill-info {
  @apply relative z-10;
}

.skill-name {
  @apply mb-2 text-lg font-semibold text-gray-900 dark:text-white;
}

.skill-description {
  @apply mb-3 text-sm text-gray-600 dark:text-gray-400;
}

.skill-tags {
  @apply flex flex-wrap gap-1;
}

.skill-tag {
  @apply rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700;
  @apply text-gray-600 dark:text-gray-400;
}

/* Badge piccolo in alto a destra */
.skill-level-badge-corner {
  @apply absolute -top-1 -right-1 z-10;
}

.skill-badge-small {
  @apply inline-flex items-center gap-1 rounded-lg border px-2 py-1;
  @apply backdrop-blur-sm transition-all duration-200;
  @apply hover:scale-105 hover:shadow-md;
  @apply text-xs;
}

.skill-badge-text-small {
  @apply leading-none font-bold;
  font-variant-numeric: tabular-nums;
  font-size: 10px;
}

.skill-badge-dot {
  @apply h-1.5 w-1.5 rounded-full;
  box-shadow: 0 0 4px currentColor;
}

/* Certifications */
.certification-card {
  @apply flex items-center gap-4 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800;
  @apply border border-gray-200 dark:border-gray-700;
  @apply transition-all duration-300 hover:scale-105 hover:shadow-xl;
  @apply hover:border-matrix-200 dark:hover:border-matrix-700;
}

.certification-icon {
  @apply flex h-12 w-12 items-center justify-center rounded-lg;
  @apply bg-matrix-100 dark:bg-matrix-900/30;
}

.certification-info {
  @apply flex-1;
}

.certification-name {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.certification-issuer {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

.certification-date {
  @apply text-xs text-gray-500 dark:text-gray-500;
}

.certification-actions {
  @apply flex items-center gap-2;
}

.certification-badge {
  @apply flex h-8 w-8 items-center justify-center rounded-full;
  @apply bg-matrix-100 dark:bg-matrix-900/30;
}

.download-btn {
  @apply flex h-8 w-8 items-center justify-center rounded-full;
  @apply bg-matrix-100 dark:bg-matrix-900/30;
  @apply hover:bg-matrix-200 dark:hover:bg-matrix-800/50;
  @apply transition-all duration-200;
}

/* Learning Section */
.learning-section {
  @apply from-accent-50 to-accent-100 rounded-xl bg-gradient-to-br;
  @apply dark:from-accent-950/20 dark:to-accent-900/20;
  @apply border-accent-200/50 dark:border-accent-800/50 border p-8;
}

.learning-header {
  @apply mb-6 flex items-center gap-4;
}

.learning-items {
  @apply space-y-3;
}

.learning-item {
  @apply flex items-center gap-3;
}

/* Transitions */
.skill-card-enter-active,
.skill-card-leave-active {
  transition: all 0.3s ease;
}

.skill-card-enter-from,
.skill-card-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

/* Responsive */
@media (max-width: 640px) {
  .skill-card {
    @apply p-4;
  }

  .skill-icon {
    @apply h-12 w-12;
  }

  .certification-card {
    @apply p-4;
  }

  .learning-section {
    @apply p-4;
  }
}
</style>
