<template>
  <nav
    ref="navRef"
    class="navbar"
    :class="{
      'navbar-scrolled': isScrolled,
      'navbar-menu-open': isMobileMenuOpen,
    }"
  >
    <!-- Progress Bar -->
    <div class="scroll-progress" :style="{ width: `${scrollProgress}%` }" />

    <div class="navbar-container">
      <!-- Logo/Brand -->
      <div class="navbar-brand">
        <div class="brand-icon">
          <Code2
            class="text-primary-600 group-hover:text-primary-700 h-6 w-6 transition-colors"
          />
        </div>
        <span class="brand-text">
          {{ isMobile ? "AD" : "Alessio D'Angelo" }}
        </span>
      </div>

      <!-- Desktop Navigation -->
      <div class="navbar-menu hidden lg:flex">
        <div class="navbar-nav">
          <a
            v-for="item in navigationItems"
            :key="item.id"
            :href="item.href"
            class="nav-link"
            :class="{ 'nav-link-active': activeSection === item.id }"
            @click="handleNavClick(item.id, $event)"
          >
            <component :is="item.icon" class="nav-icon" />
            <span>{{ t(`nav.${item.id}`) }}</span>
          </a>
        </div>

        <div class="navbar-actions">
          <!-- Language Switcher -->
          <div class="relative">
            <button
              @click="toggleLanguageMenu"
              class="action-btn group"
              :class="{ 'action-btn-active': isLanguageMenuOpen }"
            >
              <Globe class="h-4 w-4" />
              <span class="ml-1 text-sm font-medium">{{
                currentLocale.toUpperCase()
              }}</span>
              <ChevronDown
                class="ml-1 h-3 w-3 transition-transform"
                :class="{ 'rotate-180': isLanguageMenuOpen }"
              />
            </button>

            <!-- Language Dropdown -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-1 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-1 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div v-if="isLanguageMenuOpen" class="language-dropdown">
                <button
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  @click="changeLanguage(locale.code)"
                  class="language-option"
                  :class="{
                    'language-option-active': currentLocale === locale.code,
                  }"
                >
                  <span>{{ locale.flag }}</span>
                  <span>{{ locale.name }}</span>
                </button>
              </div>
            </transition>
          </div>

          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="action-btn group"
            :title="isDark ? t('nav.lightMode') : t('nav.darkMode')"
          >
            <transition
              enter-active-class="transition-all duration-300"
              leave-active-class="transition-all duration-300"
              enter-from-class="scale-0 rotate-90"
              leave-to-class="scale-0 rotate-90"
            >
              <Sun v-if="isDark" class="h-4 w-4" />
              <Moon v-else class="h-4 w-4" />
            </transition>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMobileMenu"
        class="mobile-menu-btn lg:hidden"
        :class="{ 'mobile-menu-btn-active': isMobileMenuOpen }"
      >
        <span class="sr-only">{{ t("nav.toggleMenu") }}</span>
        <div class="hamburger">
          <span class="hamburger-line" />
          <span class="hamburger-line" />
          <span class="hamburger-line" />
        </div>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          class="mobile-overlay"
          @click="closeMobileMenu"
        />
      </transition>

      <!-- Mobile Menu Panel -->
      <transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div v-if="isMobileMenuOpen" class="mobile-menu">
          <div class="mobile-menu-header">
            <div class="flex items-center justify-between">
              <span class="text-lg font-semibold text-gray-900 dark:text-white"
                >Menu</span
              >
              <button @click="closeMobileMenu" class="mobile-close-btn">
                <X class="h-5 w-5" />
              </button>
            </div>
          </div>

          <div class="mobile-menu-content">
            <!-- Mobile Navigation Links -->
            <div class="mobile-nav">
              <a
                v-for="item in navigationItems"
                :key="item.id"
                :href="item.href"
                class="mobile-nav-link"
                :class="{ 'mobile-nav-link-active': activeSection === item.id }"
                @click="handleMobileNavClick(item.id, $event)"
              >
                <component :is="item.icon" class="mobile-nav-icon" />
                <span>{{ t(`nav.${item.id}`) }}</span>
              </a>
            </div>

            <!-- Mobile Actions -->
            <div class="mobile-actions">
              <!-- Language Switcher Mobile -->
              <div class="mobile-action-group">
                <h3 class="mobile-action-title">{{ t("nav.language") }}</h3>
                <div class="flex gap-2">
                  <button
                    v-for="locale in availableLocales"
                    :key="locale.code"
                    @click="changeLanguage(locale.code)"
                    class="mobile-language-btn"
                    :class="{
                      'mobile-language-btn-active':
                        currentLocale === locale.code,
                    }"
                  >
                    <span>{{ locale.flag }}</span>
                    <span>{{ locale.name }}</span>
                  </button>
                </div>
              </div>

              <!-- Theme Toggle Mobile -->
              <div class="mobile-action-group">
                <h3 class="mobile-action-title">{{ t("nav.theme") }}</h3>
                <button @click="toggleDarkMode" class="mobile-theme-btn">
                  <component :is="isDark ? Sun : Moon" class="h-5 w-5" />
                  <span>{{
                    isDark ? t("nav.lightMode") : t("nav.darkMode")
                  }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, Teleport } from "vue";
