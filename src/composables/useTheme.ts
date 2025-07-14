import { ref, computed, onMounted } from "vue";

type Theme = "light" | "dark";

const isDark = ref<boolean>(false);

export function useTheme() {
  const toggleTheme = (): void => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  const setTheme = (theme: Theme): void => {
    isDark.value = theme === "dark";
    updateTheme();
  };

  const updateTheme = (): void => {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const initTheme = (): void => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else {
      isDark.value = prefersDark;
    }

    updateTheme();
  };

  onMounted(() => {
    initTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        isDark.value = e.matches;
        updateTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
  });

  const currentTheme = computed<Theme>(() => (isDark.value ? "dark" : "light"));

  return {
    isDark,
    currentTheme,
    toggleTheme,
    setTheme,
  };
}
