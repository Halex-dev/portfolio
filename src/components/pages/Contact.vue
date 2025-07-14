<template>
  <section
    id="contact"
    class="section pattern-dots relative overflow-hidden bg-gray-50 dark:bg-gray-900"
  >
    <!-- Background Elements -->
    <div
      class="from-primary-50/30 to-secondary-50/30 dark:from-primary-950/20 dark:to-secondary-950/20 absolute inset-0 bg-gradient-to-br"
    ></div>

    <div class="section-content relative">
      <!-- Header -->
      <div ref="headerRef" class="mb-16 text-center">
        <div class="mb-4 flex items-center justify-center gap-3">
          <div
            class="from-primary-500 to-secondary-500 h-1 w-12 rounded-full bg-gradient-to-r"
          ></div>
          <span
            class="text-primary-600 dark:text-primary-400 text-sm font-medium tracking-wider uppercase"
          >
            {{ t("contact.subtitle") }}
          </span>
          <div
            class="from-secondary-500 to-accent-500 h-1 w-12 rounded-full bg-gradient-to-r"
          ></div>
        </div>

        <h2 class="heading-lg mb-4 text-gray-900 dark:text-white">
          {{ t("contact.title") }}
        </h2>

        <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          {{ t("contact.description") }}
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Contact Info & Socials -->
        <div ref="infoRef" class="contact-info-container">
          <!-- Social Links -->
          <div class="social-links-container">
            <h3 class="social-links-title">
              {{ t("contact.socialLinks.title") }}
            </h3>
            <p class="social-links-subtitle">
              {{ t("contact.socialLinks.subtitle") }}
            </p>

            <div class="social-links-grid">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                :target="social.external ? '_blank' : '_self'"
                :rel="social.external ? 'noopener noreferrer' : ''"
                class="social-link group"
                :class="social.featured ? 'social-link-featured' : ''"
                @click="trackSocialClick(social.name)"
              >
                <div
                  class="social-link-icon"
                  :class="social.name === 'github' ? 'github-icon' : ''"
                  :style="{
                    backgroundColor: social.bgColor,
                    color: social.color,
                  }"
                >
                  <i
                    :class="
                      social.icon +
                      ' h-5 w-5 transition-transform group-hover:scale-110'
                    "
                    :style="{
                      color: social.color,
                    }"
                  ></i>
                </div>

                <div class="social-link-content">
                  <h4 class="social-link-title">
                    {{ social.name.toUpperCase() }}
                  </h4>
                  <p class="social-link-description">
                    {{ social.displayText }}
                  </p>
                  <div class="social-link-meta">
                    <span class="social-platform">{{ social.platform }}</span>
                    <span v-if="social.followers" class="social-followers">
                      {{ formatFollowers(social.followers) }} followers
                    </span>
                  </div>
                </div>

                <div class="social-link-arrow">
                  <ExternalLink
                    v-if="social.external"
                    class="h-4 w-4 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Additional Content -->
        <div ref="contentRef" class="additional-content">
          <!-- Availability Status -->
          <div class="availability-card">
            <div class="availability-header">
              <div class="availability-indicator">
                <div class="availability-dot"></div>
                <span class="availability-status">{{
                  t("contact.availability.status")
                }}</span>
              </div>
              <span class="availability-updated"> 11/07/2025 </span>
            </div>

            <h3 class="availability-title">
              {{ t("contact.availability.title") }}
            </h3>

            <p class="availability-description">
              {{ t("contact.availability.description") }}
            </p>

            <div class="availability-details">
              <div class="availability-detail">
                <Calendar class="h-4 w-4" />
                <span>{{ t("contact.availability.schedule") }}</span>
              </div>
              <div class="availability-detail">
                <MessageSquare class="h-4 w-4" />
                <span>{{ t("contact.availability.preferred") }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions">
            <h4 class="quick-actions-title">
              {{ t("contact.personal.title") }}
            </h4>

            <div class="quick-actions-grid">
              <button
                @click="downloadCV"
                class="quick-action-btn group"
                :disabled="isDownloading"
              >
                <div class="quick-action-icon">
                  <Download
                    v-if="!isDownloading"
                    class="h-5 w-5 transition-transform group-hover:animate-bounce"
                  />
                  <div
                    v-else
                    class="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
                  ></div>
                </div>
                <div class="quick-action-content">
                  <span class="quick-action-title">
                    {{
                      isDownloading
                        ? t("contact.cv.downloading")
                        : t("contact.cv.download")
                    }}
                  </span>
                  <span class="quick-action-subtitle">
                    {{ t("contact.cv.description") }}
                  </span>
                </div>
              </button>

              <button
                @click="copyEmail"
                class="quick-action-btn group"
                :class="{ copied: emailCopied }"
              >
                <div class="quick-action-icon">
                  <Check v-if="emailCopied" class="h-5 w-5 text-green-500" />
                  <Copy
                    v-else
                    class="h-5 w-5 transition-transform group-hover:scale-110"
                  />
                </div>
                <div class="quick-action-content">
                  <span class="quick-action-title">
                    {{
                      emailCopied
                        ? t("contact.personal.email.copied")
                        : t("contact.personal.email.copy")
                    }}
                  </span>
                  <span class="quick-action-subtitle">
                    {{ contactEmail }}
                  </span>
                </div>
              </button>
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
  ExternalLink,
  ArrowRight,
  Download,
  Copy,
  Check,
  Calendar,
  MessageSquare,
} from "lucide-vue-next";