import { useI18n } from "vue-i18n";

// Icons
import {
  Code2,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Mail,
  Globe,
  ChevronDown,
  Sun,
  Moon,
  Download,
  Menu,
  BugOff,
  X,
} from "lucide-vue-next";

const { t, locale } = useI18n();

// Reactive state
const navRef = ref<HTMLElement | null>(null);
const isScrolled = ref(false);
const scrollProgress = ref(0);
const activeSection = ref("home");
const isMobileMenuOpen = ref(false);
const isLanguageMenuOpen = ref(false);
const isDark = ref(false);
const isMobile = ref(false);

// Computed
const currentLocale = computed(() => locale.value);

// Navigation items
const navigationItems = [
  { id: "home", href: "#home", icon: Home },
  { id: "about", href: "#about", icon: User },
  { id: "skills", href: "#skills", icon: BugOff },
  { id: "experience", href: "#experience", icon: Briefcase },
  { id: "projects", href: "#projects", icon: FolderOpen },
  { id: "contact", href: "#contact", icon: Mail },
];

// Available languages
const availableLocales = [
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

// Scroll handler
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  // Update scroll state
  isScrolled.value = scrollTop > 50;
  scrollProgress.value = (scrollTop / windowHeight) * 100;

  // Update active section
  updateActiveSection();
};

// Update active section based on scroll position
const updateActiveSection = () => {
  const sections = navigationItems.map((item) => item.id);

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        activeSection.value = sectionId;
        break;
      }
    }
  }
};

// Navigation click handler
const handleNavClick = (sectionId: string, event: Event) => {
  event.preventDefault();
  scrollToSection(sectionId);
};

const handleMobileNavClick = (sectionId: string, event: Event) => {
  event.preventDefault();
  closeMobileMenu();
  // Wait for menu close animation to complete
  setTimeout(() => scrollToSection(sectionId), 200);
};

// Smooth scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - 80; // Account for navbar height
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
};

// Mobile menu handlers
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  updateBodyScroll();
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  updateBodyScroll();
};

const updateBodyScroll = () => {
  const body = document.body;
  if (isMobileMenuOpen.value) {
    // Store current scroll position
    const scrollY = window.scrollY;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
  } else {
    // Restore scroll position
    const scrollY = body.style.top;
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    body.style.overflow = "";
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }
};

// Language handlers
const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value;
};

