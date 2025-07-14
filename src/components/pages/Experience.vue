<template>
  <section
    id="experience"
    class="section pattern-dots bg-gray-50 dark:bg-gray-900"
  >
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
            {{ t("experience.subtitle") }}
          </span>
          <div
            class="from-secondary-500 to-accent-500 h-1 w-12 rounded-full bg-gradient-to-r"
          ></div>
        </div>

        <h2 class="heading-lg mb-4 text-gray-900 dark:text-white">
          {{ t("experience.title") }}
        </h2>

        <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          {{ t("experience.description") }}
        </p>
      </div>

      <!-- Timeline -->
      <div ref="timelineRef" class="relative mx-auto max-w-4xl">
        <!-- Timeline Line -->
        <div class="timeline-line"></div>

        <!-- Timeline Items -->
        <div class="space-y-12">
          <div
            v-for="(item, index) in computedTimelineItems"
            :key="item.id"
            ref="timelineItemRefs"
            class="timeline-item"
            :class="{
              'timeline-item-left': index % 2 === 0,
              'timeline-item-right': index % 2 === 1,
            }"
          >
            <!-- Timeline Node -->
            <div class="timeline-node" :class="item.nodeClass">
              <div class="timeline-node-inner">
                <component :is="item.icon" class="h-4 w-4 text-white" />
              </div>
              <div class="timeline-node-pulse" v-if="item.highlight"></div>
            </div>

            <!-- Timeline Content -->
            <div class="timeline-content" :class="item.contentClass">
              <!-- Period Badge -->
              <div class="timeline-period">
                <Calendar class="h-3 w-3" />
                <span>{{ item.period }}</span>
              </div>

              <!-- Main Card -->
              <div class="timeline-card" :class="item.cardClass">
                <!-- Header -->
                <div class="timeline-card-header">
                  <div class="flex items-center gap-3">
                    <div
                      class="timeline-card-icon"
                      :style="{
                        backgroundColor: item.color + '15',
                        color: item.color,
                      }"
                    >
                      <component :is="item.icon" class="h-5 w-5" />
                    </div>
                    <div class="flex-1">
                      <h3 class="timeline-card-title">
                        {{ t(`experience.items.${item.id}.title`) }}
                      </h3>
                      <p class="timeline-card-subtitle">
                        {{ t(`experience.items.${item.id}.organization`) }}
                      </p>
                    </div>
                    <div
                      v-if="item.status"
                      class="timeline-status"
                      :class="item.statusClass"
                    >
                      {{ t(`experience.status.${item.status}`) }}
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <div class="timeline-card-content">
                  <p class="timeline-card-description">
                    {{ t(`experience.items.${item.id}.description`) }}
                  </p>

                  <!-- Achievements -->
                  <div v-if="item.achievements" class="timeline-achievements">
                    <h4 class="timeline-achievements-title">
                      {{ t("experience.achievements") }}
                    </h4>
                    <ul class="timeline-achievements-list">
                      <li
                        v-for="achievement in item.achievements"
                        :key="achievement"
                        class="timeline-achievement-item"
                      >
                        <CheckCircle
                          class="text-matrix-500 h-4 w-4 flex-shrink-0"
                        />
                        <span>{{
                          t(
                            `experience.items.${item.id}.achievements.${achievement}`,
                          )
                        }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Technologies -->
                  <div v-if="item.technologies" class="timeline-technologies">
                    <h4 class="timeline-tech-title">
                      {{ t("experience.technologies") }}
                    </h4>
                    <div class="timeline-tech-tags">
                      <span
                        v-for="tech in item.technologies"
                        :key="tech"
                        class="timeline-tech-tag"
                        :style="{
                          backgroundColor: item.color + '15',
                          color: item.color,
                        }"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>

                  <!-- Links -->
                  <div v-if="item.links" class="timeline-links">
                    <a
                      v-for="link in item.links"
                      :key="link.type"
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="timeline-link"
                    >
                      <component :is="link.icon" class="h-4 w-4" />
                      <span>{{ t(`experience.links.${link.type}`) }}</span>
                      <ExternalLink class="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div ref="statsRef" class="mt-20">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.key" class="stat-card group">
            <div
              class="stat-icon"
              :style="{ backgroundColor: stat.color + '15', color: stat.color }"
            >
              <component :is="stat.icon" class="h-6 w-6" />
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ stat.value }}</div>
              <div class="stat-label">
                {{ t(`experience.stats.${stat.key}`) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/data/experience/stats";

// Icons
import {
  Calendar,
  CheckCircle,
  ExternalLink,
  GraduationCap,
  Award,
  Code2,
  BookOpen,
} from "lucide-vue-next";

gsap.registerPlugin(ScrollTrigger);

const { t, locale } = useI18n();

// Template refs
const headerRef = ref(null);
const timelineRef = ref(null);
const timelineItemRefs = ref([]);
const statsRef = ref(null);
const ctaRef = ref(null);

// Timeline items data
const computedTimelineItems = computed(() => [
  {
    id: "current",
    period: `2024 - ${t("experience.stillWorking")}`,
    icon: Code2,
    color: "#0ea5e9",
    status: "active",
    statusClass:
      "bg-matrix-100 text-matrix-800 dark:bg-matrix-900/30 dark:text-matrix-400",
    nodeClass: "bg-primary-500",
    contentClass: "timeline-content-right",
    cardClass: "border-primary-200 dark:border-primary-700",
    highlight: true,
    technologies: [
      "Vue.js",
      "TailwindCSS",
      "Docker",
      "Linux",
      "TrueNAS",
      "WordPress",
      "Python",
      "Network Security",
      "Autopsy",
      "TrueNAS",
      "NextCloud",
      "Network",
      "Git",
    ],
    achievements: ["infrastructure", "security", "development", "clients"],
    links: [],
  },
  {
    id: "cyberchallenge",
    period: "2022",
    icon: Award,
    color: "#22c55e",
    nodeClass: "bg-matrix-500",
    contentClass: "timeline-content-left",
    cardClass:
      "border-matrix-200 dark:border-matrix-700 ring-2 ring-matrix-100 dark:ring-matrix-900/50",
    highlight: true,
    technologies: [
      "Network Security",
      "Penetration Testing",
      "Linux",
      "Wireshark",
      "Hydra",
      "Cryptography",
    ],
    achievements: ["certification", "ranking", "skills"],
    links: [
      {
        type: "certificate",
        url: "#",
        icon: Award,
      },
    ],
  },
  {
    id: "university",
    period: "2017 - 2025",
    icon: GraduationCap,
    color: "#f59e0b",
    nodeClass: "bg-accent-500",
    contentClass: "timeline-content-right",
    cardClass: "border-accent-200 dark:border-accent-700",
    technologies: ["Java", "C++", "SQL", "Algorithms", "Data Structures"],
    achievements: ["degree", "projects", "grades"],
  },
  {
    id: "learning",
    period: "2013",
    icon: BookOpen,
    color: "#8b5cf6",
    nodeClass: "bg-purple-500",
    contentClass: "timeline-content-left",
    cardClass: "border-purple-200 dark:border-purple-700",
    technologies: ["C++", "Git", "Linux"],
    achievements: ["foundation"],
  },
]);

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

  // Timeline line animation
  gsap.fromTo(
    ".timeline-line",
    { scaleY: 0 },
    {
      scaleY: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".timeline-line",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Timeline items animation
  timelineItemRefs.value.forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  // Stats animation
  gsap.fromTo(
    ".stat-card",
    { y: 50, opacity: 0, scale: 0.9 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: statsRef.value,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // CTA animation
  gsap.fromTo(
    ctaRef.value?.children || [],
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ctaRef.value,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Pulse animation for highlighted nodes
  gsap.to(".timeline-node-pulse", {
    scale: 1.5,
    opacity: 0,
    duration: 2,
    ease: "power2.out",
    repeat: -1,
  });
});
</script>

<style scoped>
@reference "@/assets/css/style.css";

/* Timeline */
.timeline-line {
  @apply from-primary-500 via-secondary-500 to-accent-500 absolute top-0 left-1/2 h-full w-0.5 bg-gradient-to-b;
  @apply origin-top -translate-x-1/2 transform;
}

.timeline-item {
  @apply relative flex items-center;
}

.timeline-item-left {
  @apply justify-start;
}

.timeline-item-right {
  @apply justify-end;
}

/* Timeline Node */
.timeline-node {
  @apply absolute left-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full;
  @apply -translate-x-1/2 transform ring-4 ring-white dark:ring-gray-900;
}

.timeline-node-inner {
  @apply flex h-full w-full items-center justify-center rounded-full;
}

.timeline-node-pulse {
  @apply absolute inset-0 rounded-full bg-current opacity-20;
}

/* Timeline Content */
.timeline-content {
  @apply w-5/12;
}

.timeline-content-left {
  @apply mr-auto pr-8;
}

.timeline-content-right {
  @apply ml-auto pl-8;
}

/* Timeline Period */
.timeline-period {
  @apply mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400;
}

/* Timeline Card */
.timeline-card {
  @apply rounded-xl border bg-white p-6 shadow-lg dark:bg-gray-800;
  @apply transition-all duration-300 hover:scale-105 hover:shadow-xl;
}

.timeline-card-header {
  @apply mb-4;
}

.timeline-card-icon {
  @apply flex h-10 w-10 items-center justify-center rounded-lg;
}

.timeline-card-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.timeline-card-subtitle {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

.timeline-status {
  @apply rounded-full px-3 py-1 text-xs font-medium;
}

.timeline-card-content {
  @apply space-y-4;
}

.timeline-card-description {
  @apply leading-relaxed text-gray-600 dark:text-gray-300;
}

/* Achievements */
.timeline-achievements-title {
  @apply mb-2 text-sm font-semibold text-gray-900 dark:text-white;
}

.timeline-achievements-list {
  @apply space-y-2;
}

.timeline-achievement-item {
  @apply flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300;
}

/* Technologies */
.timeline-tech-title {
  @apply mb-2 text-sm font-semibold text-gray-900 dark:text-white;
}

.timeline-tech-tags {
  @apply flex flex-wrap gap-2;
}

.timeline-tech-tag {
  @apply rounded-full px-2 py-1 text-xs font-medium;
}

/* Links */
.timeline-links {
  @apply flex flex-wrap gap-2;
}

.timeline-link {
  @apply text-primary-600 dark:text-primary-400 flex items-center gap-1 text-sm;
  @apply hover:text-primary-700 dark:hover:text-primary-300 transition-colors;
}

/* Stats */
.stats-grid {
  @apply grid gap-6 sm:grid-cols-2 lg:grid-cols-4;
}

.stat-card {
  @apply flex items-center gap-4 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800;
  @apply border border-gray-200 dark:border-gray-700;
  @apply transition-all duration-300 hover:scale-105 hover:shadow-xl;
}

.stat-icon {
  @apply flex h-12 w-12 items-center justify-center rounded-lg;
}

.stat-number {
  @apply text-2xl font-bold text-gray-900 dark:text-white;
}

.stat-label {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

/* CTA */
.cta-container {
  @apply rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white;
  @apply dark:from-gray-800 dark:to-gray-900;
}

.cta-container h3 {
  @apply text-white;
}

.cta-container p {
  @apply text-gray-300;
}

/* Responsive */
@media (max-width: 1023px) {
  .timeline-line {
    @apply left-8;
  }

  .timeline-node {
    @apply left-8;
  }

  .timeline-content {
    @apply w-full pr-0 pl-20;
  }

  .timeline-content-left,
  .timeline-content-right {
    @apply mr-0 ml-0 pr-0 pl-20;
  }
}

@media (max-width: 640px) {
  .timeline-card {
    @apply p-4;
  }

  .stat-card {
    @apply p-4;
  }

  .cta-container {
    @apply p-4;
  }
}
</style>