import { socialLinks } from "@/data/contact/socials";

gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();

// Template refs
const headerRef = ref(null);
const infoRef = ref(null);
const contentRef = ref(null);

// State
const isDownloading = ref(false);
const emailCopied = ref(false);
const contactEmail = "alessiodangelo@protonmail.com";

// Methods
const formatFollowers = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const trackSocialClick = (socialName: string) => {
  // Analytics tracking
  console.log(`Social click: ${socialName}`);
};

const downloadCV = async () => {
  isDownloading.value = true;

  try {
    // Create a mock download
    const link = document.createElement("a");
    link.href = "/cv/CV.pdf";
    link.download = "CV.pdf";
    link.click();
  } catch (error) {
    console.error("Download failed:", error);
  } finally {
    isDownloading.value = false;
  }
};

const copyEmail = async () => {
  const textToCopy = contactEmail;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(textToCopy);
    } else {
      throw new Error("Clipboard API not available");
    }
  } catch (error) {
    console.warn("Modern copy failed, falling back...", error);

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed"; // Evita scroll su iOS
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }

    document.body.removeChild(textArea);
  }

  emailCopied.value = true;
  setTimeout(() => {
    emailCopied.value = false;
  }, 2000);
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

  // Social Links animation
  gsap.fromTo(
    ".social-links-container",
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: infoRef.value,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Actions & Availability animation
  gsap.fromTo(
    ".quick-actions, .availability-card",
    { x: 50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.value,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Social links stagger animation
  gsap.fromTo(
    ".social-link",
    { scale: 0.9, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.5,
      scrollTrigger: {
        trigger: ".social-links-grid",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    },
  );
});
</script>

<style scoped>
@reference "@/assets/css/style.css";

/* Social Links Section */
.social-links-section {
  @apply flex-1;
}

.social-links-container {
  @apply rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800;
  @apply border border-gray-200/50 dark:border-gray-700/50;
  @apply h-full backdrop-blur-sm;
}

.social-links-title {
  @apply mb-2 text-2xl font-bold text-gray-900 dark:text-white;
}

.social-links-subtitle {
  @apply mb-8 text-gray-600 dark:text-gray-400;
}

.social-links-grid {
  @apply space-y-4;
}

.social-link {
  @apply flex items-center gap-4 rounded-xl p-4 no-underline;
  @apply transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50;
  @apply hover:scale-[1.02] hover:shadow-lg;
  @apply border border-transparent hover:border-gray-200 dark:hover:border-gray-600;
}

.social-link-featured {
  @apply ring-primary-500/20 border-primary-200/50 border ring-2;
  @apply to-primary-50/30 bg-gradient-to-r from-white;
  @apply shadow-primary-500/10 shadow-lg;
  @apply dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700;
  @apply dark:ring-primary-400/30 dark:border-primary-700/50;
  @apply dark:shadow-primary-500/20 dark:shadow-lg;
  @apply hover:shadow-primary-500/15 hover:shadow-xl;
  @apply dark:hover:shadow-primary-500/25 dark:hover:shadow-xl;
  @apply hover:ring-primary-500/30 dark:hover:ring-primary-400/50;
}

.social-link-icon {
  @apply flex h-12 w-12 items-center justify-center rounded-xl;
  @apply transition-transform duration-300;
}

.social-link-icon i {
  @apply flex items-center justify-center;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.github-icon {
  @apply dark:bg-gray-700 dark:text-gray-200;
}

.github-icon i {
  @apply dark:text-gray-200;
}

.social-link-content {
  @apply min-w-0 flex-1;
}

.social-link-title {
  @apply font-semibold text-gray-900 dark:text-white;
  @apply mb-1;
}

.social-link-description {
  @apply truncate text-sm text-gray-600 dark:text-gray-400;
  @apply mb-2;
}

.social-link-meta {
  @apply flex items-center gap-3 text-xs;
}

.social-platform {
  @apply font-medium text-gray-500 dark:text-gray-500;
}

.social-followers {
  @apply text-primary-600 dark:text-primary-400 font-medium;
}

.social-link-arrow {
  @apply flex-shrink-0;
}

/* Actions & Availability Section */
.actions-availability-section {
  @apply flex-1 space-y-8;
}
.quick-actions {
  @apply rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100;
  @apply dark:from-gray-800/50 dark:to-gray-900/50;
  @apply border border-gray-200/50 p-6 dark:border-gray-700/50;
}

.quick-actions-title {
  @apply mb-6 text-lg font-semibold text-gray-900 dark:text-white;
}

.quick-actions-grid {
  @apply space-y-4;
}

.quick-action-btn {
  @apply flex w-full items-center gap-4 rounded-xl p-4;
  @apply border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800;
  @apply transition-all duration-300 hover:scale-[1.02] hover:shadow-lg;
  @apply hover:bg-gray-50 dark:hover:bg-gray-700;
  @apply disabled:cursor-not-allowed disabled:opacity-50;
}

.quick-action-btn.copied {
  @apply border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20;
}

.quick-action-icon {
  @apply flex h-10 w-10 items-center justify-center rounded-lg;
  @apply bg-gray-100 dark:bg-gray-700;
}

.quick-action-content {
  @apply flex-1 text-left;
}

.quick-action-title {
  @apply block font-medium text-gray-900 dark:text-white;
}

.quick-action-subtitle {
  @apply block text-sm text-gray-600 dark:text-gray-400;
}

/* Quick Actions */
.availability-card {
  @apply rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50;
  @apply dark:from-green-950/20 dark:to-emerald-950/20;
  @apply border border-green-200/50 dark:border-green-800/50;
  @apply p-8;
}

.availability-header {
  @apply mb-4 flex items-center justify-between;
}

.availability-indicator {
  @apply flex items-center gap-2;
}

.availability-dot {
  @apply h-3 w-3 animate-pulse rounded-full bg-green-500;
}

.availability-status {
  @apply text-sm font-medium text-green-700 dark:text-green-400;
}

.availability-updated {
  @apply text-xs text-gray-600 dark:text-gray-400;
}

.availability-title {
  @apply mb-3 text-xl font-bold text-gray-900 dark:text-white;
}

.availability-description {
  @apply mb-6 text-gray-600 dark:text-gray-300;
}

.availability-details {
  @apply space-y-3;
}

.availability-detail {
  @apply flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300;
}

/* Collaboration CTA */
.contact-info-container {
  @apply space-y-8;
}

.additional-content {
  @apply space-y-8;
}

/* Responsive Design */
@media (max-width: 1023px) {
  .social-links-container,
  .quick-actions,
  .availability-card {
    @apply p-6;
  }
}

@media (max-width: 640px) {
  .social-links-container,
  .availability-card {
    @apply p-4;
  }

  .social-link {
    @apply p-3;
  }

  .social-link-icon {
    @apply h-10 w-10;
  }

  .actions-availability-section {
    @apply space-y-6;
  }
}

/* Hover Effects */
.social-link:hover .social-link-icon {
  transform: translateY(-2px) scale(1.05);
}

.quick-action-btn:hover .quick-action-icon {
  transform: scale(1.1);
}

/* Accessibility */
.social-link:focus-visible,
.quick-action-btn:focus-visible {
  @apply outline-primary-500 outline-2 outline-offset-2;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .github-icon {
    background-color: #374151 !important;
    color: #e5e7eb !important;
  }

  .github-icon i {
    color: #e5e7eb !important;
  }
}
</style>