const changeLanguage = (lang: string) => {
  locale.value = lang;
  isLanguageMenuOpen.value = false;
  // Close mobile menu if open
  if (isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

// Dark mode handler
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem("darkMode", isDark.value.toString());
  // Close mobile menu if open
  if (isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

// Check mobile viewport
const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024;
};

// Click outside handler for language menu
const handleClickOutside = (event: Event) => {
  if (
    isLanguageMenuOpen.value &&
    navRef.value &&
    !navRef.value.contains(event.target as Node)
  ) {
    isLanguageMenuOpen.value = false;
  }
};

// Handle escape key to close mobile menu
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

// Lifecycle
onMounted(() => {
  // Check initial dark mode preference
  const savedDarkMode = localStorage.getItem("darkMode");
  if (savedDarkMode !== null) {
    isDark.value = savedDarkMode === "true";
  } else {
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  document.documentElement.classList.toggle("dark", isDark.value);

  // Add event listeners
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", checkMobile);
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleEscapeKey);

  // Initial checks
  checkMobile();
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", checkMobile);
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscapeKey);
  // Reset body styles on cleanup
  const body = document.body;
  body.style.overflow = "";
  body.style.position = "";
  body.style.width = "";
  body.style.top = "";
});
</script>

<style scoped>
@reference "@/assets/css/style.css";

/* Navbar Base */
.navbar {
  @apply fixed top-0 right-0 left-0 z-50 transition-all duration-300;
  @apply bg-white/90 backdrop-blur-md dark:bg-gray-900/90;
  @apply border-b border-gray-200/50 dark:border-gray-700/50;
}

.navbar-scrolled {
  @apply bg-white/98 shadow-lg dark:bg-gray-900/98;
}

.navbar-container {
  @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  @apply flex h-16 items-center justify-between;
}

/* Progress Bar */
.scroll-progress {
  @apply from-primary-500 to-secondary-500 absolute bottom-0 left-0 h-0.5 bg-gradient-to-r;
  @apply transition-all duration-300;
}

/* Brand */
.navbar-brand {
  @apply flex items-center;
}

.brand-link {
  @apply flex items-center gap-3 no-underline;
}

.brand-icon {
  @apply flex h-8 w-8 items-center justify-center rounded-lg;
  @apply bg-primary-100 dark:bg-primary-900/30;
}

.brand-text {
  @apply text-xl font-bold text-gray-900 dark:text-white;
}

/* Desktop Navigation */
.navbar-menu {
  @apply items-center gap-8;
}

.navbar-nav {
  @apply flex items-center gap-1;
}

.nav-link {
  @apply flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium;
  @apply text-gray-600 no-underline dark:text-gray-300;
  @apply hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200;
  @apply hover:bg-gray-100 dark:hover:bg-gray-800;
}

.nav-link-active {
  @apply text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30;
}

.nav-icon {
  @apply h-4 w-4;
}

/* Actions */
.navbar-actions {
  @apply flex items-center gap-3;
}

.action-btn {
  @apply flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium;
  @apply text-gray-600 transition-all duration-200 dark:text-gray-300;
  @apply hover:text-primary-600 dark:hover:text-primary-400;
  @apply hover:bg-gray-100 dark:hover:bg-gray-800;
  @apply focus:ring-primary-500/50 focus:ring-2 focus:outline-none;
}

.mobile-close-btn {
  @apply flex items-center justify-center rounded-lg p-2;
  @apply text-gray-600 dark:text-gray-300;
  @apply hover:bg-gray-100 dark:hover:bg-gray-800;
  @apply transition-all duration-200;
  @apply active:scale-95;
  min-height: 44px;
  min-width: 44px;
}

.action-btn-active {
  @apply text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30;
}

/* Language Dropdown */
.language-dropdown {
  @apply absolute top-full right-0 mt-2 w-48 rounded-lg;
  @apply bg-white shadow-lg ring-1 ring-black/5 dark:bg-gray-800;
  @apply border border-gray-200 dark:border-gray-700;
}

.language-option {
  @apply flex w-full items-center gap-3 px-4 py-2 text-sm;
  @apply text-gray-700 dark:text-gray-300;
  @apply hover:bg-gray-100 dark:hover:bg-gray-700;
  @apply transition-colors first:rounded-t-lg last:rounded-b-lg;
}

.language-option-active {
  @apply text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  @apply rounded-lg p-2 text-gray-600 dark:text-gray-300;
  @apply hover:bg-gray-100 dark:hover:bg-gray-800;
  @apply focus:ring-primary-500/50 focus:ring-2 focus:outline-none;
}

.hamburger {
  @apply flex h-6 w-6 flex-col items-center justify-center gap-1;
}

.hamburger-line {
  @apply h-0.5 w-6 bg-current transition-all duration-300;
}

.mobile-menu-btn-active .hamburger-line:nth-child(1) {
  @apply translate-y-1.5 rotate-45;
}

.mobile-menu-btn-active .hamburger-line:nth-child(2) {
  @apply opacity-0;
}

.mobile-menu-btn-active .hamburger-line:nth-child(3) {
  @apply -translate-y-1.5 -rotate-45;
}

/* Mobile Menu */
.mobile-overlay {
  @apply fixed inset-0 bg-black/50 lg:hidden;
  z-index: 9998;
}

.mobile-menu {
  @apply fixed top-0 right-0 h-full w-80 max-w-sm;
  @apply bg-white shadow-xl dark:bg-gray-900;
  @apply border-l border-gray-200 dark:border-gray-700;
  z-index: 9999;
  will-change: transform;
}

@media (max-width: 480px) {
  .mobile-menu {
    @apply w-full max-w-none;
  }
}

.mobile-menu-header {
  @apply border-b border-gray-200 p-4 dark:border-gray-700;
  @apply bg-white dark:bg-gray-900;
}

.mobile-menu-content {
  @apply flex h-full flex-col overflow-y-auto p-4;
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.mobile-menu-content::-webkit-scrollbar {
  width: 4px;
}

.mobile-menu-content::-webkit-scrollbar-track {
  background: transparent;
}

.mobile-menu-content::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

.mobile-nav {
  @apply space-y-1;
  @apply mb-4;
}

.mobile-nav-link {
  @apply flex items-center gap-3 rounded-lg px-4 py-3;
  @apply text-gray-600 no-underline dark:text-gray-300;
  @apply hover:bg-gray-100 dark:hover:bg-gray-800;
  @apply transition-all duration-200;
  @apply active:scale-95;
  min-height: 48px;
}

.mobile-nav-link-active {
  @apply text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30;
}

.mobile-nav-icon {
  @apply h-5 w-5;
}

/* Mobile Actions */
.mobile-actions {
  @apply mt-8 space-y-6 border-t border-gray-200 pt-6 dark:border-gray-700;
}

.mobile-action-group {
  @apply space-y-3;
}

.mobile-action-title {
  @apply text-sm font-medium text-gray-900 dark:text-white;
}

.mobile-language-btn {
  @apply flex items-center gap-2 rounded-lg px-3 py-2 text-sm;
  @apply text-gray-600 dark:text-gray-300;
  @apply hover:bg-gray-100 dark:hover:bg-gray-800;
  @apply transition-all duration-200;
  @apply active:scale-95;
  min-height: 44px;
}

.mobile-language-btn-active {
  @apply text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30;
}

.mobile-theme-btn {
  @apply flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left;
  @apply text-gray-600 dark:text-gray-300;
  @apply hover:bg-gray-100 dark:hover:bg-gray-800;
  @apply transition-all duration-200;
  @apply active:scale-95;
  min-height: 48px;
}

/* Button Styles */
.btn-sm {
  @apply px-4 py-2 text-sm;
}

/* Responsive */
@media (max-width: 1023px) {
  .brand-text {
    @apply text-lg;
  }
}
</style>
