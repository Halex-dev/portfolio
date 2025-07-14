<template>
  <div
    class="particle-container"
    :class="{ 'reduced-motion': prefersReducedMotion }"
  >
    <!-- Fallback gradient for performance/accessibility -->
    <div v-if="!canRenderParticles" class="fallback-background"></div>

    <!-- Main particles -->
    <vue-particles v-else id="tsparticles" :options="currentParticlesOptions" />

    <!-- Overlay effects -->
    <div class="particle-overlay">
      <!-- Floating geometric shapes -->
      <div
        class="floating-shapes"
        v-if="showFloatingShapes && !prefersReducedMotion"
      >
        <div
          v-for="shape in floatingShapes"
          :key="shape.id"
          class="floating-shape"
          :style="shape.style"
        >
          <component :is="shape.icon" :size="shape.size" />
        </div>
      </div>

      <!-- Gradient overlays -->
      <div class="gradient-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useTheme } from "@/composables/useTheme";
import { usePerformance } from "@/composables/usePerformance";
import {
  Code2,
  Shield,
  Server,
  Database,
  Cloud,
  Lock,
  Terminal,
  GitBranch,
  Layers,
} from "lucide-vue-next";

// Props
interface Props {
  variant?: "hero" | "section" | "minimal";
  interactive?: boolean;
  showFloatingShapes?: boolean;
  density?: "low" | "medium" | "high";
  colorScheme?: "primary" | "secondary" | "accent" | "matrix";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "hero",
  interactive: true,
  showFloatingShapes: true,
  density: "medium",
  colorScheme: "primary",
});

// Composables
const { isDark } = useTheme();
const { isLowEndDevice, prefersReducedMotion } = usePerformance();

// Reactive state
const particlesContainer = ref(null);
const canRenderParticles = ref(true);
const isVisible = ref(false);

// Color schemes
const colorSchemes = {
  primary: {
    particles: "#6366f1",
    links: "#6366f1",
    orb1: "rgba(99, 102, 241, 0.3)",
    orb2: "rgba(139, 92, 246, 0.2)",
    orb3: "rgba(59, 130, 246, 0.2)",
  },
  secondary: {
    particles: "#10b981",
    links: "#10b981",
    orb1: "rgba(16, 185, 129, 0.3)",
    orb2: "rgba(5, 150, 105, 0.2)",
    orb3: "rgba(6, 182, 212, 0.2)",
  },
  accent: {
    particles: "#f59e0b",
    links: "#f59e0b",
    orb1: "rgba(245, 158, 11, 0.3)",
    orb2: "rgba(251, 146, 60, 0.2)",
    orb3: "rgba(252, 211, 77, 0.2)",
  },
  matrix: {
    particles: "#00ff41",
    links: "#00ff41",
    orb1: "rgba(0, 255, 65, 0.3)",
    orb2: "rgba(0, 200, 50, 0.2)",
    orb3: "rgba(0, 150, 35, 0.2)",
  },
};

// Density configurations
const densityConfigs = {
  low: { particles: 30, links: 100, speed: 0.5 },
  medium: { particles: 60, links: 150, speed: 1 },
  high: { particles: 100, links: 200, speed: 1.5 },
};

// Variant configurations
const variantConfigs = {
  hero: {
    particles: densityConfigs[props.density].particles,
    interactive: props.interactive,
    size: { min: 1, max: 5 },
  },
  section: {
    particles: Math.floor(densityConfigs[props.density].particles * 0.6),
    interactive: false,
    size: { min: 1, max: 3 },
  },
  minimal: {
    particles: Math.floor(densityConfigs[props.density].particles * 0.3),
    interactive: false,
    size: { min: 1, max: 2 },
  },
};

// Floating shapes configuration
const floatingShapes = ref([
  {
    id: 1,
    icon: Code2,
    size: 24,
    style: {
      left: "10%",
      top: "20%",
      animationDelay: "0s",
      animationDuration: "20s",
    },
  },
  {
    id: 2,
    icon: Shield,
    size: 20,
    style: {
      right: "15%",
      top: "30%",
      animationDelay: "5s",
      animationDuration: "25s",
    },
  },
  {
    id: 3,
    icon: Server,
    size: 28,
    style: {
      left: "20%",
      bottom: "25%",
      animationDelay: "10s",
      animationDuration: "30s",
    },
  },
  {
    id: 4,
    icon: Database,
    size: 22,
    style: {
      right: "25%",
      bottom: "20%",
      animationDelay: "15s",
      animationDuration: "22s",
    },
  },
  {
    id: 5,
    icon: Cloud,
    size: 26,
    style: {
      left: "50%",
      top: "15%",
      animationDelay: "8s",
      animationDuration: "28s",
    },
  },
  {
    id: 6,
    icon: Terminal,
    size: 20,
    style: {
      right: "40%",
      top: "60%",
      animationDelay: "12s",
      animationDuration: "24s",
    },
  },
]);

// Computed particles options
const currentParticlesOptions = computed(() => {
  const colors = colorSchemes[props.colorScheme];
  const variant = variantConfigs[props.variant];
  const density = densityConfigs[props.density];

  return {
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: isLowEndDevice.value ? 30 : 240,
    particles: {
      color: {
        value: isDark.value
          ? colors.particles
          : adjustColorForLight(colors.particles),
      },
      links: {
        color: isDark.value ? colors.links : adjustColorForLight(colors.links),
        distance: density.links,
        enable: !prefersReducedMotion.value,
        opacity: isDark.value ? 0.4 : 0.2,
        width: 1,
        triangles: {
          enable: props.variant === "hero",
          color: colors.particles,
          opacity: 0.1,
        },
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: prefersReducedMotion.value ? 0.1 : density.speed,
        straight: false,
        attract: {
          enable: props.interactive,
          rotateX: 600,
          rotateY: 1200,
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: variant.particles,
      },
      opacity: {
        value: isDark.value ? 0.6 : 0.4,
        random: {
          enable: true,
          minimumValue: 0.1,
        },
        animation: {
          enable: !prefersReducedMotion.value,
          speed: 0.5,
          minimumValue: 0.1,
          sync: false,
        },
      },
      shape: {
        type: ["circle", "triangle", "polygon"],
        polygon: {
          sides: 6,
        },
      },
      size: {
        value: variant.size,
        random: {
          enable: true,
          minimumValue: 1,
        },
        animation: {
          enable: !prefersReducedMotion.value,
          speed: 2,
          minimumValue: 0.5,
          sync: false,
        },
      },
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: props.interactive && !prefersReducedMotion.value,
          mode: ["repulse", "bubble"],
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        bubble: {
          distance: 200,
          size: 8,
          duration: 2,
          opacity: 0.8,
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: {
              value: Math.floor(variant.particles * 0.5),
            },
            links: {
              distance: Math.floor(density.links * 0.7),
            },
          },
        },
      },
      {
        maxWidth: 480,
        options: {
          particles: {
            number: {
              value: Math.floor(variant.particles * 0.3),
            },
            links: {
              enable: false,
            },
          },
        },
      },
    ],
  };
});

// Helper function to adjust colors for light theme
const adjustColorForLight = (color: string) => {
  // Convert to lighter version for light theme
  return color.replace(/rgba?\([^)]+\)/, (match) => {
    return match.replace(/[\d.]+(?=\))/, "0.6");
  });
};

// Performance check
const checkPerformance = () => {
  // Disable particles on very low-end devices
  if (isLowEndDevice.value && window.innerWidth < 768) {
    canRenderParticles.value = false;
  }

  // Reduce effects if battery is low
  if ("getBattery" in navigator) {
    (navigator as any).getBattery().then((battery: any) => {
      if (battery.level < 0.2) {
        canRenderParticles.value = false;
      }
    });
  }
};

// Intersection Observer for performance
const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting;
      });
    },
    { threshold: 0.1 },
  );

  if (particlesContainer.value) {
    observer.observe(particlesContainer.value);
  }

  return observer;
};

// Lifecycle
onMounted(() => {
  checkPerformance();
  const observer = setupIntersectionObserver();

  onUnmounted(() => {
    observer.disconnect();
  });
});

// Watch for theme changes
watch(isDark, () => {
  // Particles will reactively update due to computed options
});
</script>

<style scoped>
@reference "@/assets/css/style.css";

.particle-container {
  @apply absolute inset-0 overflow-hidden;
  pointer-events: none;
}

.particle-container.reduced-motion {
  @apply opacity-50;
}

.fallback-background {
  @apply absolute inset-0;
  background: radial-gradient(
    ellipse at center,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.05) 50%,
    transparent 100%
  );
}

.particle-overlay {
  @apply pointer-events-none absolute inset-0;
}

/* Floating Shapes */
.floating-shapes {
  @apply absolute inset-0;
}

.floating-shape {
  @apply text-primary-400/20 dark:text-primary-300/30 absolute;
  animation: float-tech var(--animation-duration, 20s) ease-in-out infinite;
  will-change: transform;
}

@keyframes float-tech {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) rotate(90deg) scale(1.1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) rotate(180deg) scale(0.9);
    opacity: 0.4;
  }
  75% {
    transform: translateY(-30px) rotate(270deg) scale(1.05);
    opacity: 0.7;
  }
}

/* Gradient Orbs */
.gradient-orbs {
  @apply absolute inset-0;
  mix-blend-mode: screen;
}

.orb {
  @apply absolute rounded-full blur-3xl;
  filter: blur(80px);
  animation: orb-float 20s ease-in-out infinite;
}

.orb-1 {
  @apply h-96 w-96;
  background: radial-gradient(
    circle,
    var(--orb-1-color, rgba(99, 102, 241, 0.3)) 0%,
    transparent 70%
  );
  top: -10%;
  left: -10%;
  animation-delay: 0s;
}

.orb-2 {
  @apply h-80 w-80;
  background: radial-gradient(
    circle,
    var(--orb-2-color, rgba(139, 92, 246, 0.2)) 0%,
    transparent 70%
  );
  top: 50%;
  right: -10%;
  animation-delay: 7s;
}

.orb-3 {
  @apply h-72 w-72;
  background: radial-gradient(
    circle,
    var(--orb-3-color, rgba(59, 130, 246, 0.2)) 0%,
    transparent 70%
  );
  bottom: -10%;
  left: 30%;
  animation-delay: 14s;
}

@keyframes orb-float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.7;
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
    opacity: 0.9;
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
    opacity: 0.6;
  }
}

/* Theme-specific orb colors */
.particle-container[data-color-scheme="primary"] {
  --orb-1-color: rgba(99, 102, 241, 0.3);
  --orb-2-color: rgba(139, 92, 246, 0.2);
  --orb-3-color: rgba(59, 130, 246, 0.2);
}

.particle-container[data-color-scheme="secondary"] {
  --orb-1-color: rgba(16, 185, 129, 0.3);
  --orb-2-color: rgba(5, 150, 105, 0.2);
  --orb-3-color: rgba(6, 182, 212, 0.2);
}

.particle-container[data-color-scheme="accent"] {
  --orb-1-color: rgba(245, 158, 11, 0.3);
  --orb-2-color: rgba(251, 146, 60, 0.2);
  --orb-3-color: rgba(252, 211, 77, 0.2);
}

.particle-container[data-color-scheme="matrix"] {
  --orb-1-color: rgba(0, 255, 65, 0.3);
  --orb-2-color: rgba(0, 200, 50, 0.2);
  --orb-3-color: rgba(0, 150, 35, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .floating-shape {
    @apply text-lg;
  }

  .orb {
    filter: blur(40px);
  }

  .orb-1 {
    @apply h-64 w-64;
  }

  .orb-2 {
    @apply h-56 w-56;
  }

  .orb-3 {
    @apply h-48 w-48;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .floating-shape,
  .orb {
    animation: none;
  }

  .particle-container {
    @apply opacity-30;
  }
}

/* Performance optimizations */
.floating-shape,
.orb {
  will-change: transform;
  contain: layout style paint;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .fallback-background {
    background: radial-gradient(
      ellipse at center,
      rgba(99, 102, 241, 0.15) 0%,
      rgba(139, 92, 246, 0.08) 50%,
      transparent 100%
    );
  }

  .floating-shape {
    @apply text-primary-300/40;
  }
}
</style>
